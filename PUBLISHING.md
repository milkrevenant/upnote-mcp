# npm 패키지 배포 가이드

이 문서는 mcp-upnote 패키지를 npm에 배포하는 방법에 대한 안내입니다.

## 사전 요구사항

1. npm 계정이 있어야 합니다. 계정이 없다면 [npm 웹사이트](https://www.npmjs.com/signup)에서 가입하세요.
2. 로컬 환경에 Node.js와 npm이 설치되어 있어야 합니다.

## 패키지 배포 단계

### 1. npm에 로그인

터미널에서 다음 명령어를 실행하여 npm에 로그인합니다:

```bash
npm login
```

사용자 이름, 비밀번호, 이메일을 입력하라는 메시지가 표시됩니다.

### 2. 패키지 준비

패키지를 배포하기 전에 몇 가지 준비 작업이 필요합니다:

1. `package.json` 파일에서 다음 사항을 확인하세요:
   - 패키지 이름 (`name` 필드)이 고유한지 확인합니다.
   - 버전 번호 (`version` 필드)가 적절한지 확인합니다.
   - 모든 종속성이 올바르게 명시되어 있는지 확인합니다.
   - 패키지에 대한 설명 (`description` 필드)이 정확한지 확인합니다.

2. 실행 파일이 올바른 권한을 가지고 있는지 확인합니다:
   ```bash
   chmod +x ./bin/mcp-upnote.js
   ```

3. `README.md` 파일이 유용한 정보를 제공하는지 확인합니다:
   - 설치 방법
   - 사용 방법
   - 예제

4. 필요한 종속성을 설치하고 패키지를 테스트합니다:
   ```bash
   npm install
   ```

### 3. 패키지 테스트

패키지를 로컬에서 테스트하려면 다음 명령어를 실행하세요:

```bash
# 현재 디렉토리에서 패키지를 전역적으로 설치
npm link

# 명령어 테스트
mcp-upnote --version
mcp-upnote --help
```

### 4. 패키지 배포

모든 것이 제대로 작동하는지 확인했다면 다음 명령어로 패키지를 배포하세요:

```bash
npm publish
```

이 명령어는 패키지를 npm 레지스트리에 게시합니다. 처음 배포하는 경우 패키지 이름이 고유하다면 문제 없이 배포됩니다.

### 5. 패키지 업데이트

패키지를 업데이트하려면 다음 단계를 따르세요:

1. `package.json` 파일에서 버전 번호를 업데이트합니다. 시맨틱 버저닝 규칙(major.minor.patch)을 따라야 합니다:
   - 호환되지 않는 API 변경 시 주 버전(major)을 올립니다.
   - 이전 버전과 호환되는 기능을 추가할 때 부 버전(minor)을 올립니다.
   - 이전 버전과 호환되는 버그 수정 시 패치 버전(patch)을 올립니다.

2. 또는 npm 버전 명령어를 사용할 수 있습니다:
   ```bash
   npm version patch  # 패치 버전 증가
   npm version minor  # 부 버전 증가
   npm version major  # 주 버전 증가
   ```

3. 변경 사항을 `CHANGELOG.md` 파일에 문서화합니다.

4. 업데이트된 패키지를 배포합니다:
   ```bash
   npm publish
   ```

## 배포 후 확인

패키지가 성공적으로 배포되었는지 확인하려면 다음 URL을 방문하세요:
```
https://www.npmjs.com/package/mcp-upnote
```

또는 다른 환경에서 설치해보세요:
```bash
npm install -g mcp-upnote
# 또는
npx mcp-upnote
```

## 문제 해결

- **403 Forbidden 오류**: 패키지 이름이 이미 사용 중이거나 npm 계정에 권한이 없을 수 있습니다.
- **404 Not Found 오류**: npm 레지스트리에 연결할 수 없는 경우입니다.
- **패키지가 배포되지 않는 경우**: `.npmignore` 또는 `package.json`의 `files` 필드를 확인하여 중요한 파일이 제외되지 않았는지 확인하세요.

## 참고 자료

- [npm 문서](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
