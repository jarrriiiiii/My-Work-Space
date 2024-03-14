  @noModulePermission()
  @UseInterceptors(TransformInterceptor)
  @Patch('/updateManualNotification/:id')
  updateManualNotification(@Param('id') id : number, @Body() updateManualNotificationDto : UpdateManualNotificationDto){
    return this.manualNotificationService.updateManualNotification(id, updateManualNotificationDto)
  }


  async updateManualNotification(id: number, updateManualNotificationDto : UpdateManualNotificationDto): Promise<ResponseDto> {

    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const repo = runner.manager.getRepository(ManualNotification);

      const findCkeck = await repo.findOne({ id: id });
      if (findCkeck.id) {
        await repo.update(id, updateManualNotificationDto);
      }else {
        throw new BadRequestException(commonMessage.idNotFound)
      }
      await runner.commitTransaction();
      const result = await repo.findOne({ id: id });

      return { message: commonMessage.update , data : result };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }finally {
      await runner.release();
    }
  }

//////////////////////////////////////////////////////////////////////////////////////
@Patch('/invoiceIsPaidCallBack/:InvoiceNumber')
  invoiceIsPaidCallBack(@Param('InvoiceNumber') InvoiceNumber: string) {
    return this.blinqIntegrationService.invoiceIsPaidCallBack(InvoiceNumber);
  }

async invoiceIsPaidCallBack(InvoiceNumber : string): Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      queryRunner.startTransaction()
      try {
        const invoiceRepo = queryRunner.manager.getRepository(BlinqInvoice)
        const result = await invoiceRepo.update({InvoiceNumber: InvoiceNumber }, {isPaid: true})
        queryRunner.commitTransaction()  
        return { message: commonMessage.get, data: result };

      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
---------------------------------------------------------------------------------------------------
//Update by DTO

  @forAllUser()
  @Patch('/updateListing/IsSoldCheck')
  updateListingIsSoldCheck(@Body() updateIsSoldCheckDto: UpdateIsSoldCheckDto) {
    return this.agencyService.updateListingIsSoldCheck(updateIsSoldCheckDto);
  }

 async updateListingIsSoldCheck(updateIsSoldCheckDto: UpdateIsSoldCheckDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let data;
      if (updateIsSoldCheckDto.listingName === listingEnums.listing) {
        const Listingrepo = queryRunner.manager.getRepository(Listing);

        data = await Listingrepo.update(updateIsSoldCheckDto.id, {
          isSold: true,
        });
      } else if (updateIsSoldCheckDto.listingName === listingEnums.hotListing) {
        const HotListingRepo = queryRunner.manager.getRepository(HotListing);

        data = await HotListingRepo.update(updateIsSoldCheckDto.id, {
          isSold: true,
        });
      }

      await queryRunner.commitTransaction();
      return { message: commonMessage.update, data: null };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }



export class UpdateIsSoldCheckDto {
  @ApiProperty({ required: false })
  @IsOptional()
  id: number;

  @ApiProperty({ enum: listingEnums })
  listingName: listingEnums;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Patch API, Ssve by array and map

export class PaymobInvoiceDto {
  @IsArray()
  @IsString({ each: true })
  item: string[];

  @ApiProperty({ required: false })
  @IsArray()
  photo: string[];

  @ApiProperty({ required: false })
  @IsArray()
  video: string[];

  
}


@Patch('/editDigitalCatalogue/:catalogueId')
editDigitalCatalogue(@Param('catalogueId') catalogueId: number, @Body() updateCatalogueDto: UpdateCatalogueDto) {
  return this.catalogueService.editDigitalCatalogue(catalogueId,updateCatalogueDto);
}


async editDigitalCatalogue(catalogueId: number, updateCatalogueDto: UpdateCatalogueDto): Promise<ResponseDto> {
  const runner = this.connection.createQueryRunner();
  await runner.connect();
  await runner.startTransaction();
  try {
    const agencyDigitalCatalogueRepo = runner.manager.getRepository(AgencyDigitalCatalogue);
    const cataloguePhotoRepo = runner.manager.getRepository(CataloguePhoto);
    const catalogueVideoRepo = runner.manager.getRepository(CatalogueVideo);

    const findCheck = await agencyDigitalCatalogueRepo.findOne({id: catalogueId});

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



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Update Array Based Data


//DTO
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
    description: CompanyDescription.updateCompanyWorksheet,
    summary: apiForSummary.companyUser,
  })
  @Patch('/:id')
  updateCompanyWorksheet(
    @Param('id') id: number,
    @Body() createCompanyWorksheetDto: CreateCompanyWorksheetDto,
  ) {
    return this.companyWorkSheetService.updateCompanyWorksheet(
      id,
      createCompanyWorksheetDto,
    );
  }



//Services
  async updateCompanyWorksheet(
    id: number,
    createCompanyWorksheetDto: CreateCompanyWorksheetDto,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const companyWorkSheetRepo =
        runner.manager.getRepository(CompanyWorkSheet);
      const workSheetFixedDetailRepo =
        runner.manager.getRepository(WorkSheetFixedDetail);
      const workSheetFlexibleDetailRepo = runner.manager.getRepository(
        WorkSheetFlexibleDetail,
      );
      const findCheck = await companyWorkSheetRepo.findOne({ id: id });

      if (findCheck.id) {
        await companyWorkSheetRepo.update(
          { id: id },
          { title: createCompanyWorksheetDto.title },
        );

        if (
          createCompanyWorksheetDto.workSheetType === WorkSheetTypeEnum.Fixed
        ) {
          await workSheetFixedDetailRepo.delete({
            companyWorkSheetId: findCheck.id,
          });

          const workSheetFixedDetailArray = [];
          for (
            let i = 0;
            i < createCompanyWorksheetDto.workSheetFixedDetailDto.length;
            i++
          ) {
            workSheetFixedDetailArray.push({
              companyWorkSheetId: findCheck.id,
              dayName:
                createCompanyWorksheetDto.workSheetFixedDetailDto[i].dayNames,
              workStartTime:
                createCompanyWorksheetDto.workSheetFixedDetailDto[i]
                  .workStartTimes,
              workEndTime:
                createCompanyWorksheetDto.workSheetFixedDetailDto[i]
                  .workEndTimes,
            });
          }

          const workSheetFixedDetailData = await workSheetFixedDetailRepo
            .createQueryBuilder()
            .insert()
            .values(workSheetFixedDetailArray)
            .execute();
        } else {
          await workSheetFlexibleDetailRepo.delete({
            companyWorkSheetId: findCheck.id,
          });

          const workSheetFlexibleDetailArray = [];

          for (
            let i = 0;
            i < createCompanyWorksheetDto.workSheetFlexibleDetailDto.length;
            i++
          ) {
            workSheetFlexibleDetailArray.push({
              companyWorkSheetId: findCheck.id,
              dayName:
                createCompanyWorksheetDto.workSheetFlexibleDetailDto[i]
                  .dayNames,
              hour: createCompanyWorksheetDto.workSheetFlexibleDetailDto[i]
                .hours,
              minute:
                createCompanyWorksheetDto.workSheetFlexibleDetailDto[i].minutes,
            });
          }

          const workSheetFlexibleDetailDetail =
            await workSheetFlexibleDetailRepo
              .createQueryBuilder()
              .insert()
              .values(workSheetFlexibleDetailArray)
              .execute();
        }
      } else {
        throw new BadRequestException(commonMessage.idNotFound);
      }
      await runner.commitTransaction();
      return { message: commonMessage.SuccessFullyUpdated };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }


