const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const util = require("util");

function init() {
    inquirer.prompt(questions)
    .then(function (inquirerResponses) {
        writeToFile("README.md", generateReadMe({ ...inquirerResponses }));
    })

}

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the project title?"
    },
    {
        type: "input",
        name: "description",
        message: "Describe the project."
    },
    {
        type: "input",
        name: "installation",
        message: "What command shall be run to install necessary dependencies?"
    },
    {
        type: "input",
        name: "usage",
        message: "How and why is this program used?"
    },
    {
        type: "input",
        name: "credits",
        message: "Credit any collaborators, instructors, tutorials etc."
    },
    {
        type: "list",
        name: "license",
        message: "What type of license does this project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        type: "input",
        name: "test",
        message: "What command shall the user use to run a test?"
    },
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    }
];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }

function renderLicenseSection(license) {
    if (license !== "None") {
      return (
        `## License
  
This project is licensed under the ${license} license.`
      )
    }
    return ''
  }


function generateReadMe(data) {
    return `# ${data.title}

## Description

${data.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributions](#contributions)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary modules, run this command:

${data.installation}

## Usage

${data.usage}

${renderLicenseSection(data.license)}

## Contributions

${data.credits}

## Tests

To run a test, run this command:

${data.test}

## Questions

If you have any questions, contact me directly at ${data.email}. You can find more projects of mine at [${data.github}](https://github.com/${data.github}/).

`;
}

init();