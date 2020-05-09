import { Router, Request, Response } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

// usersRouter.get('/', (request, response) => {});
usersRouter.post('/', async (request: Request, response: Response) => {
	const { name, email, password } = request.body;
	const createUser = new CreateUserService();
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
		const updateUserAvatarService = new UpdateUserAvatarService();
		const user = await updateUserAvatarService.execute({
			userId: request.user.id,
			avatarFilename: request.file.filename,
		});

		return response.json(user);
	},
);
export default usersRouter;
