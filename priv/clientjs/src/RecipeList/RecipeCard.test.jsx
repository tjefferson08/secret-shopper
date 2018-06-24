import React from 'react';
import { mount, shallow } from 'enzyme';
import RecipeCard from './RecipeCard';
import configureMockStore from 'redux-mock-store';

let store;

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
    }
  }
});

test('it should render all the recipe fields', () => {
  store = configureMockStore([])();
  const { props } = setupTest();
  const card = shallow(<RecipeCard store={store} {...props} />);
  expect(card).toMatchSnapshot();
});

test('it should not blow up when rendered into DOM', () => {
  store = configureMockStore([])();
  const { props } = setupTest();
  const card = mount(<RecipeCard store={store} {...props} />);
  expect(card).toMatchSnapshot();
});
