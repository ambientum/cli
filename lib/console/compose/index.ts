// imports.
import { CommandGroup } from 'lib/support/console';
import { InitCommand } from 'lib/console/compose/commands';

// export group factory function.
export default () => (new CommandGroup([
  new InitCommand(),
]));

