# CPP-3000 열감지 프린터 로컬 세팅

Vercel 배포판은 브라우저 프린트(`window.print()`)를 사용합니다.
CPP-3000으로 영수증 출력하려면 아래 순서대로 세팅하세요.

## 1. 저장소 클론

```bash
git clone https://github.com/ksd210-fig/font_history_typing_game.git
cd font_history_typing_game
```

## 2. 패키지 설치

```bash
npm install
pip install pyusb
```

## 3. 폰트 다운로드

```bash
node scripts/setup-fonts.mjs
```

`scripts/fonts/` 폴더에 woff2 파일 18종이 생깁니다.

## 4. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 직접 만들고 아래 내용을 넣습니다.

```
NEXT_PUBLIC_PRINTER=true
```

## 5. 프린터 연결

CPP-3000을 USB로 Mac에 연결합니다.  
VID `0x1fc9` / PID `0x2016`으로 자동 인식합니다.

## 6. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3339` 접속 후 타이핑 완료 → Print 버튼을 누르면 영수증이 출력됩니다.

---

**참고:** `scripts/fonts/`와 `.env.local`은 git에 포함되지 않으므로 클론 후 매번 위 과정이 필요합니다.
