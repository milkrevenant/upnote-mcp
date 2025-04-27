/**
 * 프롬프트 인터랙션 모듈
 */
const Enquirer = require('enquirer');

// Enquirer 인스턴스 생성
const enquirer = new Enquirer();

/**
 * 프롬프트 도구 모음
 */
const prompt = {
  /**
   * 단일 입력 프롬프트
   * @param {Object} options 프롬프트 옵션
   * @returns {Promise<string>} 입력 값
   */
  async input(options) {
    const { answer } = await enquirer.prompt({
      type: 'input',
      name: 'answer',
      ...options
    });
    return answer;
  },
  
  /**
   * 멀티라인 입력 프롬프트
   * @param {Object} options 프롬프트 옵션
   * @returns {Promise<string>} 입력 값
   */
  async multiline(options) {
    const { answer } = await enquirer.prompt({
      type: 'multiline',
      name: 'answer',
      ...options
    });
    return answer;
  },
  
  /**
   * 선택 프롬프트
   * @param {Object} options 프롬프트 옵션
   * @returns {Promise<string>} 선택 값
   */
  async select(options) {
    const { answer } = await enquirer.prompt({
      type: 'select',
      name: 'answer',
      ...options
    });
    return answer;
  },
  
  /**
   * 확인 프롬프트
   * @param {Object} options 프롬프트 옵션
   * @returns {Promise<boolean>} 확인 결과
   */
  async confirm(options) {
    const { confirm } = await enquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      ...options
    });
    return { confirm };
  },
  
  /**
   * 다중 선택 프롬프트
   * @param {Object} options 프롬프트 옵션
   * @returns {Promise<Array>} 선택 값 배열
   */
  async multiselect(options) {
    const { answer } = await enquirer.prompt({
      type: 'multiselect',
      name: 'answer',
      ...options
    });
    return answer;
  },
  
  /**
   * 암호 입력 프롬프트
   * @param {Object} options 프롬프트 옵션
   * @returns {Promise<string>} 입력 값
   */
  async password(options) {
    const { answer } = await enquirer.prompt({
      type: 'password',
      name: 'answer',
      ...options
    });
    return answer;
  }
};

module.exports = { prompt };
