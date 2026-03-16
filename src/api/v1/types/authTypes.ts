export interface AuthenticatedUserContext {
  uid: string;
  email?: string;
  role?: string;
}