import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyExchangeService } from './currency-exchange.service';
import { Currency } from './currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  exports: [CurrencyExchangeService],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
