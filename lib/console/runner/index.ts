// import CommandGroup class.
import { CommandGroup } from 'lib/support/console';
// import commands classes.
import { ConfigCommand } from './commands/config';
import { NodeRunnerCommand } from './commands/node-runner';
import { PhpRunnerCommand } from './commands/php-runner';

// factory config group.
export default () => (new CommandGroup([
  new PhpRunnerCommand(),
  new NodeRunnerCommand(),
  new ConfigCommand(),
]));

