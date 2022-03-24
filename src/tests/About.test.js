import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

const data = [
  /this application simulates a pokédex, a digital encyclopedia containing all pokémons/i,
  /one can filter pokémons by type, and see more details for each one of them/i,
  'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
];

describe('Check the About page', () => {
  const heading = () => screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

  test('There should be a heading with the text \'About Pokédex\'', () => {
    renderWithRouter(<About />);

    expect(heading()).toBeInTheDocument();
  });

  test('The should be two paragraphs with texts about the pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(data[0])).toBeInTheDocument();
    expect(screen.getByText(data[1])).toBeInTheDocument();
  });

  test('There should be a picture of the poxedex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(data[2]);
  });
});
