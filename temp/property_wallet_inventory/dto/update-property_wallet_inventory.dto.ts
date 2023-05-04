import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletInventoryDto, CreatePropertyWalletInventoryStep2Dto } from './create-property_wallet_inventory.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdatePropertyWalletInventoryDto extends PartialType(CreatePropertyWalletInventoryDto) {


    @ApiProperty()
    @IsNumber()
    @IsOptional()
    projectTypeId: number


    @ApiProperty()
    @IsNumber()
    @IsOptional()
    projectSubTypeId: number 

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    NOC : boolean

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    landSize: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    landAreaId: number 


    @ApiProperty()
    @IsString()
    @IsOptional()
    description : string

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    price : number

    @ApiProperty()
    @IsString()
    @IsOptional()
    cashDealCommissionAmount : string


    @ApiProperty()
    @IsString()
    @IsOptional()
    InstallmentDealCommissionAmount : string

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    minimumPrice : number

}
