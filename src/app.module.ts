import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EmployeeModule],
})
export class AppModule {}
