//Saving, storing, save, store, post through DTO Data in the Table database db entity, startTransaction, transaction
    
@Post('createTitle')
  createTitle(@Body() CreateDeviceTokenDto: CreateDeviceTokenDto) {
    return this.placementService.createToken(CreateDeviceTokenDto);
  }

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

    
    
    
    
    
   
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Save, post, store, data via through DTO in db table database, save by User ID, save by createdByAdmin, by using auth connection

    
    async createProductUtil(createPropertyWalletProductUtilDto: CreatePropertyWalletProductUtilDto): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
  
    try {
    const repo = queryRunner.manager.getRepository(PropertyWalletProductMultiUtilities);
    const userId = await this.adminAuth.getAdminUserId()
    const check = await repo.findOne(createPropertyWalletProductUtilDto)
     
      if(!check){
     createPropertyWalletProductUtilDto.createdByAdmin = userId
      const result = await repo.save(createPropertyWalletProductUtilDto)
      await queryRunner.commitTransaction()
      return { message: commonMessage.create, data: {result} };
      }

      throw(commonMessage.duplicateData)
    } 
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    }
     finally {
      await queryRunner.release();
    }
    }
    
 ----------------------------------------------------------------------------------------------------------------------------------------------
//Saving, storing, save, store, post, object, data in object, through DTO Data in the Table database db entity, startTransaction, transaction


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
      return {message : commonMessage.create, data : Result}
    }
    catch(error){
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error)
    }
    finally{
      await queryRunner.release()
    }
  }
    
    
    
    
    
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Saving, storing, save, store, post, object, data in object, through DTO Data in the Table database db entity, startTransaction, transaction, in multiple table database entity more than one entity
@Post('createPropertyWalletInventoryStep1')
@hasModulePermission(moduleType.inventories)
create(@Body() createPropertyWalletInventoryDto: CreatePropertyWalletInventoryDto) {
return this.propertyWalletInventoryService.create(createPropertyWalletInventoryDto);
  }

  async create(createPropertyWalletInventoryDto: CreatePropertyWalletInventoryDto): Promise<ResponseDto> {
  const queryRunner = this.connection.createQueryRunner();
  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    const repo = queryRunner.manager.getRepository(PropertyWalletInventory);
    const propertyWalletFilterationRepo = queryRunner.manager.getRepository(PropertyWalletFilteration);
    

    const userId = await this.adminAuth.getAdminUserId()
    createPropertyWalletInventoryDto['createdBy'] = userId

    const result = await repo.save(createPropertyWalletInventoryDto)
    await propertyWalletFilterationRepo.save({
      propertyWalletProjectId: createPropertyWalletInventoryDto.propertyWalletProjectId,
      propertyWalletInventoryId: result.id,
      projectTypeId: createPropertyWalletInventoryDto.projectTypeId,
      projectSubTypeId: createPropertyWalletInventoryDto.projectSubTypeId,
      landSize: createPropertyWalletInventoryDto.landSize,
      landAreaId: createPropertyWalletInventoryDto.landAreaId,
      price : createPropertyWalletInventoryDto.price
    })
    await queryRunner.commitTransaction()
    const data = await this.getProjectDetail(result.id)
    return { message: commonMessage.create, data: data};
  } 
  catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  }
   finally {
    await queryRunner.release();
  }
  } 









------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
