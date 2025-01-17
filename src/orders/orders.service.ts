import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Package, PackageDocument } from './entities/package.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const {
        pickupAddress,
        scheduledDate,
        firstName,
        lastName,
        email,
        phone,
        recipientAddress,
        department,
        municipality,
        referencePoint,
        instructions,
        packages,
      } = createOrderDto;

      //Crear y guardar los paquetes
      const createdPackages = await Promise.all(
        packages.map((pkg: CreatePackageDto) => new this.packageModel(pkg).save()),
      );

      //Crear y guardar la orden
      const order = new this.orderModel({
        pickupAddress,
        scheduledDate,
        firstName,
        lastName,
        email,
        phone,
        recipientAddress,
        department,
        municipality,
        referencePoint,
        instructions,
        packages: createdPackages.map((pkg) => pkg._id),
      });

      return await order.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

