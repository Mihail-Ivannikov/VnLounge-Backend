import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        'process.env.GOOGLE_CLIENT_ID', // Replace with your Client ID
      clientSecret: 'process.env.GOOGLE_CLIENT_SECRET', // Replace with your Client Secret
      callbackURL: 'process.env.GOOGLE_CALLBACK_URL',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName } = profile;
    const email = emails[0].value;
    const username = displayName;

    const user = await this.authService.validateGoogleUser(id, email, username);
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}
