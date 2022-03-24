import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const homeNavLink = () => screen.getByRole('link', { name: /home/i });
const favNavLink = () => screen.getByRole('link', { name: /favorite pokémons/i });

const heading = () => screen.getByRole('heading', { name: /favorite pokémons/i });
const noPokemonFound = () => screen.getByText(/no favorite pokemon found/i);

const pokemonNames = () => screen.queryAllByTestId(/pokemon-name/i);
const pokemonTypes = () => screen.queryAllByTestId(/pokemon-type/i);
const pokemonWeights = () => screen.queryAllByTestId(/pokemon-weight/i);
const pokemonSprites = () => screen.queryAllByAltText(/sprite/i);
const moreDetails = () => screen.queryAllByText(/more details/i);

const favCheckbox = () => screen.getByText(/pokémon favoritado\?/i);

const selectPokemon = () => ({
  name: screen.getByTestId('pokemon-name').textContent,
  type: screen.getByTestId('pokemon-type').textContent,
  weight: screen.getByTestId('pokemon-weight').textContent,
  sprite: screen.getByAltText(/sprite$/i).src,
});

describe('Check the Favorite Pokémons page', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('The favorites page should be empty when the user first enter', () => {
    userEvent.click(favNavLink());
    expect(heading()).toBeInTheDocument();
    expect(noPokemonFound()).toBeInTheDocument();
    expect(pokemonNames()).toHaveLength(0);
    expect(pokemonTypes()).toHaveLength(0);
    expect(pokemonWeights()).toHaveLength(0);
    expect(moreDetails()).toHaveLength(0);
  });

  test('The pokemons marked as favorite should be in the favorites page', () => {
    userEvent.click(homeNavLink());
    userEvent.click(moreDetails()[0]);

    const selectedPokemon = selectPokemon();

    userEvent.click(favCheckbox());
    userEvent.click(favNavLink());

    expect(
      pokemonNames()
        .some((name) => name.textContent === selectedPokemon.name),
    ).toBe(true);
    expect(
      pokemonTypes()
        .some((type) => type.textContent === selectedPokemon.type),
    ).toBe(true);
    expect(
      pokemonWeights()
        .some((weight) => weight.textContent === selectedPokemon.weight),
    ).toBe(true);
    expect(
      pokemonSprites()
        .some((sprite) => sprite.src === selectedPokemon.sprite),
    ).toBe(true);

    userEvent.click(homeNavLink());
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(moreDetails()[0]);

    const selectedPokemon2 = selectPokemon();

    userEvent.click(favCheckbox());
    userEvent.click(favNavLink());

    expect(
      pokemonNames()
        .some((name) => name.textContent === selectedPokemon2.name),
    ).toBe(true);
    expect(
      pokemonTypes()
        .some((type) => type.textContent === selectedPokemon2.type),
    ).toBe(true);
    expect(
      pokemonWeights()
        .some((weight) => weight.textContent === selectedPokemon2.weight),
    ).toBe(true);
    expect(
      pokemonSprites()
        .some((sprite) => sprite.src === selectedPokemon2.sprite),
    ).toBe(true);
  });

  it('The pokemon marked as not favorite should not be in the favorites page', () => {
    userEvent.click(homeNavLink());
    userEvent.click(moreDetails()[0]);

    const selectedPokemon = selectPokemon();

    userEvent.click(favCheckbox());
    userEvent.click(favNavLink());

    expect(
      pokemonNames()
        .some((name) => name.textContent === selectedPokemon.name),
    ).toBe(false);
    expect(
      pokemonTypes()
        .some((type) => type.textContent === selectedPokemon.type),
    ).toBe(false);
    expect(
      pokemonWeights()
        .some((weight) => weight.textContent === selectedPokemon.weight),
    ).toBe(false);
    expect(
      pokemonSprites()
        .some((sprite) => sprite.src === selectedPokemon.sprite),
    ).toBe(false);

    userEvent.click(homeNavLink());
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(moreDetails()[0]);

    const selectedPokemon2 = selectPokemon();

    userEvent.click(favCheckbox());
    userEvent.click(favNavLink());

    expect(
      pokemonNames()
        .some((name) => name.textContent === selectedPokemon2.name),
    ).toBe(false);
    expect(
      pokemonTypes()
        .some((type) => type.textContent === selectedPokemon2.type),
    ).toBe(false);
    expect(
      pokemonWeights()
        .some((weight) => weight.textContent === selectedPokemon2.weight),
    ).toBe(false);
    expect(
      pokemonSprites()
        .some((sprite) => sprite.src === selectedPokemon2.sprite),
    ).toBe(false);
  });
});
