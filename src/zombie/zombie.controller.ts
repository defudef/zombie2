import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from "@nestjs/common";
import { Zombie } from './zombie.entity';
import { ZombieService } from './zombie.service';
import { CreateZombieDto, UpdateZombieDto, IZombieWithPrices } from './zombie.interface';
import { UuidValidationPipe } from '../shared/validation-pipes/uuid.validation-pipe';
import { ApiResponseModelProperty, ApiUseTags, ApiResponse } from "@nestjs/swagger";

@ApiUseTags('zombie')
@Controller('zombie')
export class ZombieController {
  constructor(private readonly service: ZombieService) {}

  @Get()
  @ApiResponse({ 
    status: 200, 
    type: IZombieWithPrices, 
    description: 'List of zombies',
    isArray: true 
  })
  getList(): Promise<IZombieWithPrices[]> {
    return this.service.getList();
  }

  @Get(':id')
  @ApiResponse({ 
    status: 200, 
    type: IZombieWithPrices, 
    description: 'Found zombie', 
  })
  getOne(@Param('id', UuidValidationPipe) id: string): Promise<IZombieWithPrices> {
    return this.service.getOne(id);
  }

  @Post()
  @ApiResponse({ 
    status: 201, 
    type: Zombie, 
    description: 'Created zombies',
  })
  create(@Body() createDto: CreateZombieDto): Promise<Zombie> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ 
    status: 200, 
    type: Zombie, 
    description: 'Updated zombie',
  })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateDto: UpdateZombieDto,
  ): Promise<Zombie> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ 
    status: 204,  
    description: 'Zombie deleted successfully',
  })
  async delete(@Param('id', UuidValidationPipe) id: string): Promise<void> {
    await this.service.delete(id);
  }
}