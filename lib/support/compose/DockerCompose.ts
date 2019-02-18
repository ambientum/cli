// imports.
import { DockerComposeService, DockerComposeVolume } from 'lib/support/compose';
import { find, filter, each } from 'lodash';
import { YAMLBuilder } from 'lib/support/compose/yaml';

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
  protected volumes: DockerComposeVolume[] = [];

  // list of compose project services.
  protected services: DockerComposeService[] = [];

  // name of service that are "linkable".
  protected links: string[];

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
    const findResult = find(this.volumes, (v: DockerComposeVolume) => {
      return v.name === name;
    });

    // if not undefined, volume already present.
    return findResult !== undefined;
  }

  // add a volume into current compose project.
  public addVolume(volume: DockerComposeVolume) {
    // add volume, if no other with the same name exists.
    if (!this.hasVolume(volume.name)) {
      // push volume into volumes array.
      this.volumes.push(new DockerComposeVolume(volume));
    }

    // fluent return.
    return this;
  }

  // add a service into current compose project.
  public addService(service: DockerComposeService = null) {
    // just return when service is null.
    if (service === null) {
      return this;
    }
    // push service into volumes array.
    this.services.push(service);

    // add service volumes into compose.
    service.volumes.forEach((v) => this.addVolume(v));

    // update links after adding the service.
    this.updateLinks();

    // fluent return.
    return this;
  }

  public updateLinks() {
    // get all non linkable services.
    const childServices = filter(this.services, (s: DockerComposeService) => s.linkable);
    // get all linkable service
    const rootServices = filter(this.services, (s: DockerComposeService) => !s.linkable);

    // each root service.
    each(rootServices, (root: DockerComposeService) => {
      // add each child service as link.
      each(childServices, (child: DockerComposeService) => {
        root.addLink({ service: child.name });
      });
    });
  }

  public serialize() {
    // return YAML instance.
    return new YAMLBuilder({
      // docker-compose.yml header.
      header: this.project,
      // compose syntax version.
      version: this.version,
      // services list.
      services: this.services,
      // volumes list.
      volumes: this.volumes,
    });
  }
}
