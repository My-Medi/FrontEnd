<img width="1920" height="1080" alt="표지" src="https://github.com/user-attachments/assets/07801c12-f933-4603-a03f-8e805a84ee26" />


<p align="center">
  <a href="#-프로젝트-개요">프로젝트 개요</a> •
  <a href="#-주요-기능">주요 기능</a> •
  <a href="#-기술-스택">기술 스택</a> •
  <a href="#-0-getting-started-시작하기">시작하기</a> •
  <a href="#-파일-구조">파일 구조</a> •
  <a href="#-team-my-medi-fronted-developers">팀</a> •
  <a href="#-git-flow">Git Flow</a> •
  <a href="#-commit-유형-prefix">Commit 규칙</a>
</p>

---

## 프로젝트 개요
- **My-Medi**는 개인 건강검진 결과를 기반으로 AI 리포트(LLM)를 생성하고, 전문가 매칭과 건강 관리 제안을 제공하는 서비스입니다.
- 사용자는 검진표를 업로드/입력하여 나만의 메디컬 리포트를 만들고, 회차별로 관리하며 전문가와 상담·매칭할 수 있습니다.

## 주요 기능
- **건강검진 결과 입력/업로드**: 결과 입력 폼과 OCR/파싱 보조, 검증 UI
- **마이 메디컬 리포트**: 회차 선택·필터, 지표 비교/그래프, 요약, 상세 카드
- **AI 메디컬 리포트(LLM)**: 지표 기반 요약·설명, 리스크/가이드 문구 생성
- **전문가 매칭**: 전문가 목록/상세/요청, 요청사항 작성 및 재사용
- **알림/스케줄**: 예약·상담 관련 알림 및 일정 관리(예정/지난)
- **회원 관리**: 로그인/토큰 재발급, 프로필 수정, 기본 프로필/커스텀 이미지

## 기술 스택
- **Framework**: React, TypeScript, Vite
- **UI**: Tailwind CSS
- **State & Data**: React Query(TanStack Query), React Context
- **Routing**: React Router
- **HTTP**: Axios
- **Deploy**: Netlify
- **Lint**: ESLint

## 0. Getting Started (시작하기)
사전 준비: Node.js LTS, pnpm 설치

```bash
pnpm install
pnpm run dev
```

- 기본 API 주소는 환경변수를 사용합니다. 필요 시 루트에 `.env` 파일을 생성하고 값을 설정하세요.


### NPM Scripts
```bash
pnpm run build    # 프로덕션 빌드
pnpm run preview  # 빌드 결과 로컬 미리보기
pnpm run lint     # ESLint 검사
```

## 파일 구조
프로젝트 핵심 디렉터리 개요입니다.

```
FrontEnd2/
├─ public/
├─ src/
│  ├─ apis/                # Axios 인스턴스 및 REST API 모듈
│  ├─ assets/              # 이미지/아이콘 등 정적 자산
│  ├─ components/          # 재사용 컴포넌트 (Common, MyMedicalReport, Expert 등)
│  ├─ constants/           # 상수, 메타 데이터
│  ├─ contexts/            # 전역 컨텍스트 (Auth 등)
│  ├─ hooks/               # React Query 훅, 커스텀 훅
│  ├─ layout/              # 레이아웃 컴포넌트
│  ├─ pages/               # 페이지 단위 컴포넌트
│  ├─ router/              # 라우터 설정
│  ├─ types/               # 타입 정의
│  ├─ utils/               # 유틸 함수
│  ├─ App.tsx
│  └─ index.css
├─ README.md
└─ netlify.toml
```

## 🧑‍💻 Team My-Medi Fronted Developers

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <a href="https://github.com/geg222">
        <img src="https://github.com/geg222.png" width="130px;" alt="geg222"/><br />
        <div style="font-size:18px;"><b>원준영</b></div>
      </a>
    </td>
    <td align="center" style="padding: 20px;">
      <a href="https://github.com/dokyung17">
        <img src="https://github.com/dokyung17.png" width="130px;" alt="dokyung17"/><br />
        <div style="font-size:18px;"><b>곽도경</b></div>
      </a>
    </td>
    <td align="center" style="padding: 20px;">
      <a href="https://github.com/Hminkyung">
        <img src="https://github.com/Hminkyung.png" width="130px;" alt="Hminkyung"/><br />
        <div style="font-size:18px;"><b>황민경</b></div>
      </a>
    </td>
  </tr>
</table>

## 빠른 링크 (주요 페이지)
- `/my-medical-report` 마이 메디컬 리포트 (회차 선택/지표 비교)
- `/medical-report-llm` AI 메디컬 리포트 (LLM 요약/가이드)
- `/health-result-input` 건강검진 결과 입력
- `/expert` 전문가 목록/상세/요청

## Git Flow
- main : 최종적으로 배포되는 브랜치
- dev : 배포 전, 개발 중심으로 검증 위주의 브랜치
- feature : 추가 기능을 개발 혹은 기존 기능 수정 브랜치
- hotfix : main 브랜치에서 발생한 버그를 수정하는 브랜치

⚠️ [중요] 반드시 모든 Pull Request는 `dev` 브랜치로 보내주세요!<br>
👉 `main` 브랜치로 직접 PR 금지!

## 📚 Commit 유형 (Prefix)

| 커밋 유형 | 설명 |
|-----------|------|
| `feat` | 새로운 기능 추가 또는 기존 기능 개선 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 (기능 변화 없이 구조 개선) |
| `doc` | 문서 작업 (README 등) |
| `test` | 테스트 코드 추가 또는 수정 |
| `build` | 빌드 관련 파일 수정 (예: yml, properties 등) |
| `perform` | 성능 개선 |
| `clean` | 불필요한 코드 제거, 정리 |
| `design` | UI/UX 디자인 작업 또는 개선 |
| `style` | 코드 스타일 변경 (세미콜론, 들여쓰기 등) – 기능 변화 없음 |
