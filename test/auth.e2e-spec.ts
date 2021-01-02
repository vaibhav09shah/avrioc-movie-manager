import { HttpStatus } from '@nestjs/common';
import 'dotenv';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { RegisterDTO , LoginDTO } from '../src/auth/auth.dto';
import { appUrl , mongoDB } from './constants';

beforeAll(async () => {
    await mongoose.connect(mongoDB );
})

afterAll(async done => {
  // Closing the DB connection allows Jest to exit successfully.
  await mongoose.connection.close()
  done()
})


describe('Authentication Tests', () => {
    const user: RegisterDTO = {
      username: 'username_4',
      password: 'password_4',
    };
  

    const loginUser: LoginDTO = {
      username: 'username_4',
      password: 'password_4',
    };
  
    let userToken: string;
  
    it('should register user', async () => {
      return await request(appUrl)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.createdUser.username).toEqual('username_4');
          expect(body.createdUser.password).toBeUndefined();

        })
        .expect(HttpStatus.CREATED);
    } , 30000);
  
  
    it('should reject duplicate registration', async () => {
      return await request(appUrl)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          expect(body.message).toEqual('User already exists');
        })
        .expect(HttpStatus.BAD_REQUEST);
    } , 30000);
  
    it('should login user', async () => {
      return await request(appUrl)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          userToken = body.token;
          
          expect(body.token).toBeDefined();
          expect(body.user.username).toEqual('username_4');
          expect(body.user.password).toBeUndefined();
        })
        .expect(HttpStatus.CREATED);
    } , 30000);
  
  });

