import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    findByGoogleId: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  // Create a mock for the IOAuthProvider with proper Promise support
  const mockOAuthProvider = {
    verifyToken: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
    google_id: 'google123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: 'IOAuthProvider',
          useValue: mockOAuthProvider,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null if user does not exist', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });
  });

  describe('validateGoogleUser', () => {
    it('should create a new user if no Google ID is found', async () => {
      const googleId = 'google123';
      const email = 'test@example.com';
      const username = 'testuser';
      mockUsersService.findByGoogleId.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.createUser.mockResolvedValue(mockUser);

      const result = await service.validateGoogleUser(
        googleId,
        email,
        username,
      );

      expect(mockUsersService.createUser).toHaveBeenCalledWith(
        email,
        username,
        null,
      );
      expect(result).toEqual(mockUser);
    });

    it('should return the user if the Google ID exists', async () => {
      const googleId = 'google123';
      mockUsersService.findByGoogleId.mockResolvedValue(mockUser);

      const result = await service.validateGoogleUser(
        googleId,
        mockUser.email,
        mockUser.username,
      );

      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should return an access token when login is successful', async () => {
      const user = { id: 1, email: 'test@example.com' };
      const accessToken = 'jwtToken';
      mockJwtService.sign.mockReturnValue(accessToken);

      const result = await service.login(user);

      expect(result).toEqual({ access_token: accessToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'test@example.com',
        sub: 1,
      });
    });
  });

  describe('verifyGoogleToken', () => {
    it('should verify token and validate Google user', async () => {
      const token = 'google-token';
      const userData = {
        id: 'google123',
        email: 'test@example.com',
        name: 'testuser',
      };

      // Use mockResolvedValueOnce instead of mockResolvedValue
      mockOAuthProvider.verifyToken.mockResolvedValueOnce(userData);

      // Mock the validateGoogleUser method
      jest.spyOn(service, 'validateGoogleUser').mockResolvedValue(mockUser);

      const result = await service.verifyGoogleToken(token);

      expect(mockOAuthProvider.verifyToken).toHaveBeenCalledWith(token);
      expect(service.validateGoogleUser).toHaveBeenCalledWith(
        userData.id,
        userData.email,
        userData.name,
      );
      expect(result).toEqual(mockUser);
    });
  });
});
