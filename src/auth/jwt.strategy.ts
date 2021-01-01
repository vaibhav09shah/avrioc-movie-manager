import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy , VerifiedCallback } from 'passport-jwt';

import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private AuthService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.AuthService.validateUser(payload);
        console.log(user);
        if (!user) {
          return done(
            new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
            false,
          );
        }
    
        return done(null, user, payload.iat);
      }
}