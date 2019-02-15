// import classes and base prompt.
import { IPromptMount, IPromptPort, IPromptVariable, IPromptVolume, ServicePrompt } from "../service";

/**
 * Class LaravelAppPrompt.
 */
export class LaravelAppPrompt extends ServicePrompt {
  // service / question name.
  public name: string = "Laravel (WEB)";
  // service slug (lowercase, normalized name).
  public slug: string = "app";
  // docker image name.
  public image: string = "ambientum/php";
  // enabled by default status.
  public enabledByDefault: boolean = true;

  // make not-linkable (main service).
  public linkable: boolean = false;

  // tags.
  public tags: string[] = ["7.3-nginx", "7.2-nginx"];

  // port mappings.
  public ports: IPromptPort[] = [
    { name: "HTTP", port: "8080" },
    { name: "HTTPS", port: "8083" },
  ];

  // variables.
  public variables: IPromptVariable[] = [
    { name: "XDEBUG_ENABLED", description: "Enable xDebug?", initial: "true" },
    { name: "PHP_MEMORY_LIMIT", description: "PHP Memory Limit", initial: "256M" },
  ];

  // list of mount points.
  public mountPoints: IPromptMount[] = [
    { source: ".", target: "/var/www/app" },
    { source: "dot-config", target: "/home/ambientum/.config" },
    { source: "dot-cache", target: "/home/ambientum/.cache" },
    { source: "dot-local", target: "/home/ambientum/.local" },
    { source: "dot-composer", target: "/home/ambientum/.composer" },
  ];

  // list of mount points.
  public volumes: IPromptVolume[] = [
    { name: "dot-config", driver: "local" },
    { name: "dot-cache", driver: "local" },
    { name: "dot-local", driver: "local" },
    { name: "dot-composer", driver: "local" },
  ];
}
