import { Controller, Get, Query } from '@nestjs/common';
import { GetUsersQueryDto } from './dto/getUsersQuery.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  get(@Query() query: GetUsersQueryDto) {
    return this.usersService.get(query);
  }
}
