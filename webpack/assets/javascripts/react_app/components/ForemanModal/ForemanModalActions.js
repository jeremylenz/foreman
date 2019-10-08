import {
  ADD_MODAL,
  SET_MODAL_OPEN,
  SET_MODAL_CLOSED,
} from './ForemanModalConstants';

// In function components, no need to use these-- just use useDispatch and dispatch the actions directly.
// For class components, these are provided so you can plug them into bindActionCreators
export const addModal = ({ id }) => ({
  type: ADD_MODAL,
  payload: { id },
});

export const setModalOpen = ({ id }) => ({
  type: SET_MODAL_OPEN,
  payload: { id },
});

export const setModalClosed = ({ id }) => ({
  type: SET_MODAL_CLOSED,
  payload: { id },
});

// Pass in the ForemanModal id here and get action creators with the id already plugged in.
export const bindForemanModalActionsToId = ({ id }) => ({
  addModal: () => addModal({ id }),
  setModalOpen: () => setModalOpen({ id }),
  setModalClosed: () => setModalClosed({ id }),
});
