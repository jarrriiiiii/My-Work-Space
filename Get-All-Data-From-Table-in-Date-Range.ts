@Injectable()
export class SaveAllPdfService {

  constructor(
    private readonly connection: Connection,
    private readonly fileUploadService:FileUploadService,
    )  {}
    

//This code retrieves all records from the SaveAllPdf table that were created within a given date range.
async getAllApi(dateDto):Promise<ResponseDto> {
  try {

const start = new Date(dateDto.date);
start.setHours(0, 0, 0, 0);
const end = new Date(start);
end.setDate(start.getDate() + 1);


    const getAll = getRepository(SaveAllPdf)
    const Result = getAll.createQueryBuilder('get')
    .where(`get.createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
    const data = await Result.getMany();
    return { message: commonMessage.get, data: data };


  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
  }
