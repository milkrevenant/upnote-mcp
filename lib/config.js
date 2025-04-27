/**
 * MCP 설정 관리 모듈
 */
const Conf = require('conf');
const { prompt } = require('./prompt');
const path = require('path');
const fs = require('fs');
const os = require('os');

// 설정 스키마
const schema = {
  version: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  models: {
    type: 'array'
  },
  projects: {
    type: 'array'
  },
  integrations: {
    type: 'object'
  }
};

// 기본 설정 폴더
const configDir = path.join(os.homedir(), '.mcp-upnote');

// 설정 인스턴스 생성
const config = new Conf({
  projectName: 'mcp-upnote',
  schema,
  cwd: configDir
});

/**
 * 설정 불러오기
 * @returns {Object} 설정 객체
 */
function loadConfig() {
  // 설정이 없으면 초기 설정 생성
  if (Object.keys(config.store).length === 0) {
    const defaultConfig = getDefaultConfig();
    config.store = defaultConfig;
    return defaultConfig;
  }
  
  return config.store;
}

/**
 * 설정 저장하기
 * @param {Object} configData 설정 데이터
 */
function saveConfig(configData) {
  config.store = configData;
}

/**
 * 기본 설정 가져오기
 * @returns {Object} 기본 설정
 */
function getDefaultConfig() {
  return {
    version: '1.0',
    name: 'Model Context Protocol Configuration',
    models: [
      {
        name: 'GPT-4',
        description: 'OpenAI의 고급 대규모 언어 모델',
        parameters: {
          temperature: 0.7,
          max_tokens: 4096
        }
      },
      {
        name: 'Claude-3',
        description: 'Anthropic의 최신 AI 모델',
        parameters: {
          temperature: 0.5,
          max_tokens: 8192
        }
      }
    ],
    projects: [
      {
        name: '자연어 처리 프로젝트',
        description: '한국어 자연어 처리 능력 향상을 위한 프로젝트',
        model: 'GPT-4',
        tags: ['NLP', 'Korean', 'MCP']
      }
    ],
    integrations: {
      upnote: {
        enabled: true,
        default_notebook: 'MCP 프로젝트',
        auto_tags: ['MCP', 'AI'],
        note_template: '# {project} - {model}\n\n## 모델 정보\n- 모델명: {model}\n- 프로젝트: {project}\n- 생성일: {date}\n\n## 프로젝트 설명\n{description}\n\n## 태스크\n- [ ] 태스크 1\n- [ ] 태스크 2\n- [ ] 태스크 3'
      }
    }
  };
}

/**
 * 설정 초기화 함수 (인터랙티브)
 */
async function initConfig() {
  // 기존 설정 파일 존재 시 확인
  if (Object.keys(config.store).length > 0) {
    const { confirm } = await prompt.confirm({
      message: '기존 설정을 덮어쓰시겠습니까?',
      initial: false
    });
    
    if (!confirm) {
      return false;
    }
  }
  
  // 기본 설정 로드
  let newConfig = getDefaultConfig();
  
  // UpNote 통합 관련 설정
  const { enableUpnote } = await prompt.confirm({
    message: 'UpNote 통합을 활성화하시겠습니까?',
    initial: true
  });
  
  if (enableUpnote) {
    const defaultNotebook = await prompt.input({
      message: '기본 노트북 이름을 입력하세요:',
      initial: 'MCP 프로젝트'
    });
    
    const useTemplate = await prompt.confirm({
      message: '기본 노트 템플릿을 사용하시겠습니까?',
      initial: true
    });
    
    let noteTemplate = newConfig.integrations.upnote.note_template;
    
    if (!useTemplate) {
      noteTemplate = await prompt.input({
        message: '노트 템플릿을 입력하세요 (변수: {project}, {model}, {description}, {date}):',
        multiline: true,
        initial: noteTemplate
      });
    }
    
    newConfig.integrations.upnote = {
      enabled: true,
      default_notebook: defaultNotebook,
      auto_tags: ['MCP', 'AI'],
      note_template: noteTemplate
    };
  } else {
    newConfig.integrations.upnote.enabled = false;
  }
  
  // 설정 저장
  saveConfig(newConfig);
  
  // 설정 디렉토리 확인
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  return true;
}

/**
 * 설정 파일 경로 가져오기
 * @returns {string} 설정 파일 경로
 */
function getConfigPath() {
  return config.path;
}

module.exports = {
  loadConfig,
  saveConfig,
  initConfig,
  getConfigPath,
  getDefaultConfig
};
