import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import {
  About,
  FavoritePokemons,
  NotFound,
  Pokedex,
  PokemonDetails,
} from './components';

import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from './services/pokedexService';

import pokemons from './data';

import './App.css';

class App extends Component {
  static setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  }

  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: App.setIsPokemonFavoriteById() };
  }

  onUpdateFavoritePokemons(pokemonId, isFavorite) {
    updateFavoritePokemons(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: App.setIsPokemonFavoriteById() }));
  }

  renderPokedex() {
    const { isPokemonFavoriteById } = this.state;

    return (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />
    );
  }

  renderPokemonDetails(match) {
    const { isPokemonFavoriteById } = this.state;

    return (
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />
    );
  }

  renderRoutes() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ ({ match }) => this.renderPokedex(match) }
        />
        <Route
          path="/pokemons/:id"
          render={ ({ match }) => this.renderPokemonDetails(match) }
        />
        <Route
          path="/favorites"
          render={ () => <FavoritePokemons pokemons={ favoritePokemons } /> }
        />
        <Route path="/about" component={ About } />
        <Route component={ NotFound } />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Pokédex</h1>
        <nav>
          <Link className="link" to="/">{`Home`}</Link>
          <Link className="link" to="/about">{`About`}</Link>
          <Link className="link" to="/favorites">{`Favorite Pokémons`}</Link>
        </nav>
        {this.renderRoutes()}
      </div>
    );
  }
}

export default App;
