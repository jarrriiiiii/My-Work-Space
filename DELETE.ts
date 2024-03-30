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








---------------------------------------------------------------------------------------

  @hasRole(RoleType.agentOwner, RoleType.agentManager)
  @Delete('/delete-multi-user')
  deleteMultipleUser(@Body() deleteMultipleUserDto: DeleteMultipleUserDto) {
    return this.authService.deleteMultipleUser(deleteMultipleUserDto);
  }


  

    async deleteMultipleUser(deleteMultipleUserDto: DeleteMultipleUserDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userRepo = await queryRunner.manager.getRepository(User);
      const profRepo = await queryRunner.manager.getRepository(Profile);

      for (let i = 0; i < deleteMultipleUserDto.userId.length; i++) {
        const userData = await userRepo
          .createQueryBuilder('u')
          .leftJoinAndSelect('u.role', 'role')
          .leftJoinAndSelect('u.profile', 'profile')
          .leftJoinAndSelect('profile.agency', 'agency')
          .where('u.id = :id', { id: deleteMultipleUserDto.userId[i] })
          .getOne();

        const ownerId = userData.profile.agency.createdBy;

        if (userData.role.title == RoleType.agentManager) {
          const staffData = await userRepo
            .createQueryBuilder('u')
            .where('u.createdBy = :createdBy', {
              createdBy: deleteMultipleUserDto.userId[i],
            })
            .getMany();
          for (const x of staffData) {
            await userRepo.update(
              { id: x.id },
              { createdBy: ownerId, updatedBy: ownerId },
            );
          }
        }

        await profRepo.softDelete({ userId: deleteMultipleUserDto.userId[i] });
        await userRepo.softDelete({ id: deleteMultipleUserDto.userId[i] });

        const msg1 = `Dear ${userData.profile.fullName}, we regret to inform you that you have been removed from ${userData.profile.agency.agencyName} by your agency owner. Please contact your agency owner for further queries.`;

        if (userData?.email) {
          await this.emailService.sentInformation(userData.email, msg1);
        }
        if (userData?.phone) {
          await this.sendMessage(msg1, userData.phone);
        }
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


