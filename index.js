const inquirer = require('inquirer')
const fs = require('fs')

function generateToCLinks(sections) {
    const links = sections.map(section => `- [${section}](#${section.toLowerCase()})`).join('\n');
    return links;
}

function renderBadge(license) {
    if (license === 'MIT') {
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    }
    if (license === 'Apache') {
        return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
    }
    if (license === 'None') {
        return
    }
} 

// Functions need to go outside the } but inside the )
const generateREADME = ({ ProjectName, Description, ToC, Installation, Usage, License, Contributing, Tests, Questions, Email }) =>
`
${renderBadge(License)}
# ${ProjectName} 

${Description}

## Table of Contents

${ToC.map(section => {
    return `- [${section}](#${section.toLowerCase()})`
}).join("\n")}

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

if you have querstions please reach out to me here:
Github Username: ${Questions}
Email: ${Email}

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
        type: 'list',
        name: 'License',
        message: 'What license was used?',
        choices: [
            'MIT',
            'Apache',
            'None'
        ]
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
        type: 'input',
        name: 'Email',
        message: 'Please enter your Email here:'
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
   
    fs.writeFile('README.md', READMEPageContent, (err) =>
    err ? console.log(err) : console.log('README Created')
    );
}); 