import { User, UserRole } from '../types/auth';
import { DEMO_USERS } from './mockData';

const AUTH_STORAGE_KEY = 'tronador_user_session';

export const authService = {
  getCurrentUser(): User | null {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  loginAsDemo(role: UserRole): User {
    const user = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  loginCustom(name: string, email: string, role: UserRole): User {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      memberSince: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};
