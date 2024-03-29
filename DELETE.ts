  @CompanyModulePermission(CompanyModuleEnum.workSchedule)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({
    description: CompanyDescription.deleteCompanyWorksheet,
    summary: apiForSummary.companyUser,
  })
  @Delete('/:id')
  deleteCompanyWorksheet(@Param('id') id: number) {
    return this.companyWorkSheetService.deleteCompanyWorksheet(+id);
  }



  async deleteCompanyWorksheet(id: number): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const companyWorkSheetRepo = getRepository(CompanyWorkSheet);
      const companyId = await this.companyAuthService.getCompanyId();
      const findCheck = await companyWorkSheetRepo.findOne({
        where: { id: id, companyId: companyId },
      });
      if (findCheck.id) {
        await companyWorkSheetRepo.softDelete({ id: id });
      } else {
        throw new BadRequestException(commonMessage.idNotFound);
      }
      await queryRunner.commitTransaction();
      return { message: commonMessage.delete, data: null };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }




-------------------------------------------------------------------------------------------------------------------------------------

//Soft Delete

@noModulePermission
@UseInterceptors(TransformInterceptor)
@Delete('deleteListing/:id')
  deleteListing(@Param('id') id: number){
  return this.agencyService.deleteListing(+id);
  }

async deleteListing(id: number): Promise<any> {
  const queryRunner = this.connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const listingRepo = queryRunner.manager.getRepository(Listing);
    const findCheck = await listingRepo.findOne({ id });
    if (findCheck.id) {
      await listingRepo.softDelete({ id: id}) 
    }else {
      throw new BadRequestException(commonMessage.idNotFound)
    }
    await queryRunner.commitTransaction();
    return { message: commonMessage.delete, data: null };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  } finally {
    await queryRunner.release();
  }
}

----------------------------------------------------------------------------------------------------------------------
 // Hard Delete
  
@Delete('DeletePWInventoryPlot/:id')
DeletePWInventoryPlot(@Param('id') id: number){
return this.serviceXXXXX.DeletePWInventoryPlot(+id);   


  
    async DeletePWInventoryPlot(id: number): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

      const PWIPlotDetailsRepo = queryRunner.manager.getRepository(PropertyWalletInventoryPlotDetails);
      await PWIPlotDetailsRepo.delete({ id: id}) 
      await queryRunner.commitTransaction()
      return { message: commonMessage.delete, data: null }
    
    }
    catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error)
    }
    finally {
      await queryRunner.release()
    }}}




