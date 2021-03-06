import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsController } from './films.controller';
import { FilmsSchema } from '../schemas/films.schema';
import { FilmsService } from './films.service';

@Module({
    imports: [
        MongooseModule.forFeature([ {name: 'Movies', schema: FilmsSchema} ])
    ],
    controllers:[FilmsController],
    providers:[FilmsService],
    exports: [FilmsService]
})
export class FilmsModule {}
