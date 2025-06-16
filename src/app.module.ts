import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AppConfigModule } from './shared/configs/config.module';
import { CacheModule } from './shared/cache/cache.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { MailModule } from './shared/mail/mail.module';
import { WebSocketModule } from './shared/websocket/websocket.module';
import { EventModule } from './shared/events/event.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppJwtModule } from './shared/jwt/jwt.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule,
    PrismaModule,
    MailModule,
    WebSocketModule,
    EventModule,
    AppJwtModule,
    // Modules
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  exports: [
    AppConfigModule,
    CacheModule,
    PrismaModule,
    MailModule,
    WebSocketModule,
    EventModule,
    AppJwtModule,
  ],
})
export class AppModule {}
