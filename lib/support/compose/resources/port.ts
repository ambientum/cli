/**
 * Interface IComposePort.
 */
export interface IComposePort {
  // host port.
  hostPort: number;
  // container port.
  containerPort: number;
}

/**
 * Class ComposePort.
 */
export class ComposePort implements IComposePort {
  // host port.
  public hostPort: number;
  // container port.
  public containerPort: number;
}
