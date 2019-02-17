// import DockerCompose class.
import { DockerCompose } from 'lib/support/compose';
// import all prompts.
import * as prompts from './prompts';

/**
 * Class ComposeBuilder.
 */
export class ComposeBuilder {
  // project name.
  public project: string;

  // docker compose handler instance.
  protected compose: DockerCompose;

  // start builder.
  public async start() {
    // ask and assign project name on instance.
    this.project = await new prompts.ProjectNamePrompt().ask();
    // create and assign compose instance.
    this.compose = new DockerCompose(this.project);

    // build and add mysql.
    this.compose.addService(await new prompts.MySQLPrompt(this).ask());
    // build and add postgres.
    this.compose.addService(await new prompts.PostgresPrompt(this).ask());
    // build and add redis.
    this.compose.addService(await new prompts.RedisPrompt(this).ask());
    // build and add mongo.
    this.compose.addService(await new prompts.MongoPrompt(this).ask());
    // build web app service.
    this.compose.addService(await new prompts.WebAppPrompt(this).ask());

    // compose.
    const composeFileObject = this.compose.serialize();

    // log file on terminal.
    console.log(composeFileObject.toString());
  }
}
