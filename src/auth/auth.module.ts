import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { GoogleStrategy } from './strategies/google-auth.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GoogleOAuthAdapter } from './adapters/google-oauth.adapter';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    {
      provide: 'IOAuthProvider',
      useClass: GoogleOAuthAdapter,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
