
 async createPropertyWalletProductStep2(createPropertyWalletProductStep2Dto: CreatePropertyWalletProductStep2Dto) {
  const queryRunner = this.connection.createQueryRunner()
  await queryRunner.connect();
  await queryRunner.startTransaction()
  try{
    const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletProduct)
    const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductFeature)
    const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletProductBusinessAndCommunication)
    const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherFacility)
    const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletProductHealthCareRecreational)
    const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherNearByLocation)
    const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletProductRoom)
    const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductPlotFeature)
    const userId = this.adminAuth.getAdminUserId()
    const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletProductStep2Dto.propertyWalletProductId})
    if(findInv){
      createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto['createdByAdmin'] = userId
      await PWFeatureRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto)
      
      createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto['createdByAdmin'] = userId
      await PWBusinessAndCommunicationRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto)
    
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto['createdByAdmin'] = userId
      await PWOtherFacilitiesRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto)
    
      createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto['createdByAdmin'] = userId
      await PWHealthCareRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto)
    
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto['createdByAdmin'] = userId
      await PWOtherNearByLocationRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto)
      
      createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto['createdByAdmin'] = userId
      await PWRoomRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto)

      createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto['createdByAdmin'] = userId
      await PWPlotFeatureRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto)
      
      await queryRunner.commitTransaction()
      return {message : commonMessage.create}
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

  async updatePropertyWalletProductStep2(createPropertyWalletProductStep2Dto : CreatePropertyWalletProductStep2Dto){
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction()
    try{
      const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletProduct)
      const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductFeature)
      const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletProductBusinessAndCommunication)
      const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherFacility)
      const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletProductHealthCareRecreational)
      const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherNearByLocation)
      const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletProductRoom)
      const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductPlotFeature)
      const userId = this.adminAuth.getAdminUserId()
      const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletProductStep2Dto.propertyWalletProductId})
      if(findInv){
        createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto['updatedByAdmin'] = userId
        await PWFeatureRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto)
        
        createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto['updatedByAdmin'] = userId
        await PWBusinessAndCommunicationRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto)
      
        createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto['updatedByAdmin'] = userId
        await PWOtherFacilitiesRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto)
      
        createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto['updatedByAdmin'] = userId
        await PWHealthCareRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto)
      
        createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto['updatedByAdmin'] = userId
        await PWOtherNearByLocationRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto)
        
        createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto['updatedByAdmin'] = userId
        await PWRoomRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto)

        createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto['updatedByAdmin'] = userId
        await PWPlotFeatureRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto)
        
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
}

    
    -----------------------------------------
     async update(propertyWalletInventoryId : number ,updatePropertyWalletInventoryDto : UpdatePropertyWalletInventoryDto) : Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      
      try{
        const projRep = queryRunner.manager.getRepository(PropertyWalletInventory)
        const findCkeck = await projRep.findOne({id: propertyWalletInventoryId})
        if(findCkeck){
            const data = await projRep.update({id : propertyWalletInventoryId},updatePropertyWalletInventoryDto)
        }
          await queryRunner.commitTransaction()
    const data = await this.getProjectDetail(propertyWalletInventoryId)
        return {message : commonMessage.update,   data : data}
      }catch(err){
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(err)
      }finally{
        await queryRunner.release()
      }
    }


    async createPropertyWalletInventoryStep2(createPropertyWalletInventoryStep2Dto : CreatePropertyWalletInventoryStep2Dto){
      ///////////////////////////////////////////
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
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId})
        if(findInv){
          createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto['createdByAdmin'] = userId
          await PWFeatureRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto['createdByAdmin'] = userId
          await PWBusinessAndCommunicationRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto['createdByAdmin'] = userId
          await PWOtherFacilitiesRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto['createdByAdmin'] = userId
          await PWHealthCareRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto)
        
          createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto['createdByAdmin'] = userId
          await PWOtherNearByLocationRepo.insert(createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto['createdByAdmin'] = userId
          await PWRoomRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto)

          createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto['createdByAdmin'] = userId
          await PWPlotFeatureRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto)
          
          await queryRunner.commitTransaction()
          return {message : commonMessage.create}
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
        const userId = await this.adminAuth.getAdminUserId()
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

    async createPropertyWalletInventoryStep3(createPropertyWalletInventoryStep3Dto: CreatePropertyWalletInventoryStep3Dto){
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWIRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWICashPaymentPlanRepo = queryRunner.manager.getRepository(PropertyWalletCashPaymentPlan)
        const PWIInstallmentPaymentPlan = queryRunner.manager.getRepository(PropertyWalletInstallmentPaymentPlan)
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWIRepo.findOne({id: createPropertyWalletInventoryStep3Dto.propertyWalletInventoryId})
        if(findInv){
          createPropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep3Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['createdByAdmin'] = userId
          await PWICashPaymentPlanRepo.insert(createPropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto)
          if(createPropertyWalletInventoryStep3Dto?.createPropertyWalletInstallmentPaymentPlanDto){
            for(let data of createPropertyWalletInventoryStep3Dto.createPropertyWalletInstallmentPaymentPlanDto){
              data['propertyWalletInventoryId'] = createPropertyWalletInventoryStep3Dto.propertyWalletInventoryId
              data['createdByAdmin'] = userId
              await PWIInstallmentPaymentPlan.insert(data)
            }
          }
          await queryRunner.commitTransaction()
          return {message : commonMessage.create}
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


    async updatePropertyWalletProductStep3(updatePropertyWalletInventoryStep3Dto: UpdatePropertyWalletInventoryStep3Dto){
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWProductRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWPCashPaymentPlanRepo = queryRunner.manager.getRepository(PropertyWalletCashPaymentPlan)
        const PWPInstallmentPaymentPlan = queryRunner.manager.getRepository(PropertyWalletInstallmentPaymentPlan)
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWProductRepo.findOne({id: updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId})
        if(findInv){
          updatePropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['propertyWalletInventoryId'] = updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId
          updatePropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['updatedByAdmin'] = userId
          await PWPCashPaymentPlanRepo.update({propertyWalletInventoryId : updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId},updatePropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto)
          if(updatePropertyWalletInventoryStep3Dto?.updatePropertyWalletInstallmentPaymentPlanDto){
            for(let data of updatePropertyWalletInventoryStep3Dto.updatePropertyWalletInstallmentPaymentPlanDto){
              data['propertyWalletInventoryId'] = updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId
              data['updatedByAdmin'] = userId
              const dataId = data.id
              delete data.id
              await PWPInstallmentPaymentPlan.update({id :dataId},data)
            }
          }
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
}
