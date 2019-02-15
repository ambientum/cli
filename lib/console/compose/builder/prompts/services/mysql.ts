import {
  IPromptMount,
  IPromptPort,
  IPromptVariable,
  IPromptVolume,
  ServicePrompt,
} from "../service";

export class MySQLPrompt extends ServicePrompt {
  // service / question name.
  public name: string = "MySQL";
  // service slug (lowercase, normalized name).
  public slug: string = "mysql";
  // docker image name.
  public image: string = "mysql";
  // enabled by default status.
  public enabledByDefault: boolean = true;

  // make linkable.
  public linkable: boolean = true;

  // tags.
  public tags: string[] = ["5.7", "8.0"];

  // port mappings.
  public ports: IPromptPort[] = [
    { name: "default", port: "3306" },
  ];
  // variables.
  public variables: IPromptVariable[] = [
    { name: "MYSQL_ROOT_PASSWORD", description: "MySQL Root Password", initial: "project" },
    { name: "MYSQL_USERNAME", description: "MySQL Username", initial: "project" },
    { name: "MYSQL_PASSWORD", description: "MySQL Password", initial: "project" },
    { name: "MYSQL_DATABASE", description: "MySQL Database", initial: "project" },
  ];

  // list of mount points.
  public mountPoints: IPromptMount[] = [
    { source: "mysql-data", target: "/var/lib/mysql" },
  ];

  // list of mount points.
  public volumes: IPromptVolume[] = [
    { name: "mysql-data", driver: "local" },
  ];
}
