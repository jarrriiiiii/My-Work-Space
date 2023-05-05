  @Post('createUtil')
  @hasModulePermission(moduleType.inventories)
  createUtil(@Body() createPropertyWalletUtilDto: CreatePropertyWalletUtilDto) {
    return this.propertyWalletUtilsService.createUtil(createPropertyWalletUtilDto);
  }

  @Get('getUtil/:propertyWalletInventoryId')
  @hasModulePermission(moduleType.inventories)
  getUtil(@Param('propertyWalletInventoryId') propertyWalletInventoryId: string) {
    return this.propertyWalletUtilsService.getUtil(+propertyWalletInventoryId);
  }

  @Delete('removeUtil')
  @hasModulePermission(moduleType.inventories)
  removeUtil(createPropertyWalletUtilDto: CreatePropertyWalletUtilDto) {
    return this.propertyWalletUtilsService.removeUtil(createPropertyWalletUtilDto);
  }

  
}

///

@Injectable()
export class PropertyWalletUtilsService {


  constructor(
    private readonly connection: Connection,
    private readonly adminAuth : AdminUserAuthService
    )  {}


  async createUtil(createPropertyWalletUtilDto: CreatePropertyWalletUtilDto): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
  
    try {
      const repo = queryRunner.manager.getRepository(PropertyWalletMultiUtilities);
  
      const userId = await this.adminAuth.getAdminUserId()
      createPropertyWalletUtilDto.createdByAdmin = userId
      const result = await repo.save(createPropertyWalletUtilDto)
      await queryRunner.commitTransaction()
      return { message: commonMessage.create, data: {result} };
    } 
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    }
     finally {
      await queryRunner.release();
    }
    }


    async getUtil(propertyWalletInventoryId :number): Promise<ResponseDto> {
      try {
        const PWMURepo = getRepository(PropertyWalletMultiUtilities);
        const utilRepo = getRepository(Util); 
        const utilResult = await utilRepo.createQueryBuilder('util')
        .getMany()

        const PWMUResult = PWMURepo.createQueryBuilder('PropertyWalletMultiUtilities')
        .select([
          'PropertyWalletMultiUtilities.id',
          'PropertyWalletMultiUtilities.propertyWalletInventoryId',
          'PropertyWalletMultiUtilities.propertyWalletUtilId',
          'propertyWalletUtil.id',
          'propertyWalletUtil.title',
        ])
        .where('PropertyWalletMultiUtilities.propertyWalletInventoryId = :propertyWalletInventoryId',{propertyWalletInventoryId})
        .leftJoin('PropertyWalletMultiUtilities.propertyWalletUtil','propertyWalletUtil')
        const data = await PWMUResult.getMany();

        for(let x of utilResult){
          x['abc'] = false
          for(let y of data){
            if(x.id == y.id) {
              x['abc'] = true
            }
          }
        }
        return {
          message: commonMessage.get,
          data: utilResult,
        };
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }


    async removeUtil(createPropertyWalletUtilDto: CreatePropertyWalletUtilDto): Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
        const PWMURepo = queryRunner.manager.getRepository(PropertyWalletMultiUtilities);
        await PWMURepo.delete({
          propertyWalletInventoryId : createPropertyWalletUtilDto.propertyWalletInventoryId,
          propertyWalletUtilId : createPropertyWalletUtilDto.propertyWalletUtilId
        }) 
        await queryRunner.commitTransaction()
        return { message: commonMessage.delete, data: null }
      }
      catch (error) {
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(error)
      }
      finally {
        await queryRunner.release()
      }
    }

}
