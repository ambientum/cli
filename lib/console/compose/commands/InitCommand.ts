// imports.
import { Input, Select } from 'enquirer/lib/prompts';
import { Command } from 'lib/support/console';
import { ComposeBuilder } from 'lib/console/compose/builder';
import { UsageExample } from 'lib/support/console/types';

/**
 * Class InitCommand.
 *
 * Initialize docker-compose.yml configuration for a project.
 */
export class InitCommand extends Command {
  // command name.
  public name: string = 'init';
  // command description.
  public description: string = 'Initialize docker-compose.yml configuration for a project.';

  // command triggers.
  public triggers: string[] = ['init', '-i'];

  // command usage examples.
  public usage: UsageExample[] = [
    { command: 'amb init', description: 'Run interactive docker-compose.yml creation.' },
  ];

  // compose builder.
  protected builder: ComposeBuilder;

  // run.
  public async run() {
    // create compose builder instance.
    this.builder = new ComposeBuilder();
    // start builder.
    await this.builder.start();
  }
}


