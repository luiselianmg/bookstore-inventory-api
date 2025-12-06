import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Page must be greater than 0' })
  @Type(() => Number)
  @ApiProperty({
    description: 'Page number (starts from 1)',
    example: 1,
    required: false,
    default: 1,
  })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Limit must be greater than 0' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @Type(() => Number)
  @ApiProperty({
    description: 'Number of items per page (max 100)',
    example: 10,
    required: false,
    default: 10,
  })
  limit?: number = 10;
}
