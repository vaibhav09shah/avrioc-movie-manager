import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

import { UserService } from '../user/user.service';
import { Payload } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private configService: ConfigService){}

    async signPayload(payload: Payload) {
        return sign(payload, this.configService.get('SECRET_KEY') ,{expiresIn:'1d'});
    }

    async validateUser(payload: Payload){
        return await this.userService.findByPayload(payload);
    }
}
