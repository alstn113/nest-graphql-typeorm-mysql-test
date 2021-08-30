import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pet.entity';

import { PetsModule } from './pets/pets.module';
import { OwnerModule } from './owner/owner.module';
import { Owner } from './owner/entities/owner.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql', // grapgql tpye 자동 생성 경로
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'nest-test',
      entities: [Pet, Owner],
      synchronize: true,
    }),
    PetsModule,
    OwnerModule,
  ],
})
export class AppModule {}
