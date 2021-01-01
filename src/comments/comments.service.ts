import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './comments.model';

@Injectable()
export class CommentsService {
    
    constructor(
        @InjectModel('Comments') private readonly CommentsModel: Model<Comments>,
    ) {}

    async insertCommentsForMovies(comment: string , filmId: string, userId: string) {
        const newComment = new this.CommentsModel({
            comment,
            userId,
            filmId
        })   

        try {
            let insertCommentData = newComment.save();
            return insertCommentData;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCommentsForMovie (filmId: string) {
       try {
         const movieComments = await this.CommentsModel.find({'filmId': filmId})
         return movieComments;
       } catch(err) {
           throw new Error(err.message);
       }
    }

    async deleteComment(id: string) {
        try {
            let deleteComment = await this.CommentsModel.deleteOne({_id:id}).exec();
            return deleteComment;
        } catch(err) {
            throw new Error(err.message);
        }
    }
}
