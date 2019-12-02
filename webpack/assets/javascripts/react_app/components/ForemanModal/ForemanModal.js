import React from 'react';
import { Modal } from 'patternfly-react';
import PropTypes from 'prop-types';
import ModalContext from './ForemanModalContext';
import ForemanModalHeader from './subcomponents/ForemanModalHeader';
import { extractModalNodes } from './helpers';

const ForemanModal = props => {
  const { id, title, onClose, openState, children, ...propsToPassDown } = props;
  // Extract header and footer from children, if provided
  const { headerChild, footerChild, otherChildren } = extractModalNodes(
    children
  );
  const context = {
    isOpen: openState.open,
    onClose,
    title,
  };

  let headerToRender = null; // if no headerChild and no title prop, then no <ForemanModalHeader>
  if (!headerChild && title) headerToRender = <ForemanModalHeader />; // render default header with title
  if (headerChild) headerToRender = headerChild; // render the custom header supplied as a child

  return (
    <ModalContext.Provider value={context}>
      <Modal
        onHide={onClose}
        show={openState.open}
        className="foreman-modal"
        {...propsToPassDown}
      >
        {headerToRender}
        <Modal.Body>{otherChildren}</Modal.Body>
        {footerChild}
      </Modal>
    </ModalContext.Provider>
  );
};

ForemanModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
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
  title: '',
};

export default ForemanModal;
