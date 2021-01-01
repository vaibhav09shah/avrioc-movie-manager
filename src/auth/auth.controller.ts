import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../user/user.service'; 
import { LoginDTO, RegisterDTO , Payload } from './auth.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}


    @Post('login')
    async login(@Body() userDTO: LoginDTO) {
        const user = await this.userService.findByUser(userDTO)
        const payload: Payload = {
            username: user.username,
        };
        
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post('register')
    async createUser(@Body() registerDTO: RegisterDTO) {
        const createdUser = await this.userService.create(registerDTO);
        console.log('createduser')
        console.log(createdUser);

        const payload: Payload = {
            username: createdUser.username,
        };
        
        const token = await this.authService.signPayload(payload);
        return { createdUser, token };
    } 
}
