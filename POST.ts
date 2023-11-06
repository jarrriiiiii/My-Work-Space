//Saving by Custom Object

@forAllUser()
  @UseInterceptors(TransformInterceptor)
  @Get('attendance/check')
  attendanceCheck(@Query() attendanceCheckDto: AttendanceCheckDto) {
    return this.loungeService.attendanceCheck(attendanceCheckDto);
  }


  async attendanceCheck(attendanceCheckDto: AttendanceCheckDto): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const loungeAttendanceRepo = queryRunner.manager.getRepository(LoungeAttendance);
      const user = await this.authService.getProDetail();

      const result = await loungeAttendanceRepo.save({
        loungeId: attendanceCheckDto.loungeId,
        sType: attendanceCheckDto.sType,
        userId: user.id,
      });

      await queryRunner.commitTransaction();
      return { message: commonMessage.create, data: result };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Saving by complete DTO
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
    
    

-------------------------------------------------------------------------------------------------------------------------------------
//Saving in the array using loops
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


