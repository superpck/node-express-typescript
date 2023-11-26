import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
	try {
		let token: string = '';
		if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			console.log('status ' + StatusCodes.UNAUTHORIZED, ip);
			return res.send({
				statusCode: StatusCodes.UNAUTHORIZED,
				message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
			});
		} else {
      jwt.verify(token, process.env.SECRET_KEY || 'xx');
      next();
    }
	} catch (error) {
		console.log('status ' + StatusCodes.UNAUTHORIZED, ip);
		return res.send({
			statusCode: StatusCodes.UNAUTHORIZED,
			message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
		});
	}
}

module.exports = checkAuth;