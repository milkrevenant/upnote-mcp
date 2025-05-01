# MCP-UpNote

Model Context Protocol과 UpNote를 연동하는 CLI 도구입니다. AI 모델 프로젝트 관리와 메모를 효율적으로 수행할 수 있게 도와줍니다.

## 주요 기능

- MCP(Model Context Protocol) 기반 프로젝트 관리
- UpNote에 모델 컨텍스트 기반 노트 자동 생성
- 프로젝트, 모델별 노트 구조화
- 커스텀 템플릿 지원
- 인터랙티브 CLI 인터페이스

## 설치 방법

### 로컬 설치 (NPM 게시 없이 사용)

1. 저장소 복제:
```bash
git clone https://github.com/milkrevenant/upnote-mcp.git
cd upnote-mcp
```

2. 설치 스크립트 실행:
```bash
node install.js
```

이 스크립트는 다음 작업을 수행합니다:
- 필요한 의존성 설치
- 실행 권한 부여 (Unix/Linux/Mac)
- 로컬에서 실행하기 위한 설정

### 실행 방법

설치 후 다음 방법으로 실행할 수 있습니다:

1. 직접 실행:
```bash
node ./bin/mcp-upnote.js
```

2. npm script 사용:
```bash
npm start
```

3. Windows에서 배치 파일 사용:
```bash
mcp-upnote.bat
```

4. Linux/Mac에서 심볼릭 링크 사용 (설정 성공시):
```bash
mcp-upnote
```

## 사용 방법

### 초기화

```bash
node ./bin/mcp-upnote.js init
# 또는
npm start init
```

### 노트 생성

```bash
# 인터랙티브 모드
node ./bin/mcp-upnote.js note

# 특정 프로젝트 및 모델로 노트 생성
node ./bin/mcp-upnote.js note -p "자연어 처리 프로젝트" -m "GPT-4"

# 직접 내용 지정
node ./bin/mcp-upnote.js note -t "노트 내용 텍스트" -n "노트북 이름"
```

### 노트북 생성

```bash
node ./bin/mcp-upnote.js notebook -n "MCP 프로젝트"
```

### 태그 보기

```bash
node ./bin/mcp-upnote.js tag -t "MCP"
```

### 인터랙티브 모드

```bash
node ./bin/mcp-upnote.js
# 또는
npm start
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

## MCP 파일 구성

프로젝트 루트의 `.mcp.json` 파일은 MCP(Model Context Protocol) 설정을 포함합니다:

```json
{
  "version": "1.0",
  "name": "upnote-mcp",
  "description": "Model Context Protocol과 UpNote 연동 도구",
  "github": {
    "repository": "upnote-mcp",
    "owner": "[GitHub 사용자명]",
    "branch": "main"
  },
  "models": [...],
  "projects": [...]
}
```

이 파일을 통해 MCP 환경과 통합하여 사용할 수 있습니다.

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

## 요구 사항

- Node.js 14 이상
- UpNote 앱

## 문제 해결

### Windows에서 실행 오류 발생 시

Windows 환경에서는 다음과 같이 직접 실행하세요:

```cmd
node path\to\bin\mcp-upnote.js
```

### 의존성 설치 문제

의존성 패키지 설치 중 오류가 발생한 경우:

```bash
cd upnote-mcp
npm install
```

### 권한 문제 (Linux/Mac)

Linux/Mac 환경에서 권한 문제가 발생한 경우:

```bash
chmod +x ./bin/mcp-upnote.js
```

## 라이선스

MIT
