import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service';

// Importing Modules for which Seed service is used
import { AuthModule } from '../auth/auth.module';
import { FilmsModule } from '../films/films.module';
import { CommentsModule } from '../comments/comments.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        CommandModule,
        AuthModule,
        FilmsModule,
        CommentsModule,
        UserModule
    ],
    providers: [SeedService],
    exports: [SeedService]
})
export class SeedModule {}
