import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

export class CreatePropertyWalletFacingDto {
 
        
    createdByAdmin : number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletInventoryId: number;


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletFacingId : number;
}
