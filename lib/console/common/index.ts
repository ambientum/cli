// import CommandGroup class.
import { CommandGroup } from "lib/support/console";
// import commands classes.
import { HelpCommand } from "./commands/help";

// factory config group.
export default () => (new CommandGroup([
  new HelpCommand(),
]));
