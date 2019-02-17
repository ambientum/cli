// import classes and base prompt.
import { IPromptMount, IPromptPort, IPromptVariable, IPromptVolume, ServicePrompt } from '../ServicePrompt';

/**
 * Class QueueRunnerPrompt.
 */
export class QueueRunnerPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'Laravel Queue';
  // service slug (lowercase, normalized name).
  public slug: string = 'queue';
  // docker image name.
  public image: string = 'ambientum/php';

  // enabled by default status.
  public enabledByDefault: boolean = true;

  // make not-linkable (main service).
  public linkable: boolean = false;

  // tags.
  public tags: string[] = ['7.3', '7.2'];

  // port mappings.
  // queue runner does not expose ports.
  public ports: IPromptPort[] = [];

  // variables.
  public variables: IPromptVariable[] = [
    { name: 'FRAMEWORK', description: 'Framework? (laravel|symfony|generic)', initial: 'laravel' },
    { name: 'XDEBUG_ENABLED', description: 'Enable xDebug?', initial: 'true' },
    { name: 'PHP_MEMORY_LIMIT', description: 'PHP Memory Limit', initial: '256M' },
  ];

  // list of mount points.
  public mountPoints: IPromptMount[] = [
    { source: '.', target: '/var/www/app' },
    { source: 'dot-config', target: '/home/ambientum/.config' },
    { source: 'dot-cache', target: '/home/ambientum/.cache' },
    { source: 'dot-local', target: '/home/ambientum/.local' },
    { source: 'dot-composer', target: '/home/ambientum/.composer' },
  ];

  // list of mount points.
  public volumes: IPromptVolume[] = [
    { name: 'dot-config', driver: 'local' },
    { name: 'dot-cache', driver: 'local' },
    { name: 'dot-local', driver: 'local' },
    { name: 'dot-composer', driver: 'local' },
  ];
}
