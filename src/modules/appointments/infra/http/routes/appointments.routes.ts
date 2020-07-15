import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// 	const appointmentsRepository = new AppointmentsRepository();
// 	const appointments = await appointmentsRepository.find();

// 	return response.json(appointments);
// });
appointmentsRouter.post('/', async (request, response) => {
	try {
		const { provider_id, date } = request.body;
		const parsedDate = parseISO(date);
		const createAppointment = container.resolve(CreateAppointmentService);
		const appointment = await createAppointment.execute({
			provider_id,
			date: parsedDate,
		});
		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default appointmentsRouter;
