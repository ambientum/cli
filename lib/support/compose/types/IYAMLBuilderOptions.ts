import { DockerComposeService, DockerComposeVolume } from 'lib/support/compose';

/**
 * Interface IYAMLBuilderOptions.
 */
export interface IYAMLBuilderOptions {
  // header message.
  header: string;
  // syntax version number.
  version: string;
  // list of compose services.
  services: DockerComposeService[];
  // list of compose volumes.
  volumes?: DockerComposeVolume[];
  // list of networks.
  networks?: object[];
}
