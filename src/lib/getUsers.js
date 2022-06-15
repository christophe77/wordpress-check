const axios = require('axios');

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
        if (responsePath?.includes('author')) {
          const authorName = responsePath.split('/')[2];
          authors.push({
            id: authorId,
            name: authorName,
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
  return users;
}

module.exports = getUsers;
