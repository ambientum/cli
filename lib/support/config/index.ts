// import Configstore.
import Configstore from "configstore";
// lodash helpers.
import { get } from "lodash";
// import package.json
import pkg from "package.json";

/**
 * Class GlobalConfig.
 */
export class GlobalConfig {
  // home config instance.
  protected config: Configstore;

  // GlobalConfig constructor.
  public constructor(initialValues: object = {}) {
    // start home config instance, passing
    this.config = new Configstore(get(pkg, "slug", "ambientum-cli"), initialValues);
  }

  // return the path for the config file.
  public path() {
    return this.config.path;
  }

  // return getAll config values as object.
  public all() {
    return this.config.all;
  }

  // set config values under a given key.
  public set(key: string, value: any) {
    return this.config.set(key, value);
  }

  // get config values under a given key.
  public get(key: string) {
    // if no key, return getAll.
    return key ? this.config.get(key) : this.all();
  }
}

/**
 * Alias export configuration nas 'config'
 *
 * @type {GlobalConfig}
 */
export const config = new GlobalConfig();

/**
 * @type {GlobalConfig}
 */
export default config;
