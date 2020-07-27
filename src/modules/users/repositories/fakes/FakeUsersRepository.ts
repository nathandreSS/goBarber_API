import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = new User();
		Object.assign(user, { id: uuid(), name, email, password });
		this.users.push(user);

		return user;
	}

	public async update(user: User): Promise<User> {
		const userIndex = this.users.findIndex((u) => u.id === user.id);
		this.users[userIndex] = user;
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.users.find((u) => u.id === id);
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find((u) => u.email === email);
		return user;
	}
}

export default FakeUsersRepository;
