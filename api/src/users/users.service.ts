import * as fs from 'fs';
import * as path from 'path';
import * as promises from 'timers/promises';
import { GetUsersQueryDto } from './dto/getUsersQuery.dto';
import { User } from './interfaces';

export class UsersService {
  async get(query: GetUsersQueryDto) {
    const usersJsonPath = path.resolve('assets', 'users.json');
    const usersJson = fs.readFileSync(usersJsonPath, 'utf8');

    await promises.setTimeout(5000);

    let users: User[] = JSON.parse(usersJson);

    users = users.filter((user) => user.email === query.email);

    if (query.number) {
      users = users.filter((user) => Number(user.number) === query.number);
    }

    return users;
  }
}
