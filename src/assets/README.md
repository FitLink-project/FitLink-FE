# Assets 폴더

이 폴더는 이미지, 아이콘, 폰트 등 정적 파일들을 모아놓은 폴더입니다.

## 구조 예시

```
assets/
  ├── images/
  │   ├── logo.png            # 로고 이미지
  │   └── background.jpg      # 배경 이미지
  ├── icons/
  │   ├── home.svg            # 홈 아이콘
  │   └── user.svg            # 사용자 아이콘
  └── fonts/                  # 폰트 파일 (선택사항)
```

## 사용 예시

### 이미지 사용
```typescript
import logoImage from '@/assets/images/logo.png';
import backgroundImage from '@/assets/images/background.jpg';

function Header() {
  return (
    <header>
      <img src={logoImage} alt="로고" />
    </header>
  );
}

function BackgroundComponent() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      컨텐츠
    </div>
  );
}
```

### SVG 아이콘 사용
```typescript
import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';

function Navigation() {
  return (
    <nav>
      <HomeIcon className="w-6 h-6" />
      <UserIcon className="w-6 h-6" />
    </nav>
  );
}
```

### Vite에서 이미지 최적화
```typescript
// Vite는 이미지를 자동으로 최적화하고 해시를 추가합니다
import logo from '@/assets/images/logo.png';

// 동적 import (필요시)
const loadImage = async () => {
  const image = await import('@/assets/images/logo.png');
  return image.default;
};
```

### CSS에서 사용
```css
/* index.css 또는 컴포넌트 CSS */
.background {
  background-image: url('/src/assets/images/background.jpg');
}
```

