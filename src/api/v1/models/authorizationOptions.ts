export interface AuthorizationOptions {
  hasRole: Array<"user" | "manager" | "admin">;
  allowSameUser?: boolean;
}