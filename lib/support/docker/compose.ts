import YAML from "yaml";

/**
 * Dump a Docker-compose config object into a YAML string.
 *
 * @param {Object} config
 * @returns {*}
 */
export const objectToYAML = (config) => YAML.stringify(config);
