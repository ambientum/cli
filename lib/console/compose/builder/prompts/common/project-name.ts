import { basename } from "path";
import { InputPrompt } from "../input";

export class ProjectNamePrompt extends InputPrompt {
  protected question: string = "Project Name:";
  protected initial: string = basename(process.cwd());
}
