//This code declares an object called bucket, which has two properties: bucket and prefix. This object is used to configure an AWS S3 bucket where files are uploaded and stored.
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
    


//This code creates a new PDF and saving it to an AWS S3 bucket.
    async createPdf(createSaveAllPdfDto: CreateSaveAllPdfDto, files): Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
        const file = files.freeTool[0]
        const path = '/image'
    
        const Repo = queryRunner.manager.getRepository(SaveAllPdf)
       


        const time = new Date().getTime(); //This retrieves current timestamp to generate a unique filename for the file being uploaded.
        const s3 = new S3(); // This creates a new instance of the S3 class, which is provided by the AWS SDK for JavaScript, and initializes it with any necessary configuration, such as AWS credentials and region.
        const Result = await s3
    
        .upload({
        Bucket: bucket.bucket, //Bucket (the name of the S3 bucket)
        Body: file.buffer, //Body (the contents of the file being uploaded)
        Key: bucket.prefix + 'name' + '-' + time + ".png", //Key (the unique filename for the file being uploaded)
        }).promise();


        //This line of code saves a new record to the database
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

}





//////////////////CONTROLLER FILE


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
