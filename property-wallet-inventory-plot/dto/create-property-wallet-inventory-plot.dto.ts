import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsNotEmpty, IsString} from "class-validator"

export class CreatePropertyWalletInventoryPlotDto {


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    value : string

}
