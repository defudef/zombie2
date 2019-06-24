import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { IZombie } from './zombie.interface';
import { ZombieItem } from "../zombie-item/zombie-item.entity";

@Entity('zombie')
export class Zombie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToMany(type => ZombieItem, { eager: true })
  @JoinTable()
  items: ZombieItem[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

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