import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePropertyWalletProductStep1Dto, CreatePropertyWalletProductStep2Dto } from './dto/create-property-wallet-product.dto';
import { UpdatePropertyWalletProductStep1Dto } from './dto/update-property-wallet-product.dto';
import { AdminUserAuthService } from '../../admin-user-auth/admin-user-auth.service';
import { Connection, getRepository } from 'typeorm';
import { commonMessage } from 'src/common/messages';
import { PropertyWalletProduct } from './entities/property-wallet-product.entity';
import { PropertyWalletProductFeature } from '../propertyWalletProductFeaturesList/property-wallet-product-feature/entities/property-wallet-product-feature.entity';
import { PropertyWalletProductBusinessAndCommunication } from '../propertyWalletProductFeaturesList/property-wallet-product-business-and-communication/entities/property-wallet-product-business-and-communication.entity';
import { PropertyWalletProductOtherFacility } from '../propertyWalletProductFeaturesList/property-wallet-product-other-facilities/entities/property-wallet-product-other-facility.entity';
import { PropertyWalletProductHealthCareRecreational } from '../propertyWalletProductFeaturesList/property-wallet-product-health-care-recreational/entities/property-wallet-product-health-care-recreational.entity';
import { PropertyWalletProductOtherNearByLocation } from '../propertyWalletProductFeaturesList/property-wallet-product-other-near-by-location/entities/property-wallet-product-other-near-by-location.entity';
import { PropertyWalletProductRoom } from '../propertyWalletProductFeaturesList/property-wallet-product-room/entities/property-wallet-product-room.entity';
import { PropertyWalletProductPlotFeature } from '../propertyWalletProductFeaturesList/property-wallet-product-plot-feature/entities/property-wallet-product-plot-feature.entity';

@Injectable()
export class PropertyWalletProductService {
  constructor(
    private readonly connection: Connection,
    private readonly adminAuth: AdminUserAuthService,
  ) {}
async getProductDetail (id : number){
  try {
    const productRepo = getRepository(
      PropertyWalletProduct
    );
    const data = await productRepo.createQueryBuilder('p')
    .where('p.id = :id', {id})
    .leftJoinAndSelect('p.projectType','projectType')
    .leftJoinAndSelect('p.ProjectSubType','ProjectSubType')
    .getOne()
    return data

  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
  async createPropertyWalletProductStep1(
    createPropertyWalletProductStep1Dto: CreatePropertyWalletProductStep1Dto,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productRepo = queryRunner.manager.getRepository(
        PropertyWalletProduct
      );
      const userId = await this.adminAuth.getAdminUserId();
      createPropertyWalletProductStep1Dto['createdBy'] = userId;
      const result = await productRepo.save(
        createPropertyWalletProductStep1Dto,
      );
      await queryRunner.commitTransaction();
      const data = await this.getProductDetail(result.id)
      return { message: commonMessage.create, data: data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updatePropertyWalletProductStep1(
    id: number,
    updatePropertyWalletProductStep1Dto: UpdatePropertyWalletProductStep1Dto,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productRepo = queryRunner.manager.getRepository(
        PropertyWalletProduct,
      );
      const productCheck = await productRepo.findOne({ id });
      if (productCheck) {
        const userId = await this.adminAuth.getAdminUserId();
        updatePropertyWalletProductStep1Dto['updatedBy'] = userId;
        const result = await productRepo.update(
          { id },
          updatePropertyWalletProductStep1Dto,
        );
        await queryRunner.commitTransaction();
      const data = await this.getProductDetail(id)

        return { message: commonMessage.update, data: data };
      } else {
        throw commonMessage.invalidInventory;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

 async createPropertyWalletProductStep2(createPropertyWalletProductStep2Dto: CreatePropertyWalletProductStep2Dto) {
  const queryRunner = this.connection.createQueryRunner()
  await queryRunner.connect();
  await queryRunner.startTransaction()
  try{
    const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletProduct)
    const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductFeature)
    const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletProductBusinessAndCommunication)
    const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherFacility)
    const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletProductHealthCareRecreational)
    const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherNearByLocation)
    const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletProductRoom)
    const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductPlotFeature)
    const userId = this.adminAuth.getAdminUserId()
    const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletProductStep2Dto.propertyWalletProductId})
    if(findInv){
      createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto['createdByAdmin'] = userId
      await PWFeatureRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto)
      
      createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto['createdByAdmin'] = userId
      await PWBusinessAndCommunicationRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto)
    
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto['createdByAdmin'] = userId
      await PWOtherFacilitiesRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto)
    
      createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto['createdByAdmin'] = userId
      await PWHealthCareRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto)
    
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto['createdByAdmin'] = userId
      await PWOtherNearByLocationRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto)
      
      createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto['createdByAdmin'] = userId
      await PWRoomRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto)

      createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto['propertyWalletProductId'] = createPropertyWalletProductStep2Dto.propertyWalletProductId
      createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto['createdByAdmin'] = userId
      await PWPlotFeatureRepo.insert(createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto)
      
      await queryRunner.commitTransaction()
      return {message : commonMessage.create}
  }
  else{
    throw commonMessage.invalidInventory
  }
  }catch(err){
    await queryRunner.rollbackTransaction()
    throw new InternalServerErrorException(err)
  }finally{
    await queryRunner.release()
  }
}

  async updatePropertyWalletProductStep2(createPropertyWalletProductStep2Dto : CreatePropertyWalletProductStep2Dto){
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction()
    try{
      const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletProduct)
      const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductFeature)
      const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletProductBusinessAndCommunication)
      const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherFacility)
      const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletProductHealthCareRecreational)
      const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(PropertyWalletProductOtherNearByLocation)
      const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletProductRoom)
      const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletProductPlotFeature)
      const userId = this.adminAuth.getAdminUserId()
      const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletProductStep2Dto.propertyWalletProductId})
      if(findInv){
        createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto['updatedByAdmin'] = userId
        await PWFeatureRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductFeatureDto)
        
        createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto['updatedByAdmin'] = userId
        await PWBusinessAndCommunicationRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductBusinessAndCommunicationDto)
      
        createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto['updatedByAdmin'] = userId
        await PWOtherFacilitiesRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherFacilityDto)
      
        createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto['updatedByAdmin'] = userId
        await PWHealthCareRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductHealthCareRecreationalDto)
      
        createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto['updatedByAdmin'] = userId
        await PWOtherNearByLocationRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductOtherNearByLocationDto)
        
        createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto['updatedByAdmin'] = userId
        await PWRoomRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductRoomDto)

        createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto['updatedByAdmin'] = userId
        await PWPlotFeatureRepo.update({propertyWalletProductId : createPropertyWalletProductStep2Dto.propertyWalletProductId},createPropertyWalletProductStep2Dto.createPropertyWalletProductPlotFeatureDto)
        
        await queryRunner.commitTransaction()
        return {message : commonMessage.update}
    }
    else{
      throw commonMessage.invalidInventory
    }
    }catch(err){
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(err)
    }finally{
      await queryRunner.release()
    }
  }
}
