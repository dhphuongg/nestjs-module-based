import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppJwtModule } from 'src/shared/jwt/jwt.module';

@Module({
  imports: [PrismaModule, AppJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
