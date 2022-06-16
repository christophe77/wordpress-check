const fs = require('fs');

function saveReportCli(report, url) {
  const domain = new URL(url).hostname.replace('www.', '');
  const reportFileName = `${domain}.json`;
  const data = JSON.stringify(report, null, 2);
  fs.writeFileSync(`${process.cwd()}\\${reportFileName}`, data);
}

module.exports = saveReportCli;
