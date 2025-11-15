# Stores 폴더

이 폴더는 Zustand를 사용한 전역 상태 관리 스토어들을 모아놓은 폴더입니다.

## 구조 예시

```
stores/
  ├── authStore.ts            # 인증 상태 관리
  ├── userStore.ts            # 사용자 정보 관리
  └── cartStore.ts            # 장바구니 관리
```

## 예시 코드

### authStore.ts
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  login: (token: string, user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      login: (token, user) => set({ accessToken: token, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-storage', // localStorage 키
    }
  )
);
```

### cartStore.ts
```typescript
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existingItem = get().items.find((i) => i.id === item.id);
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] }));
    }
  },
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
```

### 사용 예시
```typescript
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

function MyComponent() {
  const { user, logout } = useAuthStore();
  const { items, addItem, totalPrice } = useCartStore();

  return (
    <div>
      <p>안녕하세요, {user?.name}님</p>
      <button onClick={logout}>로그아웃</button>
      <p>장바구니 총액: {totalPrice()}원</p>
    </div>
  );
}
```

