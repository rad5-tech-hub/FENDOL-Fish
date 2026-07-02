"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Customer, Agent } from '../types';
import { setAccessToken, getAccessToken, ApiError } from '../lib/api';
import {
  requestSignupOtp,
  verifySignupOtp,
  loginCustomer,
  logoutCustomer,
} from '../api/customer';

interface AuthContextType {
  customer: Customer | null;
  user: Agent | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
  }) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  getReferralLink: () => string;
  isOtpSent: boolean;
  otpEmail: string | null;
  resetOtpState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('fendol_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<Agent | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('fendol_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  const clearAuthData = useCallback(() => {
    setAccessToken(null);
    setCustomer(null);
    setUser(null);
    setIsOtpSent(false);
    setOtpEmail(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.addEventListener('auth:unauthorized', clearAuthData);
    return () => window.removeEventListener('auth:unauthorized', clearAuthData);
  }, [clearAuthData]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('fendol_customer', JSON.stringify(customer));
    } else {
      localStorage.removeItem('fendol_customer');
    }
  }, [customer]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fendol_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fendol_current_user');
    }
  }, [user]);

  const signup = useCallback(async (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
  }) => {
    setIsLoading(true);
    try {
      await requestSignupOtp({
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        password: data.password,
        address: data.address,
      });
      setIsOtpSent(true);
      setOtpEmail(data.email.toLowerCase());
      return { success: true };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Signup failed. Please try again.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const response = await verifySignupOtp({ email: email.toLowerCase(), otp });
      if (response.data) {
        setAccessToken(response.data.accessToken);
        setCustomer({
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          emailVerified: response.data.emailVerified,
          accessToken: response.data.accessToken,
          expiresIn: response.data.expiresIn,
        });
        setIsOtpSent(false);
        setOtpEmail(null);
      }
      return { success: true };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'OTP verification failed.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginCustomer({ email: email.toLowerCase(), password });
      if (response.data) {
        setAccessToken(response.data.accessToken);
        setCustomer({
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          emailVerified: response.data.emailVerified,
          accessToken: response.data.accessToken,
          expiresIn: response.data.expiresIn,
        });
      }
      return { success: true };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Login failed.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getAccessToken();
      await logoutCustomer(token ?? undefined);
    } catch {
      /* proceed with client-side cleanup */
    } finally {
      clearAuthData();
    }
  }, [clearAuthData]);

  const getReferralLink = useCallback(() => {
    if (!user) return '';
    return user.referralLink;
  }, [user]);

  const resetOtpState = useCallback(() => {
    setIsOtpSent(false);
    setOtpEmail(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        user,
        isAuthenticated: !!customer || !!user,
        isLoading,
        signup,
        verifyOtp,
        login,
        logout,
        getReferralLink,
        isOtpSent,
        otpEmail,
        resetOtpState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
