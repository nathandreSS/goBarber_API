import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserAuthenticateSevice from '@modules/users/services/UserAuthenticateSevice';

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const userAuthenticateService = container.resolve(UserAuthenticateSevice);
		const { user, token } = await userAuthenticateService.execute({
			email,
			password,
		});
		return response.json({ user, token });
	}
}
