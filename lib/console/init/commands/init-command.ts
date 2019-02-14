// import base command.
import { Select } from "enquirer/lib/prompts";
import { Command } from "../../../support/console";
import { CommandHelp } from "../../../support/console/helpers/command-help";

/**
 * Class InitCommand.
 *
 * Initialize docker-compose.yml configuration for a project.
 */
export class InitCommand extends Command {
  // command name.
  public signature: string = "init";

  // command description.
  public description: string = "Initialize docker-compose.yml configuration for a project.";

  // command triggers.
  public triggers: string[] = [ "init", "-i" ];

  // return help for the current command.
  public getCommandHelp(): CommandHelp {
    return new CommandHelp({
      name: "init",
      description: this.description,
      usage: [
        { command: "amb init", description: "Run interactive docker-compose.yml creation." },
      ],
    });
  }

  public run() {
    console.log("init");
  }

}
