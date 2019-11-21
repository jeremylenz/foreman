import React from 'react';
import { Modal } from 'patternfly-react';
import PropTypes from 'prop-types';
import ModalContext from './ForemanModalContext';
import { extractModalNodes } from './helpers';

const ForemanModal = props => {
  const { id, title, onClose, openState, children, ...propsToPassDown } = props;
  // Extract header and footer from children, if provided
  const { headerChild, footerChild, otherChildren } = extractModalNodes(
    children
  );
  const isOpen = false || (openState && openState.open);
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

ForemanModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  openState: PropTypes.shape({
    open: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
};

ForemanModal.defaultProps = {
  children: null,
  openState: {
    open: false,
  },
};

export default ForemanModal;
