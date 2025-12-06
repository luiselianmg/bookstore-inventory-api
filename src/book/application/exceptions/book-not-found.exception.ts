import { ApplicationException } from '../../../core/application/exceptions/application-exception';

export class BookNotFoundException extends ApplicationException {
  constructor() {
    super(`Book not found`);
  }
}