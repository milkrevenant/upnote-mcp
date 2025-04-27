/**
 * MCP-UpNote 메인 모듈
 */

const upnote = require('./lib/upnote');
const config = require('./lib/config');
const prompt = require('./lib/prompt');

module.exports = {
  upnote,
  config,
  prompt
};
