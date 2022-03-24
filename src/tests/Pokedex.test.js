import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const filters = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

const filterButtons = () => screen.queryAllByTestId('pokemon-type-button');

const selectPokemon = () => ({
  name: screen.getByTestId('pokemon-name').textContent,
  type: screen.getByTestId('pokemon-type').textContent,
  weight: screen.getByTestId('pokemon-weight').textContent,
  sprite: screen.getByAltText(/sprite$/i).src,
});

const nextPokemon = () => screen.getByRole('button', { name: /próximo pokémon/i });

const comparePokemon = ({ name, type, averageWeight, image }) => {
  const currPokemon = selectPokemon();

  expect(currPokemon.name).toBe(name);
  expect(currPokemon.type).toBe(type);
  expect(currPokemon.weight)
    .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
  expect(currPokemon.sprite).toBe(image);

  userEvent.click(nextPokemon());
};

describe('Check the pokedex homepage', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Check if there is a heading with the text \'Encountered pokémons\'', () => {
    expect(screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 }))
      .toBeInTheDocument();
  });

  it('Check if only one pokemon is displayed per time', () => {
    selectPokemon();
  });

  it('Check if the page has buttons with each type', () => {
    filters.forEach((type, index) => {
      expect(filterButtons()[index])
        .toBeInTheDocument();
      expect(filterButtons()[index].textContent)
        .toBe(type);
    });
  });

  it(
    'Check if the next pokemon is displayed when the user clicks the next button',
    () => {
      pokemons.forEach((pokemon) => comparePokemon(pokemon));
    },
  );

  it('Check if the filter by type are working', () => {
    filters.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      pokemons
        .filter((currPkm) => currPkm.type === type)
        .forEach((pokemon) => comparePokemon(pokemon));
    });
  });

  it('Check if the filter by All is working', () => {
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    pokemons.forEach((pokemon) => comparePokemon(pokemon));
  });
});
