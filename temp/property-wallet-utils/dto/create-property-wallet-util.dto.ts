import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
export class CreatePropertyWalletUtilDto {
    
    
    createdByAdmin : number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletInventoryId: number;


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyWalletUtilId : number;

}
