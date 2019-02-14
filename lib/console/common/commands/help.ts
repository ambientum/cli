// import base command class.
import chalk from "chalk";
import { Command } from "lib/support/console/command";
import { each } from "lodash";
import { CommandHelp } from "../../../support/console/helpers/command-help";

/**
 * Class HelpCommand.
 *
 * Display help information.
 */
export class HelpCommand extends Command {
  // command name.
  public signature: string = "help [command]";
  // command description.
  public description: string = "Display help info for a command.";
  // command triggers.
  public triggers: string[] = [
    "help", "-h",
  ];

  // command help.
  public getCommandHelp(): CommandHelp {
    return new CommandHelp({
      name: "help",
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

    // start group to pad contents.
    console.group("Available commands:");
    // loop through commands...
    each(commands, (c: Command) => {
      // ...displaying signature and description.
      console.log(c.getSignature().padEnd(30), c.getDescription());
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
    console.log(`${chalk.green("Ambientum CLI")} - ${this.app.version()}\n`);
  }
}
