import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { EmployeeTimeWorked } from './models/EmployeeTimeWorked';
import { Employee, TeamName } from './models/Employee';
import { GetSalarySpreadingDto } from './dto/get-salary-spreading.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly httpService: HttpService) {}

  async getSalarySpreading(dto: GetSalarySpreadingDto): Promise<Employee[]> {
    const timeWorkedList = await this.getEmployeesTimeWorked();

    const totalWorkedDuration =
      EmployeeService.calculateTotalWorkedDuration(timeWorkedList);

    const teamList = await this.getEmployeesByTeamName(dto.teamName);
    const teamListIds = teamList.map((el) => el.mitarbeiterId);
    const timeWorkedTeamList = timeWorkedList.filter(
      (empl) => teamListIds.indexOf(empl.mitarbeiterId) !== -1,
    );

    return this.calculateProportionalEmplSalaries(
      timeWorkedTeamList,
      totalWorkedDuration,
      dto.totalAmount,
    );
  }

  private calculateProportionalEmplSalaries(
    timeWorkedEmplList: EmployeeTimeWorked[],
    totalWorkedDuration: number,
    totalAmount: number,
  ): Employee[] {
    return timeWorkedEmplList.map((empl) => {
      const proportion = empl.dauer / totalWorkedDuration;
      const salary = proportion * totalAmount;

      return new Employee(empl.mitarbeiterId, salary);
    });
  }

  private static calculateTotalWorkedDuration(
    timeWorkedList: EmployeeTimeWorked[],
  ): number {
    return timeWorkedList.reduce(
      (total, employee) => total + employee.dauer,
      0,
    );
  }

  private async getEmployeesByTeamName(
    teamName: TeamName,
  ): Promise<Employee[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Employee[]>(process.env.EMPLOYEES_URL).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data.filter((el) => el.teamName === teamName);
  }

  private async getEmployeesTimeWorked(): Promise<EmployeeTimeWorked[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<EmployeeTimeWorked[]>(process.env.OTHER_SERVICE_URL)
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }
}
