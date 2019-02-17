// import chalk for colorful output.
import chalk from "chalk";
// import lodash helpers.
import { map, max } from "lodash";
import { Command, UsageExample } from "../command";

/**
 * Class CommandHelp.
 */
export class CommandHelp {
  // command instance.
  protected command: Command;

  // constructor
  public constructor(command: Command) {
    // assign command instance.
    this.command = command;
  }

  // render help text for the given command.
  public render() {
    console.group(chalk.yellow(this.command.getName()));
    console.log(chalk.grey(this.command.getDescription()));
    console.log();
    console.groupEnd();
    console.group("Aliases:");
    map(this.command.getTriggers(), (trigger: string) => {
      console.log(chalk.yellow(`amb ${trigger}`));
    });
    console.log();
    console.groupEnd();

    // display usage group.
    console.group("Usage Examples");
    // get pad size cor command on usage line.
    const padSize = this.UsageExamplePadSize();
    // loop thorough usage lines...
    this.command.getUsage().forEach((line: UsageExample) => {
      // print each example usage.
      console.log(chalk.green(line.command.padEnd(padSize)), chalk.grey(line.description));
    });
    // finish the group padding.
    console.groupEnd();
  }

  // calculate the length to pad each command name (display as virtual table.)
  protected UsageExamplePadSize() {
    // get the max length for the commands on usage lines.
    const maxCommandLength = max(map(this.command.getUsage(), (line: UsageExample) => (line.command).length));

    // make sure there are 3 chars spacing, then get into a number that is multiple of 5.
    return (Math.ceil((maxCommandLength + 3) / 5)) * 5;
  }
}
