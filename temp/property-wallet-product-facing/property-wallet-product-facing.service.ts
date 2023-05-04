import { Injectable } from '@nestjs/common';
import { CreatePropertyWalletProductFacingDto } from './dto/create-property-wallet-product-facing.dto';
import { UpdatePropertyWalletProductFacingDto } from './dto/update-property-wallet-product-facing.dto';

@Injectable()
export class PropertyWalletProductFacingService {
  create(createPropertyWalletProductFacingDto: CreatePropertyWalletProductFacingDto) {
    return 'This action adds a new propertyWalletProductFacing';
  }

  findAll() {
    return `This action returns all propertyWalletProductFacing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyWalletProductFacing`;
  }

  update(id: number, updatePropertyWalletProductFacingDto: UpdatePropertyWalletProductFacingDto) {
    return `This action updates a #${id} propertyWalletProductFacing`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyWalletProductFacing`;
  }
}
