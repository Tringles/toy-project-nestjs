import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDto } from './dto/userInfo.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(id: number, nickname: string, profileImage:string, email: string): Promise<User> {
        return this.userRepository.createUser(id, nickname, profileImage, email);
    }
}
