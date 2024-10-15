const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();


if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf8');


if (options.display) {
  console.log(data);
}

if (options.output) {
  fs.writeFileSync(options.output, data);
}


if (!options.display && !options.output) {
}
