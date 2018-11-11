import React from 'react';
import { cleanup, waitForElement } from 'react-testing-library';
import { renderWithRedux } from '../../../test/dom_testing';
import nock, { isDone } from '../../../test/nock';
import Router from '../../Router';
import RecipeShowBs from '../../components/RecipeShow/RecipeShow.bs';

const RecipeShow = RecipeShowBs.jsComponent;

afterEach(cleanup);

test('it should render a single recipe', async () => {
  const getRequest = nock().get('/api/recipes/1').reply(200, {
    recipe: {
      id: 1,
      favorited: true,
      name: 'Mac and Cheese',
      cook_time: '15 minutes',
      prep_time: '1 minute',
      total_time: '16 minutes',
      image_url: '',
      ingredients: [
        { id: 101, name: '1 box kraft mac n cheese' },
        { id: 102, name: '1 tbsp sriracha' }
      ],
      instructions: [
        { id: 'ghi', text: 'boil water' },
        { id: 'kjl', text: 'stuff face' }
      ]
    }
  });
  const { getByText } = renderWithRedux(<RecipeShow recipeId={1} />);

  expect(getByText('Loading...')).toBeTruthy();
  await waitForElement(() => getByText('Mac and Cheese'));
  expect(getByText('Mac and Cheese')).toBeTruthy();
  expect(getRequest.isDone()).toBe(true);
});
