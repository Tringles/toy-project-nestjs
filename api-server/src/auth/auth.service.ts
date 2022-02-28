import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async generateJwt(kakaoId: number): Promise<{ jwt }> {
        const payload = { kakaoId };
        const jwt = await this.jwtService.sign(payload);

        return { jwt };
    }
}
