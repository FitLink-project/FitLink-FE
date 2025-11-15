# Components 폴더

이 폴더는 재사용 가능한 UI 컴포넌트들을 모아놓은 폴더입니다.

## 구조 예시

```
components/
  ├── Button.tsx              # 버튼 컴포넌트
  ├── Modal.tsx               # 모달 컴포넌트
  ├── Input.tsx                # 입력 컴포넌트
  └── Card/
      └── Card.tsx            # 카드 컴포넌트
```

## 예시 코드

### Button.tsx
```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-mplus1
        ${variant === 'primary' ? 'bg-maingreen text-white' : 'bg-buttonGray text-textblack'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}
      `}
    >
      {children}
    </button>
  );
}
```

### 사용 예시
```typescript
import Button from '@/components/Button';

function MyPage() {
  return (
    <Button onClick={() => console.log('clicked')} variant="primary">
      클릭하세요
    </Button>
  );
}
```

