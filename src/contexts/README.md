# Contexts 폴더

이 폴더는 React Context API를 사용한 전역 상태 관리 컴포넌트들을 모아놓은 폴더입니다.

## 구조 예시

```
contexts/
  ├── ThemeContext.tsx        # 테마 관리 (다크/라이트 모드)
  ├── UserContext.tsx         # 사용자 정보 관리
  └── AuthContext.tsx         # 인증 상태 관리
```

## 예시 코드

### ThemeContext.tsx
```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### 사용 예시
```typescript
// main.tsx
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

// 컴포넌트에서 사용
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
      <button onClick={toggleTheme}>테마 변경</button>
    </div>
  );
}
```

