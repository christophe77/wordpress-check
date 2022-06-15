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
    const scripts = $('script');

    for (let i = 0; i < scripts.length; i += 1) {
      try {
        const src = scripts[i].attribs.src.toLowerCase();
        if (src.includes('wp-content/plugins/')) {
          const name = getStringBetween('plugins/', '/', src);
          const version = src.split('=')[1];
          plugins.push({ name, version });
        }
      } catch {
        //
      }
    }
    return plugins.length > 0 ? uniqWith(plugins, isEqual) : plugins;
  } catch {
    return plugins;
  }
}
module.exports = getPlugins;
