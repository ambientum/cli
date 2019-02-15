import {
  IPromptMount,
  IPromptPort,
  IPromptVariable,
  IPromptVolume,
  ServicePrompt,
} from "../service";

export class PostgresPrompt extends ServicePrompt {
  // service / question name.
  public name: string = "PostgreSQL";
  // service slug (lowercase, normalized name).
  public slug: string = "postgres";
  // docker image name.
  public image: string = "postgres";
  // enabled by default status.
  public enabledByDefault: boolean = false;

  // make linkable.
  public linkable: boolean = true;

  // tags.
  public tags: string[] = ["11.2", "10.7", "9.6", "9.5"];

  // port mappings.
  public ports: IPromptPort[] = [
    { name: "default", port: "5432" },
  ];

  // variables.
  public variables: IPromptVariable[] = [
    { name: "POSTGRES_USER", description: "PostgreSQL Username", initial: "project" },
    { name: "POSTGRES_PASSWORD", description: "PostgreSQL Password", initial: "project" },
    { name: "POSTGRES_DB", description: "PostgreSQL Database", initial: "project" },
  ];

  // list of mount points.
  public mountPoints: IPromptMount[] = [
    { source: "postgres-data", target: "/var/lib/postgresql/data" },
  ];

  // list of mount points.
  public volumes: IPromptVolume[] = [
    { name: "postgres-data", driver: "local" },
  ];
}
