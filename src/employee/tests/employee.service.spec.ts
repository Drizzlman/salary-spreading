import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../employee.service';
import { HttpModule } from '@nestjs/axios';
import { EmployeeController } from '../employee.controller';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
