// imports.
import { CommandGroup } from 'lib/support/console';
import { ConfigCommand, PHPRunnerCommand, NodeJSRunnerCommand } from 'lib/console/runner/commands';

// export group factory function.
export default () => (new CommandGroup([
  new PHPRunnerCommand(),
  new NodeJSRunnerCommand(),
  new ConfigCommand(),
]));

