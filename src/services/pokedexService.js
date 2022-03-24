export const readFavoritePokemonIds = () => (
  JSON.parse(localStorage.getItem('favoritePokemonIds')) || []
);

const saveFavoritePokemons = (pokemons) => (
  localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons))
);

const addPokemonToFavorites = (pokemonId) => {
  const favoritePokemons = readFavoritePokemonIds();
  const newFavoritePokemons = [...favoritePokemons, pokemonId];

  saveFavoritePokemons(newFavoritePokemons);
};

const removePokemonFromFavorites = (pokemonId) => {
  const favoritePokemons = readFavoritePokemonIds();
  const newFavoritePokemons = favoritePokemons.filter((id) => id !== pokemonId);

  saveFavoritePokemons(newFavoritePokemons);
};

export const updateFavoritePokemons = (pokemonId, isFavorite) => (
  isFavorite ? addPokemonToFavorites(pokemonId) : removePokemonFromFavorites(pokemonId)
);
