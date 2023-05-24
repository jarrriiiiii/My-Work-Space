//hard delete by title, hard delete by id, hard delete by dto, hard delete by id, hard delete, remove by id, remove by dto

    @Delete('removeUtil')
  @hasModulePermission(moduleType.inventories)
  removeUtil(createPropertyWalletUtilDto: CreatePropertyWalletUtilDto) {
    return this.propertyWalletUtilsService.removeUtil(createPropertyWalletUtilDto);
  }
//
 async removeUtil(createPropertyWalletUtilDto: CreatePropertyWalletUtilDto): Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
        const PWMURepo = queryRunner.manager.getRepository(PropertyWalletMultiUtilities);
        await PWMURepo.delete({
          propertyWalletInventoryId : createPropertyWalletUtilDto.propertyWalletInventoryId,
          propertyWalletUtilId : createPropertyWalletUtilDto.propertyWalletUtilId
        }) 
        await queryRunner.commitTransaction()
        return { message: commonMessage.delete, data: null }
      }
      catch (error) {
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(error)
      }
      finally {
        await queryRunner.release()
      }
    }

----------------------------------------------------------------------------------------------------------------------
 // hard delete by id, remove by id, hard delete by param as ID, remove by param as ID
 
@Delete('DeletePWInventoryPlot/:id')
DeletePWInventoryPlot(@Param('id') id: number){
return this.propertyWalletInventoryPlotService.DeletePWInventoryPlot(+id);   
    
//
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
     

-----------------------------------------------------------------------------------
  //deletes all PDF records items data that were created on a particular date, delete on given date, delete date wise, delete by id ,delete by date, delete by range, hard delete by dto, remove by dto


async deletePDF(dateDto : DateDto):Promise<ResponseDto> {{
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

        const start = new Date(dateDto.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
            const getAll = getRepository(SaveAllPdf)

            const Result = getAll.createQueryBuilder('get')
            .where(`get.createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
            
            const data = await Result.getMany() 
            data.map(async (x)=>{
              await  getAll.delete({id: x.id})
            })
  
      await queryRunner.commitTransaction();
      return {message : commonMessage.delete , data : null}
  
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    }
    finally {
      await queryRunner.release();
    }
  }
}
}
-----------------------------------------------------------------------------------------------------------------------
//Delete by condition
     
@Delete('delete/single/property-wallet-product-photo')
deletePropertyWalletProductPhoto(@Body() propertyWalletProductPhotoDeleteDto: PropertyWalletProductPhotoDeleteDto) {
     return this.propertyWalletProductService.deletePropertyWalletProductPhoto(propertyWalletProductPhotoDeleteDto)
}

  async deletePropertyWalletProductPhoto(propertyWalletProductPhotoDeleteDto: PropertyWalletProductPhotoDeleteDto) : Promise<ResponseDto>{
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try{
     
      const productRepo = runner.manager.getRepository(PropertyWalletProduct);
      const documents = runner.manager.getRepository(PropertyWalletProductDocument);
      const productPhotoRepo = runner.manager.getRepository(PropertyWalletProductPhoto)
      const userId = await this.adminAuth.getAdminUserId();
      const productCheck = await productRepo.findOne({id: propertyWalletProductPhotoDeleteDto.propertyWalletProductId})
      if(productCheck){
        if(propertyWalletProductPhotoDeleteDto.type === 'PRODUCTDOCUMENT'){
          await documents.softDelete({propertyWalletProductId : +propertyWalletProductPhotoDeleteDto.propertyWalletProductId,id : propertyWalletProductPhotoDeleteDto.photoId})
        }
        else if(propertyWalletProductPhotoDeleteDto.type === 'PRODUCTPHOTO'){ 
          await productPhotoRepo.softDelete({propertyWalletProductId : propertyWalletProductPhotoDeleteDto.propertyWalletProductId,id: propertyWalletProductPhotoDeleteDto.photoId})
        }
        else{
          throw new BadRequestException(commonMessage.invalidEnum)
        }
        await runner.commitTransaction();
        return { message: commonMessage.delete };
      }
      else{
        throw new BadRequestException(commonMessage.projectNotFound)
      }
    }catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }
