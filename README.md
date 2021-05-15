# DHIS2 SCP Whitelist

This documentation is part of Bengtsson, A. (2021). Facilitating Software Reuse. Using Design Science Research To Develop Design Principles For Implementing A Component Repository (Unpublished master's thesis). University of Oslo, Norway.

This repository contains a list of verified NPM packages.

Pull requests to this repository will be validated with a GitHub actions workflow.

If you want to submit your package for verification see the instructions in the [DHIS2 SCP CLI repository](https://github.com/dhis2designlab/scp-cli/blob/master/README.md).

## Depends upon
* SCP CLI - for performing the verification during the pull request

## Workflow

A user submits his package for verification by modifying `list.csv` file, adding a new line containing his NPM package `identifier`and its `version` separated by a comma, e.g. `lodash,4.17.14`. It will result in a pull-request that will trigger the automated verification workflow on the added package. 

The verification workflow:

* Checks for verification prerequisites defined in [DHIS2 SCP CLI](https://github.com/dhis2designlab/scp-cli#package-verification-guide)
* Lints the code with [ESLint](https://www.npmjs.com/package/eslint) and outputs the result
* Runs [npm audit](https://docs.npmjs.com/cli/v6/commands/npm-audit) and outputs the result

The output of the verification workflow serves as a basis for acceptance of the pull request, but the final decision for acceptance is up to the maintaners. 

## GitHub Validation Flow
All checks happen in the pull request check called "CI-Validate", which then runs "Validate". In here, there are seven different jobs, with the most important being `Run cat - > event.json <<EOF`. The `event.json` file is the pull request. This job goes through the following workflow:
1. Check that the event was triggered by a pull request that only changed one file. (the `list.csv` file).
2. Fetch the package's package.json file with unpkg, then check that it contains a git repository.
3. Clones the package's source code using git.
4. Installs all dependencies with `npm install`.
5. Checks the keywords, components, and exports.
6. Runs eslint to check linting and print out issues.
7. Runs `npm audit`.
8. Prints out if the verification passed or not.

As these all happens in one job, the maintainer currently needs to manually check through each of them, and then comment on the whole pull request. There are more possibilities here, for instance splitting each step into a separate job, so that it is easier to maintain and comment on the individual checks that might fail.
