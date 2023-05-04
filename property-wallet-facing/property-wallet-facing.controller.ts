import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletFacingService } from './property-wallet-facing.service';
import { ApiTags } from '@nestjs/swagger';
import { hasModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';
import { CreatePropertyWalletFacingDto } from './dto/create-property-wallet-facing.dto';
import { moduleType } from 'src/common/constant';

@ApiTags('property-wallet-project-features')
@Controller({
  version : '1',
  path : 'property-wallet-facing'
})
export class PropertyWalletFacingController {
  constructor(private readonly propertyWalletFacingService: PropertyWalletFacingService) {}

  
  @Post('createFacing')
  @hasModulePermission(moduleType.inventories)
  createFacing(@Body() createPropertyWalletFacingDto: CreatePropertyWalletFacingDto) {
    return this.propertyWalletFacingService.createFacing(createPropertyWalletFacingDto);
  }


  @Get('getFacing/:propertyWalletInventoryId')
  @hasModulePermission(moduleType.inventories)
  getFacing(@Param('propertyWalletInventoryId') propertyWalletInventoryId: string) {
    return this.propertyWalletFacingService.getFacing(+propertyWalletInventoryId);
  }


  @Delete('removeFacing')
  @hasModulePermission(moduleType.inventories)
  removeFacing(@Body() createPropertyWalletFacingDto: CreatePropertyWalletFacingDto) {
    return this.propertyWalletFacingService.removeFacing(createPropertyWalletFacingDto);
  }




}
