import { Test, TestingModule } from '@nestjs/testing';
import { GitRepositoriesController } from './gitrepositories.controller';

describe('GitRepositoriesController', () => {
  let controller: GitRepositoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitRepositoriesController],
    }).compile();

    controller = module.get<GitRepositoriesController>(GitRepositoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
