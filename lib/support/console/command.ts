// import ConsoleApplication class.
import { GlobalConfig } from '../config';
import { ConsoleApplication } from './application';

// interface for usage lines.
export interface UsageExample {
  // usage example.
  command: string;
  // usage description.
  description: string;
}

/**
 * Class Command: Base implementation for console commands.
 */
export abstract class Command {
  // command name (used for help mainly).
  public abstract name: string;
  // command description (used for help mainly).
  public abstract description: string;

  // list if names that triggers the command.
  // when the first word of provided args matches one of the values
  // on this variable, it will determine the command as a match and run.
  public abstract triggers: string[];

  // command usage examples.
  public abstract usage: UsageExample[];

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
      node: { image: 'ambientum/node', tag: '10' },
      php: { image: 'ambientum/php', tag: '7.3' },
    });
  }

  // abstract run method.
  public abstract async run(...args);

  // if command should be triggered.
  public shouldTrigger(candidate: string) {
    return this.triggers.indexOf(candidate) !== -1;
  }

  // return command name.
  public getName() {
    return this.name;
  }

  // return command description.
  public getDescription() {
    return this.description;
  }

  // return command triggers.
  public getTriggers() {
    return this.triggers;
  }

  // return command usage examples.
  public getUsage(): UsageExample[] {
    return this.usage;
  }
}
