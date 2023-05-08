




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

    
    

}
