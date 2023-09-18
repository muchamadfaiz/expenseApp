import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  // GET report/income
  @Get()
  getAllReport(@Param('type') type: string) {
    const reportType =
      type === 'income'
        ? ReportType.INCOME
        : ReportType.EXPENSE;
    return data.report.filter(
      (report) => report.type === reportType,
    );
  }

  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string,
  ) {
    const reportType =
      type === 'income'
        ? ReportType.INCOME
        : ReportType.EXPENSE;

    return data.report
      .filter(
        (report) => report.type === reportType,
      )
      .find((report) => report.id === id);
  }

  @Post()
  createIncomeReport(
    @Body()
    body: {
      amount: number;
      source: string;
    },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      amount: body.amount,
      source: body.source,
      created_at: new Date(),
      updated_at: new Date(),
      type:
        type === 'income'
          ? ReportType.INCOME
          : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReportById(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body()
    body: {
      source: string;
      amount: number;
    },
  ) {
    const reportType =
      type === 'income'
        ? ReportType.INCOME
        : ReportType.EXPENSE;
    const reportToUpdate = data.report
      .filter(
        (report) => report.type === reportType,
      )
      .find((report) => report.id === id);

    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    const updatedReport = (data.report[
      reportIndex
    ] = {
      ...data.report[reportIndex],
      ...body,
    });
    return updatedReport;
  }
  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param('id') id: string) {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id,
    );
    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
    return;
  }
}

// http://localhost + hi + hello
