import { Module } from "@nestjs/common";
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Zombie } from './zombie.entity';
import { ZombieService } from './zombie.service';
import { ZombieController } from './zombie.controller';
import { ZombieItemModule } from '../zombie-item/zombie-item.module';
import { CurrencyExchangeModule } from '../currency-exchange/currency-exchange.module';
import { ZombieItemService } from '../zombie-item/zombie-item.service';
import { CurrencyExchangeService } from "currency-exchange/currency-exchange.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Zombie]),
    ZombieItemModule,
    CurrencyExchangeModule,
  ],
  controllers: [ZombieController],
  providers: [
    ZombieItemService,
    CurrencyExchangeService,
    ZombieService,
  ],
})
export class ZombieModule {}