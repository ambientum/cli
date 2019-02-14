// import inquirer.
// import enquirer from 'enquirer'
// import banner helper.
import { showBanner } from "../../cli/banner";
import { objectToYAML } from "../../compose";
// import database question module.
// import databases from './databases'
// import cache question module.
// import cache from './cache'
// import init builder.
import InitBuilder from "./builder";
// import app name question module.
import appName from "./common/appName";
import laravel from "./services/laravel";
import mongo from "./services/mongo";
import mysql from "./services/mysql";
import postgres from "./services/postgres";
import redis from "./services/redis";

/**
 * Ambientum init builder.
 *
 * @type {InitBuilder}
 */
const builder = new InitBuilder();

/**
 * Ambientum init CLI command.
 *
 * @returns {Promise<InitBuilder>}
 */
export default async () => {

  // show CLI banner.
  showBanner();

  // start questioning project name.
  await appName(builder);

  // question MySQL config.
  await mysql(builder);
  // question PostgreSQL config.
  await postgres(builder);
  // question MongoDB config.
  await mongo(builder);
  // question Redis config.
  await redis(builder);
  // question Laravel config.
  await laravel(builder);

  console.log(builder);
  console.log(builder.getNamedVolumes());
  console.log(objectToYAML({
    services: {
      ...builder.getServices(),
    },
    version: "3.0",
    volumes: {
      ...builder.getNamedVolumes(),
      ...builder.getCacheNamedVolumes(),
    },
  }));
  // return builder to complete the promise.
  return builder;
};
