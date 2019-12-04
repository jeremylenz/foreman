import React from 'react';
import { Button } from 'patternfly-react';
import { storiesOf } from '@storybook/react';
import storeDecorator from '../../../../../stories/storeDecorator';
import ForemanModal from '.';
import { useForemanModal } from './ForemanModalHooks';
import Story from '../../../../../stories/components/Story';

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With default header & footer', () =>
    // using createElement here so that hooks work in stories
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'default' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="default" title="I'm a modal!">
            <ForemanModal.Header />
            If you supply a title prop, it will be used as the modal title.
            <ForemanModal.Footer />
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('Modal IDs and Redux', () =>
    // using createElement here so that hooks work in stories
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'reduxModal' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="reduxModal" title="ForemanModal uses Redux">
            <ForemanModal.Header />
            <h3>ForemanModals require an ID prop</h3>
            <p>It should be a descriptive unique string.</p>
            <br />
            <code>
              {`<ForemanModal id="reduxModal" title="ForemanModal uses Redux">`}
            </code>
            <br />
            <h3>Modal state is controlled with Redux actions</h3>
            <p>
              First, dispatch an ADD_MODAL action (make sure the ID passed to
              the action matches your ID prop)<br />
              <code>
                {`{
                  type: 'ADD_MODAL',
                  id: 'reduxModal'
                }`}
              </code>
            </p>
            <p>
              Next, control the modal state with SET_MODAL_OPEN and
              SET_MODAL_CLOSED. Again, make sure the ID passed to the action
              matches your ID prop.<br />
              <code>
                {`{
                  type: 'SET_MODAL_OPEN',
                  id: 'reduxModal'
                }`}
              </code>
              <br />
              <code>
                {`{
                  type: 'SET_MODAL_CLOSED',
                  id: 'reduxModal'
                }`}
              </code>
            </p>
            <p>
              In this way, ForemanModals can be controlled from anywhere<br />
              in the application, with a single source of truth for modal state.
            </p>
            <ForemanModal.Footer />
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With no children', () =>
    // using createElement here so that hooks work in stories
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'noChildren' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="noChildren" title="I'm a modal!" />
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With custom header & footer', () =>
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'custom' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="custom">
            <ForemanModal.Header>
              <h3>This is a custom header! :)</h3>
            </ForemanModal.Header>
            You can provide your own {`<ForemanModal.Header>`}
            <ForemanModal.Footer>
              Click the X in the upper right to close
            </ForemanModal.Footer>
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With unordered header & footer', () =>
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'custom' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="custom" title="I'm a custom modal!">
            <div>
              Header and footer will be correctly ordered when rendering, even
              if they are out of order in the markup
            </div>
            <ForemanModal.Footer>This is the footer</ForemanModal.Footer>
            <ForemanModal.Header>
              <h3>This is the header</h3>
            </ForemanModal.Header>
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With no close button', () =>
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'noClose' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="noClose" title="I'm an X-less modal!">
            <ForemanModal.Header closeButton={false} />
            <br />
            Props passed to ForemanModal.Header will be passed down to
            Modal.Header
            <ForemanModal.Footer />
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With no footer', () =>
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'noFooter' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="noFooter" title="I'm a modal!">
            <ForemanModal.Header />
            This is the modal body. There is no footer.
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With no header', () =>
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'noHeader' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="noHeader">
            If neither a {`<ForemanModal.Header>`} nor a title prop are
            supplied, <br />
            the modal will have no header.
            <ForemanModal.Footer />
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With props passed down via spread syntax', () =>
    React.createElement(() => {
      const { setModalOpen } = useForemanModal({ id: 'propsPassed' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Show Modal
          </Button>
          <ForemanModal id="propsPassed" title="I'm a modal!" myProp="Hii">
            <ForemanModal.Header />
            The inner {`<Modal>`} component will have any props you pass to
            {`<ForemanModal>`}. (Look in the React dev tools for
            &lsquo;myProp&rsquo;)
            <ForemanModal.Footer />
          </ForemanModal>
        </Story>
      );
    })
  );

storiesOf('Components/ForemanModal', module)
  .addDecorator(storeDecorator) // add Redux store to story
  .add('With useForemanModal Hook', () =>
    // using createElement here so that hooks work in stories
    React.createElement(() => {
      const { modalOpen, setModalOpen } = useForemanModal({ id: 'hooks' });
      return (
        <Story>
          <Button bsStyle="primary" onClick={setModalOpen}>
            Modal is{' '}
            {modalOpen ? 'OPEN. Click to close' : 'CLOSED. Click to open'}
          </Button>
          <ForemanModal id="hooks" title="I'm a modal!">
            <ForemanModal.Header />
            The useForemanModal hook returns 3 objects: <br />
            <ul>
              <li>modalOpen: boolean</li>
              <li>setModalOpen: function to open that specific modal</li>
              <li>setModalClosed: function to close that specific modal</li>
            </ul>
            <br />
            These functions take care of the Redux state and actions for you,
            <br />
            so you don&apos;t have to connect your parent component directly.
            <ForemanModal.Footer />
          </ForemanModal>
        </Story>
      );
    })
  );
