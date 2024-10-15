const fs = require('fs');
const { program } = require('commander');

program    
    .requiredOption('-i, --input <path>', 'input JSON file')
    .option('-o, --output <path>', 'output file')   
    .option('-d, --display', 'display result in console')
    .parse(process.argv);

const options = program.opts();


if (!fs.existsSync(options.input)) {    
    console.error("Error: Cannot find input file");
    process.exit(1); 
}

let data;
try {
    data = fs.readFileSync(options.input, 'utf-8');
} catch (error) {
    console.error('Error: Unable to read input file');
    process.exit(1);
}

let parsedData;
try {
    parsedData = JSON.parse(data);
} catch (error) {
    console.error('Error: Input file is not valid JSON');    
    process.exit(1);
}


const selectedCategories = {};
const categoriesToFind = ["Доходи, усього", "Витрати, усього"];

parsedData.forEach(entry => {
    if (categoriesToFind.includes(entry.category)) {
        selectedCategories[entry.category] = entry.value; 
    }
});

const resultLines = Object.entries(selectedCategories).map(([category, value]) => {
    return `${category}:${value}`;
});


if (options.display) {   
     resultLines.forEach(line => console.log(line));
}

if (options.output) {
    fs.writeFileSync(options.output, resultLines.join('\n'), 'utf-8');
}
