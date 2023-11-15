import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/models/book/book';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async searchByTitle(title: string): Promise<Book[]> {
    const searchTerm = title.toLowerCase();
    return this.bookModel
      .find()
      .exec()
      .then((books) =>
        books.filter((book) => book.title.toLowerCase().includes(searchTerm)),
      );
  }

  async getBooksByYear(year: number): Promise<Book[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.bookModel
      .find({
        publishedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .exec();
  }

  async add(book: Book): Promise<Book> {
    const createBook = new this.bookModel(book);
    return createBook.save();
  }
}
