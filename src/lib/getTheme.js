const axios = require('axios');
const cheerio = require('cheerio');
const getStringBetween = require('../utils/getStringBetween');

async function getTheme(url) {
  const theme = {
    name: '',
    version: '',
  };
  try {
    const response = await axios.get(url);
    const sourceCode = response.data;
    const $ = cheerio.load(sourceCode);

    $('link[rel="stylesheet"]').each((_index, tag) => {
      const content = tag.attribs.href.toLowerCase();
      if (content.includes('wp-content/themes/')) {
        const name = getStringBetween('themes/', '/', content);
        const version = content.split('=')[1];
        theme.name = name;
        theme.version = version;
      }
    });
    return theme;
  } catch {
    return theme;
  }
}
module.exports = getTheme;
