import { EntityRepository, Repository } from "typeorm";
import { UserInfoDto } from "./dto/userInfo.dto";
import { User } from "./entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(userInfoDto: UserInfoDto): Promise<number> {
        const { kakaoId, nickname, profileImage, email } = userInfoDto;
        console.log(`[DB] Create User ${kakaoId} ${nickname} ${profileImage} ${email}`);
        
        const user = this.create(userInfoDto);
        await this.save(user);
        return user.id;
    }
}