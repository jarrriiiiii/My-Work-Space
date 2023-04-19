import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSaveAllPdfDto } from './dto/create-save-all-pdf.dto';
import { UpdateSaveAllPdfDto } from './dto/update-save-all-pdf.dto';
import { commonMessage } from 'src/common/messages';
import { ResponseDto } from 'src/common/response.dto';
import { Connection, getRepository } from 'typeorm';
import { SaveAllPdf } from './entities/save-all-pdf.entity';
import { FileUploadService } from 'src/common/fileUpload.service';
import { S3 } from 'aws-sdk';
import moment from 'moment';
import { DateDto } from './dto/date-dto';

const bucket = {
  bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
  prefix : process.env.AWS_BUCKET_PREFIX
}
@Injectable()
export class SaveAllPdfService {

  constructor(
    private readonly connection: Connection,
    private readonly fileUploadService:FileUploadService,
    )  {}
    
    async Uploader(file,name,extension){
      const path = 'image/'
      const time = new Date().getTime();
      const s3 = new S3();
      const Result = await s3
          .upload({
          Bucket: bucket.bucket,
          Body: file.buffer,
          Key: bucket.prefix + path + name + '-' + time +'.'+ extension,
          }).promise();
      
          return Result.Location
    }


    async createPdf(createSaveAllPdfDto: CreateSaveAllPdfDto, files): Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
        const file = files.freeTool[0]
        const path = '/image'
        // console.log(files.freeTool,createSaveAllPdfDto)
        const Repo = queryRunner.manager.getRepository(SaveAllPdf)
        // const name = file.originalname.split('.')[0];
        const time = new Date().getTime();
        const s3 = new S3();
        const Result = await s3
        .upload({
        Bucket: bucket.bucket,
        Body: file.buffer,
        Key: bucket.prefix + 'name' + '-' + time + ".png",
        }).promise();
        // console.log(Result)
        
        const result = await Repo.save({status : createSaveAllPdfDto.status,refId : Result.Key, url: Result.Location})
          
        await queryRunner.commitTransaction()
        return { message: commonMessage.create, data: result }
      }
      catch (error) {
        await queryRunner.rollbackTransaction()
        console.log(error)
        throw new InternalServerErrorException(error)
      }
      finally {
        await queryRunner.release()
      }
    }


//   async getAllApi(date):Promise<ResponseDto> {
//     try {
// console.log(date)
// const start = new Date(date);
//   start.setHours(0, 0, 0, 0);
//   const end = new Date(start);
//   end.setDate(start.getDate() + 1);
//   console.log(start , end)
//       const getAll = getRepository(SaveAllPdf)
//       const Result = getAll.createQueryBuilder('get')


//       .where(`get.createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
//       const data = await Result.getMany();
//       return { message: commonMessage.get, data: data };


//     } catch (error) {
//       throw new InternalServerErrorException(error);
//     }
//   }




async getAllApi(dateDto):Promise<ResponseDto> {
  try {
// console.log(dateDto)
const start = new Date(dateDto.date);
start.setHours(0, 0, 0, 0);
const end = new Date(start);
end.setDate(start.getDate() + 1);
// console.log(start , end)
    const getAll = getRepository(SaveAllPdf)
    const Result = getAll.createQueryBuilder('get')


    .where(`get.createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
    const data = await Result.getMany();
    return { message: commonMessage.get, data: data };


  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}



  async deletePDF(dateDto : DateDto):Promise<ResponseDto> {{
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
     
      //  console.log(dateDto.date)
        const start = new Date(dateDto.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        // console.log(start , end)
            const getAll = getRepository(SaveAllPdf)


            const Result = getAll.createQueryBuilder('get')
            .where(`get.createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
            
            const data = await Result.getMany() 
            data.map(async (x)=>{
              await  getAll.delete({id: x.id})
            })
  
      await queryRunner.commitTransaction();
      return {message : commonMessage.delete , data : null}
  
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    }
    finally {
      await queryRunner.release();
    }
  }
}
}

