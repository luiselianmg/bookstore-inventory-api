import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from '../../domain/book';
import { BookRepository } from 'src/book/application/repositories/book-repository';
import { MongoBook, MongoBookDocument } from '../models/mongo-book';
import { BookMapper } from '../mappers/book-mapper';

@Injectable()
export class MongoBookRepository implements BookRepository {
  constructor(
    @InjectModel(MongoBook.name)
    private readonly bookModel: Model<MongoBookDocument>,
  ) {}

  async saveBook(book: Book): Promise<Book> {
    try {
      const bookData = BookMapper.toPersistence(book);
      const existingBook = await this.bookModel
        .findOne({ id: book.getId() })
        .exec();

      if (existingBook) {
        Object.assign(existingBook, bookData);
        existingBook.updatedAt = new Date();
        const updatedBook = await existingBook.save();
        return BookMapper.toDomain(updatedBook);
      } else {
        const newBook = new this.bookModel({
          ...bookData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        const savedBook = await newBook.save();
        return BookMapper.toDomain(savedBook);
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new Error(
          `Book with ISBN ${book.getIsbn()} or ID ${book.getId()} already exists`,
        );
      }
      throw error;
    }
  }

  async findAllBooks(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    books: Book[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const skip = (page - 1) * limit;

      const [books, total] = await Promise.all([
        this.bookModel
          .find()
          .sort({ id: 1 }) // Ordenar por id ascendente
          .skip(skip)
          .limit(limit)
          .exec(),
        this.bookModel.countDocuments().exec(),
      ]);

      return {
        books: BookMapper.toDomainList(books),
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new Error(`Failed to fetch paginated books: ${error.message}`);
    }
  }

  async findBookById(bookId: number): Promise<Book | null> {
    try {
      const mongoBook = await this.bookModel.findOne({ id: bookId }).exec();

      if (!mongoBook) {
        return null;
      }

      return BookMapper.toDomain(mongoBook);
    } catch (error) {
      throw new Error(
        `Failed to find book with ID ${bookId}: ${error.message}`,
      );
    }
  }

  async updateBookById(bookId: number, book: Partial<Book>): Promise<void> {
    try {
      const updateData: any = {};
      if (book.getTitle) updateData.title = book.getTitle();
      if (book.getAuthor) updateData.author = book.getAuthor();
      if (book.getIsbn) updateData.isbn = book.getIsbn();
      if (book.getCostUsd) updateData.costUsd = book.getCostUsd();
      if (book.getStockQuantity)
        updateData.stockQuantity = book.getStockQuantity();
      if (book.getCategory) updateData.category = book.getCategory();
      if (book.getSupplierCountry)
        updateData.supplierCountry = book.getSupplierCountry();
      if (book.getSellingPriceLocal !== undefined) {
        updateData.sellingPriceLocal = book.getSellingPriceLocal();
      }

      updateData.updatedAt = new Date();

      const result = await this.bookModel
        .updateOne({ id: bookId }, { $set: updateData })
        .exec();

      if (result.matchedCount === 0) {
        throw new Error(`Book with ID ${bookId} not found`);
      }
    } catch (error) {
      throw new Error(
        `Failed to update book with ID ${bookId}: ${error.message}`,
      );
    }
  }

  async deleteBookById(bookId: number): Promise<void> {
    try {
      const result = await this.bookModel.deleteOne({ id: bookId }).exec();

      if (result.deletedCount === 0) {
        throw new Error(`Book with ID ${bookId} not found`);
      }
    } catch (error) {
      throw new Error(
        `Failed to delete book with ID ${bookId}: ${error.message}`,
      );
    }
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    try {
      const mongoBooks = await this.bookModel
        .find({
          category: { $regex: new RegExp(category, 'i') },
        })
        .sort({ title: 1 })
        .exec();

      return BookMapper.toDomainList(mongoBooks);
    } catch (error) {
      throw new Error(
        `Failed to fetch books by category ${category}: ${error.message}`,
      );
    }
  }

async getBooksWithLowStock(threshold: number): Promise<Book[]> {
  try {
    const mongoBooks = await this.bookModel
      .find({
        stockQuantity: { $lte: threshold },
      })
      .sort({ stockQuantity: 1 })
      .exec();

    return BookMapper.toDomainList(mongoBooks);
  } catch (error) {
    throw new Error(`Failed to fetch books with low stock: ${error.message}`);
  }
}
}
