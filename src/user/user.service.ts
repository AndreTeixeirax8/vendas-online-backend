import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update.password.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
    //private users: UserEntity[] = [];
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>
    ){}

    async createUser(
        createUserDto: CreateUserDto,
        userType?: number,
      ): Promise<UserEntity> {

        const user = await this.findUserByEmail(createUserDto.email).catch(
            () => undefined,
          );
      
          if (user) {
            throw new BadGatewayException('email ja registrado no systema');
          }

          const passwordHashed = await createPasswordHashed(createUserDto.password);

        return this.userRepository.save({
            ...createUserDto,  
            type_user: userType ? userType : UserType.USER,
            password:passwordHashed
        })

    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where:{
                id:userId
            },
            relations:{
                addresses:{
                    city:{
                        state:true
                    }
                }
            },
        })
    }

    async getAllUser():Promise<UserEntity[]>{
        return this.userRepository.find()
    }

    async findUserById(userId:number):Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where:{id:userId}
        });

        if(!user){
            throw new NotFoundException(`Usuario não encontrado`)
        }

        return user;

    }

    async findUserByEmail(email:string):Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where:{email}
        });

        if(!user){
            throw new NotFoundException(`E-mail não encontrado`)
        }

        return user;

    }

    async updatePasswordUser(
        updatePasswordDTO: UpdatePasswordDTO,
        userId: number,
      ): Promise<UserEntity> {
        const user = await this.findUserById(userId);
    
        const passwordHashed = await createPasswordHashed(
          updatePasswordDTO.newPassword,
        );
    
        const isMatch = await validatePassword(
          updatePasswordDTO.lastPassword,
          user.password || '',
        );
    
        if (!isMatch) {
          throw new NotFoundException('Last password invalid');
        }
    
        return this.userRepository.save({
          ...user,
          password: passwordHashed,
        });
      }
}
