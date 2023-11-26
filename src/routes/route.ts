import express from 'express';
const router = express.Router();
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

// const checkAuth = require('./middleware/auth');
const monitoring = require('./../middleware/monitoring');

router.use('*', monitoring);
router.use('/', require('./index'));
router.get('*', function (req, res) {
	let url = req.originalUrl || req.baseUrl || req.url;
	console.log(`status ${StatusCodes.NOT_FOUND}`, url);
	res.send({
		statusCode: StatusCodes.NOT_FOUND,
		message: getReasonPhrase(StatusCodes.NOT_FOUND)
	});
});

module.exports = router;
