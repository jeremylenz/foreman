export const selectForemanModalsState = state => state.foremanModals;
export const selectModalStateById = (state, id) =>
  state.foremanModals && state.foremanModals[id];
