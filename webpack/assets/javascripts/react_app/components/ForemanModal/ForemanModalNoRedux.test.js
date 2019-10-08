import React from 'react';
import PropTypes from 'prop-types';
import ForemanModal from '.';
import { testComponentSnapshotsWithFixtures } from '../../common/testHelpers';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn =>
    fn({
      // call the selector with this fake state
      foremanModals: {
        render: { open: true },
        closed: { open: false },
        withSuppliedChildren: { open: true },
        unordered: { open: true },
      },
    })
  ),
  useDispatch: jest.fn(action => action),
}));

const headerChild = (
  <ForemanModal.Header>this is the header</ForemanModal.Header>
);
const footerChild = (
  <ForemanModal.Footer>this is the footer</ForemanModal.Footer>
);
const modalBody = <div>This is the body</div>;

const fixtures = {
  'should render': {
    id: 'render',
    title: 'Test modal',
  },
  'should render closed': {
    id: 'closed',
    title: 'Test modal',
  },
  'renders when header and footer are supplied': {
    id: 'withSuppliedChildren',
    title: 'Test modal',
    children: [headerChild, modalBody, footerChild],
  },
  'renders header and footer in correct order regardless of ordering of children': {
    id: 'unordered',
    title: 'Test modal',
    children: [modalBody, footerChild, headerChild],
  },
  'sets show prop to true based on redux state': {
    id: 'render',
    title: 'open modal',
  },
  'sets show prop to false based on redux state': {
    id: 'closed',
    title: 'open modal',
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
