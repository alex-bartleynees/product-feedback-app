import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@app-config/config';
import { AppConfig, Suggestion } from '@product-feedback-app/api-interfaces';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  model = 'suggestions';

  all(): Observable<Suggestion[]> {
    return this.http
      .get<Suggestion[]>(this.getUrl())
      .pipe(catchError((error) => throwError(() => error)));
  }

  update(suggestion: Suggestion): Observable<Suggestion> {
    if (!suggestion.id) {
      throw new Error('Suggestion must have an id');
    }
    return this.http
      .put<Suggestion>(this.getUrlForId(suggestion.id), suggestion)
      .pipe(catchError((error) => throwError(() => error)));
  }

  create(suggestion: Suggestion): Observable<Suggestion> {
    return this.http
      .post<Suggestion>(this.getUrl(), suggestion)
      .pipe(catchError((error) => throwError(() => error)));
  }

  private getUrl() {
    return `${this.appConfig.apiEndpoint}${this.model}`;
  }

  private getUrlForId(id: number) {
    return `${this.getUrl()}/${id}`;
  }
}
