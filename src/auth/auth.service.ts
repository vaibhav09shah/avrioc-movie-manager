import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../user/user.service';
import { Payload } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signPayload(payload: Payload) {
        return sign(payload, 'secretKey' ,{expiresIn:'1d'});
    }

    async validateUser(payload: Payload){
        return await this.userService.findByPayload(payload);
    }
}
