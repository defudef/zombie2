import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Zombie } from './zombie.entity';
import { Repository, DeleteResult } from "typeorm";
import { CreateZombieDto, UpdateZombieDto, IZombieWithPrices } from './zombie.interface';
import { ZombieItemService } from '../zombie-item/zombie-item.service';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { CurrencyCode } from "../currency-exchange/currency-exchange.constant";
import { ICurrencyKeyValueObject } from "currency-exchange/currency-exchange.interface";

@Injectable()
export class ZombieService {
  constructor(
    @InjectRepository(Zombie) private readonly repository: Repository<Zombie>,
    private readonly zombieItemService: ZombieItemService,
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  public getList(): Promise<IZombieWithPrices[]> {
    return this.repository
      .find({
        loadEagerRelations: true,
      })
      .then(data => this.transformEntities(data));
  }

  public async getOne(id: string): Promise<IZombieWithPrices> {
    const currencies = await this.currencyExchangeService
      .findByCodes([CurrencyCode.EUR, CurrencyCode.USD])
      .then(this.currencyExchangeService.mapToKeyValueObject);

    return this.repository
      .findOneOrFail(id, { loadEagerRelations: true })
      .then(data => this.transformEntity(data, currencies));
  }

  public async create({ name, items }: CreateZombieDto): Promise<Zombie> {
    return this.repository.save(
      new Zombie({
        name,
        items: items
          ? await this.zombieItemService.transformIdsToObjects(items)
          : []
      })
    );
  }

  public async update(id: string, { name, items }: UpdateZombieDto): Promise<Zombie> {
    const entity = await this.repository.findOneOrFail({
      where: {
        id
      },
      loadEagerRelations: true,
    });

    entity.name = name || entity.name;
    entity.items = items
      ? await this.zombieItemService.transformIdsToObjects(items)
      : entity.items;

    return this.repository.save(entity);
  }

  public async delete(id: string): Promise<DeleteResult> {
    await this.repository.findOneOrFail(id);

    return this.repository.delete({ id });
  }

  private async transformEntities(entities: Zombie[]): Promise<IZombieWithPrices[]> {
    const currencies = await this.currencyExchangeService
      .findByCodes([CurrencyCode.EUR, CurrencyCode.USD])
      .then(this.currencyExchangeService.mapToKeyValueObject);

    return entities.map(entity => this.transformEntity(entity, currencies));
  }

  private transformEntity(
    entity: Zombie,
    currencies: ICurrencyKeyValueObject
  ): IZombieWithPrices {
    const result: number = entity.items.reduce((previousValue, currentValue) => (
      previousValue + currentValue.price
    ), 0);

    return {
      ...entity,
      prices: {
        PLN: result,
        EUR: this.currencyExchangeService.exchange(result, currencies[CurrencyCode.EUR].ask),
        USD: this.currencyExchangeService.exchange(result, currencies[CurrencyCode.USD].ask),
      },
    };
  }
}