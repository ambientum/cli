// imports.
import Configstore from 'configstore';
import { slug } from 'package.json';

// Class GlobalConfig.
export class GlobalConfig {
  // home config instance.
  protected config: Configstore;

  // GlobalConfig constructor.
  public constructor(initialValues: object = {}) {
    // start home config instance, passing
    this.config = new Configstore(slug, initialValues);
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
