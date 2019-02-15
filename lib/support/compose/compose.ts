// import lodash helpers.
import { find, keyBy, map, filter, mapValues } from "lodash";
import YAML from "yaml";
import { IComposeVolume } from "./index";
// import child classes.
import { ComposeService } from "./service";

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
  protected volumes: IComposeVolume[] = [];

  // list of compose project services.
  protected services: ComposeService[] = [];

  // constructor.
  public constructor(project: string, version: string = "3.6") {
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
  public getProject(): string|null {
    return this.project;
  }

  // set compose syntax version.
  public setVersion(version: string = "3.6") {
    this.version = version;
  }

  // get compose syntax version.
  public getVersion(): string|null {
    return this.version;
  }

  // check if a given volume name already exists.
  public hasVolume(name: string): boolean {
    // find the first volume matching a given name.
    const findResult = find(this.volumes, (v: IComposeVolume) => {
      return v.name === name;
    });

    // if not undefined, volume already present.
    return findResult !== undefined;
  }

  // add a volume into current compose project.
  public addVolume(volume: IComposeVolume) {
    // add volume, if no other with the same name exists.
    if (!this.hasVolume(volume.name)) {
      // push volume into volumes array.
      this.volumes.push(volume);
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
    service.getVolumes().forEach((v) => this.addVolume(v));
    // fluent return.
    return this;
  }

  // get a list of services that are linkable.
  public getLinkableService(): ComposeService[] {
    return filter(this.services, (s: ComposeService) => s.isLinkable());
  }

  public toComposeObject() {
    const version = this.version;
    const volumes = mapValues(keyBy(this.volumes, "name"), (v: IComposeVolume) => {
      return { driver: v.driver || "local" };
    });
    const services = mapValues(keyBy(this.services, "name"), (s: ComposeService) => {
      return s.toComposeObject(this.getLinkableService());
    });
    console.log(YAML.stringify({
      version,
      volumes,
      services,
    }));
  }
}
