import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
    Res
  } from '@nestjs/common';

  import { OrderService } from './order.service';
import { UserId } from 'src/decorators/use-id.decorator';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnOrderDTO } from './dtos/return-order.dto';
import { Response } from 'express';
  
@Roles(UserType.ADMIN,UserType.USER,UserType.ROOT)
  @Controller('order')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
      @Body() createOrderDTO: CreateOrderDTO,
      @UserId() userId: number,
      ): Promise<OrderEntity> {
      return this.orderService.createOrder(createOrderDTO,userId);
    }

    @Get()
    async findOrdersByUserId(
      @UserId() userId: number,
      @Res({ passthrough: true }) res?: Response,
    ): Promise<OrderEntity[]> {
      const orders = await this.orderService
        .findOrdersByUserId(userId)
        .catch(() => undefined);
  
      if (orders) {
        return orders;
      }
  
      res.status(204).send();
      return;
    }

    @Roles(UserType.ADMIN,UserType.ROOT)
    @Get('/all')
    async findAllOrders(): Promise<ReturnOrderDTO[]> {
      return (await this.orderService.findAllOrders()).map(
        (order) => new ReturnOrderDTO(order),
      );
    }

    @Roles(UserType.ADMIN,UserType.ROOT)
    @Get('/:orderId')
    async findOrderById(
      @Param('orderId') orderId: number,
      ): Promise<ReturnOrderDTO> {
        return new ReturnOrderDTO(
          (await this.orderService.findOrdersByUserId(undefined, orderId))[0],
      );
    }
  }