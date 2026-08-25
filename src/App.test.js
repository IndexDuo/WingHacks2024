import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the BiasGuessr home screen', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /play now/i })).toBeInTheDocument();
});
