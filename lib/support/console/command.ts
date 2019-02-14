// import ConsoleApplication class.
import { GlobalConfig } from "../config";
import { ConsoleApplication } from "./application";
import { CommandHelp } from "./helpers/command-help";

/**
 * Class Command: Base implementation for console commands.
 */
export abstract class Command {
  // command name.
  public abstract signature: string;
  // command description.
  public abstract description: string;
  // list if names that triggers the command.
  public abstract triggers: string[];

  // console app instance.
  protected app: ConsoleApplication;
  // global config instance.
  protected config: GlobalConfig;

  // command constructor.
  public constructor() {
    // assign app instance from ConsoleApplication singleton.
    this.app = ConsoleApplication.getInstance();
    // assign a config object for global config access inside commands.
    this.config = new GlobalConfig({
      node: { image: "ambientum/node", tag: "10" },
      php: { image: "ambientum/php", tag: "7.2" },
    });
  }

  // help text for the command.
  public abstract getCommandHelp(): CommandHelp;

  // abstract run method.
  public abstract async run(...args);

  // if command should be triggered.
  public shouldTrigger(candidate: string) {
    return this.triggers.indexOf(candidate) !== -1;
  }

  // return command signature.
  public getSignature() {
    return this.signature;
  }

  // return command description.
  public getDescription() {
    return this.description;
  }

  // return command triggers.
  public getTriggers() {
    return this.triggers;
  }
}
