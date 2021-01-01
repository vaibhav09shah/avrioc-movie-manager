import * as mongoose from 'mongoose';

export interface Comments extends mongoose.Document {
    id: string,
    comment: string,
    userId: string,
    filmId: string
}