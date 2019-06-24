import { ZombieItem } from '../zombie-item/zombie-item.entity';
import { MinLength, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateZombieDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  items?: number[];
}

export class UpdateZombieDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsArray({ each: true })
  items?: number[];
}

export interface IZombie {
  name: string;
  items?: ZombieItem[];
}

export interface IZombieWithPrices {
  name: string;
  prices: {
    PLN: number;
    EUR: number;
    USD: number;
  },
  items?: ZombieItem[];
}
