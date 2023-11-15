import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/models/book/book';
// import { Query } from 'mongoose';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Post()
  add(@Body() book: Book): Promise<Book> {
    return this.booksService.add(book);
  }

  @Get('search')
  searchByTitle(@Query('title') title: string) {
    return this.booksService.searchByTitle(title);
  }

  @Get('published-in-year')
  async getBooksByYear(@Query('year', ParseIntPipe) year: number) {
    return this.booksService.getBooksByYear(year);
  }
}
