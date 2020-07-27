import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
	it('Should be able to create an user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUserService = new CreateUserService(fakeUsersRepository);

		const user = await createUserService.execute({
			email: 'nathan_99_@hotmail.com',
			name: 'nathan',
			password: 'password',
		});

		expect(user).toHaveProperty('id');
	});
	it('Should not be able to create two users with the same email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUserService = new CreateUserService(fakeUsersRepository);

		await createUserService.execute({
			email: 'nathan_99_@hotmail.com',
			name: 'nathan',
			password: 'password',
		});

		expect(
			createUserService.execute({
				email: 'nathan_99_@hotmail.com',
				name: 'nathan',
				password: 'password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
