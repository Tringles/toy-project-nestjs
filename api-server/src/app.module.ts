import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'toy',
			entities: [User],
			synchronize: true
		}),
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
