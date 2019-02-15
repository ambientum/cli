import {
  IPromptMount,
  IPromptPort,
  IPromptVariable,
  IPromptVolume,
  ServicePrompt,
} from "../service";

export class RedisPrompt extends ServicePrompt {
  // service / question name.
  public name: string = "Redis";
  // service slug (lowercase, normalized name).
  public slug: string = "redis";
  // docker image name.
  public image: string = "redis";
  // enabled by default status.
  public enabledByDefault: boolean = true;

  // tags.
  public tags: string[] = ["5-alpine", "4-alpine"];

  // port mappings.
  public ports: IPromptPort[] = [
    { name: "default", port: "6379" },
  ];

  // variables.
  public variables: IPromptVariable[] = [];

  // list of mount points.
  public mountPoints: IPromptMount[] = [
    { source: "redis-data", target: "/data" },
  ];

  // list of mount points.
  public volumes: IPromptVolume[] = [
    { name: "redis-data", driver: "local" },
  ];
}
