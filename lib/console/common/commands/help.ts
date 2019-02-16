// import chalk for output colors.
import chalk from "chalk";
// import lodash helpers.
import { each, reduce, map, max } from "lodash";
// import base command class.
import { Command } from "lib/support/console/command";
import { CommandHelp } from "lib/support/console/helpers/command-help";

/**
 * Class HelpCommand.
 *
 * Display help information.
 */
export class HelpCommand extends Command {
  // command name.
  public name: string = "help";
  // command description.
  public description: string = "Display help info for a command.";
  // command triggers.
  public triggers: string[] = [ "help", "-h" ];

  // command help.
  public getCommandHelp(): CommandHelp {
    return new CommandHelp({
      name: "help",
      triggers: this.triggers,
      description: this.description,
      usage: [],
    });
  }

  // fire config command.
  public run(name: string = null) {
    // check if name is present...
    if (name === null) {
      // display main help when no command name was provided.
      this.displayMainHelp();
    } else {
      // display specific command help.
      this.displayCommandHelp(name);
    }
  }

  // display main app help info.
  protected displayMainHelp() {
    // display help banner.
    this.displayBanner();

    // get all commands from console app.
    const commands = this.app.getCommands();
    // determine command name pad length, to make it into a nice :) table.
    const padLength = this.commandNamePadLength(commands);
    // start group to pad contents.
    console.group("Available commands:");
    // loop through commands...
    each(commands, (c: Command) => {
      // ...displaying signature and description.
      console.log(chalk.green(c.getName().padEnd(padLength)), chalk.grey(c.getDescription()));
    });
    // finish padded group.
    console.groupEnd();
  }

  // display a given command help.
  protected displayCommandHelp(name: string) {
    // find command for a given name.
    const command = this.app.findCommand(name);

    // avoid running if no command was found under the provided name.
    if (command === undefined) {
      // log not found.
      console.error(`Command ${name} does not exists.`);
      // avoid execution by returning.
      return null;
    }

    // display main banner.
    this.displayBanner();

    // get command help and call it's render method.
    command.getCommandHelp().render();
  }

  // display app banner.
  protected displayBanner() {
    console.log(`${chalk.green("Ambientum CLI")} ${chalk.grey("- v" + this.app.version())}\n`);
  }

  // calculate the length to pad each command name (display as virtual table.)
  protected commandNamePadLength(commands: Command[]) {
    // get the bigger command name length, among available commands.
    const biggestCommandNameLength = max(map(commands, (c) => c.getName().length));

    // make sure there are 3 chars spacing, then get into a number that is multiple of 5.
    return (Math.ceil((biggestCommandNameLength + 3) / 5)) * 5;
  }
}
