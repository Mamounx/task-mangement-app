import { MongooseModuleOptions } from '@nestjs/mongoose';
import { DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config'

export const {
    MONGO_URI,
    TOKEN_KEY,
    PORT,
    SALT
  } = process.env

export const corsConfig = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Host',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

export const MONGO_CONF: MongooseModuleOptions = {
uri: MONGO_URI,
appName: 'tasks-service',
dbName: 'taskManagementDB',
connectTimeoutMS: 5000,
socketTimeoutMS: 45000,
};

  //API Documentation - Swagger Settings
export const swaggerConfig = new DocumentBuilder()
.setTitle('Task Management API Documentation')
.setVersion('1.0')
.setContact('Contact', 'https://mamoun-tavakol.netlify.app', 'mamountkl@hotmail.com')
.addServer('http://localhost:3001/')
.build();
