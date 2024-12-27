import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(
    'process.env.GOOGLE_CLIENT_ID',
    'process.env.GOOGLE_CLIENT_SECRET',
  );

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(
    googleId: string,
    email: string,
    username: string,
  ): Promise<any> {
    let user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      // Check if a user with the same email already exists
      user = await this.usersService.findByEmail(email);
      if (!user) {
        user = await this.usersService.createUser(email, username, null);
      } else {
        // If a user with the same email exists, update the Google ID
        user.google_id = googleId;
        user = await this.usersService.updateUser(user);
      }
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyGoogleToken(token: string): Promise<any> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience:
        'process.env.GOOGLE_CLIENT_ID',
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    return this.validateGoogleUser(sub, email, name);
  }
}
