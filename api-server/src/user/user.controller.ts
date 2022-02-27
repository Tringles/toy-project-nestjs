import { Body, Controller, Post } from '@nestjs/common';
import { UserInfoDto } from './dto/userInfo.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/signup')
    async signUp(@Body() userInfoDto: UserInfoDto): Promise<any> {
        const { kakaoId, nickname, profileImage, email } = userInfoDto;
        console.log(`[API] user/signup ${kakaoId} ${nickname} ${profileImage} ${email}`);

        return { id: await this.userService.signUp(userInfoDto) }
    }
}
