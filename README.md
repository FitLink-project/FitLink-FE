# FitLink-FE

공공데이터 활용 경진대회 - FitLink 프론트엔드 레포지토리

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint
```

## 📁 프로젝트 구조

```
FitLink-FE/
├── src/
│   ├── api/          # API 호출 함수들
│   ├── assets/       # 이미지, 아이콘 등 정적 파일
│   ├── components/   # 재사용 가능한 UI 컴포넌트
│   ├── contexts/     # React Context 전역 상태
│   ├── hooks/        # 커스텀 React Hook
│   ├── pages/        # 페이지 컴포넌트
│   ├── stores/       # Zustand 상태 관리
│   ├── types/        # TypeScript 타입 정의
│   ├── app/          # 라우팅 설정
│   └── styles/       # 전역 스타일
└── public/           # 정적 파일 (폰트 등)
```

각 폴더의 상세 설명은 해당 폴더의 `README.md`를 참고하세요.

## 🔄 개발 플로우

### 1. UI 개발 플로우

#### Step 1: 페이지 컴포넌트 작성 (`src/pages/`)
실제 화면을 구성하는 페이지 컴포넌트를 먼저 작성합니다.

```typescript
// src/pages/login/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await login(email, password);
    navigate('/main');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <Button onClick={handleSubmit}>로그인</Button>
      </div>
    </div>
  );
}
```

#### Step 2: 재사용 컴포넌트 작성 (`src/components/`)
페이지에서 사용할 재사용 가능한 컴포넌트를 작성합니다.

```typescript
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${
        variant === 'primary' ? 'bg-main text-softWhite' : 'bg-backgroundGray'
      }`}
    >
      {children}
    </button>
  );
}
```

#### Step 3: 라우팅 설정 (`src/app/routes.tsx`)
새로운 페이지를 라우터에 등록합니다.

```typescript
// src/app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/login/LoginPage";
import MainPage from "@/pages/main/MainPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/main", element: <MainPage /> },
    ],
  },
]);
```

#### Step 4: 타입 정의 (`src/types/`)
필요한 타입을 정의합니다.

```typescript
// src/types/user.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
```

#### Step 5: 커스텀 Hook 작성 (`src/hooks/`) - 선택사항
로직을 재사용하기 위해 커스텀 Hook을 작성합니다. (API 함수는 이미 `src/api/`에 작성되어 있다고 가정)

```typescript
// src/hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';
import { loginApi } from '@/api/auth/auth.api'; // API 함수는 이미 작성되어 있음

export function useAuth() {
  const { user, setUser } = useAuthStore();

  const login = async (email: string, password: string) => {
    const userData = await loginApi({ email, password });
    setUser(userData);
  };

  return { user, login };
}
```

#### Step 6: 상태 관리 설정 (`src/stores/` 또는 `src/contexts/`) - 선택사항
전역 상태가 필요한 경우 Zustand Store 또는 Context를 생성합니다.

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { User } from '@/types/user.types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### 2. API 개발 플로우

#### Step 1: Axios 설정 (`src/api/`)
공통 Axios 인스턴스를 설정합니다.

```typescript
// src/api/auth/axios.config.ts
import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 추가)
axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 (에러 처리)
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### Step 2: API 타입 정의 (`src/types/`)
API 요청/응답에 사용할 타입을 정의합니다.

```typescript
// src/types/api.types.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

#### Step 3: API 함수 작성 (`src/api/`)
기능별로 API 함수를 작성합니다.

```typescript
// src/api/user/user.api.ts
import { axiosConfig } from '../auth/axios.config';
import { User, ApiResponse } from '@/types';

export const getUserApi = async (id: string): Promise<ApiResponse<User>> => {
  const response = await axiosConfig.get(`/users/${id}`);
  return response.data;
};

export const updateUserApi = async (
  id: string,
  data: Partial<User>
): Promise<ApiResponse<User>> => {
  const response = await axiosConfig.put(`/users/${id}`, data);
  return response.data;
};
```

#### Step 4: React Query 사용 (선택사항)
데이터 페칭을 위해 React Query를 사용할 수 있습니다.

```typescript
// src/hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserApi, updateUserApi } from '@/api/user/user.api';

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserApi(userId),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUserApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
```

## 📋 개발 체크리스트

새로운 기능을 개발할 때 다음 순서를 따르세요:

**UI 개발:**
- [ ] **페이지**: `src/pages/`에 페이지 컴포넌트 작성
- [ ] **컴포넌트**: `src/components/`에 재사용 컴포넌트 작성
- [ ] **라우팅**: `src/app/routes.tsx`에 라우트 추가

**선택**
- [ ] **타입 정의**: `src/types/`에 필요한 타입 정의
- [ ] **Hook**: 필요시 `src/hooks/`에 커스텀 Hook 작성
- [ ] **상태 관리**: 필요시 `src/stores/` 또는 `src/contexts/`에 상태 관리 추가(선택)

**API 개발:**

- [ ] **Axios 설정**: `src/api/`에 공통 Axios 설정
- [ ] **API 타입 정의**: `src/types/`에 API 요청/응답 타입 정의
- [ ] **API 함수**: `src/api/`에 백엔드 통신 함수 작성

## 🎨 스타일 가이드

### Tailwind CSS 사용
이 프로젝트는 Tailwind CSS를 사용합니다. 커스텀 색상은 `tailwind.config.js`에 정의되어 있습니다.

```typescript
// 사용 가능한 Figma Design System 색상
className="bg-main text-softWhite"           // 메인 블루
className="text-softBlack"                   // 소프트 블랙
className="bg-backgroundGray"                // 배경 그레이
className="bg-lightBlue text-main"           // 라이트 블루
className="text-gray"                        // 그레이
className="text-darkGray"                    // 다크 그레이
```

### 폰트
M PLUS 1p 폰트를 사용합니다.

```typescript
className="font-mplus1"
```

## 🔧 주요 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Zustand** - 상태 관리
- **React Query** - 서버 상태 관리
- **Tailwind CSS** - 스타일링
- **Axios** - HTTP 클라이언트

## 📚 추가 자료

각 폴더의 `README.md`에서 더 자세한 예시와 설명을 확인할 수 있습니다.

- [API 폴더 가이드](./src/api/README.md)
- [Components 폴더 가이드](./src/components/README.md)
- [Contexts 폴더 가이드](./src/contexts/README.md)
- [Hooks 폴더 가이드](./src/hooks/README.md)
- [Pages 폴더 가이드](./src/pages/README.md)
- [Stores 폴더 가이드](./src/stores/README.md)
- [Types 폴더 가이드](./src/types/README.md)
- [Assets 폴더 가이드](./src/assets/README.md)
