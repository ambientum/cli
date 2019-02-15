// import base command.
import { Input, Select } from "enquirer/lib/prompts";
import { Command } from "lib/support/console";
import { CommandHelp } from "lib/support/console/helpers/command-help";
import { ComposeService, ComposeVolume, DockerCompose } from "lib/support/docker/compose";
import { basename } from "path";

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

  // docker compose manager instance.
  protected compose: DockerCompose;

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
    const askProjectName = new Input({
      name: "name",
      message: "Project Name",
      initial: basename(process.cwd()),
    });
    // create a compose instance and assign on instance.
    this.compose = new DockerCompose(await askProjectName.run());
  }
}


