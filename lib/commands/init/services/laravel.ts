// import question helpers.
import { Confirm, Form, Select } from "enquirer/lib/prompts";

// enable Laravel support question.
const enableLaravelQuestion = () => (new Confirm({
  name: "laravel",
  message: "Enable Laravel support?",
  default: ("Y/n"),
}));

// PHP version for running Laravel.
const phpVersionQuestion = () => (new Select({
  name: "phpVersion",
  message: "Select PHP version to run the Laravel app:",
  choices: [ "7.2", "7.3"],
  initial: "7.3",
}));


// Queue type selection
const queueTypeQuestion = () => (new Select({
  name: "queue-type",
  message: "Do you wanna run Laravel Queues?",
  choices: [
    { name: "disabled", message: "No, I do not need Queue workers." },
    { name: "worker", message: "Use default Queue Worker (artisan queue:work)" },
    { name: "horizon", message: "Use Laravel Horizon" },
  ],
  initial: "worker",
}));


// PostgreSQL credentials and ports question.
const laravelConfigQuestion = () => (new Form({
  name: "laravelConfig",
  message: "Please configure specifics about the Laravel project",
  choices: [
    { name: "publicFolder", message: "Laravel public folder:", initial: "public" },
    { name: "exposedHttpPort", message: "Exposed HTTP Port:", initial: "8080" },
    { name: "exposedHttpsPort", message: "Exposed HTTPS Port:", initial: "8083" },
  ],
}));

/**
 * Laravel app service builder.
 *
 * @param {InitBuilder} builder
 *
 * @returns {Promise<*>}
 */
export default async (builder) => {
  // enable Laravel app support?
  const enableLaravel = await enableLaravelQuestion().run();

  // return if Laravel not enabled.
  if (enableLaravel !== true) {
    return builder;
  }

  // ask PHP version to use.
  const phpVersion = await phpVersionQuestion().run();
  // ask postgres credentials.
  const laravelConfig = await laravelConfigQuestion().run();
  // ask what type of queue should run.
  const queueType = await queueTypeQuestion().run();

  // save the settings on InitBuilder
  builder.setService("laravel", { ...laravelConfig, phpVersion, queueType });

  // finish by returning the builder instance.
  return builder;
};
