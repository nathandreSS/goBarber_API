import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface Request {
	email: string;
	password: string;
}
interface Response {
	user: User;
	token: string;
}
class UserAuthenticateSevice {
	public async execute({ email, password }: Request): Promise<Response> {
		const usersRepository = getRepository(User);
		const user = await usersRepository.findOne({ where: { email } });
		if (!user) {
			throw new AppError('Invalid email/password combination.', 401);
		}
		const cryptedPassword = user.password;
		const passwordMatched = await compare(password, cryptedPassword);

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

export default UserAuthenticateSevice;
