import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Suggestion } from '@product-feedback-app/api-interfaces';

import { AppService } from './app.service';

@Controller('suggestions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Suggestion[] {
    return this.appService.getData();
  }

  @Post()
  create(@Body() suggestion: Suggestion): Suggestion {
    return this.appService.create(suggestion);
  }

  @Put('/:id')
  update(@Body() suggestion: Suggestion): Suggestion {
    return this.appService.update(suggestion);
  }

  @Delete('/:id')
  delete(@Body() id: number): number {
    return this.appService.delete(id);
  }
}
