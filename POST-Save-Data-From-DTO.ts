/////////////////////////////////////////////////////CODE 1///////////////////////////////////////////////////

//Saving and Retrieving DTO Data in the Table


async notific(createNotificationDto: CreateNotificationDto) {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      const notifRepo = await queryRunner.manager.getRepository(Notification);
      const result = await notifRepo.save({
        userId : createNotificationDto.userId,
        shortTitle : createNotificationDto.shortTitle,
        notificationType : createNotificationDto.notificationType,
        message : createNotificationDto.message,
        createdBy : createNotificationDto.createdBy,
        url : createNotificationDto.url,
        imageUrl :  createNotificationDto.url 

      })
      await queryRunner.commitTransaction();
      const Result = await notifRepo.createQueryBuilder('N')
      .select([
        'N.id',
        'N.userId',
        'N.shortTitle',
        'N.notificationType',
        'N.message',
        'N.imageUrl',
        'N.createdBy',
        'N.isReaded'
      ])
        .where('N.id = :id', { id: result.id })
        .leftJoinAndSelect('N.profile', 'profile')
        .getOne()
      await this.realtimeGateway.notificationEvent(Result)
      return {message : commonMessage.create, data : Result}
    }
    catch(error){
      // console.log("//////////////////////////////////////////////////")
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error)
    }
    finally{
      await queryRunner.release()
    }
  }


                                    //DTO FILE


export class CreateNotificationDto {
    @ApiProperty()
    @IsNumber()
    userId : number

    @ApiProperty()
    @IsString()
    shortTitle : string

    @ApiProperty()
    @IsString()
    notificationType : string

    @ApiProperty()
    @IsString()
    message : string

    @ApiProperty()
    @IsNumber()
    createdBy : number

    @ApiProperty({required : false})
    @IsOptional()
    url : string

    @ApiProperty({required : false})
    @IsOptional()
    refId : string

    @ApiProperty()
    @IsOptional()
    imageUrl : string
}



/////////////////////////////////////////////////////CODE 2///////////////////////////////////////////////////


@Injectable()
export class SignupDeviceTokenService {

  constructor(
    private readonly connection: Connection
    )  {}

async createToken(CreateDeviceTokenDto: CreateDeviceTokenDto): Promise<ResponseDto> {
  const queryRunner = this.connection.createQueryRunner();
  await queryRunner.connect()
  await queryRunner.startTransaction()
  try {
    const repo = queryRunner.manager.getRepository(SignupDeviceToken);
    const result = await repo.save(CreateDeviceTokenDto)
  
   
    await queryRunner.commitTransaction()
    return { message: commonMessage.create, data: {result} };
  } 
  catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  }
   finally {
    await queryRunner.release();
  }
  }
  
