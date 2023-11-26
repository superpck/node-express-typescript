import express, { Request, Response, NextFunction } from 'express';
import moment from 'moment';
const router = express.Router();
const { name, version, subVersion } = require('./../../package.json');

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const fs = require('fs');
	fs.stat('./dist/server.js', function (err: any, stats: { atime: moment.MomentInput; mtime: moment.MomentInput; ctime: moment.MomentInput; }) {
		if (err) {
			res.send({
				apiName: name,
				version, subVersion,
				date: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
				error: err
			});
		} else {
			res.send({
				apiName: name,
				version, subVersion,
				date: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
				api_date: {
					atime: stats.atime ? moment(stats.atime).format('YYYY-MM-DD HH:mm:ss') : null,
					mtime: stats.mtime ? moment(stats.mtime).format('YYYY-MM-DD HH:mm:ss') : null,
					ctime: stats.ctime ? moment(stats.ctime).format('YYYY-MM-DD HH:mm:ss') : null
				}
			});
		}
	});
});

router.get('/client', async (req: Request, res: Response, next: NextFunction) => {
	const headers = req.headers || {};
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;

	res.send({
		statusCode: 200,
		date_response: moment().locale('th').format('YYYY-MM-DD HH:mm:ss'),
		headers,
		ip
	});

});

module.exports = router;
