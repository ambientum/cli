// import input question.
import { Input } from "enquirer/lib/prompts";
import { basename } from "path";

// project name question.
const projectNameQuestion = new Input({
  name: "name",
  message: "Project Name",
  initial: basename(process.cwd()),
});
