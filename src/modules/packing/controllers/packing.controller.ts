import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PackingService } from '../services/packing.service';
import { PackingDto, UpdatePackingDto } from '../dto/packing.dto';

@ApiTags('Packing')
@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  async create(@Body() body: PackingDto) {
    return this.packingService.create(body);
  }

  @Get()
  async findAll() {
    return this.packingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.packingService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdatePackingDto) {
    return this.packingService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.packingService.remove(id);
  }
}
