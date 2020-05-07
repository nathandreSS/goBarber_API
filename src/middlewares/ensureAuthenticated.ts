import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
	sub: string;
	iat: string;
	exp: string;
}
export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing.', 401);
	}

	const [, token] = authHeader.split(' ');
	const { secret } = authConfig.jwt;

	try {
		const decoded = verify(token, secret) as TokenPayload;

		const { sub } = decoded;

		request.user = { id: sub };
		return next();
	} catch {
		throw new AppError('Invalid JWT token', 401);
	}
}
