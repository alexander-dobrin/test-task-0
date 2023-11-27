import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetUsersQueryDto } from './dto/getUsersQuery.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  get(@Query() query: GetUsersQueryDto, @Req() req: Request) {
    return this.usersService.get(query, req);
  }
}
