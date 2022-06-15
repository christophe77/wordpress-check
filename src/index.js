const getVersion = require('./lib/getVersion');
const getUsers = require('./lib/getUsers');
const getTheme = require('./lib/getTheme');
const getPlugins = require('./lib/getPlugins');
const checkDirectoryIndexing = require('./lib/checkDirectoryIndexing');

async function wpCheck(url) {
  const targetUrl = url.slice(-1) === '/' ? url : `${ url }/`;
  const [version, users, theme, plugins, directoryIndexing] = await Promise.all(
    [
      getVersion(targetUrl),
      getUsers(targetUrl),
      getTheme(targetUrl),
      getPlugins(targetUrl),
      checkDirectoryIndexing(targetUrl),
    ]
  );
  return {
    version,
    theme,
    plugins,
    users,
    directoryIndexing,
  };
}
module.exports = wpCheck;
