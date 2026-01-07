# 프로젝트 개요
- 폰트 탄생 연도·디자이너·역사 문구를 타이핑하며 학습하는 Next.js 앱.

# 구현된 기능
- 데이터 선택: 햄버거 메뉴에서 폰트 항목(name, year) 선택 시 해당 히스토리 문구로 리셋.
- 타이핑 채점: hangul-js로 자모 단위 비교, 받침이 다음 글자로 넘어가는 경우까지 허용하며 실시간 정오 표시(흰색/빨간색, 오타 시 흔들림 애니메이션).
- 입력 흐름: 숨겨진 입력창 autoFocus, 데이터 전환/재시작 후 자동 포커스 복원, 완료 시 모달로 통계 표기 후 초기화.
- 진행도/통계: 입력 길이 대비 진행 바, 완료 시 CPM/정확도 산출 및 모달에 표시(길이 도달 시 완료 처리, 오타는 정확도에 반영).
- 텍스트 렌더링: 원본 텍스트와 입력 텍스트를 오버레이하여 위치 맞춰 비교 색상 표시.
- 스타일 베이스: 다크 테마 토큰과 타이핑 UI용 CSS 토대(globals.css), Tailwind 유틸 일부 적용.

# 데이터 구성
- `app/database.js`: `id`, `name`, `year`, `history`, `fontKey` 필드. 샘플 데이터는 Helvetica(Inter 대체 폰트), Black Letter(UnifrakturMaguntia) 포함.

# 기술 스택
- Next.js(App Router) + React hooks.
- hangul-js로 한글 자모 분해/비교.
- Tailwind CSS 유틸 및 커스텀 글로벌 스타일.
- `next/font/google`로 Inter, UnifrakturMaguntia 로드 후 데이터의 `fontKey` 매핑으로 적용.

# 다음 단계 제안
- 폰트/히스토리 데이터 확장 및 한글 포함 산세리프 대체 폰트 추가.
- 결과 저장(베스트 기록), 타이머·WPM·오타 카운트 같은 세부 통계 UI 보완.
- 모바일 대응, 접근성(aria/role) 개선 및 포커스 트랩(모달) 정비.
- 메뉴/모달 애니메이션, 레이아웃 여백/타이포그래피 일관성 정비.

