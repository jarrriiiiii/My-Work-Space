import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletUtilsService } from './property-wallet-utils.service';
import { CreatePropertyWalletUtilDto } from './dto/create-property-wallet-util.dto';
import { UpdatePropertyWalletUtilDto } from './dto/update-property-wallet-util.dto';
import { ApiTags } from '@nestjs/swagger';
import { hasModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';
import { moduleType } from 'src/common/constant';

@ApiTags('property-wallet-project-features')
@Controller({
  version : '1',
  path : 'property-wallet-utils'
})
export class PropertyWalletUtilsController {
  constructor(private readonly propertyWalletUtilsService: PropertyWalletUtilsService) {}

  @Post('createUtil')
  @hasModulePermission(moduleType.inventories)
  createUtil(@Body() createPropertyWalletUtilDto: CreatePropertyWalletUtilDto) {
    return this.propertyWalletUtilsService.createUtil(createPropertyWalletUtilDto);
  }


  @Get('getUtil/:propertyWalletInventoryId')
  @hasModulePermission(moduleType.inventories)
  getUtil(@Param('propertyWalletInventoryId') propertyWalletInventoryId: string) {
    return this.propertyWalletUtilsService.getUtil(+propertyWalletInventoryId);
  }


  @Delete('removeUtil')
  @hasModulePermission(moduleType.inventories)
  removeUtil(@Body() createPropertyWalletUtilDto: CreatePropertyWalletUtilDto) {
    return this.propertyWalletUtilsService.removeUtil(createPropertyWalletUtilDto);
  }

  
}
