import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletInventoryService } from './property_wallet_inventory.service';
import { CreatePropertyWalletInventoryDto, CreatePropertyWalletInventoryStep2Dto } from './dto/create-property_wallet_inventory.dto';
import { UpdatePropertyWalletInventoryDto } from './dto/update-property_wallet_inventory.dto';
import { ApiTags } from '@nestjs/swagger';
import { moduleType } from 'src/common/constant';
import { hasModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';



@ApiTags('Property-wallet-inventory')
@Controller({ 
  version: '1', 
  path: 'property-wallet-inventory'})
export class PropertyWalletInventoryController {
  constructor(private readonly propertyWalletInventoryService: PropertyWalletInventoryService) {}

  @Post('createPropertyWalletInventoryStep1')
  @hasModulePermission(moduleType.inventories)
  create(@Body() createPropertyWalletInventoryDto: CreatePropertyWalletInventoryDto) {
    return this.propertyWalletInventoryService.create(createPropertyWalletInventoryDto);
  }



  @Patch('updatePropertyWalletInventoryStep1/:propertyWalletInventoryId')
  @hasModulePermission(moduleType.inventories)
  update(@Param('propertyWalletInventoryId') propertyWalletInventoryId : number, 
  @Body() updatePropertyWalletInventoryDto : UpdatePropertyWalletInventoryDto
    ){
    return this.propertyWalletInventoryService.update(propertyWalletInventoryId, updatePropertyWalletInventoryDto);
  }

  @Post('createPropertyWalletInventoryStep2')
  @hasModulePermission(moduleType.inventories)
  createPropertyWalletInventoryStep2(@Body() createPropertyWalletInventoryStep2Dto: CreatePropertyWalletInventoryStep2Dto) {
    return this.propertyWalletInventoryService.createPropertyWalletInventoryStep2(createPropertyWalletInventoryStep2Dto);
  }

  @Post('updatePropertyWalletInventoryStep2')
  @hasModulePermission(moduleType.inventories)
  updatePropertyWalletInventoryStep2(@Body() createPropertyWalletInventoryStep2Dto : CreatePropertyWalletInventoryStep2Dto) {
    return this.propertyWalletInventoryService.updatePropertyWalletInventoryStep2(createPropertyWalletInventoryStep2Dto);
  }




  // @Get()
  // findAll() {
  //   return this.propertyWalletInventoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertyWalletInventoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePropertyWalletInventoryDto: UpdatePropertyWalletInventoryDto) {
  //   return this.propertyWalletInventoryService.update(+id, updatePropertyWalletInventoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propertyWalletInventoryService.remove(+id);
  // }
}
