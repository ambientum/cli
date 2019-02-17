// import lodash helpers.
import { set, map } from 'lodash';
// import service resource classes.
import * as res from './resources';
// import volume classes.
import { ComposeVolume, IComposeVolume } from './volume';

/**
 * Class ComposeService.
 */
export class ComposeService {
  // service name.
  public name: string;
  // service image.
  public image: string;

  // comment for the final YAML file.
  public comment: string = null;

  // service command.
  public command: res.ComposeCommand = null;

  // list of mount points.
  public mountPoints: res.ComposeMount[] = [];

  // list of port mappings.
  public portMappings: res.ComposePort[] = [];

  // list of links to another services.
  public links: res.ComposeLink[] = [];

  // list of variables.
  public variables: res.ComposeVariable[] = [];

  // list of volumes.
  public volumes: ComposeVolume[] = [];

  // linkable or not.
  public linkable: boolean = false;

  // set service name.
  public setName(name: string) {
    // set name.
    this.name = name;
  }

  // set service image.
  public setImage(image: string) {
    // set image.
    this.image = image;
  }

  // set service image.
  public setComment(comment: string) {
    // set image.
    this.comment = comment;
  }

  // set service command.
  public setCommand(command: res.IComposeCommand) {
    // set command.
    this.command = new res.ComposeCommand(command);
  }

  // add mount point.
  public addMountPoint(mountPoint: res.IComposeMount) {
    // push into mounts array.
    this.mountPoints.push(new res.ComposeMount(mountPoint));
  }

  // add port mapping.
  public addPortMapping(portMapping: res.IComposePort) {
    // push into mappings array.
    this.portMappings.push(new res.ComposePort(portMapping));
  }

  // add service link.
  public addLink(link: res.IComposeLink): ComposeService {
    // push into links array.
    this.links.push(new res.ComposeLink(link));
    // fluent return.
    return this;
  }

  // add service variable.
  public addVariable(variable: res.IComposeVariable): ComposeService {
    // push into variables array.
    this.variables.push(new res.ComposeVariable(variable));
    // fluent return.
    return this;
  }

  // add service volume.
  public addVolume(volume: IComposeVolume): ComposeService {
    // push into volumes array.
    this.volumes.push(new ComposeVolume(volume));
    // fluent return.
    return this;
  }

  // set as linkable or not.
  public setLinkable(linkable: boolean): ComposeService {
    // assign linkable status.
    this.linkable = linkable;
    // fluent return.
    return this;
  }

  // return the service compose object.
  public serialize(linkableServices: ComposeService[]): object {
    // start service object.
    const service = {
      image: this.image, // service image.
    };

    // when there are mount points.
    if (this.mountPoints.length > 0) {
      set(service, 'volumes', map(this.mountPoints, (m: res.ComposeMount) => m.serialize()));
    }

    // when service command is not null (not default command).
    if (this.command !== null) {
      // set command key with array consisting of split by space values of command string.
      set(service, 'command', this.command.serialize());
    }

    // when there are variables to be set.
    if (this.variables.length > 0) {
      set(service, 'environment', map(this.variables, (v) => v.serialize()));
    }
    // when there are port mappings to be set.
    if (this.portMappings.length > 0) {
      set(service, 'ports', map(this.portMappings, (p) => p.serialize()));
    }

    // non linkable services should link to all linkable ones.
    if ((this.linkable === false) && linkableServices.length > 0) {
      set(service, 'links', map(linkableServices, (s: ComposeService) => {
        return s.name;
      }));
    }

    // return docker-compose service object.
    return { 'name': this.name, 'x-comment': this.comment, 'data': service };
  }
}
