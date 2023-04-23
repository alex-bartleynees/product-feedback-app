import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { User } from '@product-feedback-app/api-interfaces';
import { catchError, map, mergeMap } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadCurrentUser),
      mergeMap((action) => this.usersService.getCurrentUser(action.userId)),
      map((user: User) => UsersActions.loadCurrentUserSuccess({ user })),
      catchError(async (error) =>
        UsersActions.loadCurrentUserFailure({ error })
      )
    )
  );
}
