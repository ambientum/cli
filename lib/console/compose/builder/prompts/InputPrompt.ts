// import base enquirer prompt.
import { Input } from 'enquirer/lib/prompts';

/**
 * Class BuilderInputPrompt.
 */
export abstract class InputPrompt {
  // question name (key).
  protected abstract name: string;
  // question text.
  protected abstract question: string;
  // question initial value.
  protected abstract initial: string;

  // ask input question.
  public async ask() {
    return await (new Input({
      message: this.question,
      initial: this.initial,
    })).run();
  }

}
