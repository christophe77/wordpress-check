const axios = require('axios');
const { uniqWith, isEqual } = require('lodash');
const cheerio = require('cheerio');
const getStringBetween = require('../utils/getStringBetween');

async function restRouteMethod(url) {
  try {
    const response = await axios.get(`${url}?rest_route=/wp/v2/users`);
    const users = [];
    for (const user of response.data) {
      const { id, slug } = user;
      users.push({ id, name: slug });
    }
    return users;
  } catch {
    return [];
  }
}

async function userJsonMethod(url) {
  try {
    const response = await axios.get(`${url}wp-json/wp/v2/users/1`);
    const { id, slug } = response.data;
    return [
      {
        id,
        name: slug,
      },
    ];
  } catch {
    return [];
  }
}

async function authorsMethod(url) {
  const authors = [];
  const authorsLoop = async () => {
    for (let authorId = 1; authorId < 99999; authorId += 1) {
      try {
        const response = await axios.get(`${url}?author=${authorId}`);
        const responsePath = response.request.path;
        if (responsePath?.includes('author/')) {
          const authorName = getStringBetween('author/', '/', responsePath);
          authors.push({
            id: authorId,
            name: authorName || '',
          });
        } else if (response.data) {
          // check Yoast SEO plugin
          const sourceCode = response.data;
          const $ = cheerio.load(sourceCode);
          const authorUrl = $('meta[property="og:url"]')[0].attribs.content;
          const authorName = getStringBetween('author/', '/', authorUrl);
          authors.push({
            id: authorId,
            name: authorName || '',
          });
        } else {
          break;
        }
      } catch {
        break;
      }
    }
  };
  await authorsLoop();
  return authors;
}

async function getUsers(url) {
  const restRoute = await restRouteMethod(url);
  const userJson = await userJsonMethod(url);
  const authors = await authorsMethod(url);
  const users = restRoute.concat(userJson).concat(authors);
  return users.length > 0 ? uniqWith(users, isEqual) : users;
}

module.exports = getUsers;
