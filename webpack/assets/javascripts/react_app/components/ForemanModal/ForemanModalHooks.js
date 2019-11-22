import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalStateById } from './ForemanModalSelectors';
import { addModal, setModalOpen, setModalClosed } from './ForemanModalActions';
import ModalContext from './ForemanModalContext';

// Because enzyme doesn't support useContext yet
export const useModalContext = () => useContext(ModalContext);

// Use in any ForemanModal.  Handles Redux actions for creating, opening, and closing the modal.
// Make sure the id passed in matches the id prop of your <ForemanModal />.
// Returns a variable that tells you the state and a function to toggle it.
export const useForemanModal = ({ id, open = false }) => {
  if (!id) throw new Error('useForemanModal: ID is required');
  const initialModalState = open;
  const modalOpenState = useSelector(state => selectModalStateById(state, id));
  const modalOpen = modalOpenState ? modalOpenState.open : false;
  const dispatch = useDispatch();
  useEffect(() => {
    if (modalOpenState) return; // don't add modal if it already exists
    dispatch(addModal({ id, open: initialModalState }));
  }, [initialModalState, dispatch, id]);
  const toggleModal = () => {
    if (modalOpen) {
      dispatch(setModalClosed({ id }));
    } else {
      dispatch(setModalOpen({ id }));
    }
  };

  return [modalOpen, toggleModal];
};

// to get enzyme hacky test to work
export default ModalContext;
