// imports.
import { CommandGroup } from 'lib/support/console';
import { HelpCommand } from 'lib/console/common/commands/help';

// factory config group.
export default () => (new CommandGroup([
  new HelpCommand(),
]));
