export enum Type {
  SaleQuotation = "SaleQuotation",
  SaleOrder = "SaleOrder",
  PaymentPlan = "PaymentPlan",
  Brochure = "Brochure",
  PostCreator = "PostCreator",
}

export class CreateNotificationDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  shortTitle: string;

  @ApiProperty()
  @IsString()
  notificationType: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNumber()
  createdBy: number;

  @ApiProperty({ required: false })
  @IsOptional()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  refId: string;

  @ApiProperty()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ type: "string", format: "binary", required: true })
  freeTool: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsEnum([
    Type.SaleQuotation,
    Type.SaleOrder,
    Type.PaymentPlan,
    Type.Brochure,
    Type.PostCreator,
  ])
  status: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  projectTypeId: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  NOC: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  ownerPhone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  ownerEmail: string;

  @ApiProperty({ required: true })
  @IsString()
  fullName: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsPhoneNumber()
  phone: string;

  /////Placing another Sub-Dto as an array in the dto. 'CreateHotListingSubDto' is written below
  @ApiProperty({ type: [CreateHotListingSubDto] })
  createHotListingSubDto: CreateHotListingSubDto[];

  //To show enum dropdown in the swagger
  @ApiProperty({ type: "string", enum: InventoryStatus, required: false })
  @IsOptional()
  inVentoryType: InventoryStatus;
}

export class CreateHotListingSubDto {
  @ApiProperty()
  @IsNotEmpty()
  inventoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  saleCommission: number;

  @ApiProperty({ required: false })
  @IsOptional()
  isNegotiate: boolean;
}
