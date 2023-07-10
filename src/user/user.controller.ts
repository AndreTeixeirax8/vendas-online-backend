import { Controller, Get, Post,Body, UsePipes, ValidationPipe,Param,Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update.password.dto';
import { UserId } from 'src/decorators/use-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {

   constructor(private readonly userService:UserService){}

   @Roles(UserType.ROOT)
   @Post('/admin')
   async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
     return this.userService.createUser(createUser, UserType.ADMIN);
   }

   @UsePipes(ValidationPipe)
    @Post()
    async createUsers(@Body() createUserDto:CreateUserDto):Promise<UserEntity>{
        return this.userService.createUser(createUserDto)
     }

     @Roles(UserType.ADMIN, UserType.ROOT)
    @Get('/all')
    async getAllUsers():Promise<ReturnUserDto[]>{
       return (await this.userService.getAllUser()).map((userEntity) => new ReturnUserDto(userEntity))
    }
    @Roles(UserType.ADMIN,UserType.ROOT)
    @Get('/:userId')
    async getUserById(@Param('userId') userId:number): Promise<ReturnUserDto>{
      return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId))
    }


    @Roles(UserType.ADMIN, UserType.USER,UserType.ROOT)
    @Patch()
    @UsePipes(ValidationPipe)
    async updatePasswordUser(
      @Body() updatePasswordDTO: UpdatePasswordDTO,
      @UserId() userId: number,
    ): Promise<UserEntity> {
      return this.userService.updatePasswordUser(updatePasswordDTO, userId);
    }

    @Roles(UserType.ADMIN, UserType.USER,UserType.ROOT)
    @Get()
    async getInfoUser(@UserId() userId:number):Promise<ReturnUserDto>{
      return new ReturnUserDto( await this.userService.getUserByIdUsingRelations(userId))
      
    }


}
