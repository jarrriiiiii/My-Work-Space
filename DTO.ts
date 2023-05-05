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

    @ApiProperty({ required: true })
    @IsString()
    fullName: string;
  
    @ApiProperty({ required: true })
    adminRoleId: number

    @ApiProperty({ required: true })
    @IsEmail()
    email: string
  
    @ApiProperty({ required: true })
    @IsPhoneNumber()
    phone: string
}


