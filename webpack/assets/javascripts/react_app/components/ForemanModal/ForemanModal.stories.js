import '@patternfly/react-core/dist/styles/base.css';
import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { storiesOf } from '@storybook/react';
import ForemanModal from '.';
import Story from '../../../../../stories/components/Story';

const ModalStory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  return (
    <Story>
      <Button variant="primary" onClick={toggleModal}>
        Show Modal
      </Button>
      <ForemanModal isOpen={modalOpen} title="myModal" onClose={toggleModal}>
        <div>I&apos;m a modal!!</div>
      </ForemanModal>
    </Story>
  );
};
storiesOf('Components/ForemanModal', module).add('With default text', () => (
  <ModalStory />
));
