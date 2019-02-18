// imports.
import { basename } from 'path';
import { InputPrompt } from 'lib/console/compose/builder/prompts';

// Class ProjectNamePrompt.
export class ProjectNamePrompt extends InputPrompt {
  // prompt name.
  protected name: string = 'name';
  // question text.
  protected question: string = 'Project Name:';
  // question initial value.
  protected initial: string = basename(process.cwd());
}
