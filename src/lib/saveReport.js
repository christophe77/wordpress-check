const fs = require('fs');
const path = require('path');

function saveReport(report, url) {
  const domain = new URL(url).hostname.replace('www.', '');
  const rootPath = path.resolve(__dirname);
  const localReportPath = path.join(rootPath, 'reports');
  const reportFileName = `${domain}.json`;
  const data = JSON.stringify(report);
  fs.writeFileSync(`${localReportPath}${reportFileName}`, data);
}

module.exports = saveReport;
