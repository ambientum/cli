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
}

// default export.
export default ComposeLink;
