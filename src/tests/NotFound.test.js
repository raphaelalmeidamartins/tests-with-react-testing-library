import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Check the the Not Found page', () => {
  test(
    'There should be a heading with the text page requested not found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/digimon-is-better');

      expect(screen.getByText(/page requested not found/i))
        .toBeInTheDocument();
    },
  );
  test(
    'There should be a gif of Pikachu crying',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/digimon-is-better');

      expect(screen.getByRole('img', {
        name: /pikachu crying because the page requested was not found/i,
      }))
        .toBeInTheDocument();
      expect(screen.getByRole('img', {
        name: /pikachu crying because the page requested was not found/i,
      }).src)
        .toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});
