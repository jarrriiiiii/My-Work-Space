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
 //Saving arrays to the DB via loops and insert query
//Saving ProjectIds in the array and saving that array to the Database


  @noModulePermission()
  @UseInterceptors(TransformInterceptor)
  @Post('assign/Elounge')
  assignElounge(@Body() assignEloungeDto: AssignEloungeDto) {
    return this.eloungeService.assignElounge(assignEloungeDto);
  }





  async assignElounge(
    assignEloungeDto: AssignEloungeDto,
  ): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const assignUserEloungeRepo = await queryRunner.manager.getRepository(
        AssignUserElounge,
      );

      const alreadyAssignedCheck = await assignUserEloungeRepo
        .createQueryBuilder('assignUserElounge')
        .where('assignUserElounge.eLoungId = :eLoungId ', {
          eLoungId: assignEloungeDto.eLoungeId,
        })
        .andWhere('assignUserElounge.eLoungUserId IN(:...eLoungUserIds)', {
          eLoungUserIds: assignEloungeDto.eLoungUserId,
        }).getRawOne;

      if (alreadyAssignedCheck)
        throw new BadRequestException(
          'These users are already assigned to this eLounge',
        );

      const myArr = [];

      for (let i = 0; i < assignEloungeDto.eLoungUserId.length; i++) {
        myArr.push({
          eLoungeId: assignEloungeDto.eLoungeId,
          eLoungUserId: assignEloungeDto.eLoungUserId[i],
        });
      }

      const assignLoungeRes = await assignUserEloungeRepo
        .createQueryBuilder()
        .insert()
        .values(myArr)
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





export class AssignEloungeDto {
  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  eLoungUserId: number[];

  @ApiProperty()
  @IsNotEmpty()
  eLoungeId: number;
}

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Saving arrays to the DB via loops and insert query
//Saving ProjectIds in the array and saving that array to the Database
//MIGHT HAVE SOME ERRORS
  
      
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

----------------------------------------------------------------------------------------------------------------
//Saving arrays to the DB via loops and insert query using MAP
//Saving ProjectIds in the array and saving that array to the Database
  //MAP usage

    @Patch('/editDigitalCatalogue/:catalogueId')
  editDigitalCatalogue(
    @Param('catalogueId') catalogueId: number,
    @Body() updateCatalogueDto: UpdateCatalogueDto,
  ) {
    return this.catalogueService.editDigitalCatalogue(
      catalogueId,
      updateCatalogueDto,
    );
  }





  async editDigitalCatalogue(
    catalogueId: number,
    updateCatalogueDto: UpdateCatalogueDto,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const agencyDigitalCatalogueRepo = runner.manager.getRepository(
        AgencyDigitalCatalogue,
      );
      const cataloguePhotoRepo = runner.manager.getRepository(CataloguePhoto);
      const catalogueVideoRepo = runner.manager.getRepository(CatalogueVideo);

      const findCheck = await agencyDigitalCatalogueRepo.findOne({
        id: catalogueId,
      });

      if (findCheck.id) {
        if (updateCatalogueDto.photo && updateCatalogueDto.photo.length > 0) {
          await agencyDigitalCatalogueRepo.delete({ id: catalogueId });

          const photoData = [];
          updateCatalogueDto.photo.map((x) => {
            photoData.push({
              catalogueId: catalogueId,
              url: x,
            });
          });
          if (photoData.length > 0) {
            await cataloguePhotoRepo
              .createQueryBuilder()
              .insert()
              .values(photoData)
              .execute();
          }
        }

        if (updateCatalogueDto.video && updateCatalogueDto.video.length > 0) {
          await agencyDigitalCatalogueRepo.delete({ id: catalogueId });

          const videoData = [];
          updateCatalogueDto.video.map((x) => {
            videoData.push({
              catalogueId: catalogueId,
              url: x,
            });
          });

          if (videoData.length > 0) {
            await catalogueVideoRepo
              .createQueryBuilder()
              .insert()
              .values(videoData)
              .execute();
          }
        }
      } else {
        throw new BadRequestException(commonMessage.idNotFound);
      }
      await runner.commitTransaction();
      const result = await agencyDigitalCatalogueRepo.findOne({
        id: catalogueId,
      });

      return { message: commonMessage.update, data: result };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }



