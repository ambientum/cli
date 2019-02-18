// import lodash helpers.
import { first, slice } from 'lodash';
// import meow argv parser.
import meow from 'meow';

// export ArgsParser.
export class ArgsParser {
  // raw argv.
  public raw: string[];
  // command args (defaults to process.argv.slice(2)).
  public args: string[];
  // array with getAll provided arguments (without flags).
  public input: string[];
  // object with getAll provided flags.
  public flags: object;

  // ArgParser constructor.
  public constructor() {
    // set raw argv.
    this.raw = process.argv;

    // set args from a slice of argv, starting on 2 to then end.
    this.args = slice(process.argv, 2, process.argv.length);

    // parse input array and flags using meow package.
    // auto help/version are disabled to prevent sub command conflicts.
    const { input, flags } = meow({ autoHelp: false, autoVersion: false });

    // set input on instance.
    this.input = input;
    // set flags on instance.
    this.flags = flags;
  }

  // return getAll parsed arguments.
  public getAll(startAt: number = 0) {
    // return the sliced array of arguments.
    return slice(this.args, startAt, this.args.length);
  }

  // return first argument on current args, ignoring  of the arguments, ignoring getFirst case indicated.
  public getFirst(startAt: number = 0): string {
    return first(this.getAll(startAt)) || null;
  }

  // determine command name by using the first valid arg.
  public commandName(): string {
    return this.getFirst(0) || null;
  }

  // return all args except first.
  public commandArgs(): string[] {
    return this.getAll(1);
  }
}

// default export.
export default ArgsParser;
