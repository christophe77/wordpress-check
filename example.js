const wpCheck = require('./src');

async function checkUrl(url) {
  const results = await wpCheck(url);
  console.log(JSON.stringify(results));
}

checkUrl('https://your-wp-website/');
