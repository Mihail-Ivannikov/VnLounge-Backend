import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IOAuthProvider } from './oauth-provider.interface';

@Injectable()
export class GoogleOAuthAdapter implements IOAuthProvider {
  private googleClient: OAuth2Client;

  constructor() {
    this.googleClient = new OAuth2Client(
      'process.env.GOOGLE_CLIENT_ID',
      'process.env.GOOGLE_CLIENT_SECRET',
    );
  }

  async verifyToken(token: string): Promise<any> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience:
        'process.env.GOOGLE_CLIENT_ID',
    });

    const payload = ticket.getPayload();
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}