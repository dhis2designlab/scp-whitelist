import * as core from '@actions/core'
import * as github from '@actions/github'

const run = async (): Promise<void> => {
  try {
    const payload = github.context.payload;
    const payloadJson = JSON.stringify(github.context.payload, undefined, 2);
    if (payload === undefined) {
      console.error(`Couldn't handle pull-request`);
      core.setFailed(`Validate action failure`);
    }

    if (payload.changed_files != 1) {
      console.error("More than one file has been changed.");
      core.setFailed(`Validate action failure`);
    }

    console.log(`Checks passed`);
    console.log(`The event payload: ${payloadJson}`);
  } catch (error) {
    console.error(error.message)
    core.setFailed(`Validate action failure: ${error}`)
  }
}

run()

export default run