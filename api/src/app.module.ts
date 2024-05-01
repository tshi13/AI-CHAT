import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./eng.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "./project/project.module";
import { UserModule } from "./user/user.module";

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
    ProjectModule,
    UserModule
  ],
})
export class AppModule {}
