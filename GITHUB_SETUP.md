# GitHub 저장소 설정 가이드

이 문서는 MCP-UpNote CLI 프로젝트를 GitHub에 연결하는 방법에 대한 안내입니다.

## GitHub 저장소 생성

1. GitHub 웹사이트(https://github.com)에 로그인합니다.
2. 오른쪽 상단의 "+" 버튼을 클릭하고 "New repository"를 선택합니다.
3. 저장소 이름을 "upnote-mcp"로 입력합니다.
4. 설명에 "Model Context Protocol과 UpNote 연동 도구"를 입력합니다.
5. 공개 저장소로 설정합니다.
6. "Create repository" 버튼을 클릭하여 저장소를 생성합니다.

## 로컬 저장소 연결

GitHub 저장소가 생성되면, 로컬 저장소를 GitHub 저장소에 연결합니다:

```bash
# 현재 원격 저장소 설정 제거 (이미 설정한 경우)
git remote remove origin

# 새 GitHub 저장소 연결
git remote add origin https://github.com/[사용자이름]/upnote-mcp.git

# 코드를 GitHub에 푸시
git push -u origin master
```

## MCP GitHub 통합

MCP와 GitHub을 통합하려면 다음 단계를 따르세요:

1. `.mcp.json` 파일에 GitHub 저장소 정보가 올바르게 설정되어 있는지 확인합니다:
   ```json
   "github": {
     "repository": "upnote-mcp",
     "owner": "[GitHub 사용자이름]",
     "branch": "master"
   }
   ```

2. 변경 사항을 저장하고 GitHub에 푸시합니다:
   ```bash
   git add .mcp.json
   git commit -m "Update MCP GitHub configuration"
   git push
   ```

## npm 패키지로 배포

GitHub 저장소가 설정되었으면, npm 패키지를 배포할 수 있습니다:

1. `package.json` 파일에 GitHub 저장소 정보 추가:
   ```json
   "repository": {
     "type": "git",
     "url": "git+https://github.com/[사용자이름]/upnote-mcp.git"
   },
   "bugs": {
     "url": "https://github.com/[사용자이름]/upnote-mcp/issues"
   },
   "homepage": "https://github.com/[사용자이름]/upnote-mcp#readme"
   ```

2. npm에 로그인:
   ```bash
   npm login
   ```

3. 패키지 배포:
   ```bash
   npm publish
   ```

## 참고사항

- GitHub 인증: GitHub에 푸시할 때 사용자 이름과 비밀번호 또는 개인 액세스 토큰이 필요할 수 있습니다.
- GitHub CLI: `gh` 명령어를 사용하면 더 쉽게 GitHub 저장소를 관리할 수 있습니다. 설치 방법은 [여기](https://cli.github.com/)에서 확인할 수 있습니다.
- GitHub Desktop: 그래픽 인터페이스로 GitHub를 관리하려면 [GitHub Desktop](https://desktop.github.com/)을 사용할 수 있습니다.
