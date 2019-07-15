import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombieModule } from './zombie/zombie.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRoot(),
    ZombieModule,
  ],
})
export class AppModule {}
