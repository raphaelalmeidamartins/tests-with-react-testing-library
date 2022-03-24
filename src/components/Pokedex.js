import React from 'react';
import PropTypes from 'prop-types';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import Button from './Button';
import Pokemon from './Pokemon';
import './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonIndex: 0, filteredType: 'all' };
  }

  filterPokemons(filteredType) {
    this.setState({ filteredType, pokemonIndex: 0 });
  }

  nextPokemon(numberOfPokemons) {
    this.setState((state) => (
      { pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons }
    ));
  }

  fetchFilteredPokemons() {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter((pokemon) => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  fetchPokemonTypes() {
    const { pokemons } = this.props;

    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  }

  renderPokemonButtonsPanel() {
    const pokemonTypes = this.fetchPokemonTypes();

    return (
      <div className="pokedex-buttons-panel">
        <Button
          onClick={() => this.filterPokemons('all')}
          className="filter-button"
        >
          All
        </Button>
        {pokemonTypes.map((type) => (
          <Button
            dataTestId={`pokemon-type-button`}
            key={type}
            onClick={() => this.filterPokemons(type)}
            className="filter-button"
          >
            {`${type}`}
          </Button>
        ))}
      </div>
    );
  }

  render() {
    const { isPokemonFavoriteById } = this.props;
    const filteredPokemons = this.fetchFilteredPokemons();
    const { pokemonIndex } = this.state;
    const pokemon = filteredPokemons[pokemonIndex];

    return (
      <div className="pokedex">
        <h2>Encountered pokémons</h2>
        <Pokemon
          pokemon={pokemon}
          isFavorite={isPokemonFavoriteById[pokemon.id]}
        />
        {this.renderPokemonButtonsPanel()}
        <Button
          dataTestId="next-pokemon"
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          disabled={filteredPokemons.length <= 1}
        >
          Próximo pokémon
        </Button>
      </div>
    );
  }
}

Pokedex.propTypes = {
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default Pokedex;
