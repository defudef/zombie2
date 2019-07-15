import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombieItemService } from './zombie-item.service';
import { ZombieItem } from './zombie-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZombieItem])],
  exports: [ZombieItemService],
  providers: [ZombieItemService],
})
export class ZombieItemModule {}
