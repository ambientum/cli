// imports.
import { ServicePrompt } from 'lib/console/compose/builder/prompts';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class QueueRunnerPrompt.
export class QueueRunnerPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'Laravel Queue Worker';
  // service slug (lowercase, normalized name).
  public slug: string = 'queue';
  // docker image name.
  public image: string = 'ambientum/php';

  // laravel queue worker command.
  public command: string = 'php artisan queue:work';

  // make not-linkable (main service).
  public linkable: boolean = false;

  // tags.
  public tags: string[] = ['8.0','7.4','7.3','7.2', '7.1'];

  // variables.
  public variables: types.IPromptVariable[] = [
    { name: 'FRAMEWORK', description: 'Framework? (laravel|symfony|generic)', initial: 'laravel' },
    { name: 'XDEBUG_ENABLED', description: 'Enable xDebug?', initial: 'false' },
    { name: 'OPCACHE_MODE', description: 'OpCache Mode: (normal|extreme|disabled)', initial: 'disabled' },
    { name: 'PHP_MEMORY_LIMIT', description: 'PHP Memory Limit', initial: '256M' },
  ];

  // list of mount points.
  public mountPoints: types.IPromptMount[] = [
    { source: '.', target: '/var/www/app' },
    { source: 'dot-config', target: '/home/ambientum/.config' },
    { source: 'dot-cache', target: '/home/ambientum/.cache' },
    { source: 'dot-local', target: '/home/ambientum/.local' },
    { source: 'dot-composer', target: '/home/ambientum/.composer' },
  ];

  // list of mount points.
  public volumes: types.IPromptVolume[] = [
    { name: 'dot-config', driver: 'local' },
    { name: 'dot-cache', driver: 'local' },
    { name: 'dot-local', driver: 'local' },
    { name: 'dot-composer', driver: 'local' },
  ];
}
