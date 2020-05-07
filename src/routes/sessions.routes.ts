import { Router, Request, Response } from 'express';
import UserAuthenticateSevice from '../services/UserAuthenticateSevice';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
	const { email, password } = request.body;
	const userAuthenticateService = new UserAuthenticateSevice();
	const { user, token } = await userAuthenticateService.execute({
		email,
		password,
	});
	return response.json({ user, token });
});

export default sessionsRouter;
