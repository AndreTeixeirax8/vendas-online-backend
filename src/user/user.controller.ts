import { Controller, Get, Post,Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {

   constructor(private readonly userService:UserService){}

    @Post()
    async createUsers(@Body() createUserDto:CreateUserDto):Promise<IUser>{
        return this.userService.createUser(createUserDto)
     }

       @Get()
    async getAllUsers():Promise<IUser[]>{
       return this.userService.getAllUser()
    }
}
