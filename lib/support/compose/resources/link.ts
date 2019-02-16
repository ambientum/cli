/**
 * Interface IComposeLink.
 */
export interface IComposeLink {
  // name of the service to link.
  service: string;
}

/**
 * Class Compose Link.
 */
export class ComposeLink implements IComposeLink {
  // name of the service to link.
  public service: string;

  // constructor.
  public constructor(options: IComposeLink) {
    // assign values.
    this.service = options.service;
  }
}

// default export.
export default ComposeLink;
