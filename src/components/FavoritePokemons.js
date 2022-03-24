import React from 'react';
import PropTypes from 'prop-types';

import { pokemonType } from '../types';
import Pokemon from './Pokemon';

import './favorite-pokemons.css';

const ZERO = 0;

class FavoritePokemons extends React.Component {
  static notFound() {
    return (
      <div>
        <p>{ `No favorite pokemon found` }</p>
      </div>
    );
  }

  static renderFavoritePokemon(pokemon) {
    return (
      <div key={ pokemon.id } className="favorite-pokemon">
        <Pokemon pokemon={ pokemon } isFavorite />
      </div>
    );
  }

  renderFavoritePokemons() {
    const { pokemons } = this.props;
    const { renderFavoritePokemon } = FavoritePokemons;

    return (
      <div className="favorite-pokemons">
        { pokemons.map((pokemon) => renderFavoritePokemon(pokemon)) }
      </div>
    );
  }

  render() {
    const { notFound } = FavoritePokemons;
    const { pokemons } = this.props;
    const isEmpty = pokemons.length === ZERO;

    return (
      <div>
        <h2>Favorite pokémons</h2>
        { isEmpty ? notFound() : this.renderFavoritePokemons() }
      </div>
    );
  }
}

FavoritePokemons.propTypes = {
  pokemons: PropTypes.arrayOf(pokemonType.isRequired),
};

FavoritePokemons.defaultProps = {
  pokemons: [],
};

export default FavoritePokemons;
