// import base command.
import { Select } from "enquirer/lib/prompts";
import { CommandHelp } from "../../../support/console/helpers/command-help";
import { RunnerCommand } from "./runner";

/**
 * Class NodeRunnerCommand.
 *
 * This command handled global configuration.
 */
export class NodeRunnerCommand extends RunnerCommand {
  // command name.
  public signature: string = "-n <command...>";

  // command description.
  public description: string = "Run a command on Node.JS global env.";

  // command triggers.
  public triggers: string[] = [ "-n", "--node" ];

  // return help for the current command.
  public getCommandHelp(): CommandHelp {
    return new CommandHelp({
      name: "-n",
      description: this.description,
      usage: [
        { command: "amb -n bash", description: "Run the Bash shell inside a Node.JS container." },
        { command: "amb -n npm install", description: "Runs npm install inside a Node.JS container." },
        { command: "amb -n node --version", description: "Display containers Node.JS version." },
      ],
    });
  }

}

// default export / alias.
export default NodeRunnerCommand;
