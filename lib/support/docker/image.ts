import { docker } from './docker';
import { connectStdin, connectStdout } from './run';
import { detectDetachingKeys } from './tty';

export const pullImage = (imageName) => docker.pull(imageName, {})
  .then((stream) => {
    // connect stdout.
    connectStdout(stream);
    // connect stdin.
    connectStdin(stream);
    // detect keys to detach process.
    detectDetachingKeys(stream);
  })
  .catch(() => {});
