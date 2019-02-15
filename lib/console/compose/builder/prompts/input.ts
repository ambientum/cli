// import base enquirer prompt.
import { Input } from "enquirer/lib/prompts";


export class InputPrompt {
  protected question: string;
  protected initial: string;

  public async ask() {
    return await (new Input({
      message: this.question,
      initial: this.initial,
    })).run();
  }

}
