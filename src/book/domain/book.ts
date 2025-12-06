export class Book {
  constructor(
    private readonly _id: number,
    private readonly _title: string,
    private readonly _author: string,
    private readonly _isbn: string,
    private readonly _costUsd: number,
    private readonly _stockQuantity: number,
    private readonly _category: string,
    private readonly _supplierCountry: string,
    private readonly _sellingPriceLocal?: number,
  ) {}

  getId(): number {
    return this._id;
  }

  getTitle(): string {
    return this._title;
  }

  getAuthor(): string {
    return this._author;
  }

  getIsbn(): string {
    return this._isbn;
  }

  getCostUsd(): number {
    return this._costUsd;
  }

  getStockQuantity(): number {
    return this._stockQuantity;
  }

  getCategory(): string {
    return this._category;
  }

  getSupplierCountry(): string {
    return this._supplierCountry;
  }

  getSellingPriceLocal(): number | null {
    return this._sellingPriceLocal;
  }
}
