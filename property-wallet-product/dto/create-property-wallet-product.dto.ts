import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { CreateOtherNearByLocationDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/other-near-by-location/dto/create-other-near-by-location.dto"
import { CreatePropertyWalletBusinessAndCommunicationDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/property-wallet-business-and-communication/dto/create-property-wallet-business-and-communication.dto"
import { CreatePropertyWalletFeatureDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/property-wallet-feature/dto/create-property-wallet-feature.dto"
import { CreatePropertyWalletHealthCareRecreationalDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/property-wallet-health-care-recreational/dto/create-property-wallet-health-care-recreational.dto"
import { CreatePropertyWalletOtherFacilityDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/property-wallet-other-facilities/dto/create-property-wallet-other-facility.dto"
import { CreatePropertyWalletPlotFeatureDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/property-wallet-plot-feature/dto/create-property-wallet-plot-feature.dto"
import { CreatePropertyWalletRoomDto } from "src/admin/property_wallet_project_detail/propertyWalletInventoryFeaturesList/property-wallet-room/dto/create-property-wallet-room.dto"
import { CreatePropertyWalletProductFeatureDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-feature/dto/create-property-wallet-product-feature.dto"
import { CreatePropertyWalletProductBusinessAndCommunicationDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-business-and-communication/dto/create-property-wallet-product-business-and-communication.dto"
import { CreatePropertyWalletProductOtherFacilityDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-other-facilities/dto/create-property-wallet-product-other-facility.dto"
import { CreatePropertyWalletProductHealthCareRecreationalDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-health-care-recreational/dto/create-property-wallet-product-health-care-recreational.dto"
import { CreatePropertyWalletProductOtherNearByLocationDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-other-near-by-location/dto/create-property-wallet-product-other-near-by-location.dto"
import { CreatePropertyWalletProductRoomDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-room/dto/create-property-wallet-product-room.dto"
import { CreatePropertyWalletProductPlotFeatureDto } from "../../propertyWalletProductFeaturesList/property-wallet-product-plot-feature/dto/create-property-wallet-product-plot-feature.dto"

export class CreatePropertyWalletProductStep1Dto {

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
    @IsString()
    @IsNotEmpty()
    ownerName : string

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    ownerPhone : string
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    ownerEmail : string
    
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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    latitude : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    longitude : string

}

export class CreatePropertyWalletProductStep2Dto { 

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletProductId: number

    @ApiProperty({ type : CreatePropertyWalletProductFeatureDto})
    @IsOptional()
    createPropertyWalletProductFeatureDto : CreatePropertyWalletProductFeatureDto;

    @ApiProperty({ type : CreatePropertyWalletProductBusinessAndCommunicationDto})
    @IsOptional()
    createPropertyWalletProductBusinessAndCommunicationDto : CreatePropertyWalletProductBusinessAndCommunicationDto;

    @ApiProperty({ type : CreatePropertyWalletProductOtherFacilityDto})
    @IsOptional()
    createPropertyWalletProductOtherFacilityDto : CreatePropertyWalletProductOtherFacilityDto;

    @ApiProperty({ type : CreatePropertyWalletProductHealthCareRecreationalDto})
    @IsOptional()
    createPropertyWalletProductHealthCareRecreationalDto : CreatePropertyWalletProductHealthCareRecreationalDto;

    @ApiProperty({ type : CreatePropertyWalletProductOtherNearByLocationDto})
    @IsOptional()
    createPropertyWalletProductOtherNearByLocationDto : CreatePropertyWalletProductOtherNearByLocationDto;

    @ApiProperty({ type : CreatePropertyWalletProductRoomDto})
    @IsOptional()
    createPropertyWalletProductRoomDto : CreatePropertyWalletProductRoomDto;

    @ApiProperty({ type : CreatePropertyWalletProductPlotFeatureDto})
    @IsOptional()
    createPropertyWalletProductPlotFeatureDto : CreatePropertyWalletProductPlotFeatureDto;
}
