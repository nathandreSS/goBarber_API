import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
	it('should be able to create a new appointment', async () => {
		const fakeAppointmentRepository = new FakeAppointmentsRepository();
		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentRepository,
		);
		const appointment = await createAppointmentService.execute({
			date: new Date('27-07-2020'),
			provider_id: '123',
		});

		expect(appointment).toHaveProperty('id');
	});
	it('should not be able to create two appointments on the same time', async () => {
		const fakeAppointmentRepository = new FakeAppointmentsRepository();
		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentRepository,
		);

		const appointmentDate = new Date(2020, 8, 27, 17);
		await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: '123',
		});

		expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
