// import lodash helpers.
import { find, filter, map, merge } from 'lodash';
// import YAML builder.
import { YAMLBuilder } from './yaml/builder';
// import compose service class.
import { ComposeService } from './service';
// import compose volume class.
import { ComposeVolume } from './volume';

/**
 * Class DockerCompose.
 *
 * Main docker-compose handler.
 */
export class DockerCompose {
  // compose project name.
  protected project: string;

  // docker-compose syntax version.
  protected version: string;

  // list of compose project volumes.
  protected volumes: ComposeVolume[] = [];

  // list of compose project services.
  protected services: ComposeService[] = [];

  // constructor.
  public constructor(project: string, version: string = '3.6') {
    // assign project name.
    this.project = project;
    // assign compose version.
    this.version = version;
  }

  // set compose project name.
  public setProject(name: string) {
    this.project = name;
  }

  // get compose project name.
  public getProject(): string | null {
    return this.project;
  }

  // set compose syntax version.
  public setVersion(version: string = '3.6') {
    this.version = version;
  }

  // get compose syntax version.
  public getVersion(): string | null {
    return this.version;
  }

  // check if a given volume name already exists.
  public hasVolume(name: string): boolean {
    // find the first volume matching a given name.
    const findResult = find(this.volumes, (v: ComposeVolume) => {
      return v.name === name;
    });

    // if not undefined, volume already present.
    return findResult !== undefined;
  }

  // add a volume into current compose project.
  public addVolume(volume: ComposeVolume) {
    // add volume, if no other with the same name exists.
    if (!this.hasVolume(volume.name)) {
      // push volume into volumes array.
      this.volumes.push(new ComposeVolume(volume));
    }

    // fluent return.
    return this;
  }

  // add a service into current compose project.
  public addService(service: ComposeService = null) {
    // just return when service is null.
    if (service === null) {
      return this;
    }
    // push service into volumes array.
    this.services.push(service);
    // add service volumes into compose.
    service.volumes.forEach((v) => this.addVolume(v));
    // fluent return.
    return this;
  }

  // get a list of services that are linkable.
  public getLinkableService(): ComposeService[] {
    return filter(this.services, (s: ComposeService) => s.linkable);
  }

  public toComposeObject() {
    // compose volumes.
    const volumes = map(this.volumes, (v: ComposeVolume) => v.serialize());
    // compose services.
    const services = map(this.services, (s: ComposeService) => s.serialize(this.getLinkableService()));
    console.log(services);
    // return YAML instance.
    return new YAMLBuilder({
      // docker-compose.yml header.
      header: this.project,
      // compose syntax version.
      version: this.version,
      // services list.
      services,
      // volumes list.
      volumes,
    });
  }
}
