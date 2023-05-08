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
