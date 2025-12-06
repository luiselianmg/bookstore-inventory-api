import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IdGenerator } from 'src/core/application/id/id-generator.interface';
import { CreateBookDto } from './dtos/create-book.dto';
import { CreateBookCommandHandler } from 'src/book/application/commands/create-book/create-book.command';
import { BookRepository } from '../../application/repositories/book-repository';
import { UpdateBookDto } from './dtos/update-book.dto';
import { UpdateBookCommandHandler } from 'src/book/application/commands/update-book/update-book.command';
import { DeleteBookCommandHandler } from 'src/book/application/commands/delete-book/delete-book.command';
import { NoBooksFoundException } from 'src/book/application/exceptions/no-books-found.exception';
import { BookNotFoundException } from 'src/book/application/exceptions/book-not-found.exception';
import { PaginatedResponseDto } from './dtos/paginated-response.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { BookMapper } from '../mappers/book-mapper';
import { BookResponseDto } from './dtos/book-response.dto';
import axios from 'axios';
import { UpdateSellingPriceLocalCommandHandler } from 'src/book/application/commands/update-selling-price-local/update-selling-price-local.command';

@Controller('books')
@ApiTags('Books')
export class BookController {
  constructor(
    @Inject('IdGenerator')
    private readonly _numericIdGenerator: IdGenerator<number>,
    @Inject('BookRepository')
    private readonly _mongoBookRepository: BookRepository,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'The book has been successfully created',
  })
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    try {
      const service = new CreateBookCommandHandler(
        this._mongoBookRepository,
        this._numericIdGenerator,
      );
      const result = await service.execute(createBookDto);
      return result.unwrap();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Search books by category' })
  @ApiQuery({
    name: 'category',
    required: true,
    description: 'Category to search for',
    example: 'Fantasy',
  })
  @ApiResponse({
    status: 200,
    description: 'Books found successfully',
    type: [BookResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No books found in this category',
  })
  @ApiResponse({
    status: 400,
    description: 'Category parameter is required',
  })
  async searchByCategory(@Query('category') category: string) {
    try {
      if (!category || category.trim() === '') {
        throw new BadRequestException('Category parameter is required');
      }

      const books = await this._mongoBookRepository.getBooksByCategory(
        category.trim(),
      );

      if (books.length === 0) {
        throw new NoBooksFoundException();
      }

      return BookMapper.toResponseDtoList(books);
    } catch (error) {
      if (error instanceof NoBooksFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Get books with low stock' })
  @ApiQuery({
    name: 'threshold',
    required: false,
    description: 'Stock threshold (default: 10)',
    example: 10,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Low stock books retrieved successfully',
    type: [BookResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No books with low stock found',
  })
  async getLowStockBooks(
    @Query('threshold', new DefaultValuePipe(10), ParseIntPipe)
    threshold: number = 10,
  ) {
    try {
      if (threshold < 0) {
        throw new BadRequestException('Threshold must be a positive number');
      }

      const books =
        await this._mongoBookRepository.getBooksWithLowStock(threshold);

      if (books.length === 0) {
        throw new NoBooksFoundException();
      }

      return BookMapper.toResponseDtoList(books);
    } catch (error) {
      if (error instanceof NoBooksFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (max: 100, default: 10)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'The books have been successfully retrieved',
    type: PaginatedResponseDto<BookResponseDto>,
  })
  @ApiResponse({
    status: 404,
    description: 'No books found',
  })
  async getBooks(@Query() paginationDto: PaginationDto) {
    const result = await this._mongoBookRepository.findAllBooks(
      paginationDto.page,
      paginationDto.limit,
    );

    if (result.books.length === 0) {
      throw new NoBooksFoundException();
    }

    const booksDto = BookMapper.toResponseDtoList(result.books);

    return new PaginatedResponseDto<BookResponseDto>(
      booksDto,
      result.page,
      result.limit,
      result.total,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  async getBookById(@Param('id') bookId: number) {
    try {
      if (!bookId || isNaN(bookId) || bookId <= 0) {
        throw new BadRequestException('Invalid book ID');
      }
      const book = await this._mongoBookRepository.findBookById(bookId);

      if (!book) {
        throw new BookNotFoundException();
      }

      return book;
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  async updateBook(
    @Param('id') bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      if (Object.keys(updateBookDto).length === 0) {
        throw new BadRequestException(
          'At least one field must be provided for update.',
        );
      }
      const service = new UpdateBookCommandHandler(this._mongoBookRepository);
      const command = { id: bookId, ...updateBookDto };
      const result = await service.execute(command);
      return result.unwrap();
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({
    name: 'id',
    description: 'Book ID to delete',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'The book has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format',
  })
  async deleteBook(@Param('id') bookId: number) {
    try {
      const service = new DeleteBookCommandHandler(this._mongoBookRepository);
      const result = await service.execute({ id: bookId });
      return result.unwrap();
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Post(':id/calculate-price')
  @ApiOperation({
    summary: 'Calculate suggested selling price in local currency',
  })
  @ApiParam({
    name: 'id',
    description: 'Book ID',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Suggested price calculated successfully',
    schema: {
      example: {
        bookId: 1,
        costUsd: 25.99,
        exchangeRate: 257,
        costLocal: 6679,
        marginPercentage: 40,
        sellingPriceLocal: 9351,
        currency: 'VES',
        calculationTimestamp: '2025-12-06T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to fetch exchange rate',
  })
  async calculateSuggestedPrice(@Param('id') bookId: number) {
    try {
      const book = await this._mongoBookRepository.findBookById(bookId);
      if (!book) {
        throw new BookNotFoundException();
      }
      const exchangeRateApi = 'https://api.exchangerate-api.com/v4/latest/USD';
      let exchangeRate: number;
      const exchangeResponse = await axios.get(exchangeRateApi);
      exchangeRate = exchangeResponse.data.rates.VES;
      if (!exchangeRate) {
        exchangeRate = 257.93; // This value is the default in case of failure, in a real scenario it could be fetched from a config file or from the database.
        console.warn('Using default exchange rate for COP:', exchangeRate);
      }
      const profitMargin = 40;
      const command = { book, exchangeRate, profitMargin };
      const service = new UpdateSellingPriceLocalCommandHandler(
        this._mongoBookRepository,
      );
      const response = await service.execute(command);
      return response.unwrap();
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new HttpException(
          `Failed to calculate price: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
