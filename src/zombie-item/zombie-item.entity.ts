import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IZombieItem } from './zombie-item.inteface';
import { DecimalToNumberTransformer } from '../shared/transformers/decimal-to-number.transformer';

@Entity('zombie_item')
export class ZombieItem {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'decimal',
    precision: 2,
    scale: 10,
    transformer: new DecimalToNumberTransformer(),
  })
  price: number;

  @Column({ type: 'boolean' })
  isVisible: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  constructor(data?: IZombieItem) {
    if (!data) {
      return;
    }

    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.isVisible = data.isVisible || true;
  }
}
