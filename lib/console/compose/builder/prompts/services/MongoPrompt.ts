// imports.
import { ServicePrompt } from 'lib/console/compose/builder/prompts';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class MongoPrompt.
export class MongoPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'MongoDB';
  // service slug (lowercase, normalized name).
  public slug: string = 'mongo';
  // docker image name.
  public image: string = 'mongo';

  // enabled by default status.
  public enabledByDefault: boolean = false;

  // tags.
  public tags: string[] = ['4.4','4.2','4.1', '4.0', '3.6', '3.5'];

  // port mappings.
  public ports: types.IPromptPort[] = [
    { name: 'default', port: '27017' },
  ];

  // variables.
  public variables: types.IPromptVariable[] = [
    { name: 'MONGO_INITDB_ROOT_USERNAME', description: 'Root Username', initial: 'project' },
    { name: 'MONGO_INITDB_ROOT_PASSWORD', description: 'Root Password', initial: 'project' },
  ];

  // list of mount points.
  public mountPoints: types.IPromptMount[] = [
    { source: 'mongo-data', target: '/data/db' },
  ];

  // list of mount points.
  public volumes: types.IPromptVolume[] = [
    { name: 'mongo-data', driver: 'local' },
  ];
}
