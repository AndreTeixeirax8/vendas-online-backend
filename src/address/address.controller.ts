import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/use-id.decorator';

@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService:AddressService
    ){}

    @Roles(UserType.ADMIN)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body()createAddressDto:CreateAddressDto,
       // @Param('userId')userId:number
       @UserId()userId:number
        ):Promise<AddressEntity>{
        return  this.addressService.createAddress(createAddressDto,userId)
    }

}
