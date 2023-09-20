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
  @Post('createProductUtil')
  @hasModulePermission(moduleType.propertiesDetails,moduleType.singleProperty)
  @UseInterceptors(TransformInterceptor)
  createProductUtil(@Body() createPropertyWalletProductUtilDto: CreatePropertyWalletProductUtilDto) {
    return this.propertyWalletProductUtilsService.createProductUtil(createPropertyWalletProductUtilDto);
  }
    
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








 ----------------------------------------------------------------------------------------------------------------------------------------------
//Saving, storing, save, store, post, object, data in object, through DTO Data in the Table database db entity, startTransaction, transaction
//get data, retrieve data, from other tables, by id, left joins
//binding data in object, saving save object in the db, bind data in object,
//conditional enum saving
     
    @Post('createPWIWebPayment')
  createPWPWebPayment(@Body() createPwiWebPaymentInfoDto: CreatePwiWebPaymentInfoDto) {
    return this.pwiWebPaymentInfoService.createPWIWebPayment(createPwiWebPaymentInfoDto);
  }



      async createPWIWebPayment(createPwiWebPaymentInfoDto: CreatePwiWebPaymentInfoDto): Promise<ResponseDto> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()
        
        
        try {
          const PWIFinalizeSaleStageRepo = queryRunner.manager.getRepository(PropertyWalletInventoryFinalizeSaleStage);
          const PWIFinalizeSaleStageResult = PWIFinalizeSaleStageRepo.createQueryBuilder('fs')
          .select([
            'fs.amount',
            'fs.status',
            'fs.blinqInvoiceId',

            'blinqInvoice.ClickToPayUrl',
            'propertyWalletInventoryFinalizeSale.id',
            'propertyWalletInventorySaleQuotation.phone',
          ])
          
          .where('fs.id = :propertyWalletInventoryFinalizeSaleId',{propertyWalletInventoryFinalizeSaleId: createPwiWebPaymentInfoDto.propertyWalletInventoryFinalizeSaleStageId})
  
        
          .leftJoin('fs.blinqInvoice','blinqInvoice')
          .leftJoin('fs.propertyWalletInventoryFinalizeSale','propertyWalletInventoryFinalizeSale')
          .leftJoin('propertyWalletInventoryFinalizeSale.propertyWalletInventorySaleQuotation','propertyWalletInventorySaleQuotation')

          const data = await PWIFinalizeSaleStageResult.getOne();
  
        
          const PwiWebPaymentInfoRepo = queryRunner.manager.getRepository(PwiWebPaymentInfo);
          const PwiAdminPaymentAssistanceRequestRepo = queryRunner.manager.getRepository(PwiAdminPaymentAssistanceRequest);
         
          
        if(!data.blinqInvoiceId || !data.blinqInvoice.ClickToPayUrl){
          throw new BadRequestException(commonMessage.BlinqIdNotFound)
        }

        if (createPwiWebPaymentInfoDto.type === PayFor.PAYBYCUSTOMER) {
          const webPaymentObj = {
            amount : data?.amount,
            status : data?.status,
            propertyWalletInventoryFinalizeSaleStageId :createPwiWebPaymentInfoDto.propertyWalletInventoryFinalizeSaleStageId,
            phoneNo : data?.propertyWalletInventoryFinalizeSale?.propertyWalletInventorySaleQuotation?.phone,
            url : data.blinqInvoice?.ClickToPayUrl ,
            blinqInvoiceId : data?.blinqInvoiceId,
            code : await this.generateCode()
          }

          const result = await PwiWebPaymentInfoRepo.save(webPaymentObj)
          await queryRunner.commitTransaction()
          return { message: commonMessage.create, data: result};
          
        }

        if (createPwiWebPaymentInfoDto.type === PayFor.REQUESTASSISTANCE) {

          const assistanceRequestObj = {
            amount : data.amount,
            status : data.status,
            phone : data.propertyWalletInventoryFinalizeSale.propertyWalletInventorySaleQuotation.phone,
            blinqUrl : data.blinqInvoice.ClickToPayUrl,
            blinqInvoiceId : data.blinqInvoiceId,
            randomCode : await this.generateCode()
          }

          const result = await PwiAdminPaymentAssistanceRequestRepo.save(assistanceRequestObj)
          await queryRunner.commitTransaction()
          return { message: commonMessage.create, data: result};
        }
      }
  
        catch (error) {
          await queryRunner.rollbackTransaction();
          throw new InternalServerErrorException(error);
        }
         finally {
          await queryRunner.release();
        }
    }



