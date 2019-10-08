import { testActionSnapshotWithFixtures } from '../../common/testHelpers';
import { addModal, setModalOpen, setModalClosed } from './ForemanModalActions';

const fixtures = {
  'creates the modal': () => addModal({ id: 'testModal' }),
  'should open modal': () => setModalOpen({ id: 'testModal' }),
  'should close modal': () => setModalClosed({ id: 'testModal' }),
};

describe('ForemanModal actions', () =>
  testActionSnapshotWithFixtures(fixtures));
