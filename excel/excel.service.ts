import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import {writeFile} from 'fs/promises';
import { data } from './data';



@Injectable()
export class ExcelService {


async excel(){
  if (!data) {
    throw new NotFoundException("error")
  }


  let rows  = []

  data.forEach(doc => {
    rows.push(Object.values(doc))
  })


//create wb
let book = new Workbook();

//add ws to wb
let sheet = book.addWorksheet('jerry')


//add header
rows.unshift(Object.keys(data[0]))


//add multi rows
sheet.addRows(rows)


let File = await new Promise((resolve, reject)=>{
  tmp.file({discardDescriptor: true, prefix: `MyExcelSheet`, postfix: '.xlsx', mode: parseInt('0600',8)}, async (err, file)=>{
    if (err)
    throw new BadRequestException(err);

    //write temp file
    book.xlsx.writeFile(file).then(_ => {
      resolve(file)
    }).catch(err => {
      throw new BadRequestException(err)
         })
        })
      })
        return File
  }
}

