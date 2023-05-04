import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, ParseIntPipe } from '@nestjs/common';
import { PropertyWalletProjectService } from './property_wallet_project.service';
import { CreatePropertyWalletProjectStep1Dto, CreatePropertyWalletProjectStep2Dto, CreatePropertyWalletProjectStep3Dto, PropertyWalleSearchDto, UpdateDocumentStep2Dto} from './dto/create-property_wallet_project.dto';
import { UpdatePropertyWalletProjectStep1Dto, UpdatePropertyWalletProjectStep3Dto } from './dto/update-property_wallet_project.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { moduleType } from 'src/common/constant';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { hasModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';
@ApiTags('property-wallet-project')
@Controller({
  version : '1',
  path : 'property-wallet-project'
})

export class PropertyWalletProjectController {
  constructor(private readonly propertyWalletProjectService: PropertyWalletProjectService) {}

  @Post('/createProjectStep1')
  @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
  @UseInterceptors(TransformInterceptor)
  createProjectStep1(@Body() createPropertyWalletProjectStep1Dto: CreatePropertyWalletProjectStep1Dto) {
    return this.propertyWalletProjectService.createProjectStep1(createPropertyWalletProjectStep1Dto);
  }

  @Post('/createProjectStep2')
  @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    TransformInterceptor,
    FileFieldsInterceptor([
      { name: 'legalDocument', maxCount: 5 },
      { name: 'masterPlan', maxCount: 1 },
    ]),
  )

  createProjectStep2(
    @Body()
    createPropertyWalletProjectStep2Dto: CreatePropertyWalletProjectStep2Dto,
    @UploadedFiles()
    files: {
      legalDocument: Array<Express.Multer.File>
      masterPlan: Express.Multer.File
    }
  ){
      return this.propertyWalletProjectService.createProjectStep2(createPropertyWalletProjectStep2Dto,files);
    }

  
    @Post('/createProjectStep3')
    @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
      TransformInterceptor,
      FileFieldsInterceptor([
        { name: 'BuilderLogo', maxCount: 1 },
      ]),
    )
  
    createProjectStep3(
      @Body()
      createPropertyWalletProjectStep3Dto: CreatePropertyWalletProjectStep3Dto,
      @UploadedFiles()
      files: {
        BuilderLogo: Express.Multer.File
      }
    ){
        return this.propertyWalletProjectService.createProjectStep3(createPropertyWalletProjectStep3Dto,files);
      }



  // @Get('/getProjectDetailForStep1/:id')
  // @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
  // @UseInterceptors(TransformInterceptor)
  // getProjectStep1(@Param('id') id : number){
  //   return this.propertyWalletProjectService.getProjectDetailForStep1(+id)
  // }

  @Patch('/updateProjectStep1/:propertyWalletProjectId')
  @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
  updateProjectStep1(
    @Param('propertyWalletProjectId') propertyWalletProjectId : number,  
      @Body() updatePropertyWalletProjectStep1Dto : UpdatePropertyWalletProjectStep1Dto
    ){
    return this.propertyWalletProjectService.updateProjectStep1(propertyWalletProjectId, updatePropertyWalletProjectStep1Dto)
  }

  @Patch('/updateProjectStep2/:propertyWalletProjectId')
  @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    TransformInterceptor,
    FileFieldsInterceptor([
      { name: 'legalDocument', maxCount: 5 },
      { name : 'master' , maxCount : 1}
    ])
  )
  updateDocumentStep2(
    @Param('propertyWalletProjectId') propertyWalletProjectId : number,  
    @Body()
    updateDocumentStep2Dto: UpdateDocumentStep2Dto,
    @UploadedFiles()
    files: {
      legalDocument: Array<Express.Multer.File>
      master: Express.Multer.File
    }
  ){
      return this.propertyWalletProjectService.updateDocumentStep2( propertyWalletProjectId,updateDocumentStep2Dto,files);
    }


    @Patch('/updateProjectStep3/:propertyWalletProjectId')
    @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
      TransformInterceptor,
      FileFieldsInterceptor([
        { name: 'BuilderLogo', maxCount: 5 }
      ])
    )
    updateDocumentStep3(
      @Param('propertyWalletProjectId') propertyWalletProjectId : number,  
      @Body()
      updatePropertyWalletProjectStep3Dto: UpdatePropertyWalletProjectStep3Dto,
      @UploadedFiles()
      files: {
        BuilderLogo: Express.Multer.File
      }
    ){
        return this.propertyWalletProjectService.updateDocumentStep3( propertyWalletProjectId,updatePropertyWalletProjectStep3Dto,files);
      }




      @Get('getAll/property/wallet/Projects')
      @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
      @UseInterceptors(TransformInterceptor)
      getAllProjects(
        @Query() propertyWalleSearchDto: PropertyWalleSearchDto,
        @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
      ) {
    limit = limit > 100 ? 100 : limit;

        return this.propertyWalletProjectService.getAllProjects(page, limit ,propertyWalleSearchDto)
      }

      
      @Get('getAll/property/wallet/InventoriesByProject/:projectId')
      @hasModulePermission(moduleType.projectDetails,moduleType.newProject)
      @UseInterceptors(TransformInterceptor)
      getAllInventoriesByProject(
        @Param('projectId') projectId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
      ) {
    limit = limit > 100 ? 100 : limit;

        return this.propertyWalletProjectService.getAllInventoriesByProject(page, limit ,projectId)
      }
    
}
