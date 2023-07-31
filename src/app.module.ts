import { MailerModule } from '@nestjs-modules/mailer';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import * as depthLimit from 'graphql-depth-limit';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classes/classes.module';
import config from './config';
import { AppGraphQLFormattedError } from './error.models';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthsModule } from './auths/auths.module';

const GlobalModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
  }),

  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    sortSchema: true,
    playground: config().env !== 'PRODUCTION',
    autoSchemaFile: config().graphQL.autoSchemaFile,
    validationRules: [depthLimit(7)],
    formatError: (error: GraphQLError) => new AppGraphQLFormattedError(error),
  }),

  MongooseModule.forRootAsync({
    useFactory: () => {
      console.log('connecting...');
      return {
        uri: config().database().uri,
      };
    },
  }),

  // TypeOrmModule.forRoot({
  //   type: 'mysql',
  //   host: '<STACKHERO_MARIADB_HOST>',
  //   port: 3306,
  //   username: 'root',
  //   password: '<STACKHERO_MARIADB_ROOT_PASSWORD>',
  //   database: 'root',
  //   entities: [],
  //   synchronize: true,
  //   ssl: {},
  // }),

  MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: config().email.host,
        port: config().email.port,
        secure: false,
        auth: {
          user: config().email.user,
          pass: config().email.pass,
        },
      },
      defaults: {
        from: config().email.sender,
      },
    }),
  }),
];

@Module({
  imports: [
    ...GlobalModules,
    ClassesModule,
    ProductsModule,
    CategoriesModule,
    AuthsModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: AppValidationPipe,
    // },
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: null,
    // },
  ],
})
export class AppModule {}
