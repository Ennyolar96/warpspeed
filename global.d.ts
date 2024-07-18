import { AuthUser } from '@app/user/interface';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
