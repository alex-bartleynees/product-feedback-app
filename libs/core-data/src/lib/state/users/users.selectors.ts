import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersAdapter, UsersState, USERS_FEATURE_KEY } from './users.reducer';

export const getUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectEntities } = usersAdapter.getSelectors();

export const getUserEntities = createSelector(
  getUsersState,
  (state: UsersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getUsersState,
  (state: UsersState) => state.selectedId
);

export const getCurrentUser = createSelector(
  getUserEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
