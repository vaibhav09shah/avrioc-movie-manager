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
        type: Number,
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
        type: Array,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})