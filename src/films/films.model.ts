import * as mongoose from 'mongoose';

export interface Films extends mongoose.Document {
    id: string,
    name: string,
    desc: string,
    releaseDate: Date,
    rating: string,
    ticketPrice: number,
    country: string,
    genre: string,
    imageUrl: string

}