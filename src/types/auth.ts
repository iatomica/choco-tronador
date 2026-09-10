export type UserRole = 'CLIENTE' | 'MAESTRO_CHOCOLATERO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  memberSince: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
}
