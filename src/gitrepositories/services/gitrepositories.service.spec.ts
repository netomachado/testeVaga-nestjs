import { Test, TestingModule } from '@nestjs/testing';
import { GitRepositoriesService } from './gitrepositories.service';

describe('GitRepositoriesService', () => {
  let service: GitRepositoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitRepositoriesService],
    }).compile();

    service = module.get<GitRepositoriesService>(GitRepositoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
