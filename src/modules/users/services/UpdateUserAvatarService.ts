import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	userId: string;
	avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(userId);
		if (!user) {
			throw new AppError('Only authenticated users can change avatar.', 401);
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
		}

		user.avatar = avatarFilename;

		await this.usersRepository.update(user);
		delete user.password;

		return user;
	}
}
export default UpdateUserAvatarService;
