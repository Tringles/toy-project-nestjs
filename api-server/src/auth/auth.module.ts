import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		HttpModule.register({
			timeout: 5000
		}),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'SecretKey',
			signOptions: {
				expiresIn: 3600
			}
		}),
		TypeOrmModule.forFeature([UserRepository])
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
