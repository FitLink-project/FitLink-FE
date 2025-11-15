# Hooks 폴더

이 폴더는 재사용 가능한 커스텀 React Hook들을 모아놓은 폴더입니다.

## 구조 예시

```
hooks/
  ├── useAuth.ts              # 인증 관련 훅
  ├── useLocalStorage.ts      # 로컬 스토리지 관리 훅
  ├── useDebounce.ts          # 디바운스 훅
  └── useApi.ts               # API 호출 훅
```

## 예시 코드

### useLocalStorage.ts
```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### useDebounce.ts
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 사용 예시
```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/hooks/useDebounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // debouncedSearch가 변경될 때만 API 호출
    if (debouncedSearch) {
      // API 호출
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="검색..."
    />
  );
}
```

