import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsModalOpen } from './ForemanModalSelectors';
import { setModalClosed } from './ForemanModalActions';
import ForemanModal from './ForemanModal';
import ForemanModalHeader from './subcomponents/ForemanModalHeader';
import ForemanModalFooter from './subcomponents/ForemanModalFooter';
import reducer from './ForemanModalReducer';

export const reducers = { foremanModals: reducer };

const ConnectedForemanModal = props => {
  const { id, title } = props;
  const isOpen = useSelector(state => selectIsModalOpen(state, id));
  const dispatch = useDispatch();
  const onClose = () => dispatch(setModalClosed({ id }));
  return (
    <ForemanModal
      {...props}
      id={id}
      title={title}
      isOpen={isOpen}
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
