import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletProjectStep1Dto } from './create-property_wallet_project.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdatePropertyWalletProjectStep1Dto{

    
    // @ApiProperty()
    // propertyWalletProjectId: number


    @ApiProperty()
    @IsOptional()
    projectName : string
    
    @ApiProperty()
    @IsOptional()
    NOC : boolean
    
    @ApiProperty()
    @IsOptional()
    description : string
    
    @ApiProperty()
    @IsOptional()
    address : string
    
    @ApiProperty()
    @IsOptional()
    city : string
    
    @ApiProperty()
    @IsOptional()
    latitude : string 
    
    @ApiProperty()
    @IsOptional()
    longitude : string
}

export class UpdatePropertyWalletProjectStep3Dto {

    @ApiProperty({required: false})
    @IsOptional()
    builderName : string
    
    @ApiProperty({required: false})
    @IsOptional()
    phoneNo : string
    
    @ApiProperty({required: false})
    @IsOptional()
    websiteLink : string
    
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    BuilderLogo: Express.Multer.File;
}
