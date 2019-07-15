import { Injectable, BadRequestException } from "@nestjs/common";
import { ConfigService } from 'nestjs-config';
import axios from 'axios';
import { IZombieItemDto, IZombieItem } from "./zombie-item.inteface";
import { InjectRepository } from "@nestjs/typeorm";
import { ZombieItem } from './zombie-item.entity';
import { Repository } from "typeorm";

@Injectable()
export class ZombieItemService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(ZombieItem) private readonly repository: Repository<ZombieItem>,
  ) {}

  public fetchItems(): Promise<IZombieItem[]> {
    return axios
      .get<IZombieItemDto>(this.config.get('config.zombieApiUrl'))
      .then(({ data }) => data.items);
  }

  public async createOrUpdateMany(items: IZombieItem[]): Promise<ZombieItem[]> {
    const entities = await this.repository.find();

    const entitiesToAdd = items
      .filter(item => !entities.find(entity => entity.id === item.id))
      .map(item => new ZombieItem({ ...item, isVisible: true }));

    const newEntities = entities.map(entity => {
      const foundEntity = items.find(item => item.id === entity.id);

      return {
        ...entity,
        price: foundEntity === undefined ? entity.price : foundEntity.price,
        isVisible: foundEntity !== undefined,
      }
    });

    return this.repository.save([
      ...newEntities,
      ...entitiesToAdd,
    ]);
  }

  public async transformIdsToObjects(itemsIds: number[]): Promise<ZombieItem[]> {
    const items = await this.repository.findByIds(itemsIds, {
      where: {
        isVisible: true,
      },
    });

    if (itemsIds.length !== items.length) {
      throw new BadRequestException('Some items are missing');
    }

    return items;
  }
}
