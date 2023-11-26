import knex from 'knex';
var options: any = {
  client: process.env.DB_CLIENT || 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mysql',
    port: process.env.DB_PORT || 3306,
    charset: process.env.DB_CHARSET || 'utf8',
    schema: process.env.DB_SCHEMA || 'public',
    encrypt: process.env.DB_ENCRYPT || true,
    timezone: 'Asia/Bangkok'
	}
};

const dbConnection = () => {
	if (['mysql', 'mysql2'].indexOf(options.client) >= 0) {
		options['pool'] = {
			min: 0, max: 10,
			afterCreate: (conn: any, done: any) => {
				conn.query("SET NAMES " + (options.connection.charset || "utf8"), (err: any) => {
					done(err, conn);
				});
			},
		}
		options['debug'] = false;
	}
	return knex(options);
};

module.exports = dbConnection;
