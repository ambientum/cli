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
  public image: string = 'mailhog/mailhog';

  // tags.
  public tags: string[] = ['latest'];

  // port mappings.
  public ports: types.IPromptPort[] = [
    { name: 'smtp', port: '1025' },
    { name: 'web', port: '8025' },
  ];
}
