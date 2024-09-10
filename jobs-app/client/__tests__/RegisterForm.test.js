import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';

test('renders registration form and shows validation errors', async () => {
  render(<RegisterForm />);

  fireEvent.click(screen.getByText('Register'));

  expect(await screen.findByText('Name is required')).toBeInTheDocument();
  expect(await screen.findByText('Email is required')).toBeInTheDocument();
});
