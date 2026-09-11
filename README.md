# B1-2 미션 최종 결과물
## 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

이 프로젝트는 React로 만든 SPA(Single Page Application)입니다. 메뉴 버튼을 누를 때 페이지 전체를 새로고침하지 않고 `state`만 변경하고, 변경된 상태에 맞춰 React가 화면을 다시 렌더링합니다. CSS 애니메이션으로 화면이 자연스럽게 전환됩니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 터미널에 표시되는 로컬 주소(보통 `http://localhost:5173`)를 열면 됩니다.

## 구현 기능

- HOME / WORK / ABOUT 버튼 기반 SPA 화면 전환
- 페이지 전환 시 fade + slide 애니메이션
- 현재 메뉴 active 표시
- 다크/라이트 테마 상태 전환
- 프로젝트 카테고리 필터 상태 관리
- ABOUT의 안내 메시지 토글
- 반응형 레이아웃
- 접근성을 위한 `aria-label`, `role`, `prefers-reduced-motion` 고려

## 컴포넌트 구조

```text
App
├─ Header
├─ Home
├─ Work
└─ About
```

`App`이 현재 페이지(`page`)와 테마(`dark`)라는 공통 상태를 갖고, 하위 컴포넌트에 이벤트 처리 함수를 props로 전달합니다. `Work`, `About`처럼 한 화면 내부에서만 쓰이는 상태는 각 컴포넌트 안에 둡니다.

## 핵심 흐름

```text
사용자 클릭
   ↓
onClick 이벤트
   ↓
setPage / setDark / setActiveFilter / setMessageVisible
   ↓
React state 변경
   ↓
컴포넌트 리렌더링
   ↓
변경된 UI + CSS transition/animation
```

즉, 직접 DOM의 HTML을 수정하는 방식보다 “현재 상태가 무엇인가?”를 기준으로 화면이 결정되는 React의 선언적 UI 방식을 사용했습니다.

## 배포 URL : aesthetic-kulfi-42b49f.netlify.app
