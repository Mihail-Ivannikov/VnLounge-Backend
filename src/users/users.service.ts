import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    username: string,
    password: string | null,
  ): Promise<User> {
    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async updateUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByGoogleId(google_id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { google_id } });
  }
}
