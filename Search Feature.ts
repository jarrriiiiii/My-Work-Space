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
