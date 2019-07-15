import { ZombieItem } from '../zombie-item/zombie-item.entity';
import { MinLength, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IApiModelPropertyMetadata } from 'shared/shared.interface';

const nameProperties: IApiModelPropertyMetadata = {
  description: 'Name of the Zombie',
  type: ['string'],
  example: 'Zombie boy',
}

const itemsProperties: IApiModelPropertyMetadata = {
  description: 'Integer IDs of zombie items',
  isArray: true,
  type: ['number'],
  example: [1,2,3,4],
};

export class CreateZombieDto {
  @ApiModelProperty(nameProperties)
  @IsString()
  @MinLength(3)
  name: string;

  @ApiModelPropertyOptional(itemsProperties)
  @IsOptional()
  items?: number[];
}

export class UpdateZombieDto {
  @ApiModelPropertyOptional(nameProperties)
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiModelPropertyOptional(itemsProperties)
  @IsOptional()
  @IsArray({ each: true })
  items?: number[];
}

export interface IZombie {
  name: string;
  items?: ZombieItem[];
}

export class IZombiePrices {
  @ApiModelProperty()
  PLN: number;

  @ApiModelProperty()
  EUR: number;
  
  @ApiModelProperty()
  USD: number;
}

export class IZombieWithPrices {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  prices: IZombiePrices;

  @ApiModelPropertyOptional(itemsProperties)
  items?: ZombieItem[];
}
