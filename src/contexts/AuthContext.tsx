import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Agent } from '../types';

interface AuthContextType {
  user: Agent | null;
  isAuthenticated: boolean;
  signup: (data: { name: string; email: string; phone: string; password: string; referralCode?: string }) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  getReferralLink: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function generateId(): string {
  return 'AG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateReferralCode(name: string): string {
  const prefix = name.substring(0, 3).toUpperCase();
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}

function getStoredUsers(): Record<string, { agent: Agent; password: string }> {
  try {
    return JSON.parse(localStorage.getItem('fendol_users') || '{}');
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Agent | null>(() => {
    try {
      const saved = localStorage.getItem('fendol_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('fendol_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fendol_current_user');
    }
  }, [user]);

  const signup = useCallback((data: { name: string; email: string; phone: string; password: string; referralCode?: string }) => {
    const users = getStoredUsers();

    if (users[data.email]) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const id = generateId();
    const code = generateReferralCode(data.name);
    const link = `${window.location.origin}/signup?ref=${code}`;

    const agent: Agent = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'agent',
      referralCode: code,
      referralLink: link,
      earnings: 0,
      totalReferrals: 0,
      createdAt: new Date().toISOString(),
    };

    users[data.email] = { agent, password: data.password };
    localStorage.setItem('fendol_users', JSON.stringify(users));
    setUser(agent);

    return { success: true };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = getStoredUsers();
    const record = users[email];

    if (!record) {
      return { success: false, error: 'No account found with this email.' };
    }

    if (record.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }

    setUser(record.agent);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const getReferralLink = useCallback(() => {
    if (!user) return '';
    return user.referralLink;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signup, login, logout, getReferralLink }}>
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
