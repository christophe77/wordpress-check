const axios = require('axios');
const cheerio = require('cheerio');

async function getGenerators(url) {
  const generators = [];
  try {
    const response = await axios.get(url);
    const sourceCode = response.data;
    const $ = cheerio.load(sourceCode);
    $('meta[name="generator"]').each((_index, tag) => {
      const generator = tag.attribs.content.toLowerCase();
      if (!generator.startsWith('wordpress')) {
        generators.push(generator);
      }
    });
    return generators;
  } catch {
    return generators;
  }
}

module.exports = getGenerators;
