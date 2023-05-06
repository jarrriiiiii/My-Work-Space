
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
