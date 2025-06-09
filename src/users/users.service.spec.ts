import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not hash password if password is null', async () => {
    mockUserRepository.create.mockReturnValue(mockUser);
    mockUserRepository.save.mockResolvedValue(mockUser);

    const result = await service.createUser(
      'test@example.com',
      'testuser',
      null,
    );

    expect(mockUserRepository.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      password: null,
    });
    expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by email', async () => {
    mockUserRepository.findOne.mockResolvedValue(mockUser);

    const result = await service.findByEmail('test@example.com');

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(result).toEqual(mockUser);
  });

  it('should return undefined if no user found by email', async () => {
    mockUserRepository.findOne.mockResolvedValue(undefined);

    const result = await service.findByEmail('nonexistent@example.com');

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'nonexistent@example.com' },
    });
    expect(result).toBeUndefined();
  });

  it('should find a user by ID', async () => {
    mockUserRepository.findOne.mockResolvedValue(mockUser);

    const result = await service.findById(1);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockUser);
  });

  it('should return undefined if no user found by ID', async () => {
    mockUserRepository.findOne.mockResolvedValue(undefined);

    const result = await service.findById(999);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: 999 },
    });
    expect(result).toBeUndefined();
  });

  it('should find a user by Google ID', async () => {
    mockUserRepository.findOne.mockResolvedValue(mockUser);

    const result = await service.findByGoogleId('google-id-123');

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { google_id: 'google-id-123' },
    });
    expect(result).toEqual(mockUser);
  });

  it('should return undefined if no user found by Google ID', async () => {
    mockUserRepository.findOne.mockResolvedValue(undefined);

    const result = await service.findByGoogleId('nonexistent-google-id');

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { google_id: 'nonexistent-google-id' },
    });
    expect(result).toBeUndefined();
  });
});
