/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IBook extends Document {
  readonly title: string;
  readonly description: string;
  readonly isPublished: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
