// import base command.
import { Input, Select } from "enquirer/lib/prompts";
import { Command, UsageExample } from "lib/support/console";
import { ComposeBuilder } from "../builder/builder";
import { readFileSync } from "fs";
import YAML from "yaml";

/**
 * Class InitCommand.
 *
 * Initialize docker-compose.yml configuration for a project.
 */
export class InitCommand extends Command {
  // command name.
  public name: string = "init";
  // command description.
  public description: string = "Initialize docker-compose.yml configuration for a project.";

  // command triggers.
  public triggers: string[] = ["init", "-i"];

  // command usage examples.
  public usage: UsageExample[] = [
    { command: "amb init", description: "Run interactive docker-compose.yml creation." },
  ];

  // compose builder.
  protected builder: ComposeBuilder;

  // run.
  public async run() {
    // create compose builder instance.
    this.builder = new ComposeBuilder();
    // console.log(process.cwd() + "/docker-compose.yml");
    // const file = readFileSync(process.cwd() + "/docker-compose.yml", { encoding: "utf8" });
    // console.log(YAML.parse(file));
    // start builder.
    await this.builder.start();
  }
}


