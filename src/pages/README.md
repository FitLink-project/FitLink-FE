# Pages 폴더

이 폴더는 라우팅에 사용되는 페이지 컴포넌트들을 모아놓은 폴더입니다.

## 구조 예시

```
pages/
  ├── login/
  │   ├── LoginPage.tsx       # 로그인 페이지
  │   └── SignupPage.tsx       # 회원가입 페이지
  ├── main/
  │   └── MainPage.tsx         # 메인 페이지
  └── mypage/
      └── MyPage.tsx           # 마이페이지
```

## 예시 코드

### LoginPage.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { loginApi } from '@/api/auth/auth.api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginApi(email, password);
      localStorage.setItem('accessToken', response.token);
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <Button onClick={handleLogin}>로그인</Button>
      </div>
    </div>
  );
}
```

### routes.tsx에서 사용
```typescript
import LoginPage from '@/pages/login/LoginPage';
import MainPage from '@/pages/main/MainPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/main', element: <MainPage /> },
    ],
  },
]);
```

