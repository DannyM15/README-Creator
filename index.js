const inquirer = require('inquirer')
const fs = require('fs')

function generateToCLinks(sections) {
    const links = sections.map(section => `- [${section}](#${section.toLowerCase()})`).join('\n');
    return links;
}


// Functions need to go outside the } but inside the )
const generateREADME = ({ ProjectName, Description, ToC, Installation, Usage, License, Contributing, Tests, Questions }) =>
`# ${ProjectName}

${Description}

## Table of Contents
${ToC}

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

${Installation}

## Usage

${Usage}

## Contributing

${Contributing}

## License

${License}

## Test

${Tests}

## Questions

${Questions}
`;


inquirer.prompt([
    {
        type: 'input',
        name: 'ProjectName',
        message: 'What is the name of your project?'
    },
    {
        type: 'input',
        name: 'Description',
        message: 'Provide a short description explaining the what, why, and how of your project.'
    },
 
    {
        type: 'input',
        name: 'Installation',
        message: 'What are the steps required to install your project?'
    },
    {
        type: 'input',
        name: 'Usage',
        message: 'Provide instructions for use.'
    },
    {
        type: 'input',
        name: 'License',
        message: 'What license was used?'
    },
    {
        type: 'input',
        name: 'Contributing',
        message: 'Who contributed to your project?'
    },
    {
        type: 'input',
        name: 'Tests',
        message: 'Provide examples on how to run the project.'
    },
    {
        type: 'input',
        name: 'Questions',
        message: 'Please enter your github username here:'
    },   
    {
        type: 'checkbox',
        name: 'ToC', 
        message: 'Please select the sections you would like to add to the Table of Contents:',
        choices: [
            {
                name: 'Installation',
            },
            {
                name: 'Usage',
            },
            {
                name: 'License',
            },
            {
                name: 'Contributing',
            },
            {
                name: 'Test',
            },
            {
                name: 'Questions',
            },
        ]
    },
])
.then((data) => {
    const READMEPageContent = generateREADME(data);
    const selectedSections = data.ToC;
    const tocLinks = generateToCLinks(selectedSections);

    const READMEContent = `# Table of Contents\n\n${tocLinks}`
    
    fs.writeFile('README.md', READMEPageContent, (err) =>
    err ? console.log(err) : console.log('README Created')
    );

    fs.appendFile('README.md', READMEContent,  (err) =>
    err ? console.log(err) : console.log('Data Appended to File'))

}); 