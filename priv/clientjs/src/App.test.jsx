import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { MemoryRouter } from 'react-router';
import AppBs from './App.bs';

const App = AppBs.jsComponent;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('unauthenticated visit to /dashboard redirects to sign in', () => {
  const div = document.createElement('div');

  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>,
    div
  );
  expect(div.innerHTML).toEqual(expect.stringContaining('Sign In'));
  expect(div.innerHTML).toEqual(expect.stringContaining('name="email"'));
  expect(div.innerHTML).toEqual(expect.stringContaining('name="password"'));
});
