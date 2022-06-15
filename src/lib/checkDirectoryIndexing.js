const axios = require('axios');
const directoryList = require('../constants/directoryList');

async function checkDirectoryIndexing(url) {
  const directoryIndexingList = [];
  for (const directory of directoryList) {
    try {
      const response = await axios.get(`${url}${directory}`);
      if (response.data?.includes('Index of')) {
        directoryIndexingList.push(directory);
      }
    } catch {
      //
    }
  }
  return directoryIndexingList;
}

module.exports = checkDirectoryIndexing;
