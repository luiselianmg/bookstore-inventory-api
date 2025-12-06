import { Book } from "src/book/domain/book";

export type UpdateSellingPriceLocalCommand = {
  book: Book;
  exchangeRate: number;
  profitMargin: number;
};
