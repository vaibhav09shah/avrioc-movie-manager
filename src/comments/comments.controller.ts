import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    
    constructor(private readonly commentsService: CommentsService){}

    @Get(':id')
    async getAllCommentsForAMovie(@Param('id') filmId: string) {

        try {
            return await this.commentsService.getCommentsForMovie(filmId);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'No Comments FOund',
                message: err.message
            }, HttpStatus.NOT_FOUND);
        }
        
    }

    @Post(':id')
    async insertCommentForAMovie(@Body('comment') comment: string, @Param('id') filmId: string , @Body('userId') userId: string ){
        try {
            const insertCommentData = await this.commentsService.insertCommentsForMovies(comment,filmId,userId);
            return insertCommentData;
        } catch(err) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error Saving Data',
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id') 
    async deleteComment(@Param('id') id: string){
        try {
        
            const deletComment = await this.commentsService.deleteComment(id);

        } catch (err) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error Saving Data',
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        }
    }


}
