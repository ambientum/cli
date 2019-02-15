// import DockerCompose class.
import { DockerCompose } from "lib/support/compose";
import { ProjectNamePrompt } from "./prompts/common/project-name";
import { MySQLPrompt } from "./prompts/services/mysql";
import { PostgresPrompt } from "./prompts/services/postgres";
import { RedisPrompt } from "./prompts/services/redis";

/**
 * Class ComposeBuilder.
 *
 * Builder for docker-compose configuration file.
 */
export class ComposeBuilder {
  // project name.
  public project: string;

  // docker compose handler instance.
  protected compose: DockerCompose;

  // start builder.
  public async start() {
    // ask and assign project name on instance.
    this.project = await new ProjectNamePrompt().ask();
    // create and assign compose instance.
    this.compose = new DockerCompose(this.project);

    // build and add mysql.
    this.compose.addService(await new MySQLPrompt(this).ask());
    // build and add postgres.
    this.compose.addService(await new PostgresPrompt(this).ask());
    // build and add redis.
    this.compose.addService(await new RedisPrompt(this).ask());

    // compose.
    console.log(this.compose);
  }
}
