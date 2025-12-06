import { Book } from "src/book/domain/book";

export class CreateBookResponse {
  constructor(book: Book) {
    this.book = book;
  }
  book: Book;
}