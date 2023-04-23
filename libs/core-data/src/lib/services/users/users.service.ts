import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@app-config/config';
import { AppConfig, User } from '@product-feedback-app/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  usersModel = 'users';

  getCurrentUser(id: number): Observable<User> {
    return this.http.get<User>(this.getUrlForId(id));
  }

  private getUrl(model: string) {
    return `${this.appConfig.apiEndpoint}${model}`;
  }

  private getUrlForId(id: number) {
    return `${this.getUrl(this.usersModel)}/${id}`;
  }
}
