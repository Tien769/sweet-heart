import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import { PlainObject, ResponseMessage } from '../_types';
import * as AuthService from '../services/authentication';

const authRouter = Router();

//
// ------------------------------------------MIDDLEWARES------------------------------------------
const parseUserAuthentication = (req: Request, res: Response, next: NextFunction) => {
	if (!res.locals.err) {
		res.locals.user = {
			email: req.body.email,
			name: req.body.name,
			address: req.body.address,
			password: req.body.password,
			phone: req.body.phone,
		};
	}
	return next();
};

const checkAuthenticatedRequirement = (req: Request, res: Response, next: NextFunction) => {
	if (!(req.session as PlainObject)?.user)
		res.locals.err = new ResponseMessage(401, {
			error: 'USER IS NOT AUTHENTICATED',
			detail: 'User is required to be signed in to perform this action',
		});
	return next();
};

const updateSession = (req: Request, res: Response, next: NextFunction) => {
	if (!res.locals.err && req.session) {
		const options = res.locals.sess;
		if (options.refresh)
			req.session?.regenerate((err) => {
				if (err)
					res.locals.error = new ResponseMessage(500, {
						error: 'ERROR WHILE UPDATING SESSION',
						detail: err,
					});
			});
		(req.session as PlainObject).user = options.user && options.user;
		(res.locals.msg as ResponseMessage).addData({ authenticated: options.user ? true : false });
	}
	return next();
};

//
// ------------------------------------------ROUTES DEFINITION------------------------------------------
authRouter.get('/', (req, res, next) => {
	(res.locals.msg as ResponseMessage).addData({
		authenticated: (req.session as PlainObject)?.user ? true : false,
	});
	return next();
});

authRouter.post(
	'/signup',
	parseUserAuthentication,
	(req, res, next) => {
		res.locals.msg = new ResponseMessage(200, {});
		if (!res.locals.err) {
			AuthService.signup(res.locals.user, (err, serviceResponse) => {
				if (err) res.locals.err = err;
				else res.locals.sess = { refresh: true, user: serviceResponse?.data };
				next();
			});
		}
	},
	updateSession
);

authRouter.post(
	'/signin',
	parseUserAuthentication,
	(req, res, next) => {
		res.locals.msg = new ResponseMessage(200, {});
		if (!res.locals.err)
			AuthService.signin(res.locals.user, (err, serviceResponse) => {
				if (err) res.locals.err = err;
				else res.locals.sess = { refresh: true, user: serviceResponse?.data };
				next();
			});
	},
	updateSession
);

authRouter.get(
	'/signout',
	checkAuthenticatedRequirement,
	// Call updateSession() to sign user out
	(req, res, next) => {
		if (!res.locals.err) {
			res.locals.sess = { refresh: true };
			(res.locals.msg as ResponseMessage).addData({
				message: 'USER IS NOW SIGNED OUT',
			});
		}
		return next();
	},
	updateSession
);

export default authRouter;
