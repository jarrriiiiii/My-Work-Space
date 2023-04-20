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
  
