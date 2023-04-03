import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../client/components/Login';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Unit testing for Login', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('Renders the Login component', () => {
    const inputs = document.querySelectorAll('input');

    expect(inputs).toHaveLength(2);
    expect(inputs[0].placeholder).toBe('email');
    expect(inputs[1].placeholder).toBe('password');
  });

  it('Does not render incorrect password/email message', () => {
    const incorrectMessage = document.getElementsByClassName('small-text');
    expect(incorrectMessage).toHaveLength(0);
  });

  it('Renders error message on wrong login', () => {
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, '');

    const loginButton = document.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    console.log('loginButton', loginButton);
    // userEvent.click(loginButton);
    fireEvent.click(loginButton!);

    //expect to see error message "Incorrect Password or Email"
    expect(screen.getByText('Incorrect Password or Email')).toBeDefined();
    // const errorMessage = document.getElementsByClassName('small-text');
    // console.log('errorMessage', errorMessage);
    // expect(errorMessage).toHaveLength(1);
  });
});
