import { Body,Controller, UsePipes,ValidationPipe,Post } from '@nestjs/common';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService,
    ){}
    

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto:LoginDto): Promise<ReturnLoginDto> {

        return  this.authService.login(loginDto);

    }

}
