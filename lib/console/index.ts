// import ConsoleKernel class.
import { ConsoleApplication } from "lib/support/console/application";
// import project options from package.json.
import { slug, title, version } from "package.json";
// import console groups.
import commonGroup from "./common";
import initGroup from "./init";
import runnerGroup from "./runner";

// bootstrap function (initialize application instance).
export const bootstrap = () => {
  // create & export console application instance.
  const app = ConsoleApplication.init({ title, slug, version });

  // add runner group commands.
  app.addCommandGroup(runnerGroup());
  // add common group commands.
  app.addCommandGroup(commonGroup());
  // add init group commands.
  app.addCommandGroup(initGroup());

  // return app instance.
  return app;
};

// alias bootstrap as default export.
export default bootstrap;
