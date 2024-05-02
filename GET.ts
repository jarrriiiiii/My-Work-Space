//GET ALL (Non-Paginated)


  @proCoo(proCooRoleType.attendant)
  @Get('/getAllAttendant')
  @UseInterceptors(TransformInterceptor)
  getAllAttendant(
  ) {
    return this.proCooAuthService.getAllAttendant();
  }


   async getAllAttendant(): Promise<ResponseDto> {
    try {
      const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);
      const ProjectCoordinatorUserResult = await ProjectCoordinatorUserRepo.createQueryBuilder('projectCoordinatorUser')
      .where('projectCoordinatorRole.title = :title', {title: 'attendant'})
      .select([
            'projectCoordinatorUser.id',
            'projectCoordinatorUser.projectCoordinatorRoleId',
          ])
      .leftJoin('projectCoordinatorUser.projectCoordinatorRole','projectCoordinatorRole')
      .addSelect([
            'projectCoordinatorRole.id',
            'projectCoordinatorRole.title',
          ])
      .getMany()

      return { message: commonMessage.get, data: ProjectCoordinatorUserResult };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }



----------------------------------------------------------------------------------------------------------------------------------------------------
//GET ALL (Paginated)
  
@proCoo(proCooRoleType.attendant)
  @Get('/getAllAttendant')
  @UseInterceptors(TransformInterceptor)
  getAllAttendant(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
     limit = limit > 100 ? 100 : limit;
    return this.proCooAuthService.getAllAttendant(page, limit);
  }


  async getAllAttendant(page: number, limit: number): Promise<ResponseDto> {
    try {
      const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);
      const ProjectCoordinatorUserResult = ProjectCoordinatorUserRepo.createQueryBuilder('xxxx')
        .where('xxxx.title = :title', {title: 'attendant'});
        .select([
            'xxxx.id',
            'xxxx.projectCoordinatorRoleId',
          ])
          .leftJoin('xxxx.projectCoordinatorRole','projectCoordinatorRole')
          .addSelect([
            'projectCoordinatorRole.id',
            'projectCoordinatorRole.title',
          ])
      
      const totalItems = await ProjectCoordinatorUserResult.getCount();
      const Data = await paginate<ProjectCoordinatorUser>(
        ProjectCoordinatorUserResult,
        {
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
            };
          },
        },
      );
      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
----------------------------------------------------------------------------------------------------------------------------------------------------
//Get By Id


@Get('getAllPWProduct/:id')
@hasModulePermission(moduleType.inventories)
@UseInterceptors(TransformInterceptor)
getAllPWProduct(@Param('id') id: number) {
  return this.propertyWalletProductService.getAllPWProduct(+id);
}

