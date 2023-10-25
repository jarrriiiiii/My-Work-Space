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

//For Adding SORT BY Button
//Also add the ENUM for this
    @ApiProperty({ type: 'string', enum: SortByOrder, required: false })
    @IsOptional()
    sortByOrder: SortByOrder;
    
}








export enum SortByOrder {
  Ascending = 'Ascending',
  Descending = 'Descending',
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









//ELASTIC SEARCH
if (searchAppUserDto.fullName) {
    Result.andWhere('LOWER(profile.fullName) like LOWER(:fullName)', {
      fullName: `%${searchAppUserDto.fullName}%`,
    });
  }

if (searchAppUserDto.email) {
    Result.andWhere('LOWER(AdminUserAuth.email) like LOWER(:email)', {
      email: `%${searchAppUserDto.email}%`,
    });
  }
  

if (searchAppUserDto.phone) {
    const phone = searchAppUserDto.phone.replace(/[^0-9\.]+/g, '');
    Result.andWhere('LOWER(AdminUserAuth.phone) like LOWER(:phone)', {
      phone: `%${phone}%`,
    });
  }

  if (searchAppUserDto.inventoryTitle) {
    Result.andWhere('LOWER(inventory.title) like LOWER(:inventoryTitle)', {inventoryTitle: `%${searchAppUserDto.inventoryTitle}%`});
  }



//NON ELASTIC SEARCH


if (searchAppUserDto.minCommission && searchAppUserDto.maxCommission) {
    Result.andWhere('HotListing.saleCommission BETWEEN :minCommission AND :maxCommission', { minCommission: searchAppUserDto.minCommission, maxCommission: searchAppUserDto.maxCommission })
}


  if (searchAppUserDto.minCommission && searchAppUserDto.maxCommission) {
    Result.andWhere('HotListing.updatedAt BETWEEN :postedStartDate AND :postedEndDate',{ postedStartDate: moment(searchAppUserDto.postedStartDate) , postedEndDate: moment(searchAppUserDto.postedEndDate) })
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


//NON ELASTIC SEARCH
//Conditional search for Quick filters
if (getProjectTypeAndSubTypeDto.projectTypeId) {
    Result.andWhere('inventory.projectTypeId = :projectTypeId', { projectTypeId: getProjectTypeAndSubTypeDto.projectTypeId });
  
    if (getProjectTypeAndSubTypeDto.projectSubTypeId) {
      Result.andWhere('inventory.projectSubTypeId = :projectSubTypeId', { projectSubTypeId: getProjectTypeAndSubTypeDto.projectSubTypeId });
    }
    if (getProjectTypeAndSubTypeDto.minlandSize && getProjectTypeAndSubTypeDto.maxlandSize  && getProjectTypeAndSubTypeDto.landAreaId) {
      Result.andWhere('inventory.landAreaId = :landAreaId', { landAreaId: getProjectTypeAndSubTypeDto.landAreaId })
      Result.andWhere('inventory.landSize BETWEEN :minlandSize AND :maxlandSize', { minlandSize: getProjectTypeAndSubTypeDto.minlandSize, maxlandSize: getProjectTypeAndSubTypeDto.maxlandSize })
    }
    if (getProjectTypeAndSubTypeDto.minimumPrice && getProjectTypeAndSubTypeDto.maximumPrice ) {
      Result.andWhere('inventory.price BETWEEN :minPrice AND :maxPrice', { minPrice: getProjectTypeAndSubTypeDto.minimumPrice, maxPrice: getProjectTypeAndSubTypeDto.maximumPrice })
    }
    if (getProjectTypeAndSubTypeDto.bedRooms ) {
      Result.andWhere('inventory.bedRooms = :bedRooms', { bedRooms :getProjectTypeAndSubTypeDto.bedRooms })
    }
    if (getProjectTypeAndSubTypeDto.washRooms) {
      Result.andWhere('inventory.washRooms = :washRooms', { washRooms :getProjectTypeAndSubTypeDto.washRooms })
    }
  }
      

//For Sort By: (ASC, DESC) Button
//DTO Entry is saved above in the DTO section at top
        
        if (searchAssignLoProjectForAppDto.sortByOrder === SortByOrder.Ascending) {
            loProjectResult.orderBy('loProject.id', 'ASC')
        }
        
        if (searchAssignLoProjectForAppDto.sortByOrder === SortByOrder.Descending) {
            loProjectResult.orderBy('loProject.id', 'DESC')
        }
      


              if (
        searchAssignLoProjectForAppDto.sortByOrder && searchAssignLoProjectForAppDto.sortByOrder === SortByOrder.Ascending) {
        loProjectResult.orderBy('assignInventoryForLounge.id', 'ASC');
      } else {
        loProjectResult.orderBy('assignInventoryForLounge.id', 'DESC');
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
