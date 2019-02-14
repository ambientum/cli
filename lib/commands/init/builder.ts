// import lodash helpers.
import { assign, each, get, map, set, zipObject } from "lodash";

// declare default options object.
export const defaultOptions = {
  name: null,
  services: {
    laravel: null,
    mongo: null,
    mysql: null,
    postgres: null,
    redis: null,
  },
};

// caching volumes
const cachingVolumes = [
  { name: "dot-config" },
  { name: "dot-local" },
  { name: "dot-cache" },
  { name: "dot-composer" },
];

/**
 * Ambientum CLI - Init Command Builder
 */
export default class InitBuilder {

  public name;
  public services;
  /**
   * InitBuilder constructor.
   *
   * @param options
   */
  constructor(options = defaultOptions) {
    // merge passed options with default options.
    const mergedOptions = assign({}, defaultOptions, options);

    // assign name on instance.
    this.name = get(mergedOptions, "name");
    // assign services on instance.
    this.services = get(mergedOptions, "services");
  }

  /**
   * Name setter.
   *
   * @param name
   */
  public setName(name) {
    this.name = name;
  }

  /**
   * Service setter.
   *
   * @param {String} name
   * @param {Object} service
   */
  public setService(name, service) {
    set(this.services, name, service);
  }

  /**
   * Get named volumes.
   *
   * @returns {Object}
   */
  public getNamedVolumes() {
    // start named volumes array.
    const volumes = [];

    // loop through enabled services, so we can create volumes for services who need.
    map(["mysql", "postgres", "mongo", "redis"], (name) => {
      if (get(this.services, name, null) !== null) {
        volumes.push(`${name}-data`);
      }
    });

    // return volumes list.
    return zipObject(volumes, map(volumes, () => ({})));
  }

  /**
   * Get cache named volumes.
   *
   * @returns {Object}
   */
  public getCacheNamedVolumes() {
    // start volumes array.
    const volumes = [];
    // loop through local caching volume names, pushing each one.
    each(["config", "local", "cache", "composer"], (name) => {
      // volumes like 'dot-local', 'dot-cache' are to be mounted on container home directory
      volumes.push(`dot-${name}`);
    });

    // return cache volumes.
    return zipObject(volumes, map(volumes, () => ({})));
  }

  public getServices() {
    const composeServices = {};
    // build MySQL, case enabled.
    if (this.services.mysql !== null) {
      composeServices.mysql = this.getMySQLService();
    }

    // build PostgreSQL, case enabled.
    if (this.services.postgres !== null) {
      composeServices.postgres = this.getPostgresService();
    }

    // build MongoDB, case enabled.
    if (this.services.mongo !== null) {
      composeServices.mongo = this.getMongoService();
    }

    return composeServices;
  }

  public getMySQLService() {
    const config = this.services.mysql;
    const service = {
      image: `mysql:${config.version}`,
      volumes: [
        "mysql-data:/var/lib/mysql",
      ],
      environment: [
        `MYSQL_DATABASE=${get(config, "database")}`,
        `MYSQL_USER=${get(config, "username")}`,
        `MYSQL_PASSWORD=${get(config, "password")}`,
        `MYSQL_ROOT_PASSWORD=${get(config, "rootPassword")}`,
      ],
    };

    const exposedPort = get(config, "exposedPort", null);
    if (exposedPort !== null) {
      service.ports = [
        `${exposedPort}:3306`,
      ];
    }

    return service;
  }

  public getPostgresService() {
    const config = this.services.postgres;
    const service = {
      image: `postgres:${config.version}`,
      volumes: [
        "postgres-data:/var/lib/postgresql/data",
      ],
      environment: [
        `POSTGRES_DB=${get(config, "database")}`,
        `POSTGRES_USER=${get(config, "username")}`,
        `POSTGRES_PASSWORD=${get(config, "password")}`,
      ],
    };

    const exposedPort = get(config, "exposedPort", null);
    if (exposedPort !== null) {
      service.ports = [
        `${exposedPort}:5432`,
      ];
    }

    return service;
  }

  public getMongoService() {
    const config = this.services.mongo;
    const service = {
      image: `mongo:${config.version}`,
      volumes: [
        "mongo-data:/data/db",
      ],
      environment: [
        `MONGO_INITDB_ROOT_USERNAME=${get(config, "username")}`,
        `MONGO_INITDB_ROOT_PASSWORD=${get(config, "password")}`,
        `MONGO_INITDB_ROOT_DATABASE=${get(config, "database")}`,
      ],
    };

    const exposedPort = get(config, "exposedPort", null);
    if (exposedPort !== null) {
      service.ports = [
        `${exposedPort}:27017`,
      ];
    }

    return service;
  }
}
