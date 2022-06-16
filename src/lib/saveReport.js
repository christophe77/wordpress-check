const fs = require('fs');
const path = require('path');

function saveReport(report, url) {
  const domain = new URL(url).hostname.replace('www.', '');
  const localReportPath = path.join(process.cwd(), 'reports');
  const reportFileName = `${domain}.json`;
  const data = JSON.stringify(report, null, 2);
  fs.writeFileSync(`${localReportPath}/${reportFileName}`, data);
}

module.exports = saveReport;
