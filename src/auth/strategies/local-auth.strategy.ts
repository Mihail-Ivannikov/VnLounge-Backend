import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IAuthStrategy } from './auth-strategy.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) implements IAuthStrategy {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Use 'email' instead of 'username'
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}