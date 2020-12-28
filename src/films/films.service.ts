import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films } from './films.model';

@Injectable()
export class FilmsService {
    
    constructor(
        @InjectModel('Films') private readonly filmsModel: Model<Films>,
    ) {}

    async insertFilmDetails(name: string, desc: string, releaseDate: Date, rating: string, ticketPrice: number , country: string, genre: string) {
        const newFilm = new this.filmsModel({
            name,
            desc,
            releaseDate,
            rating,
            ticketPrice,
            country,
            genre
        })

        try {
            let result = await newFilm.save();
            return result;
        } catch(error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getAllFilms(){
        const filmsList = await this.filmsModel.find();
        return filmsList;
    }

    async getSelectedFilmDetails(id: string){
        console.log(id);
        try {
            const selectedFilm = await this.filmsModel.findById(id);
            return selectedFilm;
        } catch(error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}