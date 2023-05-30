export enum TeamName {
  QA = 'QA',
  DEV = 'DEV',
  MANAGEMENT = 'MANAGEMENT',
}

export class Employee {
  public readonly mitarbeiterId: number;
  public readonly salary: number;
  public readonly teamName?: TeamName;

  constructor(mitarbeiterId: number, salary: number) {
    this.mitarbeiterId = mitarbeiterId;
    this.salary = salary;
  }
}
