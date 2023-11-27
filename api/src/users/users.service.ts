import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as promises from 'timers/promises';
import { GetUsersQueryDto } from './dto/getUsersQuery.dto';
import { User } from './interfaces';

export class UsersService {
  async get(query: GetUsersQueryDto, req?: Request) {
    const usersJsonPath = path.resolve('assets', 'users.json');
    const usersJson = fs.readFileSync(usersJsonPath, 'utf8');
    let isReqCanceled = false;

    req.on('close', () => {
      isReqCanceled = true;
    });

    const secondsDelay = 5;

    for (let i = 0; i < secondsDelay; i++) {
      await promises.setTimeout(1000);
      if (isReqCanceled) {
        return [];
      }
    }

    let users: User[] = JSON.parse(usersJson);

    users = users.filter((user) => user.email === query.email);

    if (query.number) {
      users = users.filter((user) => Number(user.number) === query.number);
    }

    return users;
  }
}
