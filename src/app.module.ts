import { Inject, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import config from '../config/config'

@Module({
  imports: [ 
            MulterModule.register({
              dest: './uploads',
            }),
            FilmsModule,
            MongooseModule.forRootAsync({
              imports:[ConfigModule],
              useFactory: async (configService: ConfigService) => ({
                uri:configService.get('MONGO_DB_URL'),
                useNewUrlParser: true
              }),
              inject: [ConfigService]
            }),
            UserModule,
            AuthModule,
            ConfigModule.forRoot({
              load:[config],
            }),
            CommentsModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// Check
