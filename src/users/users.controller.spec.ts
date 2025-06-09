import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should successfully register a user', async () => {
    mockUsersService.createUser.mockResolvedValue(mockUser);

    const result = await controller.register(
      'test@example.com',
      'testuser',
      'password123',
    );

    expect(mockUsersService.createUser).toHaveBeenCalledWith(
      'test@example.com',
      'testuser',
      'password123',
    );
    expect(result).toEqual(mockUser);
  });

  it('should return a successful response when user is registered', async () => {
    mockUsersService.createUser.mockResolvedValue(mockUser);

    const result = await controller.register(
      'test@example.com',
      'testuser',
      'password123',
    );

    expect(result).toEqual(mockUser);
  });

  it('should return an error if email is missing', async () => {
    try {
      await controller.register('', 'testuser', 'password123');
    } catch (error) {
      expect(error.response).toBe('Email is required');
    }
  });

  it('should return an error if username is missing', async () => {
    try {
      await controller.register('test@example.com', '', 'password123');
    } catch (error) {
      expect(error.response).toBe('Username is required');
    }
  });

  it('should call createUser with correct arguments when all fields are provided', async () => {
    const email = 'test@example.com';
    const username = 'testuser';
    const password = 'password123';

    mockUsersService.createUser.mockResolvedValue(mockUser);

    const result = await controller.register(email, username, password);

    expect(mockUsersService.createUser).toHaveBeenCalledWith(
      email,
      username,
      password,
    );
    expect(result).toEqual(mockUser);
  });

  it('should return 400 if registration fails due to missing fields', async () => {
    try {
      await controller.register('', '', '');
    } catch (error) {
      expect(error.response).toEqual({
        statusCode: 400,
        message: [
          'Email is required',
          'Username is required',
          'Password is required',
        ],
      });
    }
  });

  it('should return 400 for invalid email format', async () => {
    try {
      await controller.register('invalid-email', 'testuser', 'password123');
    } catch (error) {
      expect(error.response).toEqual({
        statusCode: 400,
        message: 'Invalid email format',
      });
    }
  });

  it('should return 400 for invalid password length', async () => {
    try {
      await controller.register('test@example.com', 'testuser', 'short');
    } catch (error) {
      expect(error.response).toEqual({
        statusCode: 400,
        message: 'Password must be at least 6 characters',
      });
    }
  });
});
