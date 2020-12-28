import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsController } from './films.controller';
import { FilmsSchema } from './films.model';
import { FilmsService } from './films.service';

@Module({
    imports: [
        MongooseModule.forFeature([ {name: 'Films', schema: FilmsSchema} ])
    ],
    controllers:[FilmsController],
    providers:[FilmsService]
})
export class FilmsModule {}
