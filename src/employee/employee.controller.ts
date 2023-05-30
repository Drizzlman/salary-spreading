import { Body, Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { GetSalarySpreadingDto } from './dto/get-salary-spreading.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('salary-spreading')
  async geSalarySpreading(@Body() dto: GetSalarySpreadingDto) {
    return this.employeeService.getSalarySpreading(dto);
  }
}
