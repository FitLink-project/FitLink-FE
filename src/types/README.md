# Types 폴더

이 폴더는 TypeScript 타입 정의 파일들을 모아놓은 폴더입니다.

## 구조 예시

```
types/
  ├── user.types.ts            # 사용자 관련 타입
  ├── api.types.ts             # API 응답 타입
  ├── common.types.ts           # 공통 타입
  └── shop.types.ts            # 상점 관련 타입
```

## 예시 코드

### user.types.ts
```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  address?: string;
  birthDate?: string;
}

export type UserRole = 'USER' | 'ADMIN' | 'CEO';
```

### api.types.ts
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
```

### shop.types.ts
```typescript
export interface Shop {
  id: string;
  name: string;
  address: string;
  phone: string;
  description?: string;
  images: string[];
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
}

export interface ShopMenu {
  id: string;
  shopId: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
}
```

### 사용 예시
```typescript
import { User, UserRole } from '@/types/user.types';
import { ApiResponse } from '@/types/api.types';
import { Shop } from '@/types/shop.types';

// API 함수에서 사용
async function getUser(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 컴포넌트에서 사용
function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

