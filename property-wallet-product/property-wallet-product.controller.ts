import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletProductService } from './property-wallet-product.service';
import { CreatePropertyWalletProductStep1Dto, CreatePropertyWalletProductStep2Dto } from './dto/create-property-wallet-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { hasModulePermission } from '../../admin-user-auth/admin-guards/adminPermission.decorator';
import { moduleType } from 'src/common/constant';
import { CreatePropertyWalletInventoryStep2Dto } from 'src/admin/property_wallet_project_detail/property_wallet_inventory/dto/create-property_wallet_inventory.dto';

@ApiTags('property-wallet-product')
@Controller({
  version : '1',
  path : 'property-wallet-product'
})
export class PropertyWalletProductController {
  constructor(private readonly propertyWalletProductService: PropertyWalletProductService) {}

  @Post('createPropertyWalletProductStep1')
  @hasModulePermission(moduleType.inventories)
  createPropertyWalletProductStep1(@Body() createPropertyWalletProductStep1Dto: CreatePropertyWalletProductStep1Dto) {
    return this.propertyWalletProductService.createPropertyWalletProductStep1(createPropertyWalletProductStep1Dto);
  }

  @Post('updatePropertyWalletProductStep1/:inventoryId')
  @hasModulePermission(moduleType.inventories)
  updatePropertyWalletProductStep1(@Param('inventoryId') inventoryId : number,@Body() createPropertyWalletProductStep1Dto: CreatePropertyWalletProductStep1Dto) {
    return this.propertyWalletProductService.updatePropertyWalletProductStep1(+inventoryId,createPropertyWalletProductStep1Dto);
  }


  @Post('createPropertyWalletProductStep2')
  @hasModulePermission(moduleType.inventories)
  createPropertyWalletProductStep2(@Body() createPropertyWalletProductStep2Dto: CreatePropertyWalletProductStep2Dto) {
    return this.propertyWalletProductService.createPropertyWalletProductStep2(createPropertyWalletProductStep2Dto);
  }

  @Patch('updatePropertyWalletProductStep2')
  @hasModulePermission(moduleType.inventories)
  updatePropertyWalletInventoryStep2(@Body() createPropertyWalletProductStep2Dto : CreatePropertyWalletProductStep2Dto) {
    return this.propertyWalletProductService.updatePropertyWalletProductStep2(createPropertyWalletProductStep2Dto);
  }
}
