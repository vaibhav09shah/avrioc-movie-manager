import { BadRequestException, Body, Controller , Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {

    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    async getAllFilms() {
        const filmsList = await this.filmsService.getAllFilms();
        return filmsList;
    }

    @Get(':id')
    getSelectedFilmDetails(@Param('id') id: string){
        const selectedFilm = this.filmsService.getSelectedFilmDetails(id);
        return selectedFilm;
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('photo',{
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
    }))
    async addNewFilm(
        @Body('name') name: string,
        @Body('desc') desc: string,
        @Body('releaseDate') releaseDate: Date,
        @Body('rating') rating: number,
        @Body('ticketPrice') ticketPrice: number,
        @Body('country') country: string,
        @Body('genre') genre: [],
        @UploadedFile() file,
    ) {

        let fileName = file.filename;
        try {
            const postResults = await this.filmsService.insertFilmDetails(name,desc,releaseDate,rating,ticketPrice,country,genre,fileName);
            return postResults;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error Saving Data',
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        }
        
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('photo',{
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
    }))
    async updateMovieDetails(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('desc') desc: string,
        @Body('releaseDate') releaseDate: Date,
        @Body('rating') rating: number,
        @Body('ticketPrice') ticketPrice: number,
        @Body('country') country: string,
        @Body('genre') genre: string,
        @UploadedFile() file,
    ) {
        let fileName = file.filename;
        const updateFilm = this.filmsService.updateSelectedFilmDetails(id,name,desc,releaseDate,rating,ticketPrice,country,genre,fileName);
        return updateFilm;

    } 

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async removeMovie(@Param('id') id: string) {
        
        try {
            let deleteFilmData = await this.filmsService.deleteFilm(id);
            if(!deleteFilmData)  throw new NotFoundException("Could Not Find Data");
        } catch (error) {
            throw new BadRequestException("Error Deleting the data ");
        }
        
        
    }

}
