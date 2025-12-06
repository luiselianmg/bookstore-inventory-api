import { Book } from '../../domain/book';
import { BookResponseDto } from '../controller/dtos/book-response.dto';
import { MongoBook } from '../models/mongo-book';


export class BookMapper {
    static toResponseDto(book: Book): BookResponseDto {
    const dto = new BookResponseDto();
    dto.id = book.getId();
    dto.title = book.getTitle();
    dto.author = book.getAuthor();
    dto.isbn = book.getIsbn();
    dto.costUsd = book.getCostUsd();
    dto.stockQuantity = book.getStockQuantity();
    dto.category = book.getCategory();
    dto.supplierCountry = book.getSupplierCountry();
    dto.sellingPriceLocal = book.getSellingPriceLocal() || undefined;
    return dto;
  }

  static toResponseDtoList(books: Book[]): BookResponseDto[] {
    return books.map(book => this.toResponseDto(book));
  }

  static toPersistence(book: Book): Partial<MongoBook> {
    return {
      id: book.getId(),
      title: book.getTitle(),
      author: book.getAuthor(),
      isbn: book.getIsbn(),
      costUsd: book.getCostUsd(),
      stockQuantity: book.getStockQuantity(),
      category: book.getCategory(),
      supplierCountry: book.getSupplierCountry(),
      sellingPriceLocal: book.getSellingPriceLocal() || undefined,
    };
  }

  static toDomain(mongoBook: MongoBook): Book {
    return new Book(
      mongoBook.id,
      mongoBook.title,
      mongoBook.author,
      mongoBook.isbn,
      mongoBook.costUsd,
      mongoBook.stockQuantity,
      mongoBook.category,
      mongoBook.supplierCountry,
      mongoBook.sellingPriceLocal,
    );
  }

  static toDomainList(mongoBooks: MongoBook[]): Book[] {
    return mongoBooks.map(book => this.toDomain(book));
  }
}