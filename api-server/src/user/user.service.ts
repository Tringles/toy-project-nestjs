import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDto } from './dto/userInfo.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(userInfoDto: UserInfoDto): Promise<number> {
        return this.userRepository.createUser(userInfoDto);
    }
}
