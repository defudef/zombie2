import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IZombieItem } from './zombie-item.inteface';
import { DecimalToNumberTransformer } from '../shared/transformers/decimal-to-number.transformer';
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

@Entity('zombie_item')
export class ZombieItem {
  @ApiModelProperty()
  @PrimaryColumn({ type: 'int' })
  id: number;

  @ApiModelProperty()
  @Column({ type: 'text' })
  name: string;

  @ApiModelProperty()
  @Column({
    type: 'decimal',
    precision: 2,
    scale: 10,
    transformer: new DecimalToNumberTransformer(),
  })
  price: number;

  @ApiModelProperty()
  @Column({ type: 'boolean' })
  isVisible: boolean;

  @ApiModelProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiModelPropertyOptional()
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
