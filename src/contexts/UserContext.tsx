// src/contexts/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/user";
import type { ProfileResult } from "../types/user";

interface UserContextValue {
  user: ProfileResult | null;
  loading: boolean;
  setTokenAndLoadUser: (token: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ProfileResult | null>(null);
  const [loading, setLoading] = useState(true);

  // 앱 첫 로드 시 localStorage 토큰으로 자동 로그인 상태 복원
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await getProfile(token);
        if (res.isSuccess && res.result) {
          setUser(res.result);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setTokenAndLoadUser = async (token: string) => {
    localStorage.setItem("accessToken", token);
    setLoading(true);
    try {
      const res = await getProfile(token);
      if (res.isSuccess && res.result) {
        setUser(res.result);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, setTokenAndLoadUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
