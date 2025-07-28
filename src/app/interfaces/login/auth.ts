export interface LoginDto {
  email: string;
}

export interface AuthResponse {
  authenticated: boolean;
  create: string;
  expiration: string;
  accessToken: string;
  userName: string;
  name: string;
  message: string;
}

