// imports.
import { ServicePrompt } from 'lib/console/compose/builder/prompts';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class WebAppPrompt.
export class WebAppPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'Web Application';
  // service slug (lowercase, normalized name).
  public slug: string = 'web';
  // docker image name.
  public image: string = 'ambientum/php';

  // make not-linkable (main service).
  public linkable: boolean = false;

  // tags.
  public tags: string[] = ['8.0-nginx','7.4-nginx','7.3-nginx', '7.2-nginx', '7.1-nginx'];

  // port mappings.
  public ports: types.IPromptPort[] = [
    { name: 'HTTP', port: '8080' },
    { name: 'HTTPS', port: '8083' },
  ];

  // variables.
  public variables: types.IPromptVariable[] = [
    { name: 'FRAMEWORK', description: 'Framework? (laravel|symfony|generic)', initial: 'laravel' },
    { name: 'XDEBUG_ENABLED', description: 'Enable xDebug?', initial: 'true' },
    { name: 'OPCACHE_MODE', description: 'OpCache Mode: (normal|extreme|disabled)', initial: 'normal' },
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
