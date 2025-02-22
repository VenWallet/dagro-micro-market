import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FeaturedService } from '../services/featured.service';
import { RegisterInteractionDto } from '../dto/featured.dto';

@ApiTags('Featured')
@Controller('featured')
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) {}

  @Post()
  async registerInteraction(@Body() interactionDto: RegisterInteractionDto) {
    return this.featuredService.registerInteraction(interactionDto);
  }

  @Get()
  @ApiQuery({ name: 'user', required: true })
  async findFeatured(@Query('user') user: string) {
    return this.featuredService.findFeatured(user);
  }
}
