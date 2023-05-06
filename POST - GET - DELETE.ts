  @Get('getUtil/:propertyWalletInventoryId')
  @hasModulePermission(moduleType.inventories)
  getUtil(@Param('propertyWalletInventoryId') propertyWalletInventoryId: string) {
    return this.propertyWalletUtilsService.getUtil(+propertyWalletInventoryId);
  }

////

@Injectable()
export class PropertyWalletUtilsService {


  constructor(
    private readonly connection: Connection,
    private readonly adminAuth : AdminUserAuthService
    )  {}





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

}
