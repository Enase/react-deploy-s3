import {Spinner} from 'cli-spinner'
import clc from 'cli-color'
import {spawn} from 'child_process'

const runBuild = () => {
  return new Promise((resolve, reject) => {
    const child = spawn('npm run build', [], { cwd: process.cwd(), env: process.env });

    child.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    child.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    child.on('close', function (code) {
      console.log('child process exited with code ' + code);
      if (Number(code) === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  })
};

export default async () => {
  let spinner = new Spinner('%s Building app...')
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
  spinner.start()

  await runBuild()

  spinner.stop(true)

  console.log(clc.bold('App built'))
}
