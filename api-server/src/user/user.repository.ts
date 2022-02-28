import { EntityRepository, Repository } from "typeorm";
import { UserInfoDto } from "./dto/userInfo.dto";
import { User } from "./entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(kakaoId: number, nickname: string, profileImage: string, email: string): Promise<User> {
        console.log(`[DB] Create User ${kakaoId} ${nickname} ${profileImage} ${email}`);

        const user = this.create({ kakaoId, nickname, profileImage, email });
        await this.save(user);
        return user;
    }

    async getUser(kakaoId: number): Promise<User> {
        console.log(`[DB] Get User ${kakaoId}`);
        return await this.findOne({ kakaoId });
    }
}