export type CreateBookCommand = {
  title: string;
  author: string;
  isbn: string;
  costUsd: number;
  stockQuantity: number;
  category: string;
  supplierCountry: string;
  sellingPriceLocal?: number;
};
