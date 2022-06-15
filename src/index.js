const getVersion = require('./lib/getVersion');
const getUsers = require('./lib/getUsers');
const getTheme = require('./lib/getTheme');
const checkDirectoryIndexing = require('./lib/checkDirectoryIndexing');

async function wpCheck(url) {
  const targetUrl = url.slice(-1) === '/' ? url : `${url}/`;
  const version = await getVersion(targetUrl);
  const users = await getUsers(targetUrl);
  const theme = await getTheme(targetUrl);
  const directoryIndexing = await checkDirectoryIndexing(targetUrl);
  return {
    version,
    users,
    directoryIndexing,
    theme,
  };
}
module.exports = wpCheck;
