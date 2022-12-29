import { Injectable } from '@nestjs/common';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { suggestions } from '../data';

@Injectable()
export class AppService {
  getData(): Suggestion[] {
    return suggestions;
  }

  create(suggestion: Suggestion): Suggestion {
    suggestions.push(suggestion);
    suggestion.id = Math.random() * 1000;
    return suggestion;
  }

  update(suggestion: Suggestion): Suggestion {
    return { ...suggestion };
  }

  delete(id: number): number {
    return suggestions.indexOf(suggestions.find((item) => item.id === id));
  }
}
