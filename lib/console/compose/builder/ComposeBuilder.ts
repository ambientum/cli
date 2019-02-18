// imports.
import { DockerCompose } from 'lib/support/compose';
import * as commonPrompts from 'lib/console/compose/builder/prompts/common';
import * as servicePrompts from 'lib/console/compose/builder/prompts/services';

// Class ComposeBuilder.
export class ComposeBuilder {
  // project name.
  public project: string;

  // docker compose handler instance.
  protected compose: DockerCompose;

  // start builder.
  public async start() {
    // ask and assign project name on instance.
    this.project = await new commonPrompts.ProjectNamePrompt().ask();
    // create and assign compose instance.
    this.compose = new DockerCompose(this.project);

    // build and add mysql.
    this.compose.addService(await new servicePrompts.MySQLPrompt(this).ask());
    // build and add postgres.
    this.compose.addService(await new servicePrompts.PostgresPrompt(this).ask());
    // build and add redis.
    this.compose.addService(await new servicePrompts.RedisPrompt(this).ask());
    // build and add mongo.
    this.compose.addService(await new servicePrompts.MongoPrompt(this).ask());
    // build web app service.
    this.compose.addService(await new servicePrompts.WebAppPrompt(this).ask());
    // build queue runner service.
    this.compose.addService(await new servicePrompts.QueueRunnerPrompt(this).ask());
    // build mailhog service.
    this.compose.addService(await new servicePrompts.MailHogPrompt(this).ask());
    // compose.
    const composeFileObject = this.compose.serialize();

    // log file on terminal.
    console.log(composeFileObject.toString());
  }
}
