// import base command.
import { Select } from 'enquirer/lib/prompts';
import { UsageExample } from 'lib/support/console';
import { RunnerCommand } from './runner';

/**
 * Class PhpRunnerCommand.
 */
export class PhpRunnerCommand extends RunnerCommand {
  // command name.
  public name: string = 'php';
  // command description.
  public description: string = 'Run a command on PHP global env.';

  // command usage examples.
  public usage: UsageExample[] = [
    { command: 'amb -p bash', description: 'Run the Bash shell inside a PHP container.' },
    { command: 'amb -p composer create laravel/laravel foo', description: 'Create a project with Composer' },
    { command: 'amb -p composer install', description: 'Install composer dependencies' },
  ];

  // command triggers.
  public triggers: string[] = [ 'php', '-p', '--php' ];
}
