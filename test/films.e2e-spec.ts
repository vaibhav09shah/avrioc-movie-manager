import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { appUrl , mongoDB } from './constants';
import { RegisterDTO } from '../src/auth/auth.dto';
import { FilmsDTO } from '../src/films/films.dto';

let authToken: string;
const user: RegisterDTO = {
    username: 'username_54',
    password: 'password_51',
  };


const filmDetail : FilmsDTO = {
    name: "Avengers Age of Ultron",
    desc: "Test desc",
    releaseDate: new Date("2020-10-20"),
    rating:3.5,
    ticketPrice:300,
    country:"US",
    genre:["sci fi","thriller"],
    photo:"test.png"
}

// Creating DB Connection before Tests gets executed
beforeAll(async () => {
    await mongoose.connect(mongoDB );
})

// Closing DB Connection after Tests have been executed
afterAll(async done => {
    await mongoose.connection.close()
    done()
  })
  
  
  // Basic test for films 
 describe('Movies Tests Beings ', () => {

    it('Should get a list of Films' , async () => {
        return await request(appUrl)
                .get('/films')
                .expect( ({body}) => {
                    expect(body[0].rating).toBeDefined();
                    expect(body[0].genre.length).toBeGreaterThanOrEqual(1);
                })
                .expect(200)
    })

    // Adding Test to insert a movie / getting token first then inserting
    it('Should insert a movie ', async () => {

        let userTokenData = await axios.post(appUrl+"/auth/register",user);
        authToken = userTokenData.data.token; 

        return await request(appUrl)
                    .post('/films')
                    .set('Authorization', `Bearer ${authToken}`)
                    .set('Accept', 'application/json')
                    .send(filmDetail)
                    .expect(({ body }) => {
                        expect(body[0].createdAt).toBeDefined();
                        expect(body.length).toEqual(1);
                    })
                    .expect(201);



    })

 }) 