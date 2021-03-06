// imports.
import { IComposeVolume } from 'lib/support/compose/types';

/**
 * Class DockerComposeVolume.
 */
export class DockerComposeVolume implements IComposeVolume {
  // volume name.
  public name: string;
  // volume driver.
  public driver: string;
  // comment for the volume.
  public comment: string;

  // constructor.
  public constructor(options: IComposeVolume) {
    // assign values.
    this.name = options.name;
    this.driver = options.driver;
    this.comment = options.comment || null;
  }

  // serialize to compose-specific.
  public serialize() {
    // create a volume variable.
    const volume = { driver: this.driver || 'local' };

    // return docker-compose volume object.
    return { 'name': this.name, 'x-comment': this.comment, 'data': volume };
  }
}
