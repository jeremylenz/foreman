import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import { Modal } from '@patternfly/react-core';
import PropTypes from 'prop-types';
// import { translate as __ } from '../../common/I18n';

const ForemanModal = props => {
  const { isOpen } = props;
  if (!isOpen) return null;
  return (
    <React.Fragment>
      <Modal {...props}>{props.children}</Modal>
    </React.Fragment>
  );
};

ForemanModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

ForemanModal.defaultProps = {
  isOpen: false,
  children: null,
};

export default ForemanModal;
