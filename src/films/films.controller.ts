import { BadRequestException, Body, Controller , Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { exception } from 'console';

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
    async addNewFilm(
        @Body('name') name: string,
        @Body('desc') desc: string,
        @Body('releaseDate') releaseDate: Date,
        @Body('rating') rating: string,
        @Body('ticketPrice') ticketPrice: number,
        @Body('country') country: string,
        @Body('genre') genre: string,
    ) {
        try {
            const postResults = await this.filmsService.insertFilmDetails(name,desc,releaseDate,rating,ticketPrice,country,genre);
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
    async updateMovieDetails(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('desc') desc: string,
        @Body('releaseDate') releaseDate: Date,
        @Body('rating') rating: string,
        @Body('ticketPrice') ticketPrice: number,
        @Body('country') country: string,
        @Body('genre') genre: string,
    ) {
        const updateFilm = this.filmsService.updateSelectedFilmDetails(id,name,desc,releaseDate,rating,ticketPrice,country,genre);
        return updateFilm;

    } 

    @Delete(':id')
    async removeProduct(@Param('id') id: string) {
        
        try {
            let deleteFilmData = await this.filmsService.deleteFilm(id);
            if(!deleteFilmData)  throw new NotFoundException("Could Not Find Data");
        } catch (error) {
            throw new BadRequestException("Error Deleting the data ");
        }
        
        
    }

}
