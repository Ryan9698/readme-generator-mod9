const fs = require('fs');
const inquirer = require('inquirer');

const licenses = [
  { name: 'MIT License', value: 'MIT', url: 'https://opensource.org/licenses/MIT' },
  { name: 'BSD 2-Clause "Simplified" License', value: 'BSD-2-Clause', url: 'https://opensource.org/licenses/BSD-2-Clause' },
  { name: 'BSD 3-Clause "New" or "Revised" License', value: 'BSD-3-Clause', url: 'https://opensource.org/licenses/BSD-3-Clause' },
  { name: 'GNU GPLv3', value: 'GPL-3.0', url: 'https://www.gnu.org/licenses/gpl-3.0.en.html' },
  { name: 'Mozilla Public License 2.0', value: 'MPL-2.0', url: 'https://opensource.org/licenses/MPL-2.0' },
  { name: 'The Unlicense', value: 'unlicense', url: 'http://unlicense.org/' },
  { name: 'Apache License 2.0', value: 'Apache-2.0', url: 'https://opensource.org/licenses/Apache-2.0' },
];

const init = () => {
  inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
          },
          {
            type: 'input',
            name: 'description',
            message: "Write a description of your project. Describe your reason for building this project and the motivation behind it. What kind of problem does it solve and what did you learn from it?",
          },
          {
            type: 'input',
            name: 'installation',
            message: 'Please provide instructions on how to install your program if applicable, otherwise type N/A.',
          },
          {
            type: 'input',
            name: 'usage',
            message: 'Please describe the steps to how to use your project:',
          },
          {
              type: 'input',
              name: 'contributor',
              message: 'Please list any contributors or sources for your project:',
            },
          {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?',
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is your email address? (ex: demo@gmail.com):',
          },
          {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project:',
            choices: licenses,
          },
          {
              type: 'input',
              name: 'test',
              message: 'Were there any tests on this app? If so, how were they ran?',
          },
    ])
    .then((answers) => {
      const selectedLicense = licenses.find((license) => license.value === answers.license);
      let readmeContent = `# ${answers.title}

[![License: ${encodeURIComponent(selectedLicense.name)}](${selectedLicense.url})]

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributors](#contributors)
5. [License](#license)
6. [Questions](#questions)
7. [Testing](#testing)

## Description

${answers.description}

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributors

${answers.contributor}

## License

This project is licensed under the [${selectedLicense.name}](${selectedLicense.url}) - see the license file for details.

## Questions

If you have any questions or would like to see my work, you can see my GitHub portfolio: [${answers.github}](https://github.com/${answers.github}).

or reach me by email: [${answers.email}](mailto:${answers.email}).

## Testing

${answers.test}`;

      fs.writeFile('README.md', readmeContent, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('README.md successfully created!');
        }
      });
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
};

init();