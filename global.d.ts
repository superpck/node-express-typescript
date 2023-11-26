import knex from 'knex';
declare global {
  namespace NodeJS {
    interface Global {
      db: knex,
      userInfo: any = { uid: 0 }
    }
  }
}
export {};