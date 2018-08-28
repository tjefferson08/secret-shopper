import React from 'react';
import RecipeCardBs from './RecipeCard.bs';
import configureMockStore from 'redux-mock-store';
import { render, cleanup } from 'react-testing-library';

const RecipeCard = RecipeCardBs.jsComponent;

let store;

afterEach(cleanup);

const setupTest = () => ({
  props: {
    recipe: {
      name: 'Beans and rice',
      cook_time: '5 minutes',
      prep_time: '10 minutes',
      total_time: '20 minutes',
      ingredients: [
        { id: 1, name: '1 can black beans' },
        { id: 2, name: '1 cup basmati rice' }
      ],
      instructions: [
        { id: 'abc', text: 'microwave ingredients' },
        { id: 'def', text: 'eat food' }
      ]
    },
    showDetails: false
  },
  store: configureMockStore([])()
});

test('it should render the main recipe fields', () => {
  const { props, store } = setupTest();
  const { container } = render(<RecipeCard store={store} {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('it should render all recipe fields when showDetails is true', () => {
  const { props, store } = setupTest();
  props.showDetails = true;
  const { container } = render(<RecipeCard store={store} {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});
