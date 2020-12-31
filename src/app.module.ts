import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ 
            MulterModule.register({
              dest: './uploads',
            }),
            FilmsModule,
            MongooseModule.forRoot('localhost:27017/testdb')
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
