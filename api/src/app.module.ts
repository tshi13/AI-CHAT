import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./eng.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "./project/project.module";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";
import { User } from "./user/entities/user.entity";
import { JwtStrategy } from "./auth/jwt.strategy";

console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PWD"),
        database: configService.get<string>("DB_NAME"),
        synchronize: true,
        entities: [__dirname + "/**/*.entity.{js,ts}"],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRE") },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ProjectModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, AuthService, JwtStrategy],
})
export class AppModule {}
