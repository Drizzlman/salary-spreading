import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../employee.controller';
import { EmployeeService } from '../employee.service';
import { HttpModule } from '@nestjs/axios';
import { GetSalarySpreadingDto } from '../dto/get-salary-spreading.dto';
import { TeamName } from '../models/Employee';
import { EMPL_SPREADED_SALARIES_LIST } from './mocks/data-generator';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return array of employees with spreaded salaries', async () => {
    //Arrange
    const getSalarySpreadingDto: GetSalarySpreadingDto = {
      teamName: TeamName.DEV,
      totalAmount: 10_000,
    };
    jest
      .spyOn(service, 'getSalarySpreading')
      .mockImplementation(() => Promise.resolve(EMPL_SPREADED_SALARIES_LIST));

    //Act
    const res = await controller.geSalarySpreading(getSalarySpreadingDto);

    //Assert
    expect(res).toEqual(EMPL_SPREADED_SALARIES_LIST);
  });
});
