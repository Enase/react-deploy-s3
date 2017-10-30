import {Spinner} from 'cli-spinner'
import clc from 'cli-color'
import {spawn} from '../lib'

export default async () => {
  let spinner = new Spinner('%s Building app...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  await spawn('npm run build')

  spinner.stop(true)

  console.log(clc.bold('App built'))
}
