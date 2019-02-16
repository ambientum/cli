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

  // compose port constructor.
  public constructor(port: IComposePort) {
    this.hostPort = port.hostPort;
    this.containerPort = port.containerPort;
  }

  // serialize to docker-compose.
  public serialize() {
    return `${this.hostPort}:${this.containerPort}`;
  }
}
