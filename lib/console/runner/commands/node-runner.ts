// import base command.
import { Select } from "enquirer/lib/prompts";
import { UsageExample } from "lib/support/console";
import { RunnerCommand } from "./runner";

/**
 * Class NodeRunnerCommand.
 */
export class NodeRunnerCommand extends RunnerCommand {
  // command name.
  public name: string = "node";
  // command description.
  public description: string = "Run a command on Node.JS global env.";

  // command usage examples.
  public usage: UsageExample[] = [
    { command: "amb -n bash", description: "Run the Bash shell inside a Node.JS container." },
    { command: "amb -n npm install", description: "Runs npm install inside a Node.JS container." },
    { command: "amb -n node --version", description: "Display containers Node.JS version." },
  ];

  // command triggers.
  public triggers: string[] = [ "node", "-n", "--node" ];
}
