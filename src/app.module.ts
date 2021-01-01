import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
            MulterModule.register({
              dest: './uploads',
            }),
            FilmsModule,
            MongooseModule.forRoot('mongodb+srv://testUser1:testUserPass@cluster0.5kzj7.mongodb.net/movieManager?retryWrites=true&w=majority'),
            UserModule,
            AuthModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
