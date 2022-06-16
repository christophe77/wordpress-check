#!/usr/bin/env node
const cli = require('commander');
const wpCheck = require('./index');
const saveReportCli = require('./lib/saveReportCli');

async function wpCheckFromCli(url, options) {
  const report = await wpCheck(url, false);
  if (options.save) {
    saveReportCli(report, url);
  }
  return console.log(report);
}

cli.description('Access the JSON Placeholder API');
cli.name('wpcheck');
cli.usage('<url>');
cli.addHelpCommand(false);
cli.helpOption(false);
cli
  .command('scan')
  .argument('[url]', 'Any WordPress website url.')
  .option('-s, --save', 'Save report into a JSON file.')
  .description('Scan any WordPress website in search of informations.')
  .action(wpCheckFromCli);

cli.parse(process.argv);
