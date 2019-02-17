// import base command.
import { Select } from "enquirer/lib/prompts";
import { Command } from "lib/support/console/command";
import { map, mapKeys, mapValues } from "lodash";
import { run } from "lib/support/docker";
import { DockerVolume } from "lib/support/docker/volume";

/**
 * Class ConfigCommand.
 *
 * This command handled global configuration.
 */
export abstract class RunnerCommand extends Command {
  // list of runner volumes to be created and mounted.
  protected runnerVolumes: DockerVolume[] = [
    new DockerVolume({name: "ambientum-cache", mountPath: "/home/ambientum/.cache"}),
    new DockerVolume({name: "ambientum-config", mountPath: "/home/ambientum/.config"}),
    new DockerVolume({name: "ambientum-local", mountPath: "/home/ambientum/.local"}),
    new DockerVolume({name: "ambientum-ssh", mountPath: "/home/ambientum/.ssh"}),
    new DockerVolume({name: "ambientum-composer", mountPath: "/home/ambientum/.composer"}),
  ];

  // fire config command.
  public async run(...args) {
    // get command name from args parser.
    const commandName = this.app.argsParser.commandName();

    // determine image name.
    const imageType = ((["-p", "php"].indexOf(commandName)) !== -1) ? "php" : "node";
    // get image config.
    const imageConfig = this.config.get(imageType);
    // build image name from stored config.
    const imageName = `${imageConfig.image}:${imageConfig.tag}`;

    // await all volumes to be created.
    await Promise.all(this.createVolumes());
    // build options object for running.
    const options = this.buildRunOptions();

    // run php container.
    return run(imageName, this.app.argsParser.commandArgs(), options);
  }

  protected createVolumes() {
    // create all volumes.
    return map(this.runnerVolumes, (v: DockerVolume) => (v.create()));
  }

  // create the mount points for each volume.s
  protected getMountPoints() {
    // build mount points from runner volumes.
    const mountPoints = map(this.runnerVolumes, (v: DockerVolume) => v.mountPoint());
    // map current director to /var/www/app path inside container.
    mountPoints.push({ Target: "/var/www/app", Source: process.cwd(), Type: "bind", ReadyOnly: false });

    // return all mounts list.
    return mountPoints;
  }

  // mount a volumes object where each volume name is the key and the value is an empty object.
  protected getVolumesList() {
    return mapValues(mapKeys(this.runnerVolumes, (v: DockerVolume) => v.getName()), () => ({}));
  }

  // build the docker run options object.
  protected buildRunOptions() {
    return {
      Volumes: this.getVolumesList(),
      HostConfig: {
        Mounts: this.getMountPoints(),
        AutoRemove: true,
      },
    };
  }
}
