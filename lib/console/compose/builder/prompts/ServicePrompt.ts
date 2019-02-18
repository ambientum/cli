// imports.
import { each, map, toNumber, first } from 'lodash';
import { Confirm, Form, Select } from 'enquirer/lib/prompts';
import { DockerComposeService } from 'lib/support/compose';
import { ComposeBuilder } from 'lib/console/compose/builder';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class ServicePrompt.
export abstract class ServicePrompt {
  // service / question name.
  public abstract name: string;
  // service slug (lowercase, normalized name).
  public abstract slug: string;
  // docker image name.
  public abstract image: string;
  // available tags (versions).
  public abstract tags: string[];
  // command to run.
  public command: string = null;
  // set as linkable (child service) or not.
  public linkable: boolean = true;

  // enabled by default status.
  public enabledByDefault: boolean = true;

  // port mappings.
  public ports: types.IPromptPort[] = [];
  // variables.
  public variables: types.IPromptVariable[] = [];
  // mount points
  public mountPoints: types.IPromptMount[] = [];
  // volumes.
  public volumes: types.IPromptVolume[] = [];

  // compose builder reference.
  protected builder: ComposeBuilder;

  // compose service instance.
  protected service: DockerComposeService;

  // constructor.
  public constructor(builder: ComposeBuilder) {
    // assign builder instance.
    this.builder = builder;
    // start and assign compose service instance.
    this.service = new DockerComposeService();
  }


  // ask input question.
  public async ask(): Promise<DockerComposeService> {
    // log an empty line to separate question prompts.
    console.log();

    // ask user if current service should be enabled or not.
    const enabled = await this.askEnabledQuestion();

    // stop if not enabled.
    if (enabled === false) {
      return null;
    }

    // set service name as prompt slug (safe string for compose service name).
    this.service.setName(this.slug);
    // set comment as being service descriptive name.
    this.service.setComment(this.name);
    // set service as linkable or not (linkable => child services | not linkable => app services).
    this.service.setLinkable(this.linkable);

    // ask tag selection question.
    const tag = this.tags.length > 1 ? await this.askTagQuestion() : first(this.tags);
    // set image name on service.
    this.service.setImage(`${this.image}:${tag}`);

    // ask form for user to edit variables.
    const variables = await this.askVariablesQuestion();
    // loop through variable values, adding on service.
    each(variables, (value, name) => this.service.addVariable({ value, name }));

    // ask user to edit port mappings.
    const ports = await this.askPortMappingsQuestion();

    // loop through mappings, adding on service.
    each(ports, (publishedPort, targetPort) => {
      // cast ports to number.
      const target = toNumber(targetPort);
      const published = toNumber(publishedPort);

      // only add if host port is bigger than 1.
      if (published > 1) {
        this.service.addPortMapping({ target, published });
      }
    });

    // loop through mount points, adding on service.
    each(this.mountPoints, (v: types.IPromptMount) => this.service.addMountPoint(v));

    // loop through volumes, adding on service.
    each(this.volumes, (v: types.IPromptVolume) => this.service.addVolume(v));

    // when the command is not null.
    if (this.command !== null) {
      this.service.setCommand({ command: this.command });
    }

    // return build service.
    return this.service;
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
      message: '➜ Select a version:',
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
      message: `➜ Configure ${this.name} variables:`,
      choices: map(this.variables, (v: types.IPromptVariable) => {
        return {
          name: v.name,
          message: v.description,
          initial: ((v.initial === 'project') ? this.builder.project : v.initial),
        };
      }),
    })).run();
  }

  // ask form to allow edit on port mappings.
  protected askPortMappingsQuestion() {
    // avoid if no ports need to be set.
    if (this.ports.length === 0) {
      return null;
    }

    // ask ports form.
    return (new Form({
      name: `${this.slug}.ports`,
      message: `➜ Map ${this.name} ports on Host:`,
      choices: map(this.ports, (v: types.IPromptPort) => {
        return {
          name: v.port,
          message: `${v.name} (${v.port})`,
          initial: v.port,
        };
      }),
    })).run();
  }
}
