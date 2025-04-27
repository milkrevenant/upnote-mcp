# MCP-UpNote

Model Context Protocol과 UpNote를 연동하는 CLI 도구입니다. AI 모델 프로젝트 관리와 메모를 효율적으로 수행할 수 있게 도와줍니다.

## 주요 기능

- MCP(Model Context Protocol) 기반 프로젝트 관리
- UpNote에 모델 컨텍스트 기반 노트 자동 생성
- 프로젝트, 모델별 노트 구조화
- 커스텀 템플릿 지원
- 인터랙티브 CLI 인터페이스

## 설치 방법

글로벌 설치:
```bash
npm install -g mcp-upnote
```

또는 npx로 직접 실행:
```bash
npx mcp-upnote
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

## 요구 사항

- Node.js 14 이상
- UpNote 앱

## 라이선스

MIT
