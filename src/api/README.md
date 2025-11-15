# API 폴더

이 폴더는 백엔드 API와 통신하는 함수들을 모아놓은 폴더입니다.

## 구조 예시

```
api/
  ├── auth/
  │   ├── auth.api.ts        # 인증 관련 API
  │   └── axios.config.ts     # Axios 설정
  ├── user/
  │   └── user.api.ts         # 사용자 관련 API
  └── shop/
      └── shop.api.ts         # 상점 관련 API
```

## 예시 코드

### auth.api.ts
```typescript
import axios from 'axios';
import { axiosConfig } from './axios.config';

export const loginApi = async (email: string, password: string) => {
  const response = await axiosConfig.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosConfig.post('/auth/logout');
  return response.data;
};
```

### axios.config.ts
```typescript
import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

