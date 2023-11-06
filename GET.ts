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
