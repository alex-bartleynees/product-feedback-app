import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  currentUser$ = this.store.pipe(select(UsersSelectors.getCurrentUser));

  constructor(private readonly store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  loadCurrentUser(userId: number) {
    this.dispatch(UsersActions.loadCurrentUser({ userId }));
  }
}
