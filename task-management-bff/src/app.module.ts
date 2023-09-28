import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONF } from './configs';

@Module({
  imports: [
    TasksModule,  
    MongooseModule.forRootAsync({
    useFactory: () => ({
      ...MONGO_CONF,
    }),
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
