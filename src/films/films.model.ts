import * as mongoose from 'mongoose';

export const FilmsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }

})

export interface Films extends mongoose.Document {
    id: string,
    name: string,
    desc: string,
    releaseDate: Date,
    rating: string,
    ticketPrice: number,
    country: string,
    genre: string

}