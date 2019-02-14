// import base command.
import { Select } from "enquirer/lib/prompts";
import { CommandHelp } from "../../../support/console/helpers/command-help";
import { RunnerCommand } from "./runner";

/**
 * Class PhpRunnerCommand.
 *
 * Run a command on PHP global env.
 */
export class PhpRunnerCommand extends RunnerCommand {
  // command name.
  public signature: string = "-p <command...>";

  // command description.
  public description: string = "Run a command on PHP global env.";

  // command triggers.
  public triggers: string[] = [ "-p", "--php" ];

  // return command help.
  public getCommandHelp(): CommandHelp {
    return new CommandHelp({
      name: "-p",
      description: this.description,
      usage: [
        { command: "amb -p bash", description: "Run the Bash shell inside a PHP container." },
        { command: "amb -p composer create laravel/laravel foo", description: "Create a project with Composer" },
        { command: "amb -p composer install", description: "Install composer dependencies" },
      ],
    });
  }

}

// default export / alias.
export default PhpRunnerCommand;
