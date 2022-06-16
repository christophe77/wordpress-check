const wpCheck = require('./src');

async function checkUrl(url) {
  const results = await wpCheck(url);
  console.log(results);
}

async function checkUrlAndSaveReport(url) {
  const results = await wpCheck(url, true);
  console.log(results);
  // file saved inside root path /reports
}

checkUrl('https://your-wordpress-website1.com/');
checkUrlAndSaveReport('https://your-wordpress-website2.com/');
