import { ApplicationService } from 'src/core/application/services/application-service';
import { CreateBookCommand, CreateBookResponse } from './types';
import { Result } from 'src/core/utils/result';
import { BookRepository } from '../../repositories/book-repository';
import { Book } from 'src/book/domain/book';
import { IdGenerator } from 'src/core/application/id/id-generator.interface';

export class CreateBookCommandHandler implements ApplicationService<
  CreateBookCommand,
  CreateBookResponse
> {
  constructor(
    private readonly _bookRepository: BookRepository,
    private readonly _idGenerator: IdGenerator<number>,
  ) {}
  async execute(data: CreateBookCommand): Promise<Result<CreateBookResponse>> {
    try {
			const bookId = await this._idGenerator.generateId('book');
      const book = new Book(
        bookId,
        data.title,
        data.author,
        data.isbn,
        data.costUsd,
        data.stockQuantity,
        data.category,
        data.supplierCountry,
        data.sellingPriceLocal,
      );
      await this._bookRepository.saveBook(book);
      return Result.success<CreateBookResponse>(new CreateBookResponse(book));
    } catch (error) {
      return Result.failure<CreateBookResponse>(error);
    }
  }
}
