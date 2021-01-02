import 'dotenv';
import * as request from 'supertest';
import { appUrl } from './constants';

describe(' Checking App Test - Base URL ',  () => {
    it('should ping', async () => {
      return await request(appUrl)
        .get('/')
        .expect(200)
        .expect('Hello World!');
    } , 30000);
  });
