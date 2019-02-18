/**
 * Interface IComposeCommand.
 */
export interface IComposeCommand {
  // command string.
  command: string;
}

/**
 * Class ComposeCommand.
 */
export class ComposeCommand implements IComposeCommand {
  // command string.
  public command: string;

  // constructor.
  public constructor(options: IComposeCommand) {
    // assign values.
    this.command = options.command;
  }

  // serialize for compose.
  public serialize() {
    return this.command ? this.command.split(' ') : null;
  }
}

// default export.
export default ComposeCommand;
