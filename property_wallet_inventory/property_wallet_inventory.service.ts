import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePropertyWalletInventoryDto, CreatePropertyWalletInventoryStep2Dto, CreatePropertyWalletInventoryStep3Dto, UpdatePropertyWalletInventoryStep3Dto } from './dto/create-property_wallet_inventory.dto';
import { UpdatePropertyWalletInventoryDto} from './dto/update-property_wallet_inventory.dto';
import { commonMessage } from 'src/common/messages';
import { ResponseDto } from 'src/common/response.dto';
import { PropertyWalletInventory } from './entities/property_wallet_inventory.entity';
import { Connection, getRepository } from 'typeorm';
import { PropertyWalletFeature } from '../propertyWalletInventoryFeaturesList/property-wallet-feature/entities/property-wallet-feature.entity';
import { PropertyWalletBusinessAndCommunication } from '../propertyWalletInventoryFeaturesList/property-wallet-business-and-communication/entities/property-wallet-business-and-communication.entity';
import { PropertyWalletOtherFacilitiesModule } from '../propertyWalletInventoryFeaturesList/property-wallet-other-facilities/property-wallet-other-facilities.module';
import { PropertyWalletOtherFacility } from '../propertyWalletInventoryFeaturesList/property-wallet-other-facilities/entities/property-wallet-other-facility.entity';
import { PropertyWalletHealthCareRecreational } from '../propertyWalletInventoryFeaturesList/property-wallet-health-care-recreational/entities/property-wallet-health-care-recreational.entity';
import { OtherNearByLocation } from '../propertyWalletInventoryFeaturesList/other-near-by-location/entities/other-near-by-location.entity';
import { PropertyWalletRoom } from '../propertyWalletInventoryFeaturesList/property-wallet-room/entities/property-wallet-room.entity';
import { PropertyWalletPlotFeature } from '../propertyWalletInventoryFeaturesList/property-wallet-plot-feature/entities/property-wallet-plot-feature.entity';
import { AdminUserAuthService } from 'src/admin/admin-user-auth/admin-user-auth.service';
import { PropertyWalletCashPaymentPlan } from '../property-wallet-cash-payment-plan/entities/property-wallet-cash-payment-plan.entity';
import { PropertyWalletInstallmentPaymentPlan } from '../property-wallet-installment-payment-plan/entities/property-wallet-installment-payment-plan.entity';
//
@Injectable()
export class PropertyWalletInventoryService {

  constructor(
    private readonly connection: Connection,
    private readonly adminAuth : AdminUserAuthService
    )  {}

