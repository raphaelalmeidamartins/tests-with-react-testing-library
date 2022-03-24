import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const selectPokemon = () => ({
  name: screen.getByTestId('pokemon-name').textContent,
  type: screen.getByTestId('pokemon-type').textContent,
  weight: screen.getByTestId('pokemon-weight').textContent,
  sprite: screen.getByAltText(/sprite$/i).src,
});

const checkPokemon = ({ name, type, averageWeight, image }) => {
  const currPokemon = selectPokemon();

  expect(currPokemon.name).toBe(name);
  expect(currPokemon.type).toBe(type);
  expect(currPokemon.weight)
    .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
  expect(currPokemon.sprite).toBe(image);
  expect(screen.queryByRole('img', { name: /is marked as favorite/i }))
    .not.toBeInTheDocument();
};

const [pikachu, charmander, caterpie] = pokemons;

describe('Check the Pokemon component', () => {
  it('Check if the component has all the expected data (1st try)', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } showDetailsLink />,
    );

    checkPokemon(pikachu);
  });

  it('Check if the component has all the expected data (2nd try)', () => {
    renderWithRouter(
      <Pokemon pokemon={ charmander } isFavorite={ false } showDetailsLink />,
    );

    checkPokemon(charmander);
  });

  it('Check if the component has all the expected data (3rd try)', () => {
    renderWithRouter(
      <Pokemon pokemon={ caterpie } isFavorite={ false } showDetailsLink />,
    );

    checkPokemon(caterpie);
  });

  it('Chek if the \'More details\' link redirects to the Pokemon page (1st try)', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } showDetailsLink />,
    );

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe(`/pokemons/${pikachu.id}`);
  });

  it('Chek if the \'More details\' link redirects to the Pokemon page (2nd try)', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ charmander } isFavorite={ false } showDetailsLink />,
    );

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe(`/pokemons/${charmander.id}`);
  });

  it('Chek if the \'More details\' link redirects to the Pokemon page (3rd try)', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ caterpie } isFavorite={ false } showDetailsLink />,
    );

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe(`/pokemons/${caterpie.id}`);
  });

  it(
    'Check if the there is a star icon if the Pokemon is a favorite one (1st try)',
    () => {
      renderWithRouter(
        <Pokemon pokemon={ pikachu } isFavorite showDetailsLink />,
      );

      const starIcon = screen.getByRole('img', { name: /is marked as favorite/i });
      expect(starIcon).toBeInTheDocument();
      expect(starIcon.src).toContain('/star-icon.svg');
    },
  );
});
