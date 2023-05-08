import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { commonMessage } from 'src/common/messages';
import { ResponseDto } from 'src/common/response.dto';
import { Connection, getRepository } from 'typeorm';
import { PropertyWalletInventoryPlotDetails } from './entities/property-wallet-inventory-plot-details.entity';
import { CreatePropertyWalletInventoryPlotDto } from './dto/create-property-wallet-inventory-plot.dto';
import { AdminUserAuthService } from 'src/admin/admin-user-auth/admin-user-auth.service';


@Injectable()
export class PropertyWalletInventoryPlotService {
  constructor(
    private readonly connection: Connection,
    private readonly adminAuth : AdminUserAuthService
    )  {}

    
  async GetAllPWInventoryPlot():Promise<ResponseDto> {
    try {
      const PWIPlotDetailsRepo = getRepository(PropertyWalletInventoryPlotDetails) 
      const PWIPlotDetailResult = PWIPlotDetailsRepo.createQueryBuilder('PropertyWalletInventoryPlotDetails')
      const PWIPlotDetailTotal = await PWIPlotDetailResult.getMany();
      return { message: commonMessage.get, data:PWIPlotDetailTotal };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


async CreatePWInventoryPlot(createPropertyWalletInventoryPlotDto: CreatePropertyWalletInventoryPlotDto): Promise<ResponseDto> {
  const queryRunner = this.connection.createQueryRunner();
  await queryRunner.connect()
  await queryRunner.startTransaction()
  
  try {
    const PWIPlotDetailsRepo = queryRunner.manager.getRepository(PropertyWalletInventoryPlotDetails);
    const userId = await this.adminAuth.getAdminUserId()
    createPropertyWalletInventoryPlotDto['createdBy'] = userId

        const PWIPlotDetailResult = await PWIPlotDetailsRepo.save(createPropertyWalletInventoryPlotDto)
    await queryRunner.commitTransaction()
    return { message: commonMessage.create, data: {PWIPlotDetailResult} };
  } 
  catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  }
   finally {
    await queryRunner.release();
  }}


  async DeletePWInventoryPlot(id: number): Promise<any> {

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

      const PWIPlotDetailsRepo = queryRunner.manager.getRepository(PropertyWalletInventoryPlotDetails);
      await PWIPlotDetailsRepo.delete({ id: id}) 
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

