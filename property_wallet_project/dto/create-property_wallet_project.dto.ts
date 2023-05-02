
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, isNotEmpty } from "class-validator";
export class CreatePropertyWalletProjectStep1Dto {

    @ApiProperty()
    projectName : string

    @ApiProperty()
    NOC : boolean

    @ApiProperty()
    description : string
    
    @ApiProperty()
    address : string
    
    @ApiProperty()
    city : string

    @ApiProperty()
    latitude : string 
    
    @ApiProperty()
    longitude : string
    
}

export class CreatePropertyWalletProjectStep2Dto {

    @ApiProperty({ type: 'array', items: {type: 'string', format: 'binary'}, required: false })
    legalDocument: any[];

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    masterPlan: Express.Multer.File;

    @ApiProperty()
    propertyWalletProjectId: number


}

export class UpdateDocumentStep2Dto {

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    master: any[];

    @ApiProperty({ type: 'array', items: {type: 'string', format: 'binary'}, required: false })
    legalDocument: any[];

}
export class CreatePropertyWalletProjectStep3Dto {

    @ApiProperty()
    builderName : string
    
    @ApiProperty()
    @IsPhoneNumber()
    phoneNo : string
    
    @ApiProperty()
    websiteLink : string
    
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    BuilderLogo: Express.Multer.File;

    @ApiProperty()
    propertyWalletProjectId: number
}


export class PropertyWalleSearchDto {
    @ApiProperty({required :false})
    @IsOptional()
    projectName : string

     @ApiProperty({required :false})
    @IsOptional()
    propertyWalletProjectId: number

     @ApiProperty({required :false})
    @IsOptional()
    city : string

     @ApiProperty({required :false})
    @IsOptional()
    NOC : boolean

}