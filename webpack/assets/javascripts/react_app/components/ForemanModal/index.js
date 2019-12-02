import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalStateById } from './ForemanModalSelectors';
import { SET_MODAL_CLOSED } from './ForemanModalConstants';
import ForemanModal from './ForemanModal';
import ForemanModalHeader from './subcomponents/ForemanModalHeader';
import ForemanModalFooter from './subcomponents/ForemanModalFooter';
import reducer from './ForemanModalReducer';

export const reducers = { foremanModals: reducer };

const ConnectedForemanModal = props => {
  const { id, title } = props;
  const openState = useSelector(state => selectModalStateById(state, id));
  const dispatch = useDispatch();
  const onClose = () => dispatch({ type: SET_MODAL_CLOSED, payload: { id } });
  return (
    <ForemanModal
      {...props}
      id={id}
      title={title}
      openState={openState}
      onClose={onClose}
    />
  );
};

ConnectedForemanModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ConnectedForemanModal.defaultProps = {
  title: '',
};

// Header and Footer use the provided children, or default markup if none provided

ConnectedForemanModal.Header = ForemanModalHeader;
ConnectedForemanModal.Footer = ForemanModalFooter;

export default ConnectedForemanModal;
