import { Controller, Get,UsePipes,ValidationPipe,Post,Body } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProduct(product),
    );
  }

  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }
}