import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Package, PackageSchema } from './entities/package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Package.name, schema: PackageSchema },
    ]),
  ],
  controllers: [OrdersController], 
  providers: [OrdersService],
})
export class OrdersModule {}
