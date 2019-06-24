import { NestFactory } from "@nestjs/core";
import { AppModule } from '../app.module';
import { ZombieItemModule } from '../zombie-item/zombie-item.module';
import { ZombieItemService } from '../zombie-item/zombie-item.service';
import { Logger } from '@nestjs/common';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const service = app
    .select(ZombieItemModule)
    .get(ZombieItemService);

  const data = await service.fetchItems();

  const result = await service.createOrUpdateMany(data);

  Logger.log(`Updated ${result.length} items`, 'Cron :: Update zombie items');

  await app.close();
})().catch(e => console.log(e));