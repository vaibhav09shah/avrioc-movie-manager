import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films } from './films.model';

@Injectable()
export class FilmsService {
    
    constructor(
        @InjectModel('Movies') private readonly filmsModel: Model<Films>,
    ) {}

    async insertFilmDetails(name: string, desc: string, releaseDate: Date, rating: number, ticketPrice: number , country: string, genre: [], imageUrl: string) {
        const newFilm = new this.filmsModel({
            name,
            desc,
            releaseDate,
            rating,
            ticketPrice,
            country,
            genre,
            imageUrl
        })
        

        if(rating < 1 || rating > 5) throw new Error("Rating should be between 1 & 5");

        try {
            let result = await newFilm.save();
            return result;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async getAllFilms(){
        const filmsList = await this.filmsModel.find().sort({'createdAt':'desc'});
        return filmsList;
    }

    async getSelectedFilmDetails(id: string){
        try {
            const selectedFilm = await this.filmsModel.findById(id);
            return [selectedFilm];
        } catch(error) {
            throw new NotFoundException('Could Not find Data');
        }
    }

    async updateSelectedFilmDetails(id: string,name: string, desc: string, releaseDate: Date, rating: number, ticketPrice: number , country: string, genre: string, imageUrl: string) {
        let updatedFilmData;
        try {
            updatedFilmData = await this.filmsModel.findById(id);
            if(updatedFilmData) {
                if(name) updatedFilmData.name = name;
                if(desc) updatedFilmData.desc = desc;
                if(releaseDate) updatedFilmData.releaseDate = releaseDate;
                if(rating) updatedFilmData.rating = rating;
                if(ticketPrice) updatedFilmData.ticketPrice = ticketPrice;
                if(country) updatedFilmData.country = country;
                if(genre) updatedFilmData.genre = genre;
                if(imageUrl) updatedFilmData.imageUrl = imageUrl;
                updatedFilmData.save();
                return [updatedFilmData];
            } else {
                throw new NotFoundException("Could Not Find Data");
            }
            
        } catch(error) {
            throw new BadRequestException("Error Updating the Data");
        }
    }

    async deleteFilm(id: string) {
        try {
            let deleteFilm = await this.filmsModel.deleteOne({_id:id}).exec();
            if(deleteFilm.n > 0) {
                return deleteFilm;
            } else {
                return [];
            }
        } catch(error) {
            throw new BadRequestException("Error Deleting the Data");
        }
    }
}