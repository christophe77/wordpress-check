const axios = require('axios');
const cheerio = require('cheerio');
const { uniqWith, isEqual } = require('lodash');
const getStringBetween = require('../utils/getStringBetween');

async function getPlugins(url) {
  const plugins = [];
  try {
    const response = await axios.get(url);
    const sourceCode = response.data;
    const $ = cheerio.load(sourceCode);
    $('link[rel="stylesheet"]').each((_index, tag) => {
      const content = tag.attribs.href.toLowerCase();
      if (content.includes('wp-content/plugins/')) {
        const name = getStringBetween('plugins/', '/', content);
        const version = content.split('=')[1];
        plugins.push({
          name,
          version,
        });
      }
    });

    return plugins.length > 0 ? uniqWith(plugins, isEqual) : plugins;
  } catch {
    return plugins;
  }
}
module.exports = getPlugins;
