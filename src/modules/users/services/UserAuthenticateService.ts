import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	email: string;
	password: string;
}
interface IResponse {
	user: User;
	token: string;
}
@injectable()
class UserAuthenticateService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Invalid email/password combination.', 401);
		}

		const cryptedPassword = user.password;
		const passwordMatched = await compare(password, cryptedPassword);
		console.log(passwordMatched);
		if (!passwordMatched) {
			throw new AppError('Invalid email/password combination.', 401);
		}
		delete user.password;
		const { secret, expiresIn } = authConfig.jwt;
		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		return { user, token };
	}
}

export default UserAuthenticateService;
