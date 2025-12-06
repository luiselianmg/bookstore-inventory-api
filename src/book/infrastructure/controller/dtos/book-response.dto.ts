import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id: number;

  @ApiProperty({ description: 'Title of the book', example: 'The Lord of the Rings' })
  title: string;

  @ApiProperty({ description: 'Author of the book', example: 'J.R.R. Tolkien' })
  author: string;

  @ApiProperty({ description: 'ISBN number', example: '9780544003415' })
  isbn: string;

  @ApiProperty({ description: 'Cost in USD', example: 25.99 })
  costUsd: number;

  @ApiProperty({ description: 'Quantity in stock', example: 50 })
  stockQuantity: number;

  @ApiProperty({ description: 'Book category', example: 'Fantasy' })
  category: string;

  @ApiProperty({ description: 'Supplier country', example: 'United States' })
  supplierCountry: string;

  @ApiProperty({ 
    description: 'Selling price in local currency', 
    example: 95000,
    required: false 
  })
  sellingPriceLocal?: number;
}