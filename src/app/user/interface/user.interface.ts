import { User } from '@prisma/client';

export type update = Pick<User, 'avatar' | 'firstName' | 'lastName'>;

export type AuthUser = User;
