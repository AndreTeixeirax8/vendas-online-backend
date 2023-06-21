import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { UserId } from 'src/decorators/use-id.decorator';
import { CartEntity } from './entities/cart.entity';
import { ReturnCartDTO } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.USER,UserType.ADMIN)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    @UsePipes(ValidationPipe)
    @Post()

    async createCart(
      @Body() insertCart: InsertCartDTO,
      @UserId() userId: number,
      ): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(
          await this.cartService.insertProductInCart(insertCart, userId),
        );
    }

    @Get()
    async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDTO> {
      return new ReturnCartDTO(
        await this.cartService.findCartByUserId(userId, true),
      );
    }
  
    @Delete()
    async clearCart(@UserId() userId: number): Promise<DeleteResult> {
      return this.cartService.clearCart(userId);
    }
  }