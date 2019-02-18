// import lodash helpers.
import { pickBy } from 'lodash';

/**
 * Interface IComposePort.
 */
export interface IComposePort {
  // container port.
  target: number;
  // published port.
  published: number;
  // protocol (tcp|udp).
  protocol?: string;
  // mode (host|ingress)
  mode?: string;
}

/**
 * Class ComposePort.
 */
export class ComposePort implements IComposePort {

  // container port.
  public target: number;
  // published port (on host or ingress).
  public published: number;
  // protocol [TCP|UDP].
  public protocol: string = null;
  // operation mode [host|ingress] (ingress is swarm only).
  public mode: string = null;

  // compose port constructor.
  public constructor(port: IComposePort) {
    // target container port.
    this.target = port.target;
    // published port (on host or on swarm ingress network).
    this.published = port.published;
    // optional protocol.
    this.protocol = port.protocol || null;
    // optional mode.
    this.mode = port.mode || null;
  }

  // serialize to docker-compose.
  public serialize() {
    return pickBy({
      target: this.target,
      published: this.published,
      protocol: this.protocol,
      model: this.mode,
    }, (v) => (v !== null && v !== undefined));
  }
}
