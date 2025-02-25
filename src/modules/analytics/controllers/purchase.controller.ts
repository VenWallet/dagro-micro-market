import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FeaturedService } from '../services/featured.service';
import { RegisterInteractionDto } from '../dto/featured.dto';
import { PurchaseService } from '../services/purchase.service';
import { RegisterSaleDto } from '../dto/purchase.dto';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async registerSale(@Body() registerSaleDto: RegisterSaleDto) {
    return this.purchaseService.registerSale(registerSaleDto);
  }

  @Get()
  @ApiQuery({ name: 'user', required: true })
  async getPurchases(@Query('user') user: string) {
    return this.purchaseService.findAll();
  }
}
