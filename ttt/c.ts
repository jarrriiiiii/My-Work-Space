import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SaveAllPdfService } from './save-all-pdf.service';
import { CreateSaveAllPdfDto } from './dto/create-save-all-pdf.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { DateDto } from './dto/date-dto';


@ApiTags('save-all-pdf')
@Controller({version : '1', path : 'save-all-pdf'})
export class SaveAllPdfController {
  constructor(private readonly saveAllPdfService: SaveAllPdfService) {}

  

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    TransformInterceptor,
    FileFieldsInterceptor([
      { name: 'freeTool', maxCount: 1 },
    ]),
  )
  createPdf(@Body() createSaveAllPdfDto : CreateSaveAllPdfDto,
  @UploadedFiles() files: {
    freeTool: Express.Multer.File
  }
  ) {
    return this.saveAllPdfService.createPdf(createSaveAllPdfDto, files);
  }


  @Post('/getAllPDFByDate')
  getAllApi(@Body() dateDto: DateDto) { 
    return this.saveAllPdfService.getAllApi(dateDto);
  }

  
  @Delete('/DeletePDFByDate')
  deletePDF(@Body() dateDto: DateDto) {
    return this.saveAllPdfService.deletePDF(dateDto);
  }
  


}
