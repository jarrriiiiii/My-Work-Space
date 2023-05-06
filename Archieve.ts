
  async Uploader(file, name, extension) {
    const path = 'image/';
    const time = new Date().getTime();
    const s3 = new S3();
    const Result = await s3
      .upload({
        Bucket: bucket.bucket,
        Body: file.buffer,
        Key: bucket.prefix + path + name + '-' + time + '.' + extension,
      })
      .promise();

    return Result.Location;
  }
  async createProjectStep2(
    createPropertyWalletProjectStep2Dto: CreatePropertyWalletProjectStep2Dto,
    files,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    const legalDocument = [];
    const masterPlan = [];
    const legal = files['legalDocument'] || [];
    const master = files['masterPlan'];
    try {
      const projectRepo = runner.manager.getRepository(PropertyWalletProject);
      const documents = runner.manager.getRepository(
        PropertyWalletProjectDocument,
      );
      const userId = await this.adminAuth.getAdminUserId();
      for (let names of legal) {
        const name = names.originalname.split('.')[0];
        const fileExtName =
          names.originalname.split('.')[
            names.originalname.split('.').length - 1
          ];
        let url = await this.Uploader(names, name, fileExtName);
        legalDocument.push(url);
        const res = await documents.save({
          propertyWalletProjectId:
            createPropertyWalletProjectStep2Dto.propertyWalletProjectId,
          doc: url,
          createdBy: userId,
        });
      }
      for (let file of master) {
        const name = file.originalname.split('.')[0];
        const fileExtName =
          file.originalname.split('.')[file.originalname.split('.').length - 1];
        let url = await this.Uploader(file, name, fileExtName);
        const data = await projectRepo.update(
          { id: createPropertyWalletProjectStep2Dto.propertyWalletProjectId },
          { masterPlan: url },
        );
        masterPlan.push(url);
      }
      await runner.commitTransaction();
      return {
        message: commonMessage.create,
        data: { legalDocument, masterPlan },
      };
    } catch (error) {
      console.log(error);
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await runner.release();
    }
  }
  async createProjectStep3(
    createPropertyWalletProjectStep3Dto: CreatePropertyWalletProjectStep3Dto,
    file,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    const files = file['BuilderLogo'] || [];
    const projectRepo = runner.manager.getRepository(PropertyWalletProject);
    let BuilderLogo = null;
    await runner.connect();
    await runner.startTransaction();
    try {
      if (files.length) {
        const name = files[0]?.originalname.split('.')[0];
        // const fileExtName = files[0].originalname.split('.').at(-1);
        const fileExtName =
          files[0].originalname.split('.')[
            files[0].originalname.split('.').length - 1
          ];

        BuilderLogo = await this.Uploader(files[0], name, fileExtName);
      }
      const data = await projectRepo.update(
        { id: createPropertyWalletProjectStep3Dto.propertyWalletProjectId },
        {
          builderName: createPropertyWalletProjectStep3Dto.builderName,
          BuilderLogo,
          phoneNo: createPropertyWalletProjectStep3Dto.phoneNo,
          websiteLink: createPropertyWalletProjectStep3Dto.websiteLink,
        },
      );
      await runner.commitTransaction();
      return { message: commonMessage.create, data: data };
    } catch (error) {
      console.log(error);
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await runner.release();
    }
  }

  // async getProjectDetailForStep1(id : number) : Promise<ResponseDto> {
  //   const runner = this.connection.createQueryRunner()
  //   await runner.connect();
  //   try{
  //     const projectRepo = runner.manager.getRepository(PropertyWalletProject)
  //     const data = await projectRepo.find({id})
  //     return {message : commonMessage.get , data}
  //   }catch(err){
  //     throw new InternalServerErrorException(err)
  //   }
  // }

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

  async updateDocumentStep2(
    propertyWalletProjectId: number,
    updateDocumentStep2Dto: UpdateDocumentStep2Dto,
    file,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    const projRep = runner.manager.getRepository(PropertyWalletProject);
    const Document = runner.manager.getRepository(
      PropertyWalletProjectDocument,
    );
    const master = file['master'] || [];
    const legal = file['legalDocument'] || [];
    const userId = await this.adminAuth.getAdminUserId();
    try {
      const ProjectCheck = await projRep.find({ id: propertyWalletProjectId });
      if (ProjectCheck[0]) {
        for (let a of legal) {
          const name = a.originalname.split('.')[0];
          const fileExtName =
            a.originalname.split('.')[a.originalname.split('.').length - 1];
          let url = await this.Uploader(a, name, fileExtName);
          await Document.save({
            propertyWalletProjectId: propertyWalletProjectId,
            doc: url,
            createdBy: userId,
          });
        }
        for (let a of master) {
          const name = a.originalname.split('.')[0];
          const fileExtName =
            a.originalname.split('.')[a.originalname.split('.').length - 1];
          let url = await this.Uploader(a, name, fileExtName);
          await projRep.update(
            { id: propertyWalletProjectId },
            { masterPlan: url, updatedBy: userId },
          );
        }
      }
      await runner.commitTransaction();
      return { message: commonMessage.update };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }

  async updateDocumentStep3(
    propertyWalletProjectId: number,
    updatePropertyWalletProjectStep3Dto: UpdatePropertyWalletProjectStep3Dto,
    file,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    const projRep = runner.manager.getRepository(PropertyWalletProject);
    const files = file['BuilderLogo'] || [];
    let BuilderLogo = null;
    const userId = await this.adminAuth.getAdminUserId();
    try {
      const ProjectCheck = await projRep.find({ id: propertyWalletProjectId });
      if (files.length) {
        const name = files[0].originalname.split('.')[0];
        // const fileExtName = files[0].originalname.split('.').at(-1);
        const fileExtName =
          files[0].originalname.split('.')[
            files[0].originalname.split('.').length - 1
          ];

        BuilderLogo = await this.Uploader(files[0], name, fileExtName);
        await projRep.update(
          { id: propertyWalletProjectId },
          { BuilderLogo: BuilderLogo },
        );
        delete updatePropertyWalletProjectStep3Dto['BuilderLogo'];
      }
      for (let i in updatePropertyWalletProjectStep3Dto) {
        if (updatePropertyWalletProjectStep3Dto[i] == '') {
          delete updatePropertyWalletProjectStep3Dto[i];
        }
      }
      const data = await projRep.update(
        { id: propertyWalletProjectId },
        {
          builderName: updatePropertyWalletProjectStep3Dto?.builderName,
          phoneNo: updatePropertyWalletProjectStep3Dto?.phoneNo,
          websiteLink: updatePropertyWalletProjectStep3Dto?.websiteLink,
        },
      );
      await runner.commitTransaction();
      return { message: commonMessage.update };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }

  async getAllProjects(page, limit ,  propertyWalleSearchDto: PropertyWalleSearchDto,): Promise<ResponseDto> {
    try {
      const getData = getRepository(PropertyWalletProject);
      const Result = getData
        .createQueryBuilder('PropertyWalletProject')
        .select([
          'PropertyWalletProject.id',
          'PropertyWalletProject.projectName',
          'PropertyWalletProject.NOC',
          'PropertyWalletProject.description',
          'PropertyWalletProject.address',
          'PropertyWalletProject.city',
          'PropertyWalletProject.latitude',
          'PropertyWalletProject.longitude',
          'PropertyWalletProject.masterPlan',
          'PropertyWalletProject.builderName',
          'PropertyWalletProject.phoneNo',
          'PropertyWalletProject.websiteLink',
          'PropertyWalletProject.BuilderLogo',
          'PropertyWalletProject.createdAt',
          //   "propertyWalletInventory.propertyWalletProjectId",
          //   "propertyWalletInventory.projectTypeId",
          //   "propertyWalletInventory.projectSubTypeId",
          //   "propertyWalletInventory.NOC",
          //   "propertyWalletInventory.landSize",
          //   "propertyWalletInventory.landAreaId",
          //   "propertyWalletInventory.description",
          //   "propertyWalletInventory.price",
          //   "propertyWalletInventory.cashDealCommissionAmount",
          //   "propertyWalletInventory.cashDealCommissionPer",
          //   "propertyWalletInventory.InstallmentDealCommissionAmount",
          //   "propertyWalletInventory.InstallmentDealCommissionPer",
          //   "propertyWalletInventory.minimumPrice",
          //   "propertyWalletInventory,createdAt",
        ])
        .where('PropertyWalletProject.deletedAt is null')
        if(propertyWalleSearchDto.propertyWalletProjectId) {
          Result.andWhere('PropertyWalletProject.id = :id', {id : propertyWalleSearchDto.propertyWalletProjectId})
        }
        if(propertyWalleSearchDto.projectName) {
          Result.andWhere('LOWER(PropertyWalletProject.projectName) like LOWER(:projectName)', {projectName : `%${propertyWalleSearchDto.projectName}%`})
        }
        if(propertyWalleSearchDto.city) {
          Result.andWhere('LOWER(PropertyWalletProject.city) like LOWER(:city)', {city : `%${propertyWalleSearchDto.city}%`})
        }
        if(propertyWalleSearchDto.NOC) {
          Result.andWhere('PropertyWalletProject.NOC = :NOC', {NOC : propertyWalleSearchDto.NOC})
        }
      const totalItems = await Result.getCount();
      const Data = await paginate<PropertyWalletProject>(Result, {
        limit,
        page,
        paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
        metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
          const totalPages = Math.round(totalItems / itemsPerPage);
          return {
            currentPage,
            itemCount,
            itemsPerPage,
          }
        }
      })

        let i = 0
        if(Data.items.length > 0){
          for(let x of Data.items){
          const propertyWalletProjectId = x.id
        const finalDAta =  await this.getInventoryCountByProjectId(propertyWalletProjectId )
        Data.items[i]['inventoryCount'] = finalDAta.data.count
        ++i;
      }}
      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getAllInventoriesByProject(page, limit ,  projectId: number,): Promise<ResponseDto> {
    try {
      const getData = getRepository(PropertyWalletInventory);
      const Result = getData
        .createQueryBuilder('PropertyWalletInventory')
        .select()
        .leftJoinAndSelect('PropertyWalletInventory.propertyWalletProject','PropertyWalletProject')
        .where('PropertyWalletInventory.propertyWalletProjectId = :projectId',{projectId})
       
      const totalItems = await Result.getCount();
      const Data = await paginate<PropertyWalletInventory>(Result, {
        limit,
        page,
        paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
        metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
          const totalPages = Math.round(totalItems / itemsPerPage);
          return {
            currentPage,
            itemCount,
            itemsPerPage,
          }
        }
      })

      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInventoryCountByProjectId(propertyWalletProjectId : number) {
    try {
    const inventoryRepo = getRepository(PropertyWalletInventory);
    const data = await inventoryRepo.createQueryBuilder('inv')
    .select('COUNT(inv.id)')
    .where('inv.propertyWalletProjectId = :propertyWalletProjectId',{propertyWalletProjectId})
    .getRawOne()
    return {message : commonMessage.get , data : data}
    } catch (error) {
      
    }
  }
}

    
    
    
    
    
    
    
    
    /-------------------------
    
    
async getProductDetail (id : number){
  try {
    const productRepo = getRepository(
      PropertyWalletProduct
    );
    const data = await productRepo.createQueryBuilder('p')
    .where('p.id = :id', {id})
    .leftJoinAndSelect('p.projectType','projectType')
    .leftJoinAndSelect('p.ProjectSubType','ProjectSubType')
    .getOne()
    return data

  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
  async createPropertyWalletProductStep1(
    createPropertyWalletProductStep1Dto: CreatePropertyWalletProductStep1Dto,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productRepo = queryRunner.manager.getRepository(
        PropertyWalletProduct
      );
      const userId = await this.adminAuth.getAdminUserId();
      createPropertyWalletProductStep1Dto['createdBy'] = userId;
      const result = await productRepo.save(
        createPropertyWalletProductStep1Dto,
      );
      await queryRunner.commitTransaction();
      const data = await this.getProductDetail(result.id)
      return { message: commonMessage.create, data: data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updatePropertyWalletProductStep1(
    id: number,
    updatePropertyWalletProductStep1Dto: UpdatePropertyWalletProductStep1Dto,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productRepo = queryRunner.manager.getRepository(
        PropertyWalletProduct,
      );
      const productCheck = await productRepo.findOne({ id });
      if (productCheck) {
        const userId = await this.adminAuth.getAdminUserId();
        updatePropertyWalletProductStep1Dto['updatedBy'] = userId;
        const result = await productRepo.update(
          { id },
          updatePropertyWalletProductStep1Dto,
        );
        await queryRunner.commitTransaction();
      const data = await this.getProductDetail(id)

        return { message: commonMessage.update, data: data };
      } else {
        throw commonMessage.invalidInventory;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

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















---------------------------------------------------------


    
