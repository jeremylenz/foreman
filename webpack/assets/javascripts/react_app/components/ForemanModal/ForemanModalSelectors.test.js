import { testSelectorsSnapshotWithFixtures } from '../../common/testHelpers';
import {
  selectForemanModalsState,
  selectModalStateById,
} from './ForemanModalSelectors';

const state = {
  foremanModals: {
    myModal: { open: true },
    yourModal: { open: false },
  },
};

const fixtures = {
  'selects entire modals state': () => selectForemanModalsState(state),
  'selects specific modal by id': () => selectModalStateById(state, 'myModal'),
};

describe('ForemanModal selectors', () => {
  testSelectorsSnapshotWithFixtures(fixtures);
});
