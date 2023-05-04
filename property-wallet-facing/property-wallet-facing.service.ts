import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePropertyWalletFacingDto } from './dto/create-property-wallet-facing.dto';
import { Connection, getRepository } from 'typeorm';
import { AdminUserAuthService } from 'src/admin/admin-user-auth/admin-user-auth.service';
import { ResponseDto } from 'src/common/response.dto';
import { commonMessage } from 'src/common/messages';
import { PropertyWalletMultiFacing } from './entities/property-wallet-multi-facing.entity';
import { Util } from 'src/projects/projectFeatureList/utils/entities/util.entity';

@Injectable()
export class PropertyWalletFacingService {

  constructor(
    private readonly connection: Connection,
    private readonly adminAuth : AdminUserAuthService
    )  {}


  async createFacing(createPropertyWalletFacingDto: CreatePropertyWalletFacingDto): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
  
    try {
      const pwmfRepo = queryRunner.manager.getRepository(PropertyWalletMultiFacing);
  
      const userId = await this.adminAuth.getAdminUserId()
      createPropertyWalletFacingDto.createdByAdmin = userId
      const result = await pwmfRepo.save(createPropertyWalletFacingDto)
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


    async getFacing(propertyWalletInventoryId :number): Promise<ResponseDto> {
      try {
        const pwmfRepo = getRepository(PropertyWalletMultiFacing);
        const utilRepo = getRepository(Util); 
        const utilResult = await utilRepo.createQueryBuilder('util')
        .getMany()

        const pwmfResult = pwmfRepo.createQueryBuilder('PropertyWalletMultiFacing')
        .select([
          'PropertyWalletMultiFacing.id',
          'PropertyWalletMultiFacing.propertyWalletInventoryId',
          'PropertyWalletMultiFacing.propertyWalletFacingId',
          'propertyWalletFacing.id',
          'propertyWalletFacing.title', 
        ])
        .where('PropertyWalletMultiFacing.propertyWalletInventoryId = :propertyWalletInventoryId',{propertyWalletInventoryId})
        .leftJoin('PropertyWalletMultiFacing.propertyWalletFacing','propertyWalletFacing')
        const data = await pwmfResult.getMany();

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


    async removeFacing(createPropertyWalletFacingDto: CreatePropertyWalletFacingDto): Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
        const pwmfRepo = queryRunner.manager.getRepository(PropertyWalletMultiFacing);
        await pwmfRepo.delete({
          propertyWalletInventoryId : createPropertyWalletFacingDto.propertyWalletInventoryId,
          propertyWalletFacingId : createPropertyWalletFacingDto.propertyWalletFacingId
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
