import { Controller, Post, Get, Body, Query, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: CreateOrderDto) {
    try {
      return this.ordersService.createOrder(body.studentId, body.items);
    } catch (err: any) {
      throw new BadRequestException({
        code: err.code,
        message: err.message
      });
    }
  }
  @Get('getAllData')
  getAllData() {
    return this.ordersService.getAllData();
  }
}