import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export enum IsVisited {
  VISITED = 'VISITED',
  NOTVISITED = 'NOTVISITED',
  PENDING = 'PENDING',
}

export class CreateProCooVisitLogDto {
  @ApiProperty({ required: false })
  @IsOptional()
  propertyWalletProjectId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  propertyWalletProductId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  projectCoordinatorUserId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  agencyId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  attendantId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  attendantName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  clientPhone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  visitDate: Date;

  @ApiProperty({ required: true })
  @IsOptional()
  shortDescription: string;
}

export class VisitStatusDto {
  @ApiProperty({ type: 'string', enum: IsVisited, required: true })
  @IsOptional()
  isVisited: IsVisited;
}
