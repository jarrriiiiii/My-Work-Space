import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProCooAssignProjectDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  projectCoordinatorUserId: number;

  @ApiProperty({
    type: [Number],
    required: true,
  })
  @IsNotEmpty()
  propertyWalletProjectId: number[];
}
