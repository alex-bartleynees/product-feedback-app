/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { User } from '@product-feedback-app/api-interfaces';

export const loadCurrentUser = createAction(
  '[Users] Load Current User',
  props<{ userId: number }>()
);

export const loadCurrentUserSuccess = createAction(
  '[Users] Load Current User Success',
  props<{ user: User }>()
);

export const loadCurrentUserFailure = createAction(
  '[Users] Load Current User Failure',
  props<{ error: any }>()
);
