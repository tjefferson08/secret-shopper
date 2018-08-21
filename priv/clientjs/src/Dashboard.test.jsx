import React from 'react';
import { cleanup, wait, waitForElement } from 'react-testing-library';
import Dashboard from './Dashboard';
import { fireClick, renderWithRedux } from '../test/dom_testing';
import nock from '../test/nock';

afterEach(cleanup);

test('it should render a list of recipes', async () => {
  const indexRequest = nock().get('/api/recipes').reply(200, {
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
  expect(indexRequest.isDone()).toBe(true);
});

test('clicking the favorite badge should toggle favorite', async () => {
  const indexRequest = nock().get('/api/recipes').reply(200, {
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
      }
    ]
  });

  const favoriteRequest = nock()
    .post('/api/favorites', { recipe_id: 1 })
    .reply(200, { message: 'OK' });

  const unfavoriteRequest = nock()
    .delete('/api/favorites/1')
    .reply(200, { message: 'OK' });

  const { debug, getByTestId, queryAllByTestId } = renderWithRedux(
    <Dashboard />
  );
  await waitForElement(() => getByTestId('favorite-badge'));

  const favoriteBadge = getByTestId('favorite-badge');
  expect(favoriteBadge.classList).toContain('far');

  // Setting as favorite
  await fireClick(favoriteBadge);
  expect(favoriteBadge.classList).not.toContain('far');
  expect(favoriteBadge.classList).toContain('fas');

  // un-favoriting
  await fireClick(favoriteBadge);
  expect(favoriteBadge.classList).toContain('far');
  expect(favoriteBadge.classList).not.toContain('fas');

  await wait(() => expect(indexRequest.isDone()).toBe(true));
  await wait(() => expect(favoriteRequest.isDone()).toBe(true));
  await wait(() => expect(unfavoriteRequest.isDone()).toBe(true));
});
