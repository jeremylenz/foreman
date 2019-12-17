import {
  ADD_MODAL,
  SET_MODAL_OPEN,
  SET_MODAL_CLOSED,
} from './ForemanModalConstants';

// In function components, no need to use these-- just use useDispatch and dispatch the actions directly.
// For class components, these are provided so you can plug them into bindActionCreators

export const addModal = ({ id, open = false }) => (dispatch, getState) => {
  const { foremanModals } = getState();
  if (foremanModals && foremanModals[id]) {
    throw new Error(`ForemanModal with ID ${id} already exists`);
  }
  return dispatch({
    type: ADD_MODAL,
    payload: { id, open },
  });
};

export const setModalOpen = ({ id }) => (dispatch, getState) => {
  const { foremanModals } = getState();
  if (foremanModals && !foremanModals[id]) {
    throw new Error(
      `SET_MODAL_OPEN error: Modal with id '${id}' does not exist`
    );
  }
  return dispatch({
    type: SET_MODAL_OPEN,
    payload: { id },
  });
};

export const setModalClosed = ({ id }) => (dispatch, getState) => {
  const { foremanModals } = getState();
  if (foremanModals && !foremanModals[id]) {
    throw new Error(
      `SET_MODAL_CLOSED error: Modal with id '${id}' does not exist`
    );
  }
  return dispatch({
    type: SET_MODAL_CLOSED,
    payload: { id },
  });
};

// Pass in the ForemanModal id here and get bound action creators with the id already plugged in.
export const bindForemanModalActionsToId = ({ id }) => ({
  addModal: () => addModal({ id }),
  setModalOpen: () => setModalOpen({ id }),
  setModalClosed: () => setModalClosed({ id }),
});
