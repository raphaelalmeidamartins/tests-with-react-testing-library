import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const homeNavLink = () => screen.getByRole('link', { name: /home/i });
const aboutNavLink = () => screen.getByRole('link', { name: /about/i });
const favNavLink = () => screen.getByRole('link', { name: /favorite pokémons/i });
const notFound = () => screen.getByText(/page requested not found/i);

describe('Check if the nav links are on the page', () => {
  test('There should be a nav link with the text \'Home\'', () => {
    renderWithRouter(<App />);
    expect(homeNavLink()).toBeInTheDocument();
  });

  test('There should be a nav link with the text \'About\'', () => {
    renderWithRouter(<App />);
    expect(aboutNavLink()).toBeInTheDocument();
  });

  test('There should be a nav link with the text \'Favorite Pokémons\'', () => {
    renderWithRouter(<App />);
    expect(favNavLink()).toBeInTheDocument();
  });
});

describe('Check if the nav link redirects the user to the specific pages', () => {
  test('The Home nav link should redirected to the Homepage', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(homeNavLink());
    expect(history.location.pathname).toBe('/');
  });

  test('The About nav link should redirected to the About page', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(aboutNavLink());
    expect(history.location.pathname).toBe('/about');
  });

  test(
    'The Favorite Pokémon nav link should redirected to the Favorite Pokémon page',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(favNavLink());
      expect(history.location.pathname).toBe('/favorites');
    },
  );
});

describe(
  'Check if the nav links remain on the page no matter what page the user is',
  () => {
    test('Clicks order: Home, About, Favorite Pokémons', () => {
      renderWithRouter(<App />);

      userEvent.click(homeNavLink());
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();

      userEvent.click(aboutNavLink());
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();

      userEvent.click(favNavLink());
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();
    });

    test('Clicks order: Favorite Pokémons, About, Home', () => {
      renderWithRouter(<App />);

      userEvent.click(favNavLink());
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();

      userEvent.click(aboutNavLink());
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();

      userEvent.click(homeNavLink());
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();
    });
  },
);

describe(
  'Check if the user is redirected to the Not Found page when the path is invalid',
  () => {
    const invalidPathOne = '/xablau';
    const invalidPathTwo = '/xablau/xablau';
    const invalidPathThree = '/digimon-is-better';

    test('Redirect to the Not Found page if the path is invalid (1st try)', () => {
      const { history } = renderWithRouter(<App />);
      history.push(invalidPathOne);
      expect(notFound()).toBeInTheDocument();
    });

    test('Redirect to the Not Found page if the path is invalid (2nd try)', () => {
      const { history } = renderWithRouter(<App />);
      history.push(invalidPathTwo);
      expect(notFound()).toBeInTheDocument();
    });

    test('Redirect to the Not Found page if the path is invalid (3rd try)', () => {
      const { history } = renderWithRouter(<App />);
      history.push(invalidPathThree);
      expect(notFound()).toBeInTheDocument();
    });

    test('The nav links should still be on the not found page', () => {
      const { history } = renderWithRouter(<App />);

      history.push(invalidPathOne);
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();

      history.push(invalidPathTwo);
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();

      history.push(invalidPathThree);
      expect(homeNavLink()).toBeInTheDocument();
      expect(aboutNavLink()).toBeInTheDocument();
      expect(favNavLink()).toBeInTheDocument();
    });
  },
);
