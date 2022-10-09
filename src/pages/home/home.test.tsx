import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './index';

it('Should have greetings and info text', () => {
  render(<Home />);

  const greetingsElement = screen.getByText(/Welcome to the Weather Forecast Web Application/i);
  const infoElement = screen.getByText(/Please use search bar in the top right corner/i);

  expect(greetingsElement).toBeInTheDocument();
  expect(infoElement).toBeInTheDocument();
});
