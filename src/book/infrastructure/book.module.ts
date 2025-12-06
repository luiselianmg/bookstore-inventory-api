import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookSchema, MongoBook } from './models/mongo-book';
import { BookController } from './controller/book.controller';
import { ConsecutiveIdGenerator } from 'src/core/infrastructure/id/numeric-id-generator';
import { MongoBookRepository } from './repositories/mongo-book-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoBook.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [
    {
      provide: 'IdGenerator',
      useClass: ConsecutiveIdGenerator,
    },
    {
      provide: 'BookRepository',
      useClass: MongoBookRepository,
    },
    ConsecutiveIdGenerator,
    MongoBookRepository,
  ],
  exports: []
})
export class BookModule {}