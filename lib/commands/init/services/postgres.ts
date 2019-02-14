// import question helpers.
import { Confirm, Form, Select } from "enquirer/lib/prompts";

// enable PostgreSQL support question.
const enablePostgresQuestion = () => (new Confirm({
  name: "enabled",
  message: "Enable PostgreSQL support?",
  default: ("Y/n"),
  initial: false,
}));

// PostgreSQL version question.
const postgresVersionQuestion = () => (new Select({
  name: "version",
  message: "Select PostgreSQL version:",
  choices: [ "9", "10", "11"],
  initial: "9",
}));

// PostgreSQL credentials and ports question.
const postgresConfigQuestion = (name) => (new Form({
  name: "postgres",
  message: "Please configure PostgreSQL settings:",
  choices: [
    { name: "username", message: "PostgreSQL Username:", initial: name },
    { name: "password", message: "PostgreSQL Password:", initial: name },
    { name: "database", message: "PostgreSQL Database Name:", initial: name },
    { name: "exposedPort", message: "Exposed PostgreSQL port on Host:", initial: "5432" },
  ],
}));

/**
 * PostgreSQL service builder.
 *
 * @param {InitBuilder} builder
 *
 * @returns {Promise<*>}
 */
export default async (builder) => {
  // enable Postgres support?
  const enablePostgres = await enablePostgresQuestion().run();

  // return build instance to prevent continue when PostgreSQL should not be enabled.
  if (enablePostgres !== true) {
    return builder;
  }

  // ask which postgres version should be used.
  const version = await postgresVersionQuestion().run();
  // ask postgres credentials.
  const credentials = await postgresConfigQuestion(builder.name).run();
  // save the settings on InitBuilder
  builder.setService("postgres", { ...credentials, version });

  // finish by returning the builder instance.
  return builder;
};
