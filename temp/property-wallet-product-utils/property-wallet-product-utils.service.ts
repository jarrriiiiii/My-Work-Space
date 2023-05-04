import { Injectable } from '@nestjs/common';
import { CreatePropertyWalletProductUtilDto } from './dto/create-property-wallet-product-util.dto';
import { UpdatePropertyWalletProductUtilDto } from './dto/update-property-wallet-product-util.dto';

@Injectable()
export class PropertyWalletProductUtilsService {
  create(createPropertyWalletProductUtilDto: CreatePropertyWalletProductUtilDto) {
    return 'This action adds a new propertyWalletProductUtil';
  }

  findAll() {
    return `This action returns all propertyWalletProductUtils`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyWalletProductUtil`;
  }

  update(id: number, updatePropertyWalletProductUtilDto: UpdatePropertyWalletProductUtilDto) {
    return `This action updates a #${id} propertyWalletProductUtil`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyWalletProductUtil`;
  }
}
