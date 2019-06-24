import { CurrencyCode } from "./currency-exchange.constant";

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