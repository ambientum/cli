export { DockerCompose } from "./compose";
export { ComposeService } from "./service";

/**
 * Interface IComposeLink.
 */
export interface IComposeLink {
  // name of the service to link.
  service: string;
}

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
 * Interface IComposeVariable.
 */
export interface IComposeVariable {
  // variable name.
  name: string;
  // variable value.
  value: string;
}

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
 * Interface IComposeVolume.
 */
export interface IComposeVolume {
  // volume name.
  name: string;
  // volume driver.
  driver: string;
}
