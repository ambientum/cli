// import basename function from path
// import question generators.
import { Input } from "enquirer/lib/prompts";
// path basename helper.
import { basename } from "path";

// project name question.
export const projectNameQuestion = new Input({
  name: "name",
  message: "Project Name",
  initial: basename(process.cwd()),
});

// main database selection questions
export default async (builder) => {
  // assign name on init config.
  builder.setName(await projectNameQuestion.run());

  // complete promise by returning config object.
  return builder;
};





