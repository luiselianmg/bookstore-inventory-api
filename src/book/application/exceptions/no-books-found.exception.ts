import { ApplicationException } from '../../../core/application/exceptions/application-exception';

export class NoBooksFoundException extends ApplicationException {
  constructor() {
    super(`No Books found`);
  }
}