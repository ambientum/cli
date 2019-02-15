import { IServicePromptPort, IServicePromptVariable, ServicePrompt } from "../service";

export class MySQLPrompt extends ServicePrompt {
  // service / question name.
  public name: string = "MySQL";
  // service slug (lowercase, normalized name).
  public slug: string = "mysql";
  // docker image name.
  public image: string = "mysql";
  // enabled by default status.
  public enabledByDefault: boolean = true;

  // tags.
  public tags: string[] = ["5.7", "8.0"];

  // port mappings.
  public ports: IServicePromptPort[] = [
    { name: "default", port: "3306" },
  ];
  // variables.
  public variables: IServicePromptVariable[] = [
    { name: "MYSQL_ROOT_PASSWORD", description: "MySQL Root Password", initial: "project" },
    { name: "MYSQL_USERNAME", description: "MySQL Username", initial: "project" },
    { name: "MYSQL_PASSWORD", description: "MySQL Password", initial: "project" },
    { name: "MYSQL_DATABASE", description: "MySQL Database", initial: "project" },
  ];
}
