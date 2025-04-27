#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { version } = require('../package.json');
const { createNote, createNotebook, viewTag } = require('../lib/upnote');
const { loadConfig, saveConfig, initConfig } = require('../lib/config');
const { prompt } = require('../lib/prompt');

// 버전 설정
program.version(version);

// 초기화 명령
program
  .command('init')
  .description('MCP-UpNote 설정 초기화')
  .action(async () => {
    try {
      await initConfig();
      console.log(chalk.green('✓ MCP-UpNote 설정이 초기화되었습니다.'));
    } catch (error) {
      console.error(chalk.red(`오류: ${error.message}`));
      process.exit(1);
    }
  });

// 노트 생성 명령
program
  .command('note')
  .description('MCP 컨텍스트로 새 노트 생성')
  .option('-p, --project <n>', '프로젝트 이름')
  .option('-m, --model <n>', '모델 이름')
  .option('-t, --text <text>', '노트 내용')
  .option('-n, --notebook <n>', '노트북 이름')
  .action(async (options) => {
    try {
      const config = loadConfig();
      const result = await createNote(config, options);
      console.log(chalk.green(`✓ UpNote에 노트가 생성되었습니다: ${result.title}`));
    } catch (error) {
      console.error(chalk.red(`오류: ${error.message}`));
      process.exit(1);
    }
  });

// 노트북 생성 명령
program
  .command('notebook')
  .description('새 노트북 생성')
  .option('-n, --name <n>', '노트북 이름')
  .action(async (options) => {
    try {
      const notebookName = options.name || await prompt.input({
        message: '노트북 이름을 입력하세요:',
        initial: 'MCP 프로젝트'
      });
      
      const result = await createNotebook(notebookName);
      console.log(chalk.green(`✓ UpNote에 노트북이 생성되었습니다: ${notebookName}`));
    } catch (error) {
      console.error(chalk.red(`오류: ${error.message}`));
      process.exit(1);
    }
  });

// 태그 보기 명령
program
  .command('tag')
  .description('UpNote에서 태그로 노트 찾기')
  .option('-t, --tag <tag>', '태그 이름')
  .action(async (options) => {
    try {
      const tagName = options.tag || await prompt.input({
        message: '태그 이름을 입력하세요:',
        initial: 'MCP'
      });
      
      const result = await viewTag(tagName);
      console.log(chalk.green(`✓ UpNote에서 태그를 열었습니다: ${tagName}`));
    } catch (error) {
      console.error(chalk.red(`오류: ${error.message}`));
      process.exit(1);
    }
  });

// 인터랙티브 모드
program
  .command('interactive', { isDefault: true })
  .description('인터랙티브 모드로 MCP-UpNote 사용')
  .action(async () => {
    try {
      const actions = ['노트 생성', '노트북 생성', '태그 보기', '설정 초기화', '종료'];
      
      const { action } = await prompt.select({
        message: '무엇을 하시겠습니까?',
        choices: actions
      });
      
      switch (action) {
        case '노트 생성':
          program.parse(['node', 'mcp-upnote', 'note']);
          break;
        case '노트북 생성':
          program.parse(['node', 'mcp-upnote', 'notebook']);
          break;
        case '태그 보기':
          program.parse(['node', 'mcp-upnote', 'tag']);
          break;
        case '설정 초기화':
          program.parse(['node', 'mcp-upnote', 'init']);
          break;
        case '종료':
          console.log(chalk.blue('MCP-UpNote를 종료합니다. 안녕히 가세요!'));
          process.exit(0);
          break;
      }
    } catch (error) {
      console.error(chalk.red(`오류: ${error.message}`));
      process.exit(1);
    }
  });

// 프로그램 실행
program.parse(process.argv);

// 명령어가 입력되지 않았을 경우 도움말 표시
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
