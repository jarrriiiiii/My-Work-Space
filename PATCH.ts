  @Patch('/invoiceIsPaidCallBack/:InvoiceNumber')
  invoiceIsPaidCallBack(@Param('InvoiceNumber') InvoiceNumber: string) {
    return this.blinqIntegrationService.invoiceIsPaidCallBack(InvoiceNumber);
  }

////


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
//Update by DTO, update by id
  
  
  async updateProjectStep1(
    propertyWalletProjectId: number,
    updatePropertyWalletProjectStep1Dto: UpdatePropertyWalletProjectStep1Dto,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const projectRepo = runner.manager.getRepository(PropertyWalletProject);
      const projectId = propertyWalletProjectId;
      const findCkeck = await projectRepo.find({ id: projectId });
      if (findCkeck[0]) {
        await projectRepo.update(
          { id: projectId },
          updatePropertyWalletProjectStep1Dto,
        );
        await runner.commitTransaction();
      }
      return { message: commonMessage.update };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }
  
  ----------------------------------------------------------------
  


 async updatePropertyWalletInventoryStep2(createPropertyWalletInventoryStep2Dto : CreatePropertyWalletInventoryStep2Dto){
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletFeature)
        const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletBusinessAndCommunication)
        const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletOtherFacility)
        const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletHealthCareRecreational)
        const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(OtherNearByLocation)
        const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletRoom)
        const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletPlotFeature)
        const userId = this.adminAuth.getAdminUserId()
        const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId})
        if(findInv){
          createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto['updatedByAdmin'] = userId
          await PWFeatureRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto['updatedByAdmin'] = userId
          await PWBusinessAndCommunicationRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto['updatedByAdmin'] = userId
          await PWOtherFacilitiesRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto['updatedByAdmin'] = userId
          await PWHealthCareRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto)
        
          createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto['updatedByAdmin'] = userId
          await PWOtherNearByLocationRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto['updatedByAdmin'] = userId
          await PWRoomRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto)

          createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto['updatedByAdmin'] = userId
          await PWPlotFeatureRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto)
          
          await queryRunner.commitTransaction()
          return {message : commonMessage.update}
      }
      else{
        throw commonMessage.invalidInventory
      }
      }catch(err){
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(err)
      }finally{
        await queryRunner.release()
      }
    }

