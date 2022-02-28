import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, lastValueFrom } from 'rxjs';
import { UserInfoDto } from 'src/user/dto/userInfo.dto';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private authService: AuthService,
        private httpService: HttpService
    ) { }

    @Post('/kakao')
    async kakaoLogin(@Body() accessTokenDto: AccessTokenDto): Promise<{ jwt }> {
        const { accessToken } = accessTokenDto;

        const { data } = await lastValueFrom(this.httpService.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status)
            })
        ));

        const { id, kakao_account: { profile: { nickname, profile_image_url }, email } } = data;
        console.log(`[API] auth/kakao ${id} ${nickname} ${profile_image_url} ${email}`);

        let user = await this.userRepository.getUser(id);
        if (!user) {
            user = await this.userRepository.createUser(id, nickname, profile_image_url, email);
        }

        const jwt = await this.authService.generateJwt(user.kakaoId);

        return jwt;
    }
}
