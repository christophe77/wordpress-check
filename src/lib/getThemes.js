const axios = require('axios');
const cheerio = require('cheerio');
const { uniqWith, isEqual } = require('lodash');
const getStringBetween = require('../utils/getStringBetween');

async function getThemes(url) {
  const themes = [];
  try {
    const response = await axios.get(url);
    const sourceCode = response.data;
    const $ = cheerio.load(sourceCode);

    $('link').each((_index, tag) => {
      const content = tag.attribs.href.toLowerCase();
      if (content.includes('wp-content/themes/')) {
        const name = getStringBetween('themes/', '/', content);
        const version = content.split('=')[1] || '?';
        themes.push({
          name,
          version,
        });
      }
    });
    return themes.length > 0 ? uniqWith(themes, isEqual) : themes;
  } catch {
    return themes;
  }
}
module.exports = getThemes;
