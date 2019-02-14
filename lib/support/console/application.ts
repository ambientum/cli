// import lodash helpers.
import { find, map } from "lodash";
// import Command class.
import { Command } from "./command";
// import CommandGroup class.
import { CommandGroup } from "./group";
// import ArgsParser class.
import { ArgsParser } from "./helpers/args-parser";

// interface for console kernel options.
interface IConsoleApplicationOptions {
  title: string;
  slug: string;
  version: string;
}

/**
 * Class ConsoleApplication.
 *
 * Handle getAll things console.
 */
export class ConsoleApplication {

  // static init method, for factoring the singleton.
  public static init(params?: IConsoleApplicationOptions) {
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
  protected options: IConsoleApplicationOptions;

  // list of commands on the application.
  protected commands: Command[];

  // constructor.
  protected constructor(params?: IConsoleApplicationOptions) {
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
    const command = this.findCommand(commandName);

    // check if command exists.
    if (command === undefined) {
      // if undefined...
    } else {
      // run with all command args.
      return command.run(...this.argsParser.commandArgs());
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

  // app title getter.
  public title() { return this.options.title; }

  // app slug getter.
  public slug() { return this.options.slug; }

  // app version getter.
  public version() { return this.options.version; }

  // current action.
  public requestedCommand() { return (this.argsParser.getFirst(0)); }

  // find a command by it's name (or trigger name).
  public findCommand(name: string): Command {
    // find the first command matching the current args.
    return find(this.commands, (c: Command) => c.shouldTrigger(name));
  }
}
