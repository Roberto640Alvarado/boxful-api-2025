import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.ordersService.createOrder(createOrderDto);
      return {
        status: 'success',
        message: 'Order created successfully',
        data: order,
      };
    } catch (error) {
      throw error;
    }
  }
}
