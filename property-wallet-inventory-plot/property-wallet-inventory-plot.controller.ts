import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyWalletInventoryPlotService } from './property-wallet-inventory-plot.service';
import { CreatePropertyWalletInventoryPlotDto } from './dto/create-property-wallet-inventory-plot.dto';
import { ApiTags } from '@nestjs/swagger';
import { hasModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';
import { moduleType } from 'src/common/constant';


@ApiTags('property-wallet-inventory-plot')
@Controller({
  version : '1',
  path :'property-wallet-inventory-plot'
})
export class PropertyWalletInventoryPlotController {
  constructor(private readonly propertyWalletInventoryPlotService: PropertyWalletInventoryPlotService) {}


  @Get('GetAllPWInventoryPlot')
  @hasModulePermission(moduleType.inventories)
  GetAllPWInventoryPlot() {
    return this.propertyWalletInventoryPlotService.GetAllPWInventoryPlot();
  }


  @Post('CreatePWInventoryPlot')
  @hasModulePermission(moduleType.inventories)
  CreatePWInventoryPlot(@Body() createPropertyWalletInventoryPlotDto: CreatePropertyWalletInventoryPlotDto) {
    return this.propertyWalletInventoryPlotService.CreatePWInventoryPlot(createPropertyWalletInventoryPlotDto);
  }

  
  @Delete('DeletePWInventoryPlot/:id')
  @hasModulePermission(moduleType.inventories)
  DeletePWInventoryPlot(@Param('id') id: number){
    return this.propertyWalletInventoryPlotService.DeletePWInventoryPlot(+id);
  }

}
