// lodash helpers.
import { assign } from "lodash";
// import docker instance (Dockerode).
import docker from "./docker";
// import default options.
import { defaultAttachOptions, defaultOptions } from "./options";
// import TTY helpers.
import { detectDetachingKeys, exit, resize } from "./tty";

/**
 * Connect process stdout to container stdout.
 *
 * @param stream
 */
export const connectStdout = (stream) => {
  stream.pipe(process.stdout);
};

/**
 * Connect process stdin to container stdin.
 * @param stream
 */
export const connectStdin = (stream) => {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);
  process.stdin.pipe(stream);
};

/**
 * Start container (after attach).
 *
 * @param container
 * @param stream
 */
export const startContainer = (container, stream) => {
  container.start(() => {
    resize(container);
    process.stdout.on("resize", () => resize(container));
    container.wait(() => exit(stream));
  });
};

/**
 * Run docker command, attaching TTY, interactively.
 *
 * @param {String} image          Docker image to run
 * @param {Array}  command        Container command to run (separate spaces into array).
 * @param {Object} options        Container options.
 * @param {Object} attachOptions  TTY attach options.
 *
 * @returns {*}
 */
export const run = (image, command, options = {}, attachOptions = {}) => {
  // build final options for run command.
  const finalOptions = assign({}, defaultOptions, options, { Image: image, Cmd: command });
  // build final attach options for run command.
  const finalAttachOptions = assign({}, defaultAttachOptions, attachOptions);

  // create the container, passing run handler.
  return docker.createContainer(finalOptions, (err, container) => {
    // attach TTY on container.
    container.attach(finalAttachOptions, (err, stream) => {
      // connect stdout.
      connectStdout(stream);
      // connect stdin.
      connectStdin(stream);
      // detect keys to detach process.
      detectDetachingKeys(stream);
      // after attach, start, binding resize of TTY.
      startContainer(container, stream);
    });
  });
};
