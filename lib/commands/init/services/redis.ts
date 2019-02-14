// import question helpers.
import { Confirm, Form, Select } from "enquirer/lib/prompts";

// enable Redis support question.
const enableRedisQuestion = () => (new Confirm({
  name: "enabled",
  message: "Enable Redis support?",
  default: ("Y/n"),
}));

// Redis version question.
const redisVersionQuestion = () => (new Select({
  name: "version",
  message: "Select Redis version:",
  choices: [ "4.0", "5.0" ],
  initial: "4.0",
}));

// Redis credentials and ports question.
const redisConfigQuestion = (name) => (new Form({
  name: "redis",
  message: "Please configure Redis settings:",
  choices: [
    { name: "password", message: "Redis Password:", initial: name },
    { name: "exposedPort", message: "Exposed Redis port on Host:", initial: "6379" },
  ],
}));

/**
 * Redis service builder.
 *
 * @param {InitBuilder} builder
 *
 * @returns {Promise<*>}
 */
export default async (builder) => {
  // enable Redis support?
  const enableRedis = await enableRedisQuestion().run();

  // return build instance to prevent continue when Redis should not be enabled.
  if (enableRedis !== true) {
    return builder;
  }

  // ask which redis version should be used.
  const version = await redisVersionQuestion().run();
  // ask redis credentials.
  const credentials = await redisConfigQuestion(builder.name).run();
  // save the settings on InitBuilder
  builder.setService("redis", { ...credentials, version });

  // finish by returning the builder instance.
  return builder;
};
