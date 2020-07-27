import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
	provider_id: string;
	date: Date;
}
@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		if (await this.appointmentsRepository.findByDate(appointmentDate))
			throw new AppError('this appointment is already booked', 400);

		return this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});
	}
}

export default CreateAppointmentService;
