// import docker client.
import Dockerode from 'dockerode';
import docker from './docker';

// interface for DockerVolume constructor.
interface IDockerVolumeOptions {
  name: string;
  mountPath: string;
  readOnly?: boolean;
}

// DockerVolume class definition.
export class DockerVolume {
  // dockerode instance.
  public docker: Dockerode;
  // volume options.
  public options: IDockerVolumeOptions;

  // DockerVolume constructor.
  public constructor(options: IDockerVolumeOptions) {
    // assign Dockerode instance.
    this.docker = docker;
    // assign volume options.
    this.options = options;
  }

  // get dockerode volume instance.
  public instance() {
    return docker.getVolume(this.options.name);
  }

  // check volume exists.
  public async exists() {
    return await this.instance().inspect()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.reject(false));
  }

  // create the volume.
  public create() {
    return this.docker.createVolume(this.options.name);
  }

  // generate mount point.
  public mountPoint() {
    return {
      Type: 'volume',            // mount as volume.
      Source: this.options.name,         // use volume name as source.
      Target: this.options.mountPath,    // use provided path as target.
      ReadyOnly: this.isReadyOnly(),  // set write permission.
    };
  }

  // determine read-only option value.
  public isReadyOnly() {
    return ((this.options.readOnly === undefined) ? false : this.options.readOnly);
  }

  // name getter.
  public getName() {
    return this.options.name;
  }
}

