import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePropertyWalletProductFacingDto {
    createdByAdmin : number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletProductId: number;


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletFacingId : number;
}
