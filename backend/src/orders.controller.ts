import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './orders.dto.js';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body.email, body.items);
  }
}