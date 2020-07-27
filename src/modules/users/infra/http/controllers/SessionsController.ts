import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserAuthenticateService from '@modules/users/services/UserAuthenticateService';

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const userAuthenticateService = container.resolve(UserAuthenticateService);
		const { user, token } = await userAuthenticateService.execute({
			email,
			password,
		});
		return response.json({ user, token });
	}
}
