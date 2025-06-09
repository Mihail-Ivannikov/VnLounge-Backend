import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IOAuthProvider } from './adapters/oauth-provider.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('IOAuthProvider') private googleOAuthProvider: IOAuthProvider,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
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
    const userData = await this.googleOAuthProvider.verifyToken(token);
    return this.validateGoogleUser(userData.id, userData.email, userData.name);
  }
}
