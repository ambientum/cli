// import CommandGroup class.
import { CommandGroup } from 'lib/support/console';
// import command classes.
import { InitCommand } from './commands/';

// factory init group.
export default () => (new CommandGroup([
  new InitCommand(),
]));

