import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import axios from 'axios';
import { ICurrencyXmlDto, ICurrencyRateDto, ICurrencyKeyValueObject } from './currency-exchange.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { Repository } from 'typeorm';
import { CurrencyCode } from './currency-exchange.constant';
import { Decimal } from 'decimal.js';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    @InjectRepository(Currency) private readonly repository: Repository<Currency>,
    private readonly config: ConfigService,
  ) {}

  public fetchCurrencies(): Promise<ICurrencyRateDto[]> {
    return axios
      .get<ICurrencyXmlDto[]>(this.config.get('config.nbpUrl'))
      .then(({ data }) => data[0].rates);
  }

  public async createOrUpdateMany(items: ICurrencyRateDto[]): Promise<Currency[]> {
    const currencies = await this.repository.find();

    return this.repository.save(this.transformEntitiesToUpdate(items, currencies));
  }

  // @OTOD: This can be definitelly cached but I didn't had enough time for that :(
  public findByCodes(codes: CurrencyCode[]): Promise<Currency[]> {
    return this.repository.findByIds(codes);
  }

  public mapToKeyValueObject(currencies: Currency[]): ICurrencyKeyValueObject {
    const keyValueObject = {};

    currencies.forEach(currency => {
      keyValueObject[currency.code] = currency;
    });

    return keyValueObject;
  }

  public exchange(amount: number, currencyRate: number): number {
    return Decimal
      .mul(amount, currencyRate)
      .toDecimalPlaces(2)
      .toNumber();
  }

  private transformEntitiesToUpdate(
    itemsToUpdate: ICurrencyRateDto[],
    currencies: Currency[],
  ): Currency[] {
    return itemsToUpdate.map(item => Object.assign(
      currencies.find(currency => currency.code === item.code) || new Currency(),
      item
    ));
  }
}