/**
 * Default Docker run options.
 *
 * @type {{Object}}
 */
export const defaultOptions = {
  Hostname: '',
  // 'User': '',
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: true,
  OpenStdin: true,
  StdinOnce: false,
  Env: null,
  // 'Cmd': ['sh'],
  Dns: ['8.8.8.8', '8.8.4.4'],
  Image: 'alpine:3.8',
  Volumes: {},
  VolumesFrom: [],
};

/**
 * Default attach options (TTY options).
 *
 * @type {{stdin: boolean, stdout: boolean, stream: boolean, stderr: boolean}}
 */
export const defaultAttachOptions = {
  stream: true,
  stdin: true,
  stdout: true,
  stderr: true,
};
