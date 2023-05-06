import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Header } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';


@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}


  @Get('/excel')
  @Header('Content-Type', 'text/xlsx')
  async excel(@Res() res: Response) {

    let result = await this.excelService.excel()
    res.download(`${result}`)

  }
}