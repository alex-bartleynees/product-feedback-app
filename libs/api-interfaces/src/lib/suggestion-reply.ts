import { User } from './user';

export interface SuggestionReply {
  id?: number;
  content: string;
  replyingTo?: string;
  user: User;
}
