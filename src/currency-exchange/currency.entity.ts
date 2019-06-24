import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { CurrencyCode } from "./currency-exchange.constant";
import { ICurrencyRateDto } from "./currency-exchange.interface";
import { DecimalToNumberTransformer } from '../shared/transformers/decimal-to-number.transformer';

@Entity('currency')
export class Currency {
  @PrimaryColumn({ type: 'text' })
  code: CurrencyCode;

  @Column({ type: 'text' })
  currency: string;

  @Column({
    type: 'decimal',
    scale: 10,
    precision: 2,
    transformer: new DecimalToNumberTransformer(),
  })
  bid: number;

  @Column({
    type: 'decimal',
    scale: 10,
    precision: 2,
    transformer: new DecimalToNumberTransformer(),
  })
  ask: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  constructor(data?: ICurrencyRateDto) {
    if (!data) {
      return;
    }

    this.code = data.code;
    this.currency = data.currency;
    this.bid = data.bid;
    this.ask = data.ask;
  }
}
