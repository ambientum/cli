// import basename helper.
import { basename } from 'path';
// import base
import { BuilderInputPrompt } from '../input';

/**
 * Class ProjectNamePrompt.
 */
export class ProjectNamePrompt extends BuilderInputPrompt {
  // prompt name.
  protected name: string = 'name';
  // question text.
  protected question: string = 'Project Name:';
  // question initial value.
  protected initial: string = basename(process.cwd());
}
