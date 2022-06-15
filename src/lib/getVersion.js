const util = require('util');
const axios = require('axios');
const cheerio = require('cheerio');
const xml2js = require('xml2js');

async function metaMethod(url) {
  const fromMeta = {
    fromMeta: '',
  };
  try {
    const response = await axios.get(url);
    const sourceCode = response.data;
    const $ = cheerio.load(sourceCode);

    $('meta[name="generator"]').each((_index, tag) => {
      const content = tag.attribs.content.toLowerCase();
      if (content.startsWith('wordpress')) {
        fromMeta.fromMeta = content.replace('wordpress ', '');
      }
    });
    return fromMeta;
  } catch {
    return fromMeta;
  }
}
async function feedMethod(url) {
  try {
    const response = await axios.get(`${url}feed`);
    const xmlFeed = response.data;
    const parser = new xml2js.Parser();
    const result = await util.promisify(parser.parseString.bind(parser))(
      xmlFeed
    );
    const version =
      result?.rss?.channel[0]?.generator[0]?.replace(
        'https://wordpress.org/?v=',
        ''
      ) || '';
    return {
      fromFeed: version,
    };
  } catch {
    return {
      fromFeed: '',
    };
  }
}

async function getVersion(url) {
  const meta = await metaMethod(url);
  const feed = await feedMethod(url);
  return [meta, feed];
}
module.exports = getVersion;
