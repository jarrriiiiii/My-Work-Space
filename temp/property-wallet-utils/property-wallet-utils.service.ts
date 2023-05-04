import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreatePropertyWalletUtilDto } from './dto/create-property-wallet-util.dto';
import { UpdatePropertyWalletUtilDto } from './dto/update-property-wallet-util.dto';
import { commonMessage } from 'src/common/messages';
import { ResponseDto } from 'src/common/response.dto';
import { PropertyWalletInventory } from '../../property_wallet_inventory/entities/property_wallet_inventory.entity';
import { AdminUserAuthService } from 'src/admin/admin-user-auth/admin-user-auth.service';
import { Connection, getRepository } from 'typeorm';
import { PropertyWalletMultiUtilities } from './entities/property-wallet-multi-utilities.entity';
import { Util } from 'src/projects/projectFeatureList/utils/entities/util.entity';

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
          x['isMatching'] = false
          for(let y of data){
            if(x.id == y.id) {
              x['isMatching'] = true
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
