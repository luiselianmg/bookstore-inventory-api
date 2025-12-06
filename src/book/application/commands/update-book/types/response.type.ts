import { Book } from "src/book/domain/book";

export class UpdateBookResponse {
  constructor(book: Book) {
    this.book = book;
  }
  book: Book;
}