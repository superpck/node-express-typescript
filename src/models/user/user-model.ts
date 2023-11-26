import { Knex } from 'knex';

export class UserModel {
  login(db: Knex, username: string, password: string) {
    return db('users').where({ username, password }).first();
  }
}