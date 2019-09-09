import '@patternfly/react-core/dist/styles/base.css';
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  Button,
  Tabs,
  Tab,
  Form,
  FormGroup,
  Grid,
  GridItem,
  Label,
} from '@patternfly/react-core';
import { translate as __ } from '../../../react_app/common/I18n';
import ForemanModal from '.';
import Story from '../../../../../stories/components/Story';

const MockModalContent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (event, tabIndex) => setActiveTab(tabIndex);
  return (
    <Tabs
      id="manifest-history-tabs"
      activeKey={activeTab}
      onSelect={handleTabClick}
    >
      <Tab eventKey={1} title={__('Manifest')} style={{ paddingLeft: '15px' }}>
        <Form className="form-horizontal">
          <React.Fragment>
            <h5 style={{ marginTop: '1em' }}>
              {__('Red Hat Provider Details')}
            </h5>
            <hr />
            <Grid sm={12}>
              <FormGroup fieldId="cdnUrl">
                <GridItem sm={9}>
                  <Label>{__('Red Hat CDN URL')}</Label>
                </GridItem>
                <GridItem sm={3} id="cdnUrl" type="text">
                  https://cdn.redhat.com
                </GridItem>
              </FormGroup>
              <FormGroup fieldId="update-button">
                <GridItem smOffset={3} sm={3}>
                  <Button onClick={() => {}} disabled={false}>
                    Update
                  </Button>
                </GridItem>
              </FormGroup>
            </Grid>
            <br />
          </React.Fragment>
          <React.Fragment>
            <h5>{__('Subscription Manifest')}</h5>
            <hr />

            <FormGroup fieldId="manifest-actions">
              <GridItem sm={9} className="manifest-actions">
                {'My Manifest'}
                <div id="manifest-actions-row">
                  <React.Fragment>
                    <Button
                      disabled={false}
                      variant="danger"
                      onClick={() => {}}
                    >
                      Delete
                    </Button>
                  </React.Fragment>
                </div>
              </GridItem>
            </FormGroup>
          </React.Fragment>
        </Form>
      </Tab>
      <Tab eventKey={2} title="Manifest History" />
    </Tabs>
  );
};

const ModalStory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  return (
    <Story>
      <Button variant="primary" onClick={toggleModal}>
        Show Modal
      </Button>
      <ForemanModal
        isOpen={modalOpen}
        title="Manage Manifest"
        onClose={toggleModal}
      >
        <div style={{ height: '540px' }}>
          <MockModalContent />
        </div>
      </ForemanModal>
    </Story>
  );
};
storiesOf('Components/ForemanModal', module).add('With default text', () => (
  <ModalStory />
));
