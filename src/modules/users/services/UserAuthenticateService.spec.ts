import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UserAuthenticateService from './UserAuthenticateService';

describe('Authenticate User', () => {
	it('Should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUserService = new CreateUserService(fakeUsersRepository);
		const userAuthenticateService = new UserAuthenticateService(
			fakeUsersRepository,
		);
		await createUserService.execute({
			email: 'nathan_99_@hotmail.com',
			name: 'nathan',
			password: 'password',
		});

		const response = await userAuthenticateService.execute({
			email: 'nathan_99_@hotmail.com',
			password: 'password',
		});
		expect(response).toHaveProperty('token');
	});
	it('Should not be able to Authenticate the user when the email is invalid', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUserService = new CreateUserService(fakeUsersRepository);
		const userAuthenticateService = new UserAuthenticateService(
			fakeUsersRepository,
		);
		await createUserService.execute({
			email: 'nathan_99_@hotmail.com',
			name: 'nathan',
			password: 'password',
		});

		expect(
			userAuthenticateService.execute({
				email: 'nathan_99_@hotmail.com',
				password: 'password2',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
