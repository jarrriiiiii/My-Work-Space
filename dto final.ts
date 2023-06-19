export class CreateNotificationDto {
    @ApiProperty()
    @IsNumber()
    userId : number

    @ApiProperty()
    @IsString()
    shortTitle : string

    @ApiProperty()
    @IsString()
    notificationType : string

    @ApiProperty()
    @IsString()
    message : string

    @ApiProperty()
    @IsNumber()
    createdBy : number

    @ApiProperty({required : false})
    @IsOptional()
    url : string

    @ApiProperty({required : false})
    @IsOptional()
    refId : string

    @ApiProperty()
    @IsOptional()
    imageUrl : string
}





//////////////////////////////////////////



export enum Type{
    SaleQuotation = 'SaleQuotation',
    SaleOrder = 'SaleOrder',
    PaymentPlan = 'PaymentPlan',
    Brochure = 'Brochure',
    PostCreator = 'PostCreator'
}

export class CreateSaveAllPdfDto {

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    freeTool: Express.Multer.File;




@IsString()
@IsNotEmpty()
@ApiProperty()
@IsEnum([Type.SaleQuotation, Type.SaleOrder , Type.PaymentPlan, Type.Brochure,Type.PostCreator ])
status: string;

// @ApiProperty()
// @IsString()
// @IsNotEmpty()
refId: string;

// @ApiProperty()
// @IsString()
// @IsNotEmpty()
url: string;


}


---------

    export class CreatePropertyWalletProductStep1Dto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectTypeId: number

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    NOC : boolean

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description : string

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    ownerPhone : string
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    ownerEmail : string
    
    @ApiProperty({ required: true })
    @IsString()
    fullName: string;

    @ApiProperty({ required: true })
    @IsEmail()
    email: string
  
    @ApiProperty({ required: true })
    @IsPhoneNumber()
    phone: string
}


