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
}

// default export.
export default ComposeVolume;
