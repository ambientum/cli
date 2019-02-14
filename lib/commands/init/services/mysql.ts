// import question helpers.
import { Confirm, Form, Select } from "enquirer/lib/prompts";

// enable MySQL support question.
const enableMySQLQuestion = () => (new Confirm({
  name: "enabled",
  message: "Enable MySQL support?",
  default: ("Y/n"),
}));

// MySQL version question.
const mysqlVersionQuestion = () => (new Select({
  name: "version",
  message: "Select MySQL version:",
  choices: [ "5.6", "5.7", "8.0"],
  initial: "5.7",
}));

// MySQL credentials and ports question.
const mysqlConfigQuestion = (name) => (new Form({
  name: "mysql",
  message: "Please configure MySQL settings:",
  choices: [
    { name: "username", message: "MySQL Username:", initial: name },
    { name: "password", message: "MySQL Password:", initial: name },
    { name: "database", message: "MySQL Database Name:", initial: name },
    { name: "rootPassword", message: "MySQL Root Password:", initial: name },
    { name: "exposedPort", message: "Exposed MySQL port on Host:", initial: "3306" },
  ],
}));

/**
 * MySQL service builder.
 *
 * @param {InitBuilder} builder
 *
 * @returns {Promise<*>}
 */
export default async (builder) => {
  // enable MySQL support?
  const enableMySQL = await enableMySQLQuestion().run();

  // return build instance to prevent continue when MySQL should not be enabled.
  if (enableMySQL !== true) {
    return builder;
  }

  // ask which mysql version should be used.
  const version = await mysqlVersionQuestion().run();
  // ask mysql credentials.
  const credentials = await mysqlConfigQuestion(builder.name).run();
  // save the settings on InitBuilder
  builder.setService("mysql", { ...credentials, version });

  // finish by returning the builder instance.
  return builder;
};
