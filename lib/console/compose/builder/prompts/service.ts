// import base prompts.
import { Confirm, Form, Select } from "enquirer/lib/prompts";
import { ComposeService } from "lib/support/compose";
import { each, map, toNumber } from "lodash";
import { ComposeBuilder } from "../builder";

/**
 * Interface IPromptPort.
 */
export interface IPromptPort {
  name: string;
  port: string;
}

/**
 * Interface IPromptVariable.
 */
export interface IPromptVariable {
  name: string;
  description: string;
  initial: string;
}

/**
 * Interface IPromptMount.
 */
export interface IPromptMount {
  source: string;
  target: string;
}

/**
 * Interface IPromptVolume.
 */
export interface IPromptVolume {
  name: string;
  driver: string;
}

/**
 * Class BuilderServicePrompt.
 */
export abstract class ServicePrompt {
  // service / question name.
  public abstract name: string;
  // service slug (lowercase, normalized name).
  public abstract slug: string;
  // docker image name.
  public abstract image: string;

  // available tags (versions).
  public abstract tags: string[];

  // enabled by default status.
  public abstract enabledByDefault: boolean;


  // port mappings.
  public abstract ports: IPromptPort[];
  // variables.
  public abstract variables: IPromptVariable[];
  // mount points
  public abstract mountPoints: IPromptMount[];
  // volumes.
  public abstract volumes: IPromptVolume[];

  // compose builder reference.
  protected builder: ComposeBuilder;

  // compose service instance.
  protected service: ComposeService;

  // constructor.
  public constructor(builder: ComposeBuilder) {
    // assign builder instance.
    this.builder = builder;
    // start and assign compose service instance.
    this.service = new ComposeService();
  }


  // ask input question.
  public async ask() {
    // ask user if current service should be enabled or not.
    const enabled = await this.askEnabledQuestion();

    // stop if not enabled.
    if (enabled === false) {
      return null;
    }

    // set service name as prompt slug (safe string for compose service name).
    this.service.setName(this.slug);

    // ask tag selection question.
    const tag = await this.askTagQuestion();
    // set image name on service.
    this.service.setImage(`${this.image}:${tag}`);

    // ask form for user to edit variables.
    const variables = await this.askVariablesQuestion();
    // loop through variable values, adding on service.
    each(variables, (value, name) => this.service.addVariable({ value, name }));

    // ask user to edit port mappings.
    const ports = await this.askPortMappingsQuestion();
    // loop through mappings, adding on service.
    each(ports, (hostPortString, containerPortString) => {
      // make host and container port numbers.
      const hostPort = toNumber(hostPortString);
      const containerPort = toNumber(containerPortString);
      // only add if host port is bigger than 1.
      if (toNumber(hostPort) > 1) {
        this.service.addPortMapping({ hostPort, containerPort });
      }
    });

    // loop through mount points, adding on service.
    each(this.mountPoints, (v: IPromptMount) => this.service.addMountPoint(v));

    // loop through volumes, adding on service.
    each(this.volumes, (v: IPromptVolume) => this.service.addVolume(v));

    console.log(this.service);

    return this.service;
    // return { slug: this.slug, name: this.name, enabled, image: this.image, tag, variables, ports };
  }

  // ask enabled / disabled question.
  protected askEnabledQuestion() {
    return new Confirm({
      name: `${this.slug}.enabled`,
      message: `Enable ${this.name}?`,
      initial: this.enabledByDefault,
    }).run();
  }

  // select tag question.
  protected askTagQuestion() {
    return (new Select({
      name: `${this.slug}.tag`,
      message: "Select a version:",
      choices: this.tags,
    })).run();
  }

  // ask a form question for user to fill variables.
  protected askVariablesQuestion() {
    // avoid if no env var is available for the current service.
    if (this.variables.length === 0) {
      return null;
    }

    // when there are env vars to be parsed...
    return (new Form({
      name: `${this.slug}.variables`,
      message: `Configure ${this.name} variables`,
      choices: map(this.variables, (v: IPromptVariable) => {
        return {
          name: v.name,
          message: v.description,
          initial: ((v.initial === "project") ? this.builder.project : v.initial),
        };
      }),
    })).run();
  }

  // ask form to allow edit on port mappings.
  protected askPortMappingsQuestion() {
    return (new Form({
      name: `${this.slug}.ports`,
      message: `Map ${this.name} ports on Host`,
      choices: map(this.ports, (v: IPromptPort) => {
        return {
          name: v.port,
          message: `${v.name}`,
          initial: v.port,
        };
      }),
    })).run();
  }
}
