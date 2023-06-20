  @Get('getPWIAdminPaymentAssistanceRequest')
  getPWIAdminPaymentAssistanceRequest( @Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
      return this.pwiAdminPaymentAssistanceRequestService.getPWIAdminPaymentAssistanceRequest(page, limit);
  }


    async getPWIAdminPaymentAssistanceRequest(page: number, limit: number):Promise<ResponseDto> {
        try {
          const PwiAdminPaymentAssistanceRequestRepo = getRepository(PwiAdminPaymentAssistanceRequest)
          const Result = PwiAdminPaymentAssistanceRequestRepo.createQueryBuilder('PwiAdminPaymentAssistanceRequest')
       


   const totalItems = await Result.getCount();
          const Data = await paginate<PwiAdminPaymentAssistanceRequest>(Result, {
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
          return { message: commonMessage.get, data: Data };
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
      }
