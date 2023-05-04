import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletProductUtilsService } from './property-wallet-product-utils.service';
import { CreatePropertyWalletProductUtilDto } from './dto/create-property-wallet-product-util.dto';
import { UpdatePropertyWalletProductUtilDto } from './dto/update-property-wallet-product-util.dto';

@Controller('property-wallet-product-utils')
export class PropertyWalletProductUtilsController {
  constructor(private readonly propertyWalletProductUtilsService: PropertyWalletProductUtilsService) {}

  @Post()
  create(@Body() createPropertyWalletProductUtilDto: CreatePropertyWalletProductUtilDto) {
    return this.propertyWalletProductUtilsService.create(createPropertyWalletProductUtilDto);
  }

  @Get()
  findAll() {
    return this.propertyWalletProductUtilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyWalletProductUtilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyWalletProductUtilDto: UpdatePropertyWalletProductUtilDto) {
    return this.propertyWalletProductUtilsService.update(+id, updatePropertyWalletProductUtilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyWalletProductUtilsService.remove(+id);
  }
}
