const getVersion = require('./lib/getVersion');
const getUsers = require('./lib/getUsers');
const getThemes = require('./lib/getThemes');
const getPlugins = require('./lib/getPlugins');
const getGenerators = require('./lib/getGenerators');
const checkDirectoryIndexing = require('./lib/checkDirectoryIndexing');
const saveReport = require('./lib/saveReport');

async function wpCheck(url, save) {
  const targetUrl = url.slice(-1) === '/' ? url : `${url}/`;
  const [version, users, themes, plugins, generators, directoryIndexing] =
    await Promise.all([
      getVersion(targetUrl),
      getUsers(targetUrl),
      getThemes(targetUrl),
      getPlugins(targetUrl),
      getGenerators(targetUrl),
      checkDirectoryIndexing(targetUrl),
    ]);
  const report = {
    version,
    themes,
    plugins,
    generators,
    users,
    directoryIndexing,
  };
  if (save === true) {
    saveReport(report, targetUrl);
  }
  return report;
}

module.exports = wpCheck;
