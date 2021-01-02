import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import axios from 'axios';

import { AuthService } from '../auth/auth.service'
import { FilmsService } from '../films/films.service';
import { CommentsService } from '../comments/comments.service';
import { UserService } from '../user/user.service';

// Importing DTOs
import { RegisterDTO } from '../auth/auth.dto';
import { FilmsDTO } from '../films/films.dto';

@Injectable()
export class SeedService {

    constructor(
        private readonly authService: AuthService,
        private readonly filmsService: FilmsService,
        private readonly commentsService: CommentsService,
        private readonly userService: UserService
    ) {}

    @Command({ command: 'create:films', describe: 'Creates Films with one comment' , autoExit: true })
    async createFilms() {
        
        // Create a user
        const registerDTO: RegisterDTO = {
            username: 'testuser'+Math.floor((Math.random() * 100) + 1),
            password: 'testuser456'
        }
        
        let userCreatedData = await axios.post('http://localhost:3000/api/auth/register',registerDTO)
        console.log(userCreatedData.data);

        const movie1Data:FilmsDTO = {
            name: "Test Movie 1 ",
            desc: "Test Movie 1 Desc",
            releaseDate: new Date("2020-10-20"),
            rating: 3,
            ticketPrice: 400,
            country: "India",
            genre: ["Sci Fi", "Fantasy"],
            photo:"test.png"
        }


        // Adding Movie 1 
        let film1Data = await this.filmsService.insertFilmDetails(movie1Data.name,movie1Data.desc,movie1Data.releaseDate,movie1Data.rating,movie1Data.ticketPrice,movie1Data.country,movie1Data.genre,movie1Data.photo);

        let user   = userCreatedData.data.createdUser._id;
        let filmId1 = film1Data._id;

        let commentData = {
            comment: "This is test comment for movie 1",
            userId: user,
            filmId: filmId1
        }

        // Adding Comment for Movie 1 
        let insertComment1 = await this.commentsService.insertCommentsForMovies(commentData.comment,commentData.filmId,commentData.userId);
        console.log(insertComment1);




        // Adding Movie 2
        const movie2Data:FilmsDTO = {
            name: "Test Movie 2 ",
            desc: "Test Movie 2 Desc",
            releaseDate: new Date("2020-10-20"),
            rating: 3,
            ticketPrice: 400,
            country: "India",
            genre: ["Sci Fi", "Fantasy"],
            photo:"test.png"
        }

        let film2Data = await this.filmsService.insertFilmDetails(movie2Data.name,movie2Data.desc,movie2Data.releaseDate,movie2Data.rating,movie2Data.ticketPrice,movie2Data.country,movie2Data.genre,movie2Data.photo);

        let filmId2 = film2Data._id;

        let commentData2 = {
            comment: "This is test comment for movie 2 ",
            userId: user,
            filmId: filmId2
        }

        // Adding Comment for Movie 2
        let insertComment2 = await this.commentsService.insertCommentsForMovies(commentData2.comment,commentData2.filmId,commentData2.userId);
        console.log(insertComment2);


         // Adding Movie 3
         const movie3Data:FilmsDTO = {
            name: "Test Movie 3 ",
            desc: "Test Movie 3 Desc",
            releaseDate: new Date("2020-10-20"),
            rating: 3,
            ticketPrice: 400,
            country: "India",
            genre: ["Sci Fi", "Fantasy"],
            photo:"test.png"
        }

        let film3Data = await this.filmsService.insertFilmDetails(movie3Data.name,movie3Data.desc,movie3Data.releaseDate,movie3Data.rating,movie3Data.ticketPrice,movie3Data.country,movie3Data.genre,movie3Data.photo);

        let filmId3 = film3Data._id;

        let commentData3 = {
            comment: "This is test comment for movie 3 ",
            userId: user,
            filmId: filmId3
        }

        // Adding Comment for Movie 2
        let insertComment3 = await this.commentsService.insertCommentsForMovies(commentData3.comment,commentData3.filmId,commentData3.userId);
        console.log(insertComment3);

    }
}
