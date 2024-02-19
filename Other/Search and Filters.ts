--------------------------------------------DTO FILE----------------------------------
export class FilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  inventoryTitle: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

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




//Elastic Search
if (searchAppUserDto.fullName) {
    Result.andWhere('LOWER(profile.fullName) like LOWER(:fullName)', {
      fullName: `%${searchAppUserDto.fullName}%`,
    });
  }


if (searchAppUserDto.phone) {
    const phone = searchAppUserDto.phone.replace(/[^0-9\.]+/g, '');
    Result.andWhere('LOWER(AdminUserAuth.phone) like LOWER(:phone)', {
      phone: `%${phone}%`,
    });
  }



//Double Search Query
if (customerListingFiltersDto.location) {
        customerListingResult.where(
          'customerListing.refCode ILIKE :FrefCode AND (profile.fullName ILIKE :search OR (PwSubPackage.title ILIKE :search OR (pwPackage.title ILIKE :search )))',
          {
            search: `%${getSearchDto.search}%`,
            FrefCode: freeLancerResult.refCode,
          },
        );
      } 



        
//Non-Elastic Search

  if (searchAppUserDto.isVerified == 'true') {
    Result.andWhere('user.isVerified = :check', { check:searchAppUserDto.isVerified })
}

  if (searchAppUserDto.isVerified == 'false') {
    Result.andWhere('user.isVerified = :check', { check:searchAppUserDto.isVerified })
}

if (getProjectTypeAndSubTypeDto.projectTypeId) {
    Result.andWhere('inventory.projectTypeId = :projectTypeId', { projectTypeId: getProjectTypeAndSubTypeDto.projectTypeId });
}
        
if (getProjectTypeAndSubTypeDto.bedRooms ) {
      Result.andWhere('inventory.bedRooms = :bedRooms', { bedRooms :getProjectTypeAndSubTypeDto.bedRooms })
    }
    

//Range Based Quick Filters
        
if (searchAppUserDto.minCommission && searchAppUserDto.maxCommission) {
    Result.andWhere('HotListing.saleCommission BETWEEN :minCommission AND :maxCommission', {
        minCommission: searchAppUserDto.minCommission,
        maxCommission: searchAppUserDto.maxCommission
    })
}

        
if (getProjectTypeAndSubTypeDto.postedStartDate && getProjectTypeAndSubTypeDto.postedEndDate) {
    Result.andWhere('HotListing.updatedAt BETWEEN :postedStartDate AND :postedEndDate', {
        postedStartDate: moment(getProjectTypeAndSubTypeDto.postedStartDate, ),
        postedEndDate: moment(getProjectTypeAndSubTypeDto.postedEndDate),
    }, );
}

        
        //For Magnitude with Unit
if (getProjectTypeAndSubTypeDto.minlandSize && getProjectTypeAndSubTypeDto.maxlandSize && getProjectTypeAndSubTypeDto.landAreaId) {
    Result.andWhere('inventory.landAreaId = :landAreaId', {
        landAreaId: getProjectTypeAndSubTypeDto.landAreaId
    })
    Result.andWhere('inventory.landSize BETWEEN :minlandSize AND :maxlandSize', {
        minlandSize: getProjectTypeAndSubTypeDto.minlandSize,
        maxlandSize: getProjectTypeAndSubTypeDto.maxlandSize
    })
}

        
//For Sort By: (ASC, DESC) Button 
//DTO Entry is saved above in the DTO section
        if (searchAssignLoProjectForAppDto.sortByOrder && searchAssignLoProjectForAppDto.sortByOrder === SortByOrder.Ascending) {
        loProjectResult.orderBy('assignInventoryForLounge.id', 'ASC');
      } else {
        loProjectResult.orderBy('assignInventoryForLounge.id', 'DESC');
      }
        
//For Sort By: Last Month only
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
