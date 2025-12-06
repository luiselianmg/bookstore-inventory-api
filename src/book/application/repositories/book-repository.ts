import { Book } from './../../domain/book';

export interface BookRepository {
  saveBook(book: Book): Promise<Book>;
  findAllBooks(
    page?: number,
    limit?: number,
  ): Promise<{ books: Book[]; total: number; page: number; limit: number }>;
  findBookById(bookId: number): Promise<Book | null>;
  updateBookById(bookId: number, book: Partial<Book>): Promise<void>;
  deleteBookById(bookId: number): Promise<void>;
  getBooksByCategory(category: string): Promise<Book[]>;
  getBooksWithLowStock(threshold: number): Promise<Book[]>;
}