export class CreateCatalogueDto {
  @ApiProperty({ required: false })
  @IsArray()
  photo: string[];

  @ApiProperty({ required: false })
  @IsArray()
  video: string[];
}


----------------------------------------------------------------------------------------------------------------
//Saving arrays to the DB via loops and insert query using MAP

  //Dto

  export class WorkSheetFixedDetailDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  dayNames: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  workStartTimes: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  workEndTimes: Date;
}

export class WorkSheetFlexibleDetailDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  dayNames: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  hours: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  minutes: number;
}

export class CreateCompanyWorksheetDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', enum: WorkSheetTypeEnum, required: false })
  @IsNotEmpty()
  workSheetType: WorkSheetTypeEnum;

  @ApiProperty({
    type: [WorkSheetFixedDetailDto],
  })
  workSheetFixedDetailDto: WorkSheetFixedDetailDto[];

  @ApiProperty({
    type: [WorkSheetFlexibleDetailDto],
  })
  workSheetFlexibleDetailDto: WorkSheetFlexibleDetailDto[];
}


//Controller


  @CompanyModulePermission(CompanyModuleEnum.workSchedule)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({
    description: CompanyDescription.createCompanyWorksheet,
    summary: apiForSummary.companyUser,
  })
  @Post('/')
  createCompanyWorksheet(
    @Body() createCompanyWorksheetDto: CreateCompanyWorksheetDto,
  ) {
    return this.companyWorkSheetService.createCompanyWorksheet(
      createCompanyWorksheetDto,
    );
  }



//services

  async createCompanyWorksheet(
    createCompanyWorksheetDto: CreateCompanyWorksheetDto,
  ): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const workSheetFixedDetailRepo =
        queryRunner.manager.getRepository(WorkSheetFixedDetail);
      const workSheetFlexibleDetailRepo = queryRunner.manager.getRepository(
        WorkSheetFlexibleDetail,
      );
      const companyWorkSheetRepo =
        queryRunner.manager.getRepository(CompanyWorkSheet);
      const companyId = await this.companyAuthService.getCompanyId();

      const companyWorkSheetNewData = await companyWorkSheetRepo.save({
        companyId: companyId,
        title: createCompanyWorksheetDto.title,
      });

      if (createCompanyWorksheetDto.workSheetType === WorkSheetTypeEnum.Fixed) {
        const workSheetFixedDetailArray = [];
        for (
          let i = 0;
          i < createCompanyWorksheetDto.workSheetFixedDetailDto.length;
          i++
        ) {
          workSheetFixedDetailArray.push({
            companyWorkSheetId: companyWorkSheetNewData.id,
            dayName:
              createCompanyWorksheetDto.workSheetFixedDetailDto[i].dayNames,
            workStartTime:
              createCompanyWorksheetDto.workSheetFixedDetailDto[i]
                .workStartTimes,
            workEndTime:
              createCompanyWorksheetDto.workSheetFixedDetailDto[i].workEndTimes,
          });
        }

        await workSheetFixedDetailRepo
          .createQueryBuilder()
          .insert()
          .values(workSheetFixedDetailArray)
          .execute();
      } else {
        const workSheetFlexibleDetailArray = [];
        for (
          let i = 0;
          i < createCompanyWorksheetDto.workSheetFlexibleDetailDto.length;
          i++
        ) {
          workSheetFlexibleDetailArray.push({
            companyWorkSheetId: companyWorkSheetNewData.id,
            dayName:
              createCompanyWorksheetDto.workSheetFlexibleDetailDto[i].dayNames,
            hour: createCompanyWorksheetDto.workSheetFlexibleDetailDto[i].hours,
            minute:
              createCompanyWorksheetDto.workSheetFlexibleDetailDto[i].minutes,
          });
        }

        await workSheetFlexibleDetailRepo
          .createQueryBuilder()
          .insert()
          .values(workSheetFlexibleDetailArray)
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

  
