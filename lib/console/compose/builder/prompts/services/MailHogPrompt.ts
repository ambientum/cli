// imports.
import { ServicePrompt } from 'lib/console/compose/builder/prompts';
import * as types from 'lib/console/compose/builder/prompts/types';

// Class MailHogPrompt.
export class MailHogPrompt extends ServicePrompt {
  // service / question name.
  public name: string = 'MailHog';
  // service slug (lowercase, normalized name).
  public slug: string = 'mailhog';
  // docker image name.
  public image: string = 'mailhog';
  // enabled by default status.
  public enabledByDefault: boolean = true;

  // make linkable.
  public linkable: boolean = true;

  // tags.
  public tags: string[] = ['latest'];

  // port mappings.
  public ports: types.IPromptPort[] = [
    { name: 'smtp', port: '1025' },
    { name: 'web', port: '8025' },
  ];
  // variables.
  public variables: types.IPromptVariable[] = [
    //
  ];

  // list of mount points.
  public mountPoints: types.IPromptMount[] = [
    //
  ];

  // list of mount points.
  public volumes: types.IPromptVolume[] = [
    //
  ];
}