    async getProjectDetail (id : number) {
      try {
        const productRepo = getRepository(PropertyWalletInventory);
        const data = await productRepo.createQueryBuilder('p')
        .where('p.id = :id', {id})
        .leftJoinAndSelect('p.projectType','projectType')
        .leftJoinAndSelect('p.projectSubType','projectSubType')
        .getOne()
        return data
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }


  async create(createPropertyWalletInventoryDto: CreatePropertyWalletInventoryDto): Promise<ResponseDto> {
  const queryRunner = this.connection.createQueryRunner();
  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    const repo = queryRunner.manager.getRepository(PropertyWalletInventory);

    const userId = await this.adminAuth.getAdminUserId()
    createPropertyWalletInventoryDto['createdBy'] = userId

    const result = await repo.save(createPropertyWalletInventoryDto)
    await queryRunner.commitTransaction()
    const data = await this.getProjectDetail(result.id)
    return { message: commonMessage.create, data: data};
  } 
  catch (error) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException(error);
  }
   finally {
    await queryRunner.release();
  }
  } 


  async update(propertyWalletInventoryId : number ,updatePropertyWalletInventoryDto : UpdatePropertyWalletInventoryDto) : Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      
      try{
        const projRep = queryRunner.manager.getRepository(PropertyWalletInventory)
        const findCkeck = await projRep.findOne({id: propertyWalletInventoryId})
        if(findCkeck){
            const data = await projRep.update({id : propertyWalletInventoryId},updatePropertyWalletInventoryDto)
        }
          await queryRunner.commitTransaction()
    const data = await this.getProjectDetail(propertyWalletInventoryId)
        return {message : commonMessage.update,   data : data}
      }catch(err){
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(err)
      }finally{
        await queryRunner.release()
      }
    }


    async createPropertyWalletInventoryStep2(createPropertyWalletInventoryStep2Dto : CreatePropertyWalletInventoryStep2Dto){
      ///////////////////////////////////////////
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletFeature)
        const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletBusinessAndCommunication)
        const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletOtherFacility)
        const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletHealthCareRecreational)
        const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(OtherNearByLocation)
        const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletRoom)
        const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletPlotFeature)
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId})
        if(findInv){
          createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto['createdByAdmin'] = userId
          await PWFeatureRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto['createdByAdmin'] = userId
          await PWBusinessAndCommunicationRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto['createdByAdmin'] = userId
          await PWOtherFacilitiesRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto['createdByAdmin'] = userId
          await PWHealthCareRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto)
        
          createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto['createdByAdmin'] = userId
          await PWOtherNearByLocationRepo.insert(createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto['createdByAdmin'] = userId
          await PWRoomRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto)

          createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto['createdByAdmin'] = userId
          await PWPlotFeatureRepo.insert(createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto)
          
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

    async updatePropertyWalletInventoryStep2(createPropertyWalletInventoryStep2Dto : CreatePropertyWalletInventoryStep2Dto){
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWInventoryRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWFeatureRepo = queryRunner.manager.getRepository(PropertyWalletFeature)
        const PWBusinessAndCommunicationRepo = queryRunner.manager.getRepository(PropertyWalletBusinessAndCommunication)
        const PWOtherFacilitiesRepo = queryRunner.manager.getRepository(PropertyWalletOtherFacility)
        const PWHealthCareRepo = queryRunner.manager.getRepository(PropertyWalletHealthCareRecreational)
        const PWOtherNearByLocationRepo = queryRunner.manager.getRepository(OtherNearByLocation)
        const PWRoomRepo = queryRunner.manager.getRepository(PropertyWalletRoom)
        const PWPlotFeatureRepo = queryRunner.manager.getRepository(PropertyWalletPlotFeature)
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWInventoryRepo.findOne({id: createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId})
        if(findInv){
          createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto['updatedByAdmin'] = userId
          await PWFeatureRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletFeatureDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto['updatedByAdmin'] = userId
          await PWBusinessAndCommunicationRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletBusinessAndCommunicationDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto['updatedByAdmin'] = userId
          await PWOtherFacilitiesRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletOtherFacilityDto)
        
          createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto['updatedByAdmin'] = userId
          await PWHealthCareRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletHealthCareRecreationalDto)
        
          createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto['updatedByAdmin'] = userId
          await PWOtherNearByLocationRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createOtherNearByLocationDto)
          
          createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto['updatedByAdmin'] = userId
          await PWRoomRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletRoomDto)

          createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto['updatedByAdmin'] = userId
          await PWPlotFeatureRepo.update({propertyWalletInventoryId : createPropertyWalletInventoryStep2Dto.propertyWalletInventoryId},createPropertyWalletInventoryStep2Dto.createPropertyWalletPlotFeatureDto)
          
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

    async createPropertyWalletInventoryStep3(createPropertyWalletInventoryStep3Dto: CreatePropertyWalletInventoryStep3Dto){
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWIRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWICashPaymentPlanRepo = queryRunner.manager.getRepository(PropertyWalletCashPaymentPlan)
        const PWIInstallmentPaymentPlan = queryRunner.manager.getRepository(PropertyWalletInstallmentPaymentPlan)
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWIRepo.findOne({id: createPropertyWalletInventoryStep3Dto.propertyWalletInventoryId})
        if(findInv){
          createPropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['propertyWalletInventoryId'] = createPropertyWalletInventoryStep3Dto.propertyWalletInventoryId
          createPropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['createdByAdmin'] = userId
          await PWICashPaymentPlanRepo.insert(createPropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto)
          if(createPropertyWalletInventoryStep3Dto?.createPropertyWalletInstallmentPaymentPlanDto){
            for(let data of createPropertyWalletInventoryStep3Dto.createPropertyWalletInstallmentPaymentPlanDto){
              data['propertyWalletInventoryId'] = createPropertyWalletInventoryStep3Dto.propertyWalletInventoryId
              data['createdByAdmin'] = userId
              await PWIInstallmentPaymentPlan.insert(data)
            }
          }
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


    async updatePropertyWalletProductStep3(updatePropertyWalletInventoryStep3Dto: UpdatePropertyWalletInventoryStep3Dto){
      const queryRunner = this.connection.createQueryRunner()
      await queryRunner.connect();
      await queryRunner.startTransaction()
      try{
        const PWProductRepo = queryRunner.manager.getRepository(PropertyWalletInventory)
        const PWPCashPaymentPlanRepo = queryRunner.manager.getRepository(PropertyWalletCashPaymentPlan)
        const PWPInstallmentPaymentPlan = queryRunner.manager.getRepository(PropertyWalletInstallmentPaymentPlan)
        const userId = await this.adminAuth.getAdminUserId()
        const findInv = await PWProductRepo.findOne({id: updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId})
        if(findInv){
          updatePropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['propertyWalletInventoryId'] = updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId
          updatePropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto['updatedByAdmin'] = userId
          await PWPCashPaymentPlanRepo.update({propertyWalletInventoryId : updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId},updatePropertyWalletInventoryStep3Dto.createPropertyWalletCashPaymentPlanDto)
          if(updatePropertyWalletInventoryStep3Dto?.updatePropertyWalletInstallmentPaymentPlanDto){
            for(let data of updatePropertyWalletInventoryStep3Dto.updatePropertyWalletInstallmentPaymentPlanDto){
              data['propertyWalletInventoryId'] = updatePropertyWalletInventoryStep3Dto.propertyWalletInventoryId
              data['updatedByAdmin'] = userId
              const dataId = data.id
              delete data.id
              await PWPInstallmentPaymentPlan.update({id :dataId},data)
            }
          }
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