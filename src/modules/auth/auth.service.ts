import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/request';
import { JwtPayload } from 'src/shared/guards/jwt.guard';
import { EnvironmentConfig } from 'src/shared/configs/environment.config';
import { AppConstants } from 'src/shared/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentConfig, true>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      AppConstants.Auth.PASSWORD_HASH_ROUNDS,
    );

    // Create user
    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return 'Registration successful';
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      userId: '1',
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refreshTokenExpirationTime', {
        infer: true,
      }),
    });

    return { accessToken, refreshToken };
  }
}
