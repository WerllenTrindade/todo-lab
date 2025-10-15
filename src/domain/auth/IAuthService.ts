export interface IAuthService {
  signIn(email: string, password: string): Promise<any>;
  register(email: string, password: string): Promise<any>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>
}
