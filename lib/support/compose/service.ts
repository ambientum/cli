// import lodash helpers.
import { set, map, get } from "lodash";
// import service resource classes.
import { ComposeLink, ComposeMount, ComposePort, ComposeVariable, ComposeVolume } from "./resources";


/**
 * Class ComposeService.
 */
export class ComposeService {
  // service name.
  protected name: string;
  // service image.
  protected image: string;

  // service command.
  protected command: string = null;

  // list of mount points.
  protected mountPoints: ComposeMount[] = [];

  // list of port mappings.
  protected portMappings: ComposePort[] = [];

  // list of links to another services.
  protected links: ComposeLink[] = [];

  // list of variables.
  protected variables: ComposeVariable[] = [];

  // list of volumes.
  protected volumes: ComposeVolume[] = [];

  // linkable or not.
  protected linkable: boolean = false;

  // set service name.
  public setName(name: string): ComposeService {
    // set name.
    this.name = name;
    // fluent return.
    return this;
  }

  // get service name.
  public getName() {
    return this.name;
  }

  // set service image.
  public setImage(image: string): ComposeService {
    // set image.
    this.image = image;
    // fluent return.
    return this;
  }

  // get service image.
  public getImage() {
    return this.image;
  }

  // set service command.
  public setCommand(command: string): ComposeService {
    // set command.
    this.command = command;
    // fluent return.
    return this;
  }

  // get service command.
  public getCommand() {
    return this.command;
  }

  // add mount point.
  public addMountPoint(mountPoint: ComposeMount): ComposeService {
    // push into mounts array.
    this.mountPoints.push(new ComposeMount(mountPoint));
    // fluent return.
    return this;
  }

  // get service mount points.
  public getMountPoints(): ComposeMount[] {
    return this.mountPoints;
  }

  // add port mapping.
  public addPortMapping(portMapping: ComposePort): ComposeService {
    // push into mappings array.
    this.portMappings.push(new ComposePort(portMapping));
    // fluent return.
    return this;
  }

  // get service port mappings.
  public getPortMappings(): ComposePort[] {
    return this.portMappings;
  }

  // add service link.
  public addLink(link: ComposeLink): ComposeService {
    // push into links array.
    this.links.push(new ComposeLink(link));
    // fluent return.
    return this;
  }

  // get service links.
  public getLinks(): ComposeLink[] {
    return this.links;
  }

  // add service variable.
  public addVariable(variable: ComposeVariable): ComposeService {
    // push into variables array.
    this.variables.push(new ComposeVariable(variable));
    // fluent return.
    return this;
  }

  // get service variables.
  public getVariables(): ComposeVariable[] {
    return this.variables;
  }

  // add service volume.
  public addVolume(volume: ComposeVolume): ComposeService {
    // push into volumes array.
    this.volumes.push(new ComposeVolume(volume));
    // fluent return.
    return this;
  }

  // get service volumes.
  public getVolumes(): ComposeVolume[] {
    return this.volumes;
  }

  // set as linkable or not.
  public setLinkable(linkable: boolean): ComposeService {
    // assign linkable status.
    this.linkable = linkable;
    // fluent return.
    return this;
  }

  // get linkable status.
  public isLinkable(): boolean {
    return this.linkable;
  }

  // return the service compose object.
  public toComposeObject(linkableServices: ComposeService[]): object {
    // start service config.
    const service = {
      image: this.getImage(), // service image.
    };

    // when there are mount points.
    if (this.getMountPoints().length > 0) {
      set(service, "volumes", map(this.getMountPoints(), (m: ComposeMount) => {
        return `${m.source}:${m.target}`;
      }));
    }

    // when service command is not null (not default command).
    if (this.getCommand() !== null) {
      // set command key with array consisting of split by space values of command string.
      set(service, "command", this.getCommand().split(" "));
    }

    // when there are variables to be set.
    if (this.getVariables().length > 0) {
      set(service, "environment", map(this.getVariables(), (v) => v.serialize()));
    }
    // when there are port mappings to be set.
    if (this.getPortMappings().length > 0) {
      set(service, "ports", map(this.getPortMappings(), (p) => p.serialize()));
    }

    // non linkable services should link to all linkable ones.
    if ((this.isLinkable() === false) && linkableServices.length > 0) {
      set(service, "links", map(linkableServices, (s: ComposeService) => {
        return s.getName();
      }));
    }
    console.log(this);
    // return docker-compose service object.
    return service;
  }
}
