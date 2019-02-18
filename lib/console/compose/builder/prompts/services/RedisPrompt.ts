// imports.
import { ServicePrompt } from 'lib/console/compose/builder/prompts';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class RedisPrompt.
export class RedisPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'Redis';
  // service slug (lowercase, normalized name).
  public slug: string = 'redis';
  // docker image name.
  public image: string = 'redis';

  // tags.
  public tags: string[] = ['5-alpine', '4-alpine'];

  // port mappings.
  public ports: types.IPromptPort[] = [
    { name: 'default', port: '6379' },
  ];

  // list of mount points.
  public mountPoints: types.IPromptMount[] = [
    { source: 'redis-data', target: '/data' },
  ];

  // list of mount points.
  public volumes: types.IPromptVolume[] = [
    { name: 'redis-data', driver: 'local' },
  ];
}
