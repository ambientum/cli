// import chalk for colorful output.
import chalk from "chalk";
// import lodash helpers.
import { map, max } from "lodash";

// interface for usage lines.
export interface UsageLine {
  // usage example.
  command: string;
  // usage description.
  description: string;
}

// interface for command help options.
interface CommandHelpOptions {
  // command name.
  name: string;
  // command description.
  description: string;
  // list of triggers / aliases.
  triggers: string[];
  // command usage examples.
  usage: UsageLine[];
}

/**
 * Class CommandHelp.
 */
export class CommandHelp {
  // help options.
  protected options: CommandHelpOptions;

  // constructor
  public constructor(options: CommandHelpOptions) {
    // assign command options.
    this.options = options;
  }

  // render help text for the given command.
  public render() {
    console.group(chalk.yellow(this.options.name));
    console.log(chalk.grey(this.options.description));
    console.log();
    console.groupEnd();
    console.group("Aliases:");
    map(this.options.triggers, (trigger: string) => {
      console.log(chalk.yellow(`amb ${trigger}`));
    });
    console.log();
    console.groupEnd();

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
    const maxCommandLength = max(map(this.options.usage, (line: IUsageLine) => (line.command).length));

    // make sure there are 3 chars spacing, then get into a number that is multiple of 5.
    return (Math.ceil((maxCommandLength + 3) / 5)) * 5;
  }
}
