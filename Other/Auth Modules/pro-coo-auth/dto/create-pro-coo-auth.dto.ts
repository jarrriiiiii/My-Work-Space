import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateProCooAuthDto {}

export class PcSignUpDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  projectCoordinatorRoleId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  whatsappNo: string;
}

export class PcSignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  deviceToken: string;

  userType: string;
}

export class SuspendCoordinatorDto {
  @ApiProperty({ default: false })
  @IsBoolean()
  @IsNotEmpty()
  isActive = false;
}
