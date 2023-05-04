import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletProductFacingService } from './property-wallet-product-facing.service';
import { CreatePropertyWalletProductFacingDto } from './dto/create-property-wallet-product-facing.dto';
import { UpdatePropertyWalletProductFacingDto } from './dto/update-property-wallet-product-facing.dto';

@Controller('property-wallet-product-facing')
export class PropertyWalletProductFacingController {
  constructor(private readonly propertyWalletProductFacingService: PropertyWalletProductFacingService) {}

  @Post()
  create(@Body() createPropertyWalletProductFacingDto: CreatePropertyWalletProductFacingDto) {
    return this.propertyWalletProductFacingService.create(createPropertyWalletProductFacingDto);
  }

  @Get()
  findAll() {
    return this.propertyWalletProductFacingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyWalletProductFacingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyWalletProductFacingDto: UpdatePropertyWalletProductFacingDto) {
    return this.propertyWalletProductFacingService.update(+id, updatePropertyWalletProductFacingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyWalletProductFacingService.remove(+id);
  }
}
