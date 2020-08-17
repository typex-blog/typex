import * as electron from 'electron';
import * as proc from 'child_process';

export function startElectron(mainEntry: string) {
  const child = proc.spawn(electron as any, [mainEntry], { stdio: 'inherit', windowsHide: false });
  child.on('close', function (code) {
    process.exit(code)
  })

  const handleTerminationSignal = function (signal: any) {
    process.on(signal, function signalHandler () {
      if (!child.killed) {
        child.kill(signal)
      }
    })
  }

  handleTerminationSignal('SIGINT')
  handleTerminationSignal('SIGTERM')
}


