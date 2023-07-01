import {
    Body,
    Controller,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';

  import { OrderService } from './order.service';
import { UserId } from 'src/decorators/use-id.decorator';
import { CreateOrderDTO } from './dtos/create-order.dto';
  
  @Controller('order')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
      @Body() createOrderDTO: CreateOrderDTO,
      @UserId() userId: number,
    ) {
      return this.orderService.createOrder(createOrderDTO,userId);
    }
  }