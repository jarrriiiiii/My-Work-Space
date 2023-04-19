@Injectable()
export class SaveAllPdfService {

  constructor(
    private readonly connection: Connection,
    private readonly fileUploadService:FileUploadService,
    )  {}
    

//This function deletes all PDF records that were created on a particular date. 
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
