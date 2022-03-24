import { screen } from '@testing-library/react';
import React from 'react';
import { PokemonDetails } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Check the Pokemon details page', () => {
  const [pikachu] = pokemons;

  beforeEach(() => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [pikachu.id]: true } }
        match={ { params: { id: `${pikachu.id}` } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ pokemons }
      />,
    );
  });

  it('There should be a heading with the text \'<name> details\'', () => {
    expect(
      screen.getByRole('heading', {
        name: new RegExp(`${pikachu.name} details`, 'i'),
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it('The \'more details\' link should not be on the page', () => {
    expect(
      screen.queryByRole('link', { name: /more details/i }),
    ).not.toBeInTheDocument();
  });

  it('There should be a heading with the text \'Summary\'', () => {
    expect(
      screen.getByRole('heading', { name: /summary/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('There should be a paragraph with the summary of the pokémon', () => {
    expect(screen.getByText(pikachu.summary)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: new RegExp(`game locations of ${pikachu.name}`, 'i'),
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it('There should be names and maps of the pokémon locations in the games', () => {
    pikachu.foundAt.forEach((locationObj) => {
      expect(screen.getByText(locationObj.location)).toBeInTheDocument();
    });

    const locationImages = screen.queryAllByAltText(`${pikachu.name} location`);

    pikachu.foundAt.forEach((locationObj) => {
      expect(
        locationImages.some((image) => image.src === locationObj.map),
      ).toBe(true);
    });

    expect(locationImages).toHaveLength(pikachu.foundAt.length);
  });

  it(
    'There should be a checkbox that the user can use to mark the pokémon as favorite.',
    () => {
      expect(
        screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }),
      ).toBeInTheDocument();
    },
  );
});
