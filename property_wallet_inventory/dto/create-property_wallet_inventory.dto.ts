import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, IsBoolean, isNumber, IsNotEmpty } from "class-validator"
import { Entity } from "typeorm"
import { CreatePropertyWalletFeatureDto } from "../../propertyWalletInventoryFeaturesList/property-wallet-feature/dto/create-property-wallet-feature.dto"
import { CreatePropertyWalletBusinessAndCommunicationDto } from "../../propertyWalletInventoryFeaturesList/property-wallet-business-and-communication/dto/create-property-wallet-business-and-communication.dto"
import { CreatePropertyWalletOtherFacilityDto } from "../../propertyWalletInventoryFeaturesList/property-wallet-other-facilities/dto/create-property-wallet-other-facility.dto"
import { CreatePropertyWalletHealthCareRecreationalDto } from "../../propertyWalletInventoryFeaturesList/property-wallet-health-care-recreational/dto/create-property-wallet-health-care-recreational.dto"
import { CreateOtherNearByLocationDto } from "../../propertyWalletInventoryFeaturesList/other-near-by-location/dto/create-other-near-by-location.dto"
import { CreatePropertyWalletRoomDto } from "../../propertyWalletInventoryFeaturesList/property-wallet-room/dto/create-property-wallet-room.dto"
import { CreatePropertyWalletPlotFeatureDto } from "../../propertyWalletInventoryFeaturesList/property-wallet-plot-feature/dto/create-property-wallet-plot-feature.dto"
import { CreatePropertyWalletCashPaymentPlanDto } from "../../property-wallet-cash-payment-plan/dto/create-property-wallet-cash-payment-plan.dto"
import { CreatePropertyWalletInstallmentPaymentPlanDto } from "../../property-wallet-installment-payment-plan/dto/create-property-wallet-installment-payment-plan.dto"
import { UpdatePropertyWalletInstallmentPaymentPlanDto } from "../../property-wallet-installment-payment-plan/dto/update-property-wallet-installment-payment-plan.dto"

export class CreatePropertyWalletInventoryDto {
    

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletProjectId: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectTypeId: number


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectSubTypeId: number 

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    NOC : boolean

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    landSize: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    landAreaId: number 


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description : string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price : number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cashDealCommissionAmount : string


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    InstallmentDealCommissionAmount : string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    minimumPrice : number


    

}



export class CreatePropertyWalletInventoryStep2Dto { 

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletInventoryId: number

    @ApiProperty({ type : CreatePropertyWalletFeatureDto})
    @IsOptional()
    createPropertyWalletFeatureDto : CreatePropertyWalletFeatureDto;

    @ApiProperty({ type : CreatePropertyWalletBusinessAndCommunicationDto})
    @IsOptional()
    createPropertyWalletBusinessAndCommunicationDto : CreatePropertyWalletBusinessAndCommunicationDto;

    @ApiProperty({ type : CreatePropertyWalletOtherFacilityDto})
    @IsOptional()
    createPropertyWalletOtherFacilityDto : CreatePropertyWalletOtherFacilityDto;

    @ApiProperty({ type : CreatePropertyWalletHealthCareRecreationalDto})
    @IsOptional()
    createPropertyWalletHealthCareRecreationalDto : CreatePropertyWalletHealthCareRecreationalDto;

    @ApiProperty({ type : CreateOtherNearByLocationDto})
    @IsOptional()
    createOtherNearByLocationDto : CreateOtherNearByLocationDto;

    @ApiProperty({ type : CreatePropertyWalletRoomDto})
    @IsOptional()
    createPropertyWalletRoomDto : CreatePropertyWalletRoomDto;

    @ApiProperty({ type : CreatePropertyWalletPlotFeatureDto})
    @IsOptional()
    createPropertyWalletPlotFeatureDto : CreatePropertyWalletPlotFeatureDto;
}

export class CreatePropertyWalletInventoryStep3Dto {


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletInventoryId: number

    @ApiProperty({ type : CreatePropertyWalletCashPaymentPlanDto})
    createPropertyWalletCashPaymentPlanDto : CreatePropertyWalletCashPaymentPlanDto;

    @ApiProperty({isArray : true , type : CreatePropertyWalletInstallmentPaymentPlanDto})
    @IsOptional()
    createPropertyWalletInstallmentPaymentPlanDto : CreatePropertyWalletInstallmentPaymentPlanDto[];

} 

export class UpdatePropertyWalletInventoryStep3Dto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletInventoryId: number
    
    @ApiProperty({ type : CreatePropertyWalletCashPaymentPlanDto})
    createPropertyWalletCashPaymentPlanDto : CreatePropertyWalletCashPaymentPlanDto;

    @ApiProperty({isArray : true , type : UpdatePropertyWalletInstallmentPaymentPlanDto})
    @IsOptional()
    updatePropertyWalletInstallmentPaymentPlanDto : UpdatePropertyWalletInstallmentPaymentPlanDto[];

} 