import { ApplicationService } from 'src/core/application/services/application-service';
import { UpdateBookCommand, UpdateBookResponse } from './types';
import { Result } from 'src/core/utils/result';
import { BookRepository } from '../../repositories/book-repository';
import { BookNotFoundException } from '../../exceptions/book-not-found.exception';

export class UpdateBookCommandHandler implements ApplicationService<
  UpdateBookCommand,
  UpdateBookResponse
> {
  constructor(
    private readonly _bookRepository: BookRepository,
  ) {}
  async execute(data: UpdateBookCommand): Promise<Result<UpdateBookResponse>> {
    try {
			const book = await this._bookRepository.findBookById(data.id);
      if (!book) {
        return Result.failure<UpdateBookResponse>(new BookNotFoundException());
      }
      if (data.title) {
        book.setTitle(data.title);
      }
      if (data.author) {
        book.setAuthor(data.author);
      }
      if (data.isbn) {
        book.setIsbn(data.isbn);
      }
      if (data.costUsd) {
        book.setCostUsd(data.costUsd);
      }
      if (data.stockQuantity) {
        book.setStockQuantity(data.stockQuantity);
      }
      if (data.category) {
        book.setCategory(data.category);
      }
      if (data.supplierCountry) {
        book.setSupplierCountry(data.supplierCountry);
      }
      if (data.sellingPriceLocal) {
        book.setSellingPriceLocal(data.sellingPriceLocal);
      }
      await this._bookRepository.updateBookById(data.id, book);
      return Result.success<UpdateBookResponse>(new UpdateBookResponse(book));
    } catch (error) {
      return Result.failure<UpdateBookResponse>(error);
    }
  }
}
