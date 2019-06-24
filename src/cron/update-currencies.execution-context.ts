import { NestFactory } from "@nestjs/core";
import { AppModule } from '../app.module';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { CurrencyExchangeModule } from '../currency-exchange/currency-exchange.module';
import { Logger } from '@nestjs/common';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const service = app
    .select(CurrencyExchangeModule)
    .get(CurrencyExchangeService);

  const currencies = await service.fetchCurrencies();
  const result = await service.createOrUpdateMany(currencies);

  Logger.log(`Updated ${result.length} currencies`, 'Cron :: Update currencies');

  await app.close();
})().catch(e => console.log(e));
