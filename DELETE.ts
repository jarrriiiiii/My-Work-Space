//Delete by title and id, delete by dto   

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
 //Delete by id, remove by id, delete by param as ID
    
    
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
  //deletes all PDF records that were created on a particular date, delete on given date, delete date wise, delete by id ,delete by date, delete by range


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
