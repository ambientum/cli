// import question helpers.
import { Confirm, Form, Select } from "enquirer/lib/prompts";

// enable MongoDB support question.
const enableMongoQuestion = () => (new Confirm({
  name: "enabled",
  message: "Enable MongoDB support?",
  default: ("y/N"),
  initial: false,
}));

// MongoDB version question.
const mongoVersionQuestion = () => (new Select({
  name: "version",
  message: "Select MongoDB version:",
  choices: [ "3.4", "3.6", "4.0", "4.1" ],
  initial: "4.1",
}));

// MongoDB credentials and ports question.
const mongoConfigQuestion = (name) => (new Form({
  name: "mongo",
  message: "Please configure MongoDB settings:",
  choices: [
    { name: "username", message: "MongoDB Username:", initial: name },
    { name: "password", message: "MongoDB Password:", initial: name },
    { name: "database", message: "MongoDB Database Name:", initial: name },
    { name: "exposedPort", message: "Exposed MongoDB port on Host:", initial: "27017" },
  ],
}));

/**
 * MongoDB service builder.
 *
 * @param {InitBuilder} builder
 *
 * @returns {Promise<*>}
 */
export default async (builder) => {
  // enable Mongo support?
  const enableMongo = await enableMongoQuestion().run();

  // return build instance to prevent continue when MongoDB should not be enabled.
  if (enableMongo !== true) {
    return builder;
  }

  // ask which mongo version should be used.
  const version = await mongoVersionQuestion().run();
  // ask mongo credentials.
  const credentials = await mongoConfigQuestion(builder.name).run();
  // save the settings on InitBuilder
  builder.setService("mongo", { ...credentials, version });

  // finish by returning the builder instance.
  return builder;
};
