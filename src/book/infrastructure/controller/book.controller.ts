import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdGenerator } from 'src/core/application/id/id-generator.interface';
import { CreateBookDto } from './dtos/create-book.dto';
import { CreateBookCommandHandler } from 'src/book/application/commands/create-book/create-book.command';
import { BookRepository } from '../../application/repositories/book-repository';

@Controller('book')
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
    const service = new CreateBookCommandHandler(this._mongoBookRepository, this._numericIdGenerator);
    const result = await service.execute(createBookDto);
    return result.unwrap();
  }
}
