export class Book {
  constructor(
    private _id: number,
    private _title: string,
    private _author: string,
    private _isbn: string,
    private _costUsd: number,
    private _stockQuantity: number,
    private _category: string,
    private _supplierCountry: string,
    private _sellingPriceLocal?: number,
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

  setTitle(title: string): void {
    this._title = title;
  }

  setAuthor(author: string): void {
    this._author = author;
  }

  setIsbn(isbn: string): void {
    this._isbn = isbn;
  }

  setCostUsd(costUsd: number): void {
    this._costUsd = costUsd;
  }

  setStockQuantity(stockQuantity: number): void {
    this._stockQuantity = stockQuantity;
  }

  setCategory(category: string): void {
    this._category = category;
  }

  setSupplierCountry(supplierCountry: string): void {
    this._supplierCountry = supplierCountry;
  }

  setSellingPriceLocal(sellingPriceLocal: number): void {
    this._sellingPriceLocal = sellingPriceLocal;
  }
}
