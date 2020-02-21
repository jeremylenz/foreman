import React from 'react';
import { IntegrationTestHelper } from '@theforeman/test';

import { API } from '../../../../../redux/API';

import BookmarkForm from '../index';
import { reducers as bookmarksReducer } from '../../../index';
import { reducers as autocompleteReducer } from '../../../../AutoComplete/index';
import foremanModalsReducer from '../../../../ForemanModal/ForemanModalReducer';
import {
  response,
  name,
  search,
  publik,
  item,
  submitResponse,
  controller,
} from '../../../Bookmarks.fixtures';
import { BOOKMARKS_SUCCESS } from '../../../BookmarksConstants';

const reducers = {
  foremanModals: foremanModalsReducer,
  ...bookmarksReducer,
  ...autocompleteReducer,
};

jest.mock('../../../../../redux/API');

const props = {
  url: '/api/v2/hosts',
  controller: 'hosts',
  setModalClosed: jest.fn(),
};

describe('Bookmark form integration test', () => {
  it('should allow submission when fields filled in', async () => {
    const testHelper = new IntegrationTestHelper(reducers);
    testHelper.store.dispatch({
      type: BOOKMARKS_SUCCESS,
      payload: {
        controller,
        item,
      },
      response: response.data,
    });

    const component = testHelper.mount(<BookmarkForm {...props} />);

    expect(
      component.find('Button[bsStyle="primary"]').props().disabled
    ).toBeTruthy();
    expect(
      component.find('Button[bsStyle="default"]').props().disabled
    ).not.toBeTruthy();
    component
      .find('input[name="name"]')
      .simulate('change', { target: { name: 'name', value: name } });
    component
      .find('textarea[name="query"]')
      .simulate('change', { target: { name: 'query', value: search } });
    component
      .find('input[name="public"]')
      .simulate('change', { target: { name: 'public', value: publik } });

    const submitBtn = component.find('Button[bsStyle="primary"]');

    expect(submitBtn.disabled).not.toBeTruthy();
    expect(
      component.find('Button[bsStyle="default"]').props().disabled
    ).not.toBeTruthy();

    const mock = jest.fn();

    API.post.mockImplementation(async (...args) => {
      mock(...args);
      return submitResponse;
    });

    submitBtn.simulate('submit');
    await IntegrationTestHelper.flushAllPromises();
    component.update();

    expect(mock).toHaveBeenCalledWith(props.url, submitResponse.data);
  });
});
