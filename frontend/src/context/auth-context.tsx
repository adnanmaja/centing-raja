import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { UserProfile } from "../lib/api";
import { getUserProfile } from "../lib/api";
import { isTokenValid, parseJwt } from "../lib/auth-utils";

export interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  login: (token: string, user?: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "centing_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken || !isTokenValid(savedToken)) {
      if (savedToken) localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return savedToken;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken || !isTokenValid(savedToken)) return null;
    const claims = parseJwt(savedToken);
    if (!claims) return null;
    return {
      id: claims.user_id,
      phone_number: claims.phone_number,
      role: claims.role,
      name: "",
    };
  });

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("centing_user");
  }, []);

  const login = useCallback((newToken: string, newUser?: UserProfile) => {
    if (!isTokenValid(newToken)) return;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.removeItem("centing_user");
    setToken(newToken);
    if (newUser) {
      setUser(newUser);
    } else {
      const claims = parseJwt(newToken);
      if (claims) {
        setUser({
          id: claims.user_id,
          phone_number: claims.phone_number,
          role: claims.role,
          name: "",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (!isTokenValid(token)) {
        logout();
      } else {
        localStorage.setItem(TOKEN_KEY, token);
      }
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token, logout]);

  useEffect(() => {
    if (!token || !isTokenValid(token)) return;

    let active = true;
    getUserProfile()
      .then((profile) => {
        if (active && profile) {
          setUser(profile);
        }
      })
      .catch((err) => {
        console.warn("[Auth] Failed to sync user profile from token:", err);
        if (
          err instanceof Error &&
          (err.message.includes("401") || err.message.toLowerCase().includes("unauthorized"))
        ) {
          logout();
        }
      });

    return () => {
      active = false;
    };
  }, [token, logout]);

  const isAuthenticated = Boolean(token && isTokenValid(token) && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
