// imports.
import { find, map } from 'lodash';
import { Command, CommandGroup, ArgsParser } from 'lib/support/console';
import { ConsoleApplicationOptions } from 'lib/support/console/types';

/**
 * Class ConsoleApplication.
 *
 * Handle getAll things console.
 */
export class ConsoleApplication {

  // static init method, for factoring the singleton.
  public static init(params?: ConsoleApplicationOptions) {
    // create an instance application instance.
    this.instance = new this(params);

    // complete by returning the instance.
    return this.getInstance();
  }

  // get app instance.
  public static getInstance(): ConsoleApplication {
    return this.instance;
  }

  // self instance reference.
  protected static instance: ConsoleApplication = null;

  // args parser instance.
  public argsParser: ArgsParser;

  // console app options.
  protected options: ConsoleApplicationOptions;

  // list of commands on the application.
  protected commands: Command[];

  // constructor.
  protected constructor(params?: ConsoleApplicationOptions) {
    // assign console app options.
    this.options = params;
    // assign ArgsParser instance.
    this.argsParser = new ArgsParser();
    // start empty commands array.
    this.commands = [];
  }

  // start method (parse args and dispatch commands).
  public start() {
    // get command name from args parser.
    const commandName = this.argsParser.commandName();

    // find the first command matching the current args.
    const command = this.findCommand(commandName || 'help');

    // check if command exists.
    if (command === undefined) {
      // if undefined...
    } else {
      // run with all command args.
      return command.run(...this.argsParser.commandArgs()); // .catch((e) => console.log("Error happened!"));
    }
  }

  // add a command.
  public addCommand(command: Command) {
    // push command instance on app commands list.
    this.commands.push(command);

    // return command itself to complete function.
    return command;
  }

  // add a list of commands on the console app.
  public addCommandGroup(group: CommandGroup) {
    // loop argument commands and add each one.
    return map(group.getCommands(), (cmd: Command) => this.addCommand(cmd));
  }

  // app commands getter.
  public getCommands(): Command[] { return this.commands; }

  // app slug getter.
  public slug() { return this.options.slug; }

  // app version getter.
  public version() { return this.options.version; }

  // find a command by it's name (or trigger name).
  public findCommand(name: string): Command {
    // find the first command matching the current args.
    return find(this.commands, (c: Command) => c.shouldTrigger(name));
  }
}
