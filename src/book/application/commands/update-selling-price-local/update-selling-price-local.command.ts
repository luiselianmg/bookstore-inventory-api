import { ApplicationService } from 'src/core/application/services/application-service';
import { UpdateSellingPriceLocalCommand, UpdateSellingPriceLocalResponse } from './types';
import { Result } from 'src/core/utils/result';
import { BookRepository } from '../../repositories/book-repository';

export class UpdateSellingPriceLocalCommandHandler implements ApplicationService<
  UpdateSellingPriceLocalCommand,
  UpdateSellingPriceLocalResponse
> {
  constructor(
    private readonly _bookRepository: BookRepository,
  ) {}
  async execute(data: UpdateSellingPriceLocalCommand): Promise<Result<UpdateSellingPriceLocalResponse>> {
    try {
      const book = data.book;
      const exchangeRate = data.exchangeRate;
      const profitMargin = data.profitMargin;
      const localPrice = Math.round(book.getCostUsd() * exchangeRate);
      book.setSellingPriceLocal(localPrice + localPrice * (profitMargin/100));
      await this._bookRepository.updateBookById(book.getId(), book);
      return Result.success<UpdateSellingPriceLocalResponse>(new UpdateSellingPriceLocalResponse(
        book.getId(),
        book.getCostUsd(),
        exchangeRate,
        localPrice,
        profitMargin,
        book.getSellingPriceLocal(),
        'VES',
        new Date(),
      ));
    } catch (error) {
      return Result.failure<UpdateSellingPriceLocalResponse>(error);
    }
  }
}
