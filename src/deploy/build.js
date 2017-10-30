import {Spinner} from 'cli-spinner'
import clc from 'cli-color'
import {spawn} from 'child-process-promise'

export default async () => {
  let spinner = new Spinner('%s Building app...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  console.log('process.cwd()', process.cwd())
  await spawn('npm run build', [], process.cwd())

  spinner.stop(true)

  console.log(clc.bold('App built'))
}
