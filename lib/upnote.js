/**
 * UpNote 관련 기능 모음
 */
const open = require('open');
const { prompt } = require('./prompt');
const { loadConfig } = require('./config');

/**
 * URL 인코딩 함수
 * @param {string} str 인코딩할 문자열
 * @returns {string} 인코딩된 문자열
 */
function encodeParameter(str) {
  return encodeURIComponent(str);
}

/**
 * UpNote 노트 생성 함수
 * @param {Object} config MCP 설정
 * @param {Object} options 명령줄 옵션
 * @returns {Object} 생성된 노트 정보
 */
async function createNote(config, options = {}) {
  // 기본 설정 가져오기
  const upnoteConfig = config.integrations?.upnote || {};
  const defaultNotebook = upnoteConfig.default_notebook || 'MCP 프로젝트';
  const noteTemplate = upnoteConfig.note_template || '';
  
  // 프로젝트 선택 또는 지정
  let projectName, modelName, projectDescription;

  if (options.project) {
    // 지정된 프로젝트 찾기
    const project = config.projects?.find(p => p.name === options.project);
    if (!project) {
      throw new Error(`프로젝트를 찾을 수 없습니다: ${options.project}`);
    }
    projectName = project.name;
    modelName = options.model || project.model;
    projectDescription = project.description;
  } else if (config.projects?.length > 0) {
    // 프로젝트 선택 옵션
    const projectChoices = config.projects.map(p => p.name);
    projectName = await prompt.select({
      message: '프로젝트를 선택하세요:',
      choices: projectChoices
    });
    
    const selectedProject = config.projects.find(p => p.name === projectName);
    modelName = selectedProject.model;
    projectDescription = selectedProject.description;
  } else {
    // 프로젝트가 없을 경우 직접 입력
    projectName = await prompt.input({
      message: '프로젝트 이름을 입력하세요:'
    });
    
    modelName = await prompt.input({
      message: '모델 이름을 입력하세요:'
    });
    
    projectDescription = await prompt.input({
      message: '프로젝트 설명을 입력하세요:'
    });
  }
  
  // 모델 정보 확인
  let modelDescription = '';
  if (config.models?.length > 0) {
    const model = config.models.find(m => m.name === modelName);
    if (model) {
      modelDescription = model.description || '';
    }
  }
  
  // 노트 내용 설정
  let noteText;
  if (options.text) {
    // 커맨드라인으로 제공된 노트 내용
    noteText = options.text;
  } else {
    // 템플릿 기반 또는 직접 입력
    const noteTitleTemplate = `${projectName} - ${modelName}`;
    
    if (noteTemplate) {
      const date = new Date().toISOString().split('T')[0];
      noteText = noteTemplate
        .replace(/{project}/g, projectName)
        .replace(/{model}/g, modelName)
        .replace(/{description}/g, projectDescription || '')
        .replace(/{date}/g, date)
        .replace(/{model_description}/g, modelDescription || '');
    } else {
      // 기본 노트 내용
      noteText = `# ${noteTitleTemplate}\n\n## 프로젝트 정보\n- 모델: ${modelName}\n- 설명: ${projectDescription || '설명 없음'}\n\n## 노트\n`;
      
      // 사용자에게 추가 내용 입력 요청
      const additionalText = await prompt.input({
        message: '노트에 추가할 내용을 입력하세요:',
        multiline: true
      });
      
      if (additionalText) {
        noteText += additionalText;
      }
    }
  }
  
  // 노트북 설정
  const notebook = options.notebook || defaultNotebook;
  
  // URL 생성
  const title = `${projectName} - ${modelName}`;
  const url = createUpnoteNoteUrl(title, noteText, notebook, true, true);
  
  // URL 실행
  await open(url);
  
  return { title, url };
}

/**
 * UpNote 노트 생성 URL 생성
 * @param {string} title 노트 제목
 * @param {string} text 노트 내용
 * @param {string} notebook 노트북 이름
 * @param {boolean} newWindow 새 창에서 열기 여부
 * @param {boolean} markdown 마크다운 형식 여부
 * @returns {string} UpNote URL
 */
function createUpnoteNoteUrl(title, text, notebook = 'MCP 프로젝트', newWindow = true, markdown = true) {
  const baseUrl = 'upnote://x-callback-url/note/new';
  const params = {
    'title': title,
    'text': text,
    'notebook': notebook,
    'new_window': newWindow.toString().toLowerCase(),
    'markdown': markdown.toString().toLowerCase()
  };
  
  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeParameter(params[key])}`)
    .join('&');
  
  return `${baseUrl}?${queryString}`;
}

/**
 * UpNote 노트북 생성 함수
 * @param {string} title 노트북 제목
 * @returns {Object} 생성 결과
 */
async function createNotebook(title) {
  const baseUrl = 'upnote://x-callback-url/notebook/new';
  const url = `${baseUrl}?title=${encodeParameter(title)}`;
  
  await open(url);
  return { title, url };
}

/**
 * UpNote 태그 보기 함수
 * @param {string} tag 태그 이름
 * @returns {Object} 실행 결과
 */
async function viewTag(tag) {
  const baseUrl = 'upnote://x-callback-url/tag/view';
  const url = `${baseUrl}?tag=${encodeParameter(tag)}`;
  
  await open(url);
  return { tag, url };
}

/**
 * UpNote 노트 열기 함수
 * @param {string} noteId 노트 ID
 * @param {boolean} newWindow 새 창에서 열기 여부
 * @returns {Object} 실행 결과
 */
async function openNote(noteId, newWindow = false) {
  const baseUrl = 'upnote://x-callback-url/openNote';
  const url = `${baseUrl}?noteId=${encodeParameter(noteId)}&new_window=${newWindow.toString().toLowerCase()}`;
  
  await open(url);
  return { noteId, url };
}

/**
 * UpNote 노트북 열기 함수
 * @param {string} notebookId 노트북 ID
 * @returns {Object} 실행 결과
 */
async function openNotebook(notebookId) {
  const baseUrl = 'upnote://x-callback-url/openNotebook';
  const url = `${baseUrl}?notebookId=${encodeParameter(notebookId)}`;
  
  await open(url);
  return { notebookId, url };
}

module.exports = {
  createNote,
  createNotebook,
  viewTag,
  openNote,
  openNotebook
};
