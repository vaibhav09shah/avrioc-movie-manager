import * as mongoose from 'mongoose';

export interface Films extends mongoose.Document {
    id: string,
    name: string,
    desc: string,
    releaseDate: Date,
    rating: number,
    ticketPrice: number,
    country: string,
    genre: [],
    imageUrl: string

}