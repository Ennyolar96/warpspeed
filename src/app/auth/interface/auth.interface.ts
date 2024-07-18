import { User } from '@prisma/client';

export type createUser = Pick<User, 'email' | 'password' | 'username'>;
export type findUserByEmail = Pick<User, 'email'>;
export type createNewPassword = Pick<User, 'email' | 'password'> & {
  confirmPassword: string;
};

export type loginInput = Pick<User, 'username' | 'password'>;
