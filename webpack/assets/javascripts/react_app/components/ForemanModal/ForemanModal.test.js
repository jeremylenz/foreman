import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Modal } from 'patternfly-react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ForemanModal from '.';
import { testComponentSnapshotsWithFixtures } from '../../common/testHelpers';

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const state = {
  foremanModals: {
    render: { open: true },
    closed: { open: false },
    withSuppliedChildren: { open: true },
    unordered: { open: true },
    defaultHeaderChild: { open: true },
    customHeaderChild: { open: true },
    noHeader: { open: true },
  },
};

const ConnectedForemanModal = props => (
  <Provider store={mockStore(state)}>
    <ForemanModal {...props} />
  </Provider>
);

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
};

describe('ForemanModal', () => {
  describe('rendering', () => {
    testComponentSnapshotsWithFixtures(ConnectedForemanModal, fixtures);
    it('sets show prop to true based on redux state', () => {
      const wrapper = mount(
        <ConnectedForemanModal id="render" title="open modal" />
      );
      expect(wrapper.find(Modal).prop('show')).toEqual(true);
    });
    it('sets show prop to false based on redux state', () => {
      const wrapper = mount(
        <ConnectedForemanModal id="closed" title="open modal" />
      );
      expect(wrapper.find(Modal).prop('show')).toEqual(false);
    });
    it('renders default header child when title prop is present', () => {
      const wrapper = mount(
        <ConnectedForemanModal
          id="defaultHeaderChild"
          title="hi im a default header"
        >
          {modalBody}
          {footerChild}
        </ConnectedForemanModal>
      );
      expect(wrapper.find(ForemanModal.Header)).toHaveLength(1);
      expect(wrapper.text()).toMatch(/hi im a default header/);
    });
    it('renders the supplied header child when title prop is not present', () => {
      const customHeader = (
        <ForemanModal.Header>hey this is custom</ForemanModal.Header>
      );
      const wrapper = mount(
        <ConnectedForemanModal id="customHeaderChild">
          {customHeader}
          {modalBody}
          {footerChild}
        </ConnectedForemanModal>
      );
      expect(wrapper.find(ForemanModal.Header)).toHaveLength(1);
      expect(wrapper.text()).toMatch(/hey this is custom/);
    });

    it('renders without header when neither <ForemanModal.Header> nor title prop are present', () => {
      const wrapper = mount(
        <ConnectedForemanModal id="noHeader">
          {modalBody}
          {footerChild}
        </ConnectedForemanModal>
      );
      expect(wrapper.find(ForemanModal.Header)).toHaveLength(0);
    });
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
