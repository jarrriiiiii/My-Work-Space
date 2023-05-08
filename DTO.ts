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


