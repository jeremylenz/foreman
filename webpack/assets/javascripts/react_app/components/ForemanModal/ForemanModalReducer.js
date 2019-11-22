import Immutable from 'seamless-immutable';
import {
  SET_MODAL_OPEN,
  SET_MODAL_CLOSED,
  ADD_MODAL,
} from './ForemanModalConstants';

const initialState = Immutable({});

// Modals state has id as key and open state as value:
// { myModal: {open: true} }
// Since keys cannot be duplicated, we avoid creating duplicate modals in this way.

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_OPEN: {
      const newState = {};
      newState[action.payload.id] = {
        open: true,
      };
      return state.merge(newState);
    }
    case SET_MODAL_CLOSED: {
      const newState = {};
      newState[action.payload.id] = {
        open: false,
      };
      return state.merge(newState);
    }
    case ADD_MODAL: {
      if (state[action.payload.id]) return state; // if it already exists, don't change its state
      const newState = {};
      newState[action.payload.id] = {
        open: action.payload.open || false,
      };
      return state.merge(newState);
    }
    default:
      return state;
  }
};
