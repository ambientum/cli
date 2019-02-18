// imports.
import { ConsoleApplication } from 'lib/support/console';
import { slug, title, version } from 'package.json';
// import groups.
import commonGroup from 'lib/console/common';
import composeGroup from 'lib/console/compose';
import runnerGroup from 'lib/console/runner';

// bootstrap function (initialize application instance).
export const bootstrap = () => {
  // create & export console application instance.
  const app = ConsoleApplication.init({ title, slug, version });

  // add runner group commands.
  app.addCommandGroup(runnerGroup());
  // add compose group commands.
  app.addCommandGroup(composeGroup());
  // add common group commands.
  app.addCommandGroup(commonGroup());

  // return app instance.
  return app;
};

// alias bootstrap as default export.
export default bootstrap;
