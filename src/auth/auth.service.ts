import { Injectable,NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async login(loginDto:LoginDto): Promise<ReturnLoginDto> {
        const  user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined)

       // const isMatch =  await compare(loginDto.password,user?.password || '')

       const isMatch = await validatePassword(
        loginDto.password,
        user?.password || '',
      );

        if (!user || !isMatch){
            throw new NotFoundException("E-mail passado não é valido")
        }

        return {
            accessToken: this.jwtService.sign({...new LoginPayloadDto(user)}),
             user:new ReturnUserDto(user) 
            }
    }

}
