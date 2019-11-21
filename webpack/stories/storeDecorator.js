import React from 'react';
import { Provider } from 'react-redux';
import store from '../assets/javascripts/react_app/redux';

const storeDecorator = getStory => {
  const prov = (<Provider store={store}>{getStory()}</Provider>);
  console.log(prov)
  return prov
  // return <Provider store={store}>{getStory()}</Provider>
};

export default storeDecorator;
