/**
 * Interface IComposeMount.
 */
export interface IComposeMount {
  // volume name or host path.
  source: string;
  // path on container to mount.
  target: string;
}

/**
 * Class ComposeMount.
 */
export class ComposeMount implements IComposeMount {
  // volume name or host path.
  public source: string;
  // path on container to mount.
  public target: string;
}

// default export.
export default ComposeMount;
