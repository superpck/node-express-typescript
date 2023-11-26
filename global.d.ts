import knex from 'knex';

// declare global {
//   let db: knex;
//   let userInfo: any = { uid: 0 };
// }
declare global {
  namespace NodeJS {
    interface Global {
      db: knex,
      userInfo: any = { uid: 0 }
    }
  }
}
export {};