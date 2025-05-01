# MCP-UpNote

Model Context Protocol과 UpNote를 연동하는 CLI 도구입니다. AI 모델 프로젝트 관리와 메모를 효율적으로 수행할 수 있게 도와줍니다.

## 주요 기능

- MCP(Model Context Protocol) 기반 프로젝트 관리
- UpNote에 모델 컨텍스트 기반 노트 자동 생성
- 프로젝트, 모델별 노트 구조화
- 커스텀 템플릿 지원
- 인터랙티브 CLI 인터페이스

## 설치 방법

npm에 게시하지 않고 직접 GitHub에서 클론하여 사용할 수 있습니다:

```bash
# 저장소 클론
git clone https://github.com/milkrevenant/upnote-mcp.git
cd upnote-mcp

# 의존성 설치
npm install

# 로컬에서 CLI 도구 링크
npm link
```

`npm link` 명령어를 실행하면 시스템에 전역으로 `mcp-upnote` 명령어가 등록되어 어디서든 사용할 수 있습니다.

또는 저장소 폴더에서 직접 실행할 수도 있습니다:

```bash
# 저장소 폴더에서 직접 실행
node bin/mcp-upnote.js
```

## 사용 방법

### 초기화

```bash
mcp-upnote init
```

### 노트 생성

```bash
# 인터랙티브 모드
mcp-upnote note

# 특정 프로젝트 및 모델로 노트 생성
mcp-upnote note -p "자연어 처리 프로젝트" -m "GPT-4"

# 직접 내용 지정
mcp-upnote note -t "노트 내용 텍스트" -n "노트북 이름"
```

### 노트북 생성

```bash
mcp-upnote notebook -n "MCP 프로젝트"
```

### 태그 보기

```bash
mcp-upnote tag -t "MCP"
```

### 인터랙티브 모드

```bash
mcp-upnote
# 또는
mcp-upnote interactive
```

## 설정 파일

설정 파일은 `~/.mcp-upnote/config.json`에 저장됩니다. 다음과 같은 구조를 가집니다:

```json
{
  "version": "1.0",
  "name": "Model Context Protocol Configuration",
  "models": [
    {
      "name": "GPT-4",
      "description": "OpenAI의 고급 대규모 언어 모델",
      "parameters": {
        "temperature": 0.7,
        "max_tokens": 4096
      }
    }
  ],
  "projects": [
    {
      "name": "자연어 처리 프로젝트",
      "description": "한국어 자연어 처리 능력 향상을 위한 프로젝트",
      "model": "GPT-4",
      "tags": ["NLP", "Korean", "MCP"]
    }
  ],
  "integrations": {
    "upnote": {
      "enabled": true,
      "default_notebook": "MCP 프로젝트",
      "auto_tags": ["MCP", "AI"],
      "note_template": "# {project} - {model}\n\n## 모델 정보\n- 모델명: {model}\n- 프로젝트: {project}\n- 생성일: {date}\n\n## 프로젝트 설명\n{description}\n\n## 태스크\n- [ ] 태스크 1\n- [ ] 태스크 2\n- [ ] 태스크 3"
    }
  }
}
```

## 템플릿 변수

노트 템플릿에서 사용할 수 있는 변수:

- `{project}`: 프로젝트 이름
- `{model}`: 모델 이름 
- `{description}`: 프로젝트 설명
- `{date}`: 현재 날짜
- `{model_description}`: 모델 설명

## UpNote 연동

이 도구는 UpNote의 x-callback-url 기능을 사용하여 노트를 생성합니다. 따라서 UpNote 앱이 설치되어 있어야 합니다.

지원되는 UpNote 액션:
- 노트 생성 (`note`)
- 노트북 생성 (`notebook`) 
- 태그 보기 (`tag`)

## MCP 설정 파일

이 프로젝트는 MCP(Model Context Protocol) 설정 파일(`.mcp.json`)을 포함하고 있어 MCP 환경과 통합할 수 있습니다. MCP 설정 파일은 다음과 같은 구조로 되어 있습니다:

```json
{
  "version": "1.0",
  "name": "upnote-mcp",
  "description": "Model Context Protocol과 UpNote 연동 도구",
  "github": {
    "repository": "upnote-mcp",
    "owner": "milkrevenant",
    "branch": "main"
  },
  "models": [...],
  "projects": [...]
}
```

## 요구 사항

- Node.js 14 이상
- UpNote 앱

## 개발 방법

이 프로젝트를 확장하거나 수정하려면:

```bash
# 저장소 클론
git clone https://github.com/milkrevenant/upnote-mcp.git
cd upnote-mcp

# 의존성 설치
npm install

# 개발용 링크 생성
npm link

# 코드 수정 후 테스트
mcp-upnote
```

## 문제 해결

- **UpNote 앱이 열리지 않는 경우**: UpNote 앱이 설치되어 있는지 확인하고, `x-callback-url` 프로토콜이 시스템에 등록되어 있는지 확인하세요.
- **설정 파일 문제**: `~/.mcp-upnote` 디렉토리가 있는지 확인하고, 필요한 경우 `mcp-upnote init` 명령어로 설정을 초기화하세요.

## 라이선스

MIT
