// import DockerCompose class.
import { DockerCompose } from "lib/support/compose";

/**
 * Class ComposeBuilder.
 *
 * Builder for docker-compose configuration file.
 */
export class ComposeBuilder {
  // project name.
  protected project: string;

  // docker compose handler instance.
  protected compose: DockerCompose;

  // constructor.
  public constructor(project: string) {
    // assign project name on instance.
    this.project = project;
    // create and assign compose instance.
    this.compose = new DockerCompose(this.project);
  }

  // start builder.
  public async start() {

  }
}
