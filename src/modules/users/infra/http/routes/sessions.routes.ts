import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';

import UserAuthenticateSevice from '@modules/users/services/UserAuthenticateSevice';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
	const { email, password } = request.body;

	const userAuthenticateService = container.resolve(UserAuthenticateSevice);
	const { user, token } = await userAuthenticateService.execute({
		email,
		password,
	});
	return response.json({ user, token });
});

export default sessionsRouter;
