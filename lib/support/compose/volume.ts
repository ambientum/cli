// import lodash helpers.
import { set } from "lodash";

/**
 * Interface IComposeVolume.
 */
export interface IComposeVolume {
  // volume name.
  name: string;
  // volume driver.
  driver: string;
}

/**
 * Class ComposeVolume.
 */
export class ComposeVolume implements IComposeVolume {
  // volume name.
  public name: string;
  // volume driver.
  public driver: string;

  // constructor.
  public constructor(options: IComposeVolume) {
    // assign values.
    this.name = options.name;
    this.driver = options.driver;
  }

  // serialize to compose-specific.
  public serialize() {
    return set({}, this.name, { driver: this.driver || "local" });
  }
}

// default export.
export default ComposeVolume;
