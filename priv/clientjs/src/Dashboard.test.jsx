import configureMockStore from 'redux-mock-store';
import React from 'react';
import { cleanup, waitForElement } from 'react-testing-library';
import Dashboard from './Dashboard';
import { renderWithRedux } from '../test/rendering';
import nock, { isDone } from '../test/nock';

afterEach(() => {
  expect(isDone()).toBe(true);
  cleanup();
});

test('it should render a list of recipes', async () => {
  nock().get('/api/recipes').reply(200, {
    recipes: [
      {
        id: 1,
        favorited: false,
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
      {
        id: 2,
        favorited: true,
        name: 'Mac and Cheese',
        cook_time: '15 minutes',
        prep_time: '1 minute',
        total_time: '16 minutes',
        ingredients: [
          { id: 101, name: '1 box kraft mac n cheese' },
          { id: 102, name: '1 tbsp sriracha' }
        ],
        instructions: [
          { id: 'ghi', text: 'boil water' },
          { id: 'kjl', text: 'stuff face' }
        ]
      }
    ]
  });

  const { getByText, queryAllByTestId } = renderWithRedux(<Dashboard />);

  await waitForElement(() => getByText('Beans and rice'));
  expect(getByText('Beans and rice')).toBeTruthy();
  expect(getByText('Mac and Cheese')).toBeTruthy();
  const favoriteBadges = queryAllByTestId('favorite-badge');
  expect(favoriteBadges).toHaveLength(2);

  // far = Font Awesome Regular (just an outline), so not favorited
  expect(favoriteBadges[0].classList).toContain('far');

  // far = Font Awesome Solid (filled in shape), so yes favorited
  expect(favoriteBadges[1].classList).toContain('fas');
});
