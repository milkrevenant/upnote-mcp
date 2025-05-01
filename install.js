#!/usr/bin/env node

/**
 * MCP-UpNote 로컬 설치 스크립트
 * 이 스크립트는 MCP-UpNote CLI 도구를 로컬 환경에 쉽게 설치하기 위한 도구입니다.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// 로고와 환영 메시지 출력
console.log(`
========================================
      MCP-UpNote 설치 스크립트
========================================

이 스크립트는 MCP-UpNote CLI 도구를 
로컬 환경에 설치합니다.
`);

// 현재 디렉토리 경로
const currentDir = __dirname;

// Node.js 버전 확인
const nodeVersion = process.version;
const versionMatch = nodeVersion.match(/^v(\d+)\./);
const majorVersion = versionMatch ? parseInt(versionMatch[1], 10) : 0;

if (majorVersion < 14) {
  console.error('오류: Node.js 14 이상이 필요합니다. 현재 버전:', nodeVersion);
  process.exit(1);
}

// 의존성 설치
console.log('의존성 패키지를 설치하는 중...');
try {
  execSync('npm install', { cwd: currentDir, stdio: 'inherit' });
} catch (error) {
  console.error('의존성 설치 중 오류가 발생했습니다:', error.message);
  process.exit(1);
}

// 실행 권한 부여
const binPath = path.join(currentDir, 'bin', 'mcp-upnote.js');
try {
  // chmod +x는 Windows에서 작동하지 않지만, 실행에는 영향을 주지 않습니다.
  if (os.platform() !== 'win32') {
    fs.chmodSync(binPath, '755');
  }
} catch (error) {
  console.log('경고: 실행 권한을 부여하지 못했습니다. Windows에서는 무시해도 됩니다.');
}

// 로컬 실행을 위한 심볼릭 링크 또는 배치 파일 생성
try {
  const binDir = path.join(os.homedir(), '.local', 'bin');
  const targetPath = path.join(binDir, 'mcp-upnote');
  
  if (os.platform() === 'win32') {
    // Windows에서는 배치 파일 생성
    const batchContent = `@echo off\nnode "${binPath}" %*`;
    const batchPath = path.join(os.homedir(), 'mcp-upnote.bat');
    
    try {
      fs.writeFileSync(batchPath, batchContent);
      console.log(`배치 파일이 생성되었습니다: ${batchPath}`);
      console.log('이 파일을 PATH에 추가된 디렉토리로 이동하거나, 현재 위치를 PATH에 추가하세요.');
    } catch (err) {
      console.log('배치 파일을 생성하지 못했습니다. 수동으로 실행해주세요.');
    }
  } else {
    // Linux/Mac에서는 심볼릭 링크 생성 시도
    if (!fs.existsSync(binDir)) {
      fs.mkdirSync(binDir, { recursive: true });
    }
    
    try {
      // 기존 링크가 있다면 삭제
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      
      fs.symlinkSync(binPath, targetPath);
      console.log(`심볼릭 링크가 생성되었습니다: ${targetPath}`);
      console.log('이 경로가 $PATH에 포함되어 있는지 확인하세요.');
    } catch (err) {
      console.log('심볼릭 링크를 생성하지 못했습니다. 수동으로 실행해주세요.');
    }
  }
} catch (error) {
  console.log('경고: 로컬 실행 설정을 완료하지 못했습니다.');
}

console.log(`
========================================
     설치가 완료되었습니다!
========================================

다음과 같이 실행할 수 있습니다:

1. 직접 실행:
   node ${binPath}

2. npm script 사용:
   cd ${currentDir}
   npm start

도움말을 보려면:
   node ${binPath} --help
`);
