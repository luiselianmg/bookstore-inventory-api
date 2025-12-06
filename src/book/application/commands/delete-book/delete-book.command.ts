import { ApplicationService } from 'src/core/application/services/application-service';
import { DeleteBookCommand } from './types';
import { Result } from 'src/core/utils/result';
import { BookRepository } from '../../repositories/book-repository';
import { BookNotFoundException } from '../../exceptions/book-not-found.exception';

export class DeleteBookCommandHandler implements ApplicationService<
  DeleteBookCommand,
  void
> {
  constructor(
    private readonly _bookRepository: BookRepository,
  ) {}
  async execute(data: DeleteBookCommand): Promise<Result<void>> {
    try {
			const book = await this._bookRepository.findBookById(data.id);
      if (!book) {
        return Result.failure<void>(new BookNotFoundException());
      }
      await this._bookRepository.deleteBookById(data.id);
      return Result.success<void>(undefined);
    } catch (error) {
      return Result.failure<void>(error);
    }
  }
}
