import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from "@nestjs/common";
import { Zombie } from './zombie.entity';
import { ZombieService } from './zombie.service';
import { CreateZombieDto, UpdateZombieDto, IZombieWithPrices } from './zombie.interface';
import { UuidValidationPipe } from '../shared/validation-pipes/uuid.validation-pipe';

@Controller('zombie')
export class ZombieController {
  constructor(private readonly service: ZombieService) {}

  @Get()
  getList(): Promise<IZombieWithPrices[]> {
    return this.service.getList();
  }

  @Post()
  create(@Body() createDto: CreateZombieDto): Promise<Zombie> {
    return this.service.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateDto: UpdateZombieDto,
  ): Promise<Zombie> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', UuidValidationPipe) id: string): Promise<void> {
    await this.service.delete(id);
  }
}