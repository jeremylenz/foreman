import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Modal } from 'patternfly-react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ForemanModal from './index';
import ForemanModalHeader from './subcomponents/ForemanModalHeader';
import ForemanModalFooter from './subcomponents/ForemanModalFooter';

// This file is for integration tests of the Redux-connected ForemanModal component (no unit tests)

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

describe('ForemanModal with Redux & hooks', () => {
  describe('rendering', () => {
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
  describe('subcomponents', () => {
    it('has a Header subcomponent', () => {
      expect(ForemanModal.Header).toEqual(ForemanModalHeader);
    });
    it('has a Footer subcomponent', () => {
      expect(ForemanModal.Footer).toEqual(ForemanModalFooter);
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
