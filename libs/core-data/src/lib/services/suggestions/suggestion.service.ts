import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@app-config/config';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) {}

  model = 'suggestions';

  all(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.getUrl());
  }

  private getUrl() {
    return `${this.appConfig.apiEndpoint}${this.model}`;
  }
}
