import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { HttpModule } from '@nestjs/axios';
import { EmployeeService } from './employee.service';

@Module({
  imports: [HttpModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
