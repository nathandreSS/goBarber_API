import { Router, Request, Response } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

// usersRouter.get('/', (request, response) => {});
usersRouter.post('/', async (request: Request, response: Response) => {
	const { name, email, password } = request.body;
	const createUser = container.resolve(CreateUserService);
	const user = await createUser.execute({
		name,
		email,
		password,
	});

	delete user.password;

	return response.json(user);
});
usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('file'),
	async (request: Request, response: Response) => {
		const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
		const user = await updateUserAvatarService.execute({
			userId: request.user.id,
			avatarFilename: request.file.filename,
		});

		return response.json(user);
	},
);
export default usersRouter;
