import api from '../lib/api';
import type {
  SignupPayload,
  VerifyOtpPayload,
  LoginPayload,
  ApiResponse,
  AuthData,
} from '../types';

export async function requestSignupOtp(
  payload: SignupPayload,
): Promise<ApiResponse<null>> {
  const { data } = await api.post<ApiResponse<null>>(
    '/customers/public',
    payload,
  );
  return data;
}

export async function verifySignupOtp(
  payload: VerifyOtpPayload,
): Promise<ApiResponse<AuthData>> {
  const { data } = await api.post<ApiResponse<AuthData>>(
    '/customers/public/verify-otp',
    payload,
  );
  return data;
}

export async function loginCustomer(
  payload: LoginPayload,
): Promise<ApiResponse<AuthData>> {
  const { data } = await api.post<ApiResponse<AuthData>>(
    '/customers/public/login',
    payload,
  );
  return data;
}

export async function logoutCustomer(
  token?: string,
): Promise<ApiResponse<null>> {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;
  const { data } = await api.post<ApiResponse<null>>(
    '/customers/public/logout',
    {},
    config,
  );
  return data;
}
