// import base command.
import { Input, Select } from "enquirer/lib/prompts";
import { Command } from "lib/support/console";
import { CommandHelp } from "lib/support/console/helpers/command-help";
import { ComposeBuilder } from "../builder/builder";

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
  public triggers: string[] = ["init", "-i"];

  // compose builder.
  protected builder: ComposeBuilder;

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

  public async run() {
    // create compose builder instance.
    this.builder = new ComposeBuilder();

    // start builder.
    console.log(await this.builder.start());
  }
}