async getAllPWProduct(id : number) : Promise<ResponseDto>{
  try {
    const PWProductRepo = getRepository(PropertyWalletProduct)
    const PWProductResult = PWProductRepo.createQueryBuilder('getData')
    .where('getData.id = :id', {id})
    .select(['getData.title', 'getData.price', 'getData.price','getData.description'])
      const totalItems = await PWProductResult.getMany();
    console.log(totalItems)
    return { message: commonMessage.get, data: totalItems };
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}




/////////////////To getitems from query builder in array

      const assignUserEloungeRepo = getRepository(AssignUserElounge);
      const eloungeResult = await assignUserEloungeRepo.createQueryBuilder('assignUserElounge')
        .where('assignUserElounge.eLoungUserId = :eLoungUserId', {eLoungUserId: eLoungUserId})
        .leftJoinAndSelect('assignUserElounge.eloungeUser', 'eloungeUser')
        .leftJoinAndSelect('eloungeUser.eLoungeSaleUser', 'eLoungeSaleUser')
        .getMany();


      const eLoungeResultRef = eloungeResult.map((item) => item.eloungeUser.eLoungeSaleUser.refCode)

//OR 


      const assignUserEloungeRepo = getRepository(AssignSaleUserELoungeLead);

      const assignUserEloungeResult = await assignUserEloungeRepo
        .createQueryBuilder('assignSaleUserELoungeLead')
        .where(
          'assignSaleUserELoungeLead.eLoungeSaleUserLeadId = :eLoungeSaleUserLeadId',
          { eLoungeSaleUserLeadId: eLoungeUserResult.id },
        )
        .leftJoinAndSelect(
          'assignSaleUserELoungeLead.eloungeUser',
          'eloungeUser',
        )
        .leftJoinAndSelect('eloungeUser.eLoungeSaleUser', 'eLoungeSaleUser')
        .getMany();

      if (!assignUserEloungeResult) {
        throw new BadRequestException('Assign Sale User Not Found!');
      }


      let arr = [];
      for (let index = 0; index < assignUserEloungeResult.length; index++) {
        const element =
          assignUserEloungeResult[index].eloungeUser.eLoungeSaleUser?.refCode;
        if (element) {
          arr.push(element);
        }
      }










////////////////////////////////////////////////////////////////////////////////
//Object Manipulation in Arrays
  @forAllUser()
  @Get('getAllLeadsFollowUp')
  getAllLeadsFollowUp(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.leadService.getAllLeadsFollowUp({ page, limit });
  }







  async getAllLeadsFollowUp(options: IPaginationOptions): Promise<ResponseDto> {
    try {
      const userId = await this.authService.getUserId();
      const leadFollowUpRepo = getRepository(LeadFollowUp);
      const Result = await leadFollowUpRepo
        .createQueryBuilder('leadFollowUp')
        .where('leadFollowUp.userId = :userId', { userId: userId })
        .andWhere('leadFollowUp.noOfDays > :noOfDays', { noOfDays: 0 })
        .leftJoinAndSelect('leadFollowUp.lead', 'lead')
        .leftJoinAndSelect('lead.createdByUser', 'createdByUser')
        .leftJoinAndSelect('lead.client', 'client')
        .orderBy('leadFollowUp.id', 'DESC');

      const Data = await paginate<LeadFollowUp>(Result, options);
      let arr = [];

      for (let i = 0; i < Data.items.length; i++) {
        const leadFollowUp = Data.items[i];
        const dueDate = leadFollowUp.dueDate;
        const today = new Date();
        const remainingDays = Math.ceil(
          (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
        );

        arr.push({ ...leadFollowUp, remainingDays });
      }

      return {
        message: commonMessage.get,
        data: { items: arr, meta: Data.meta },
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

----------------------------------------------------------------------------------------------------------------------------------------------------
//Get By DATE ONLY - Show All Records of that full day
  
  @NoCompanyModulePermission()
  @Get('getPayrollByEmployeeId')
  @UseInterceptors(TransformInterceptor)
  getPayrollByEmployeeId(@Query() getUserPayrollByIdDto: GetUserPayrollByIdDto) {
    return this.userPayrollService.getPayrollByEmployeeId(getUserPayrollByIdDto);
  }



export class GetUserPayrollByIdDto {
  @ApiProperty()
  employeeId: number;

  @ApiProperty()
  departmentId: number;

  @ApiProperty()
  payRolldate: Date;
}




  async getPayrollByEmployeeId(
    getUserPayrollByIdDto: GetUserPayrollByIdDto,
  ): Promise<ResponseDto> {
    try {
      const userPayrollRepo = getRepository(UserPayroll);
      const userPayrollResult = userPayrollRepo
        .createQueryBuilder('userPayroll')
        .innerJoin('userPayroll.companyUser', 'companyUser')
        .addSelect([
          'companyUser.id',
          'companyUser.salary',
          'companyUser.taxableAmount',
          'companyUser.designation',
          'companyUser.email',
          'companyUser.phoneNo',
          'companyUser.isActive',
          'companyUser.dateOfBirth',
          'companyUser.joiningDate',
          'companyUser.salary',
          'companyUser.companyDepartmentId',
        ])
        .where('userPayroll.companyUserId = :companyUserId', {
          companyUserId: getUserPayrollByIdDto.employeeId,
        })
        .andWhere('companyUser.companyDepartmentId = :companyDepartmentId', {
          companyDepartmentId: getUserPayrollByIdDto.departmentId,
        })
        .where('DATE(userPayroll.createdAt) = :payRollDate', {
          payRollDate: getUserPayrollByIdDto.payRolldate,
        });

      console.log(getUserPayrollByIdDto);
      const totalItems = await userPayrollResult.getMany();

      return { message: commonMessage.get, data: totalItems };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


