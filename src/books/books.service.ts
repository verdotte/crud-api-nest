import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../models/model.book';
import { IBook } from '../interfaces/interface.book';
import { CreateBookDto } from '../dto/createBookDto';
import { UpdateBookDto } from '../dto/updateBookDto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  public create = async (createBookDto: CreateBookDto): Promise<Book> => {
    const newBook: IBook = await this.bookModel.create(createBookDto);
    return newBook;
  };

  public findAll = async (): Promise<IBook[]> => {
    const book: IBook[] = await this.bookModel.find().exec();
    return book;
  };

  public findOne = async (bookId: string): Promise<IBook> => {
    const book: IBook = await this.bookModel.findById({ _id: bookId });

    if (!book) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }
    return book;
  };

  public update = async (
    bookId: string,
    createBookDto: UpdateBookDto,
  ): Promise<IBook> => {
    const bookFound: IBook = await this.bookModel.findByIdAndUpdate(
      { _id: bookId },
      createBookDto,
    );

    if (!bookFound) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }

    return bookFound;
  };

  public remove = async (bookId: string): Promise<IBook> => {
    const deletedBook: IBook = await this.bookModel.findByIdAndRemove(bookId);
    return deletedBook;
  };
}
