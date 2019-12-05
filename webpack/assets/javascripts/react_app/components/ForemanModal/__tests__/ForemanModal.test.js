import React from 'react';
import PropTypes from 'prop-types';
import ForemanModal from '../ForemanModal';
import ForemanModalHeader from '../subcomponents/ForemanModalHeader';
import ForemanModalFooter from '../subcomponents/ForemanModalFooter';
import { testComponentSnapshotsWithFixtures } from '../../../common/testHelpers';

// This file is for unit tests of the ForemanModal component

const headerChild = <ForemanModalHeader>this is the header</ForemanModalHeader>;
const footerChild = <ForemanModalFooter>this is the footer</ForemanModalFooter>;
const modalBody = <div>This is the body</div>;
const openState = { open: true };
const closedState = { open: false };
const onClose = jest.fn();

const fixtures = {
  'should render': {
    id: 'render',
    title: 'Test modal',
    openState,
    onClose,
  },
  'should render closed': {
    id: 'closed',
    title: 'Test modal',
    openState: closedState,
    onClose,
  },
  'renders when header and footer are supplied': {
    id: 'withSuppliedChildren',
    title: 'Test modal',
    children: [headerChild, modalBody, footerChild],
    openState,
    onClose,
  },
};

describe('ForemanModal', () => {
  describe('rendering', () => {
    testComponentSnapshotsWithFixtures(ForemanModal, fixtures);
  });
  describe('PropTypes', () => {
    it('requires an id prop', () => {
      const { propTypes } = ForemanModal;
      const propsWithoutId = {
        title: 'Test modal',
      };
      PropTypes.resetWarningCache();
      expect(() =>
        PropTypes.checkPropTypes(
          propTypes,
          propsWithoutId,
          'prop',
          'ForemanModal'
        )
      ).toThrow('id');
    });
  });
});
