// import chalk for colorful output.
import chalk from "chalk";
// import lodash helpers.
import { reduce } from "lodash";

// interface for usage lines.
export interface IUsageLine {
  command: string;
  description: string;
}

// interface for command help options.
interface ICommandHelpOptions {
  // command name.
  name: string;
  // command description.
  description: string;
  // command usage examples.
  usage: IUsageLine[];
}

/**
 * Class CommandHelp.
 */
export class CommandHelp {
  // help options.
  protected options: ICommandHelpOptions;

  // constructor
  public constructor(options: ICommandHelpOptions) {
    // assign command options.
    this.options = options;
  }

  // render help text for the given command.
  public render() {
    // display basic info.
    console.log(chalk.yellow(this.options.name), chalk.grey(this.options.description), "\n");
    // display usage group.
    console.group("Usage Examples");
    // get pad size cor command on usage line.
    const padSize = this.usageLinePadSize();
    // loop thorough usage lines...
    this.options.usage.forEach((line: IUsageLine) => {
      // print each example usage.
      console.log(chalk.green(line.command.padEnd(padSize)), chalk.grey(line.description));
    });
    // finish the group padding.
    console.groupEnd();
  }

  // calculate the length to pad each command name (display as virtual table.)
  protected usageLinePadSize() {
    // get the max length for the commands on usage lines.
    const maxCommandLength = reduce(this.options.usage, (current: number, line: IUsageLine) => {
      // return the length if the biggest so far, or the current max value.
      return (line.command.length >= current) ? line.command.length : current;
    }, 1); // start with one.

    // make sure there are 3 chars spacing, then get into a number that is multiple of 5.
    return (Math.ceil((maxCommandLength + 3) / 5)) * 5;
  }
}
