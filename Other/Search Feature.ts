export class SearchGetUserManagementListDto {
    @ApiProperty({required : false})
    @IsOptional()
    fullName : string

    @ApiProperty({required : false})
    @IsOptional()
    email : string

    @ApiProperty({required : false})
    @IsOptional()
    roleTitle : string

    @ApiProperty({required : false})
    @IsOptional()
    phone : string
}


----------------------------------------------------------------------------
  @Get('getUserManagementList')
  getUserManagementList(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query () searchGetUserManagementListDto :SearchGetUserManagementListDto) {
        return this.appUserService.getUserManagementList(page, limit, searchGetUserManagementListDto );
  }


----------------------------------------------------------------------------
  async getUserManagementList(page: number, limit: number, searchGetUserManagementListDto : SearchGetUserManagementListDto): Promise<ResponseDto> {
    try {
      const AdminUserAuthRepo = getRepository(AdminUserAuth);
      const AdminUserAuthResult = await AdminUserAuthRepo
      .createQueryBuilder('AdminUserAuth')
      .leftJoin('assignAppModule.appModule','appModule')










      
      if (searchGetUserManagementListDto.fullName) {
        AdminUserAuthResult.andWhere('LOWER(profile.fullName) like LOWER(:fullName)', {
          fullName: `%${searchGetUserManagementListDto.fullName}%`,
        });
      }

      if (searchGetUserManagementListDto.email) {
        AdminUserAuthResult.andWhere('LOWER(AdminUserAuth.email) like LOWER(:email)', {
          email: `%${searchGetUserManagementListDto.email}%`,
        });
      }
      
      if (searchGetUserManagementListDto.roleTitle) {
        AdminUserAuthResult.andWhere('LOWER(adminRole.title) like LOWER(:roleTitle)', {
          roleTitle: `%${searchGetUserManagementListDto.roleTitle}%`,
        });
      }

      if (searchGetUserManagementListDto.phone) {
        const phone = searchGetUserManagementListDto.phone.replace(/[^0-9\.]+/g, '');
        AdminUserAuthResult.andWhere('LOWER(AdminUserAuth.phone) like LOWER(:phone)', {
          phone: `%${phone}%`,
        });
      }

      if (getProjectTypeAndSubTypeDto.minCommission && getProjectTypeAndSubTypeDto.maxCommission) {
        Result.andWhere('HotListing.saleCommission BETWEEN :minCommission AND :maxCommission', { minCommission: getProjectTypeAndSubTypeDto.minCommission, maxCommission: getProjectTypeAndSubTypeDto.maxCommission })
      }
      if (getProjectTypeAndSubTypeDto.minCommission && getProjectTypeAndSubTypeDto.maxCommission) {
        Result.andWhere('HotListing.updatedAt BETWEEN :postedStartDate AND :postedEndDate',{ postedStartDate: moment(getProjectTypeAndSubTypeDto.postedStartDate) , postedEndDate: moment(getProjectTypeAndSubTypeDto.postedEndDate) })
      }
      if (getProjectTypeAndSubTypeDto.inventoryTitle) {
        Result.andWhere('LOWER(inventory.title) like LOWER(:inventoryTitle)', {inventoryTitle: `%${getProjectTypeAndSubTypeDto.inventoryTitle}%`});
      }

      if (searchAppUserDto.startDate && searchAppUserDto.endDate) {
        Result.andWhere('user.createdAt BETWEEN :start AND :end', { start: searchAppUserDto.startDate, end: searchAppUserDto.endDate })
      }

      if (searchAppUserDto.isVerified == 'true') {
        Result.andWhere('user.isVerified = :check', { check:searchAppUserDto.isVerified })
      }
      if (searchAppUserDto.isVerified == 'false') {
        Result.andWhere('user.isVerified = :check', { check:searchAppUserDto.isVerified })

      }

      if (searchAppUserDto.email) {
        console.log('in')
        Result.andWhere('LOWER(user.email) like LOWER(:email)', {
          email: `%${searchAppUserDto.email}%`,
        });
      }
      if (searchAppUserDto.phone) {
        const phone = searchAppUserDto.phone.replace(/[^0-9\.]+/g, '');
        Result.andWhere('LOWER(user.phone) like LOWER(:phone)', {
          phone: `%${phone}%`,
        });
      

      const totalItems = await AdminUserAuthResult.getCount();
    
    const pg = await paginate<AdminUserAuth>(AdminUserAuthResult, {
      limit,
      page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
          currentPage,
          itemCount,
          itemsPerPage,
          totalPages,
        }
      }
    })
    return { message: commonMessage.get, data: pg };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    }
