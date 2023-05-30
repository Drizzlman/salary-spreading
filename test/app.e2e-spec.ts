import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EMPL_SPREADED_SALARIES_LIST } from '../src/employee/tests/mocks/data-generator';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/employee/salary-spreading (GET)', () => {
    return request(app.getHttpServer())
      .get('/employee/salary-spreading')
      .send({ teamName: 'DEV', totalAmount: 10_000 })
      .expect(200)
      .expect(EMPL_SPREADED_SALARIES_LIST);
  });
});
