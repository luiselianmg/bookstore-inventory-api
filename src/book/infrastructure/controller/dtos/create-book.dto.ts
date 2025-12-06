
import { IsString, IsNotEmpty, Length, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Lord of the Rings'
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Author of the book',
    example: 'J.R.R. Tolkien'
  })
  author: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 13, { message: 'ISBN must be between 10 and 13 characters' })
  @ApiProperty({
    description: 'ISBN number (10-13 characters)',
    example: '9780544003415'
  })
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Cost must be a positive number' })
  @ApiProperty({
    description: 'Cost in USD',
    example: 25.99
  })
  costUsd: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Stock quantity cannot be negative' })
  @ApiProperty({
    description: 'Quantity in stock',
    example: 50
  })
  stockQuantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Book category',
    example: 'Fantasy'
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Supplier country',
    example: 'United States'
  })
  supplierCountry: string;

  @IsNumber()
  @Min(0, { message: 'Selling price cannot be negative' })
  @ApiProperty({
    description: 'Selling price in local currency',
    example: 95000,
    required: false
  })
  sellingPriceLocal?: number;
}