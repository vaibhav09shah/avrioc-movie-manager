import * as mongoose from 'mongoose';

export const CommentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Films'
    }
}, {
    timestamps: true
})