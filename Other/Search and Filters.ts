--------------------------------------------DTO FILE----------------------------------
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

  
    

  @ApiProperty({ required: false })
  @IsOptional()
  projecSubtype: ReqStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  projectTypeId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  projectSubTypeId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  inventoryTitle: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  minimumPrice: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  maximumPrice: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  minCommission: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  maxCommission: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  minlandSize: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  maxlandSize: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  landAreaId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bedRooms: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  washRooms: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postedStartDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postedEndDate: string;

  @ApiProperty({ type: 'string', enum: InventoryStatus, required: false })
  @IsOptional()
  inVentoryType: InventoryStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city: string;
}


////Enums for additional use
export enum SortByOrder {
  Ascending = 'Ascending',
  Descending = 'Descending',
  SortByLastMonth = 'SortByLastMonth',
}


export enum ReqStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Removed = 'Removed',
  Expired = 'Expired',
}

--------------------------------------------CONTROLLER FILE----------------------------------
  @Get('getUserManagementList')
  getUserManagementList(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query () searchGetUserManagementListDto :SearchGetUserManagementListDto) {
        return this.appUserService.getUserManagementList(page, limit, searchGetUserManagementListDto );
  }


--------------------------------------------SERVICE FILE----------------------------------
  async getUserManagementList(page: number, limit: number, searchGetUserManagementListDto : SearchGetUserManagementListDto): Promise<ResponseDto> {
    try {
      const AdminUserAuthRepo = getRepository(AdminUserAuth);
      const AdminUserAuthResult = await AdminUserAuthRepo
      .createQueryBuilder('AdminUserAuth')
      .leftJoin('assignAppModule.appModule','appModule')




/////////////////////////ELASTIC SEARCH
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


//////////////////////////NON ELASTIC SEARCH/FILTERS

  if (searchAppUserDto.isVerified == 'true') {
    Result.andWhere('user.isVerified = :check', { check:searchAppUserDto.isVerified })
}

  if (searchAppUserDto.isVerified == 'false') {
    Result.andWhere('user.isVerified = :check', { check:searchAppUserDto.isVerified })
}

if (getProjectTypeAndSubTypeDto.projectTypeId) {
    Result.andWhere('inventory.projectTypeId = :projectTypeId', { projectTypeId: getProjectTypeAndSubTypeDto.projectTypeId });
  
if (getProjectTypeAndSubTypeDto.projectSubTypeId) {
      Result.andWhere('inventory.projectSubTypeId = :projectSubTypeId', { projectSubTypeId: getProjectTypeAndSubTypeDto.projectSubTypeId });
}
    
if (getProjectTypeAndSubTypeDto.bedRooms ) {
      Result.andWhere('inventory.bedRooms = :bedRooms', { bedRooms :getProjectTypeAndSubTypeDto.bedRooms })
    }
    
if (getProjectTypeAndSubTypeDto.washRooms) {
      Result.andWhere('inventory.washRooms = :washRooms', { washRooms :getProjectTypeAndSubTypeDto.washRooms })
    }

/////////////////////////RANGE BASED QUICK FILTERS 

    if (searchAppUserDto.minCommission && searchAppUserDto.maxCommission) {
    Result.andWhere('HotListing.saleCommission BETWEEN :minCommission AND :maxCommission', { minCommission: searchAppUserDto.minCommission, maxCommission: searchAppUserDto.maxCommission })
}

  if (searchAppUserDto.minCommission && searchAppUserDto.maxCommission) {
    Result.andWhere('HotListing.updatedAt BETWEEN :postedStartDate AND :postedEndDate',{ postedStartDate: moment(searchAppUserDto.postedStartDate) , postedEndDate: moment(searchAppUserDto.postedEndDate) })
}

  if (searchAppUserDto.startDate && searchAppUserDto.endDate) {
    Result.andWhere('user.createdAt BETWEEN :start AND :end', { start: searchAppUserDto.startDate, end: searchAppUserDto.endDate })

}
    

    if (getProjectTypeAndSubTypeDto.minlandSize && getProjectTypeAndSubTypeDto.maxlandSize  && getProjectTypeAndSubTypeDto.landAreaId) {
      Result.andWhere('inventory.landAreaId = :landAreaId', { landAreaId: getProjectTypeAndSubTypeDto.landAreaId })
      Result.andWhere('inventory.landSize BETWEEN :minlandSize AND :maxlandSize', { minlandSize: getProjectTypeAndSubTypeDto.minlandSize, maxlandSize: getProjectTypeAndSubTypeDto.maxlandSize })
    }
    if (getProjectTypeAndSubTypeDto.minimumPrice && getProjectTypeAndSubTypeDto.maximumPrice ) {
      Result.andWhere('inventory.price BETWEEN :minPrice AND :maxPrice', { minPrice: getProjectTypeAndSubTypeDto.minimumPrice, maxPrice: getProjectTypeAndSubTypeDto.maximumPrice })
    }

    
  }
      

///////////////For Sort By: (ASC, DESC) Button 
        //DTO Entry is saved above in the DTO section
        
if (searchAssignLoProjectForAppDto.sortByOrder && searchAssignLoProjectForAppDto.sortByOrder === SortByOrder.Ascending) {
        loProjectResult.orderBy('assignInventoryForLounge.id', 'ASC');
      } else {
        loProjectResult.orderBy('assignInventoryForLounge.id', 'DESC');
      }
        
/////////////////For Sort By: Last Month only

      if (getAllReviewForAgencyFilterDto.sortByOrder && getAllReviewForAgencyFilterDto.sortByOrder === SortByOrder.SortByLastMonth) {
       
        const lastMonthStartDate = new Date();
        lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
        const lastMonthEndDate = new Date();

        agencyReviewResult.andWhere('agencyReview.createdAt BETWEEN :startDate AND :endDate', {startDate: lastMonthStartDate.toISOString(), endDate: lastMonthEndDate.toISOString()})
        agencyReviewResult.orderBy('agencyReview.createdAt', 'DESC');
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
