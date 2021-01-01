import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy , VerifiedCallback } from 'passport-jwt';

import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private AuthService: AuthService , private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('SECRET_KEY')
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