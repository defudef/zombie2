import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { IZombie } from './zombie.interface';
import { ZombieItem } from "../zombie-item/zombie-item.entity";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

@Entity('zombie')
export class Zombie {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @Column({ type: 'text', nullable: false })
  name: string;

  @ApiModelProperty()
  @ManyToMany(type => ZombieItem, { eager: true })
  @JoinTable()
  items: ZombieItem[];

  @ApiModelProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiModelPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  constructor(data?: IZombie) {
    if (!data) {
      return;
    }

    this.name = data.name;
    this.items = data.items;
  }
}