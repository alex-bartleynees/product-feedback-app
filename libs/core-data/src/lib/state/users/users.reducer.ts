import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@product-feedback-app/api-interfaces';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
  selectedId?: number;
  loaded: boolean;
  error?: string | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loaded: false,
});

const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.loadCurrentUser, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UsersActions.loadCurrentUserSuccess, (state, { user }) =>
    usersAdapter.setOne(user, { ...state, loaded: true, selectedId: user.id })
  ),
  on(UsersActions.loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
