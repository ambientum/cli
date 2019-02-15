// import lodash helpers.
import { set, map, get } from "lodash";
// import interfaces from module.
import { IComposeLink, IComposeMount, IComposePort, IComposeVariable, IComposeVolume } from "./index";

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
  protected mountPoints: IComposeMount[] = [];

  // list of port mappings.
  protected portMappings: IComposePort[] = [];

  // list of links to another services.
  protected links: IComposeLink[] = [];

  // list of variables.
  protected variables: IComposeVariable[] = [];

  // list of volumes.
  protected volumes: IComposeVolume[] = [];

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
  public addMountPoint(mountPoint: IComposeMount): ComposeService {
    // push into mounts array.
    this.mountPoints.push(mountPoint);
    // fluent return.
    return this;
  }

  // get service mount points.
  public getMountPoints(): IComposeMount[] {
    return this.mountPoints;
  }

  // add port mapping.
  public addPortMapping(portMapping: IComposePort): ComposeService {
    // push into mappings array.
    this.portMappings.push(portMapping);
    // fluent return.
    return this;
  }

  // get service port mappings.
  public getPortMappings(): IComposePort[] {
    return this.portMappings;
  }

  // add service link.
  public addLink(link: IComposeLink): ComposeService {
    // push into links array.
    this.links.push(link);
    // fluent return.
    return this;
  }

  // get service links.
  public getLinks(): IComposeLink[] {
    return this.links;
  }

  // add service variable.
  public addVariable(variable: IComposeVariable): ComposeService {
    // push into variables array.
    this.variables.push(variable);
    // fluent return.
    return this;
  }

  // get service variables.
  public getVariables(): IComposeVariable[] {
    return this.variables;
  }

  // add service volume.
  public addVolume(volume: IComposeVolume): ComposeService {
    // push into volumes array.
    this.volumes.push(volume);
    // fluent return.
    return this;
  }

  // get service volumes.
  public getVolumes(): IComposeVolume[] {
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
      set(service, "volumes", map(this.getMountPoints(), (m: IComposeMount) => {
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
      set(service, "environment", map(this.getVariables(), (v: IComposeVariable) => {
        return `${v.name}=${v.value}`;
      }));
    }
    // when there are port mappings to be set.
    if (this.getPortMappings().length > 0) {
      set(service, "ports", map(this.getPortMappings(), (p: IComposePort) => {
        return `${p.hostPort}:${p.containerPort}`;
      }));
    }

    // non linkable services should link to all linkable ones.
    if ((this.isLinkable() === false) && linkableServices.length > 0) {
      set(service, "links", map(linkableServices, (s: ComposeService) => {
        return s.getName();
      }));
    }

    // return docker-compose service object.
    return service;
  }
}
