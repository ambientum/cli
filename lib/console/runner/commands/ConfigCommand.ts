// imports.
import { Select } from 'enquirer/lib/prompts';
import { Command } from 'lib/support/console';
import { UsageExample } from 'lib/support/console/types';

/**
 * Class ConfigCommand.
 *
 * This command handled global configuration.
 */
export class ConfigCommand extends Command {
  // command name.
  public name: string = 'config';
  // command description.
  public description: string = 'Global Ambientum settings.';

  // command usage examples.
  public usage: UsageExample[] = [
    { command: 'amb config', description: 'Run interactive configuration.' },
    { command: 'amb config get', description: 'Return all configuration.' },
    { command: 'amb config get php.tag', description: 'Return a specific config key.' },
    { command: 'amb config set php.tag value', description: 'Return a specific config key.' },
  ];

  // command triggers.
  public triggers: string[] = [ 'config', '-c' ];

  // fire config command.
  public async run(action: string, key: string, value: string): Promise<void> {
    // handle "amb config".
    if (action === null || action === undefined) {
      console.log(await this.interactiveConfiguration());
    }

    // handle "amb config path".
    if (action === 'path') {
      console.log(this.handlePath());
    }

    // handle "amb config get"
    if (action === 'get') {
      console.log(this.handleGet(key || null));
    }

    // handle "amb config set"
    if (action === 'set') {
      console.log(this.handleSet(key || null, value || null));
    }
  }

  // handle path sub command.
  public handlePath() {
    return this.config.path();
  }

  // get value from config.
  public handleGet(key: string = null) {
    // if no key was specified, return all.
    if (key === null) {
      return this.config.all();
    }

    // return config under a given key.
    return this.config.get(key);
  }

  // set value on config.
  public handleSet(key: string , value: string) {
    // when no key or no value provided, error and exit.
    if (key === null || value === null) {
      return 'Key and Value parameters are required.';
    }

    // set value on config.
    this.config.set(key, value);

    // retrieve the value just set to confirm it's write.
    return this.config.get(key);
  }

  // interactive config runner.
  protected async interactiveConfiguration() {
    // Question for PHP version.
    const askPHPVersion = new Select({
      message: 'Global PHP version:',
      initial: this.config.get('php.tag') || '7.1',
      choices: [ '7.1', '7.2', '7.3', '7.4', 'latest' ],
    });

    // ask the question and set on config.
    this.config.set('php.tag', await askPHPVersion.run());

    // Question for Node.JS version.
    const askNodeVersion = new Select({
      message: 'Global Node.JS version:',
      initial: this.config.get('node.tag') || '15',
      choices: [ '10', '11', '12', '13', '15', 'lts', 'latest' ],
    });

    // ask the question and set on config.
    this.config.set('node.tag', await askNodeVersion.run());

    // return all config after interactive run.
    return this.config.all();
  }
}