-------------------------------------------------------------------------------------------------------------------------------------
    //Saving data according to the user's input and choice and selection, making object, using enum selection
      @Post('createPWIWebPayment')
  createPWPWebPayment(@Body() createPwiWebPaymentInfoDto: CreatePwiWebPaymentInfoDto) {
    return this.pwiWebPaymentInfoService.createPWIWebPayment(createPwiWebPaymentInfoDto);
  }



      async createPWIWebPayment(createPwiWebPaymentInfoDto: CreatePwiWebPaymentInfoDto): Promise<ResponseDto> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()
        
        
        try {
          const PWIFinalizeSaleStageRepo = queryRunner.manager.getRepository(PropertyWalletInventoryFinalizeSaleStage);
          const PWIFinalizeSaleStageResult = PWIFinalizeSaleStageRepo.createQueryBuilder('fs')
          .select([
            'fs.amount',
            'fs.status',
            'fs.blinqInvoiceId',

            'blinqInvoice.ClickToPayUrl',
            'propertyWalletInventoryFinalizeSale.id',
            'propertyWalletInventorySaleQuotation.phone',
          ])
          
          .where('fs.id = :propertyWalletInventoryFinalizeSaleId',{propertyWalletInventoryFinalizeSaleId: createPwiWebPaymentInfoDto.propertyWalletInventoryFinalizeSaleStageId})
  
        
          .leftJoin('fs.blinqInvoice','blinqInvoice')
          .leftJoin('fs.propertyWalletInventoryFinalizeSale','propertyWalletInventoryFinalizeSale')
          .leftJoin('propertyWalletInventoryFinalizeSale.propertyWalletInventorySaleQuotation','propertyWalletInventorySaleQuotation')

          const data = await PWIFinalizeSaleStageResult.getOne();
  
        
          const PwiWebPaymentInfoRepo = queryRunner.manager.getRepository(PwiWebPaymentInfo);
          const PwiAdminPaymentAssistanceRequestRepo = queryRunner.manager.getRepository(PwiAdminPaymentAssistanceRequest);
         
          
        if(!data.blinqInvoiceId || !data.blinqInvoice.ClickToPayUrl){
          throw new BadRequestException(commonMessage.BlinqIdNotFound)
        }

        if (createPwiWebPaymentInfoDto.type === PayFor.PAYBYCUSTOMER) {
          const webPaymentObj = {
            amount : data?.amount,
            status : data?.status,
            propertyWalletInventoryFinalizeSaleStageId :createPwiWebPaymentInfoDto.propertyWalletInventoryFinalizeSaleStageId,
            phoneNo : data?.propertyWalletInventoryFinalizeSale?.propertyWalletInventorySaleQuotation?.phone,
            url : data.blinqInvoice?.ClickToPayUrl ,
            blinqInvoiceId : data?.blinqInvoiceId,
            code : await this.generateCode()
          }

          const result = await PwiWebPaymentInfoRepo.save(webPaymentObj)
          await queryRunner.commitTransaction()
          return { message: commonMessage.create, data: result};
          
        }

        if (createPwiWebPaymentInfoDto.type === PayFor.REQUESTASSISTANCE) {

          const assistanceRequestObj = {
            amount : data.amount,
            status : data.status,
            phone : data.propertyWalletInventoryFinalizeSale.propertyWalletInventorySaleQuotation.phone,
            blinqUrl : data.blinqInvoice.ClickToPayUrl,
            blinqInvoiceId : data.blinqInvoiceId,
            randomCode : await this.generateCode()
          }

          const result = await PwiAdminPaymentAssistanceRequestRepo.save(assistanceRequestObj)
          await queryRunner.commitTransaction()
          return { message: commonMessage.create, data: result};
        }
      }
  
        catch (error) {
          await queryRunner.rollbackTransaction();
          throw new InternalServerErrorException(error);
        }
         finally {
          await queryRunner.release();
        }
    }


