import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './books.model';
import { CreateBookDto } from '../dto/createBookDto';
import { UpdateBookDto } from '../dto/updateBookDto';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async createBook(@Res() res, @Body() createBookDto: CreateBookDto) {
    try {
      const book = await this.bookService.create(createBookDto);
      return res.status(HttpStatus.OK).json({
        message: 'Book has been created successfully',
        book,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Book not created!',
        status: 400,
      });
    }
  }

  @Get()
  async getBooks(@Res() res) {
    try {
      const book = await this.bookService.findAll();
      return res.status(HttpStatus.OK).json({
        book,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error,
        status: 500,
      });
    }
  }

  @Get(':id')
  async getBook(@Res() res, @Param('id') id: string) {
    try {
      const book = await this.bookService.findOne(id);
      if (!book) {
        throw new NotFoundException(`Book is not found`);
      }
      return res.status(HttpStatus.OK).json({
        book,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error,
        status: 500,
      });
    }
  }

  @Put(':id')
  async updateBook(
    @Res() res,
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      const book = await this.bookService.update(id, updateBookDto);
      if (!book) {
        throw new NotFoundException(`Book is not found`);
      }
      return res.status(HttpStatus.OK).json({
        book,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error,
        status: 500,
      });
    }
  }

  @Delete(':id')
  async removeBook(@Res() res, @Param('id') id: string) {
    try {
      const book = await this.bookService.remove(id);
      if (!book) {
        throw new NotFoundException(`Book is not found`);
      }
      return res.status(HttpStatus.OK).json({
        book,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error,
        status: 500,
      });
    }
  }
}
