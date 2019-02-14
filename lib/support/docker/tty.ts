import { get } from "lodash";

/**
 * Control+P.
 *
 * @type {string}
 */
export const CTRL_P = "\u0010";

/**
 * Control+Q.
 * @type {string}
 */
export const CTRL_Q = "\u0011";

/**
 * Handle keys for detaching process.
 *
 * @param stream
 */
export const detectDetachingKeys = (stream) => {
  let previousKey;
  process.stdin.on("data", (key) => {
    if (previousKey === CTRL_P && key === CTRL_Q) {
      exit(stream);
    }
    previousKey = key;
  });

};

/**
 * Exit TTY session.
 *
 * @param stream
 */
export const exit = (stream) => {
  process.stdout.removeListener("resize", resize);
  process.stdin.removeAllListeners();
  process.stdin.setRawMode(isRawProcess());
  process.stdin.resume();
  stream.end();
  process.exit();
};
/**
 * Is raw process.
 *
 * @returns {Boolean}
 */
export const isRawProcess = (): boolean => get(process, "isRaw");

/**
 * Get current dimensions from process TTY.
 *
 * @returns {{w: number, h: number}}
 */
export const getCurrentDimensions = () => {
  return {
    h: process.stdout.rows,
    w: process.stderr.columns,
  };
};

/**
 * Resize container TTY.
 *
 * @param container
 * @param callback
 */
export const resize = (container, callback = (() => {})) => {
  // get dimensions from process TTY.
  const dimensions = getCurrentDimensions();

  // if dimensions are found, resize the container TTY.
  if (dimensions.h !== 0 && dimensions.w !== 0) {
    container.resize(dimensions, callback);
  }
};
