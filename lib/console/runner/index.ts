// import CommandGroup class.
import { CommandGroup } from 'lib/support/console';
// import commands classes.
import { ConfigCommand, PHPRunnerCommand, NodeJSRunnerCommand } from './commands';

// factory config group.
export default () => (new CommandGroup([
  new PHPRunnerCommand(),
  new NodeJSRunnerCommand(),
  new ConfigCommand(),
]));

