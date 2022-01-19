// imports.
import { ServicePrompt } from 'lib/console/compose/builder/prompts';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class MySQLPrompt.
export class MySQLPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'MySQL';
  // service slug (lowercase, normalized name).
  public slug: string = 'mysql';
  // docker image name.
  public image: string = 'mysql';

  // tags.
  public tags: string[] = ['8.0', '5.7'];

  // port mappings.
  public ports: types.IPromptPort[] = [
    { name: 'default', port: '3306' },
  ];
  // variables.
  public variables: types.IPromptVariable[] = [
    { name: 'MYSQL_ROOT_PASSWORD', description: 'Root Password', initial: 'project' },
    { name: 'MYSQL_USER', description: 'Username', initial: 'project' },
    { name: 'MYSQL_PASSWORD', description: 'Password', initial: 'project' },
    { name: 'MYSQL_DATABASE', description: 'Database Name', initial: 'project' },
  ];

  // list of mount points.
  public mountPoints: types.IPromptMount[] = [
    { source: 'mysql-data', target: '/var/lib/mysql' },
  ];

  // list of mount points.
  public volumes: types.IPromptVolume[] = [
    { name: 'mysql-data', driver: 'local' },
  ];
}
