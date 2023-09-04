import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServiceApiModule } from './service-api/services-api.module';
import { AuthService, AuthModule as CommonAuthModule } from '@cryptodo/common';
import axios from 'axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'staging')
          .default('development'),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().optional(),
      }),
      validationOptions: { abortEarly: true },
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
        process.env.DB_HOST
      }:${process.env.DB_PORT || 27017}/UsersApi`,
    ),
    AuthModule,
    CommonAuthModule,
    UsersModule,
    ServiceApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private authService: AuthService) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${authService.serviceToken}`;
  }
}
