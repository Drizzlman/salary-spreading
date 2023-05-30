import { TeamName } from '../models/Employee';
import { IsEnum, IsNumber } from 'class-validator';

export class GetSalarySpreadingDto {
  @IsEnum(TeamName)
  readonly teamName: TeamName;

  @IsNumber()
  readonly totalAmount: number;
}
