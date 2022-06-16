#!/usr/bin/env node
const cli = require('commander');
const wpCheck = require('./index');

async function wpCheckFromCli(url) {
  const report = await wpCheck(url, false);
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
  .description('Scan any WordPress website in search of informations.')
  .action(wpCheckFromCli);

cli.parse(process.argv);
