////////////////////////////////////////////LONG PAGINATION

@Get('getPWIAdminPaymentAssistanceRequest')
getPWIAdminPaymentAssistanceRequest(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number) {
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



















//////////////////////////////////////////////SHORT/SHORT PAGINATION


@Get('withDrawRequets')
@UseInterceptors(TransformInterceptor)
findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query () withDrawRequetsSearchDto : WithDrawRequetsSearchDto) {

  return this.userWalletService.findAll(withDrawRequetsSearchDto, { page, limit });
}



async findAll(withDrawRequetsSearchDto : WithDrawRequetsSearchDto, options: IPaginationOptions): Promise<ResponseDto> {
    try {
      const walletWithDrawRequestRepo = getRepository(WalletWithDrawRequest);
      const Result = await walletWithDrawRequestRepo.createQueryBuilder('wr')
        .innerJoinAndSelect('wr.walletReserveAmount', 'walletReserveAmount')
        .orderBy('wr.id', 'DESC');


        if (withDrawRequetsSearchDto.accountNo) {
          Result.andWhere('LOWER(wr.accountNo) like LOWER(:accountNo)', {accountNo: `%${withDrawRequetsSearchDto.accountNo}%`});
        }


      const Data = await paginate<WalletWithDrawRequest>(Result, options);
      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