-------------------------------------------------------------------------------------------------------------------------------------
//applying user check, saving data from multiple tables entities, loops, saving array in entities, entity, array query to insert array in table entity
    //API is for user selection and preference buttons from the front end
  async createUserPreference(createUserPreferenceDto: CreateUserPreferenceDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const UserPreferenceRepo = await queryRunner.manager.getRepository(UserPreference);
      const PfPropertyTypeRepo = await queryRunner.manager.getRepository(PfPropertyType);
      const PfLocationRepo = await queryRunner.manager.getRepository(PfLocation);

      const userId = this.authService.getUserId();
      const usercheck = await UserPreferenceRepo.findOne({ userId: userId });

      if (usercheck) {
        await PfPropertyTypeRepo.softDelete({ userPreferenceId: usercheck.id });
        await PfLocationRepo.softDelete({ userPreferenceId: usercheck.id });


        for (let i = 0;i < createUserPreferenceDto.CreateUserPreferenceSubcategoryDto.length;i++) {
          createUserPreferenceDto.CreateUserPreferenceSubcategoryDto[i]['userPreferenceId'] = usercheck.id;
        }


        for (let i = 0;i < createUserPreferenceDto.CreateUserPreferenceLocationDto.length;i++) {
          createUserPreferenceDto.CreateUserPreferenceLocationDto[i]['userPreferenceId'] = usercheck.id;
        }

        await PfPropertyTypeRepo.createQueryBuilder('pfp')
          .insert()
          .values(createUserPreferenceDto.CreateUserPreferenceSubcategoryDto)
          .execute();

        await PfLocationRepo.createQueryBuilder('pfl')
          .insert()
          .values(createUserPreferenceDto.CreateUserPreferenceLocationDto)
          .execute();


          const result = await UserPreferenceRepo.update({id: usercheck.id}, {
            userId: userId,
            isConfigured: createUserPreferenceDto.isConfigured ? createUserPreferenceDto.isConfigured : false,
            isSell: createUserPreferenceDto.isSell ? createUserPreferenceDto.isSell : false,
            isRent: createUserPreferenceDto.isRent ? createUserPreferenceDto.isRent : false,
            isPrice: createUserPreferenceDto.isPrice ? createUserPreferenceDto.isPrice : false,
            isLocations: createUserPreferenceDto.isLocations ? createUserPreferenceDto.isLocations : false,
            isCommission: createUserPreferenceDto.isCommission ? createUserPreferenceDto.isCommission : false,
          });


      } 
            
      else {
        const result = await UserPreferenceRepo.save({
          userId: userId,
          isConfigured: createUserPreferenceDto.isConfigured ? createUserPreferenceDto.isConfigured : false,
          isSell: createUserPreferenceDto.isSell ? createUserPreferenceDto.isSell : false,
          isRent: createUserPreferenceDto.isRent ? createUserPreferenceDto.isRent : false,
          isPrice: createUserPreferenceDto.isPrice ? createUserPreferenceDto.isPrice : false,
          isLocations: createUserPreferenceDto.isLocations ? createUserPreferenceDto.isLocations : false,
          isCommission: createUserPreferenceDto.isCommission ? createUserPreferenceDto.isCommission : false,
        });

        for (let i = 0; i < createUserPreferenceDto.CreateUserPreferenceSubcategoryDto.length; i++) {
          createUserPreferenceDto.CreateUserPreferenceSubcategoryDto[i]['userPreferenceId'] = result.id;
        }

        for (let i = 0;i < createUserPreferenceDto.CreateUserPreferenceLocationDto.length;i++) {
          createUserPreferenceDto.CreateUserPreferenceLocationDto[i]['userPreferenceId'] = result.id;
        }

        await PfPropertyTypeRepo.createQueryBuilder('pfp')
          .insert()
          .values(createUserPreferenceDto.CreateUserPreferenceSubcategoryDto)
          .execute();

        await PfLocationRepo.createQueryBuilder('pfl')
          .insert()
          .values(createUserPreferenceDto.CreateUserPreferenceLocationDto)
          .execute();
      }

      await queryRunner.commitTransaction();
      return { message: commonMessage.create, data: {} };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
