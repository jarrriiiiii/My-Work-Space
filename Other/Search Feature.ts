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
  @hasModulePermission(moduleType.userManagement)
  @UseInterceptors(TransformInterceptor)
  getUserManagementList(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number,
@Query () searchGetUserManagementListDto :SearchGetUserManagementListDto) {
    limit = limit > 100 ? 100 : limit;
  return this.appUserService.getUserManagementList(page, limit, searchGetUserManagementListDto );
  }


----------------------------------------------------------------------------
  async getUserManagementList(page: number, limit: number, searchGetUserManagementListDto : SearchGetUserManagementListDto): Promise<ResponseDto> {
    try {
      const AdminUserAuthRepo = getRepository(AdminUserAuth);
      const AdminUserAuthResult = await AdminUserAuthRepo
      .createQueryBuilder('AdminUserAuth')
      .select([
        'AdminUserAuth.email', 
        'AdminUserAuth.id', 
        'AdminUserAuth.phone',
        'profile.fullName',
        'adminRole.title',
        'assignAppModule.adminRoleId',
        'appModule.title'
      ])
      .leftJoin('AdminUserAuth.profile', 'profile') 
      .leftJoin('AdminUserAuth.adminRole','adminRole') 
      .leftJoin('adminRole.assignAppModule','assignAppModule')
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






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//API 2


  @Get('getAllAuthUser')
  // @hasModulePermission(moduleType.appUsers)
  @UseInterceptors(TransformInterceptor)
  getAllAuthUser(
    @Query('page',ParseIntPipe) page : number,
    @Query('limit',ParseIntPipe) limit : number,
    @Query () searchAppUserDto :SearchAppUserDto
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.appUserService.getAllAuthUser(page,limit, searchAppUserDto);
  }


  async getAllAuthUser(page : number,limit : number, searchAppUserDto :SearchAppUserDto) : Promise<ResponseDto> {
    try {
      console.log(searchAppUserDto)
      const profileData = getRepository(User);
      const Result = profileData
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.isVerified',
          'user.createdAt',
          'profile.id',
          'profile.fullName',
          'profile.userCode',
          'user.phone',
          'user.email',
          'role.title',
          'agency.agencyName',
          'agency.city',
          'Date(agency.createdAt)'
        ])
        .where('user.deletedAt is null')
        .orderBy('user.id', 'DESC')

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
        }
        Result.leftJoin('user.role','role')
        if(searchAppUserDto.roleTitle) {
          Result.andWhere('role.title = :title', {title : searchAppUserDto.roleTitle})
        }
        Result.leftJoin('user.profile','profile')
        if(searchAppUserDto.fullName) {
          Result.andWhere('profile.fullName ILIKE :fullName', {fullName :`%${ searchAppUserDto.fullName }%`})
        }
        if(searchAppUserDto.userCode) {
          Result.andWhere('profile.userCode = :userCode', {userCode : searchAppUserDto.userCode})
        }
        Result.leftJoin('profile.agency','agency')
        if(searchAppUserDto.agencyName) {
          Result.andWhere('agency.agencyName = :agencyName', {agencyName : searchAppUserDto.agencyName})
        }

      // const totalItems = await Result.getMany();
      const totalItems = await Result.getCount();
      
      const Data = await paginate<User>(Result, {
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
      let i =0 
      for(let ref of Data.items){
        const code = await this.ReferrelCount(ref.profile.id)
        ref.profile['refferals'] = code        
        i++
      }
      Data['totalItems'] = totalItems
      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
