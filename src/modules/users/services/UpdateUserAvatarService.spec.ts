import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update User Avatar', () => {
	it('Should be able to update the user avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUserService = new CreateUserService(fakeUsersRepository);
		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
		);
		const user = await createUserService.execute({
			email: 'nathan_99_@hotmail.com',
			name: 'nathan',
			password: 'password',
		});

		const updatedUser = await updateUserAvatarService.execute({
			avatarFilename: 'nathanPhoto.jpg',
			userId: user.id,
		});
		expect(updatedUser.avatar).toBe('nathanPhoto.jpg');
	});
	it('Should not be able to update the user avatar when not authenticated', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUserService = new CreateUserService(fakeUsersRepository);
		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
		);
		await createUserService.execute({
			email: 'nathan_99_@hotmail.com',
			name: 'nathan',
			password: 'password',
		});

		expect(
			updateUserAvatarService.execute({
				avatarFilename: 'nathanPhoto.jpg',
				userId: '2139456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	// it('Should be able to delete the old user avatar and update to the new avatar', async () => {
	// 	const fakeUsersRepository = new FakeUsersRepository();
	// 	const createUserService = new CreateUserService(fakeUsersRepository);
	// 	const updateUserAvatarService = new UpdateUserAvatarService(
	// 		fakeUsersRepository,
	// 	);
	// 	const user = await createUserService.execute({
	// 		email: 'nathan_99_@hotmail.com',
	// 		name: 'nathan',
	// 		password: 'password',
	// 	});

	// 	await updateUserAvatarService.execute({
	// 		avatarFilename: 'nathanPhoto.jpg',
	// 		userId: user.id,
	// 	});

	// 	const updatedUser = await updateUserAvatarService.execute({
	// 		avatarFilename: 'nathanPhoto2.jpg',
	// 		userId: user.id,
	// 	});
	// 	expect(updatedUser.avatar).toBe('nathanPhoto2.jpg');
	// });
});
