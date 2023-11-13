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
//Saving arrays to the DB via loops and insert query
//Saving ProjectIds in the array and saving that array to the Database
  
      
  @noModulePermission()
  @UseInterceptors(TransformInterceptor)
  @Post('/proCooAssign/Project')
  proCooAssignProject(@Body() createProCooAssignProjectDto: CreateProCooAssignProjectDto) {
    return this.proCooAssignProjectService.proCooAssignProject(createProCooAssignProjectDto)
  }






async proCooAssignProject(createProCooAssignProjectDto: CreateProCooAssignProjectDto): Promise<ResponseDto> {
  const queryRunner = this.connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const projectCoordinatorAssignProjectRepo = await queryRunner.manager.getRepository(ProjectCoordinatorAssignProject)


    const check = await projectCoordinatorAssignProjectRepo.createQueryBuilder('projectCoordinatorAssignProject')
    .where('projectCoordinatorAssignProject.propertyWalletProjectId IN(:...propertyWalletProjectId)', {propertyWalletProjectId: createProCooAssignProjectDto.propertyWalletProjectId})
    .andWhere('projectCoordinatorAssignProject.projectCoordinatorUserId = :projectCoordinatorUserId ', {projectCoordinatorUserId: createProCooAssignProjectDto.projectCoordinatorUserId})
    .getOne();

    if (check){
    throw new BadRequestException(`Project already assigned!`);
    }

    const proCooAssigned = [];

    for (let i = 0; i < createProCooAssignProjectDto.propertyWalletProjectId.length; i++) {
      proCooAssigned.push({
        projectCoordinatorUserId: createProCooAssignProjectDto.projectCoordinatorUserId,
        propertyWalletProjectId: createProCooAssignProjectDto.propertyWalletProjectId[i]
      });

    }

    const assignProCoo = await projectCoordinatorAssignProjectRepo.createQueryBuilder()
    .insert()
    .values(proCooAssigned)
    .execute();

    await queryRunner.commitTransaction();
    return { message: commonMessage.create, data: null };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  } finally {
    await queryRunner.release();
  }
}





export class CreateProCooAssignProjectDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  projectCoordinatorUserId: number;

  @ApiProperty({type: [Number],required: true})
  @IsNotEmpty()
  propertyWalletProjectId: number[];
}


