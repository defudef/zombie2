import { CurrencyCode } from "./currency-exchange.constant";
import { Currency } from './currency.entity';

export interface ICurrencyRateDto {
  currency: string;
  code: CurrencyCode;
  bid: number;
  ask: number;
}

export interface ICurrencyXmlDto {
  table: string;
  no: string;
  tradingDate: string;
  effectiveDate: string;
  rates: ICurrencyRateDto[];
}

export type ICurrencyKeyValueObject = { [code: string]: Currency };