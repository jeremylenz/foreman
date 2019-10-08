import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'patternfly-react';
import PropTypes from 'prop-types';
import { SET_MODAL_CLOSED } from './ForemanModalConstants';
import { selectModalStateById } from './ForemanModalSelectors';
import ForemanModalHeader from './subcomponents/ForemanModalHeader';
import ForemanModalFooter from './subcomponents/ForemanModalFooter';
import ModalContext from './ForemanModalContext';
import { extractModalNodes } from './helpers';

const ForemanModal = props => {
  const { id, title, ...propsToPassDown } = props; // don't pass down those two as it causes PF problems
  // Extract header and footer from children, if provided
  const { headerChild, footerChild, otherChildren } = extractModalNodes(
    props.children
  );
  const openState = useSelector(state => selectModalStateById(state, id));
  const isOpen = false || (openState && openState.open);
  const dispatch = useDispatch();
  const onClose = () => dispatch({ type: SET_MODAL_CLOSED, payload: { id } });
  const context = {
    isOpen,
    onClose,
    title,
  };

  return (
    <ModalContext.Provider value={context}>
      {/* Change the name of the props we are passing down to Modal to conform to Patternfly 3 api */}
      <Modal
        onHide={onClose}
        show={isOpen}
        className="foreman-modal"
        {...propsToPassDown}
      >
        {headerChild}
        <Modal.Body>{otherChildren}</Modal.Body>
        {footerChild}
      </Modal>
    </ModalContext.Provider>
  );
};

// Header and Footer use the provided children, or default markup if none provided

ForemanModal.Header = ForemanModalHeader;
ForemanModal.Footer = ForemanModalFooter;

ForemanModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

ForemanModal.defaultProps = {
  children: null,
};

export default ForemanModal;
