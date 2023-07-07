import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { OrderEntity } from '../entities/order.entity';
import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { ReturnPaymentDTO } from 'src/payment/dtos/return-payment.dto';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';

export class ReturnOrderDTO {
  id: number;
  date: string;
  user?: ReturnUserDto;
  address?: ReturnAddressDto;
  payment?: ReturnPaymentDTO;
  ordersProduct?: OrderProductEntity[];

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ReturnUserDto(order.user) : undefined;
    this.address = order.address
    ? new ReturnAddressDto(order.address)
    : undefined;
  this.payment = order.payment
    ? new ReturnPaymentDTO(order.payment)
    : undefined;
  this.ordersProduct = order.ordersProduct;
  }
}