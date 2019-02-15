// import classes and base prompt.
import { IPromptMount, IPromptPort, IPromptVariable, IPromptVolume, ServicePrompt } from "../service";

/**
 * Class MongoPrompt.
 */
export class MongoPrompt extends ServicePrompt {
  // service / question name.
  public name: string = "MongoDB";
  // service slug (lowercase, normalized name).
  public slug: string = "mongo";
  // docker image name.
  public image: string = "mongo";
  // enabled by default status.
  public enabledByDefault: boolean = true;

  // make linkable.
  public linkable: boolean = true;

  // tags.
  public tags: string[] = ["4.1", "4.0", "3.6", "3.5"];

  // port mappings.
  public ports: IPromptPort[] = [
    { name: "default", port: "27017" },
  ];

  // variables.
  public variables: IPromptVariable[] = [
    { name: "MONGO_INITDB_ROOT_USERNAME", description: "MongoDB Root Username", initial: "project" },
    { name: "MONGO_INITDB_ROOT_PASSWORD", description: "MySQL Root Password", initial: "project" },
  ];

  // list of mount points.
  public mountPoints: IPromptMount[] = [
    { source: "mongo-data", target: "/data/db" },
  ];

  // list of mount points.
  public volumes: IPromptVolume[] = [
    { name: "mongo-data", driver: "local" },
  ];
}
