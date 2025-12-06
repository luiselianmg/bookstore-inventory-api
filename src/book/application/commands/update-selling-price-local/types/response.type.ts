export class UpdateSellingPriceLocalResponse {
  constructor(
    public bookId: number,
    public costUsd: number,
    public exchangeRate: number,
    public costLocal: number,
    public marginPercentage: number,
    public sellingPriceLocal: number,
    public currency: string,
    public calculationTimestamp: Date
  ) {}
}