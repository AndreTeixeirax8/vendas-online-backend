import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { IUser } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    private users: IUser[] = [];

    async createUser(createUserDto:CreateUserDto):Promise<IUser>{

        const saltOrRounds = 10;
        const passwordHashed =  await hash(createUserDto.password,saltOrRounds)

        const user:IUser ={
            ...createUserDto,
            id: this.users.length+1,
            password:passwordHashed
        }

        this.users.push(user)

        return (user)
    }


    async getAllUser():Promise<IUser[]>{
        return this.users
    }
}
