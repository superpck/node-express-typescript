import jwt from 'jsonwebtoken';
import moment from 'moment';

const monitoring = async (req: any, res: any, next: any) => {
  let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
	let url = req.originalUrl || req.baseUrl || req.url;

	console.log(moment().format('YYYY-MM-DD HH:mm:ss.S'), 'ip: '+ip, 'path: '+url);

	next();
}

module.exports = monitoring;