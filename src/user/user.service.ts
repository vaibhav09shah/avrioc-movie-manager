import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { LoginDTO, RegisterDTO , Payload } from '../auth/auth.dto';
import { User } from './user.model';



@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly UserModel: Model<User> ) {}

    async create(userDTO: RegisterDTO) {
        const { username } = userDTO;
        const user = await this.UserModel.findOne({ username });
        if(user){
            throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.UserModel(userDTO);
        await createdUser.save();
        return this.removePassword(createdUser);
    }

    async findByUser(userDTO: LoginDTO){
        const { username, password } = userDTO;
        const user = await this.UserModel
          .findOne({ username })
          .select('username password');
        if (!user) {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    
        if (await bcrypt.compare(password, user.password)) {
          return this.removePassword(user);
        } else {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: Payload) {
      const { username } = payload;
      const user = await this.UserModel.findOne({ username });
      return this.removePassword(user);
    }


    removePassword(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
      }
    
}