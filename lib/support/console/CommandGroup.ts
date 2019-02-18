// import console classes.
import { ConsoleApplication, Command } from 'lib/support/console';

/**
 * Class CommandGroup: Simple grouper for commands..
 */
export class CommandGroup {
  // console app instance.
  public app: ConsoleApplication;

  // group commands.
  protected commands: Command[];

  // command constructor.
  public constructor(commands?: Command[]) {
    // assign app instance from ConsoleApplication singleton.
    this.app = ConsoleApplication.getInstance();
    // assign group commands.
    this.commands = commands;
  }

  // get commands on the group.
  public getCommands(): Command[] { return this.commands; }
}
