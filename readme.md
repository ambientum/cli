# @ambientum/cli

[![npm version](https://badge.fury.io/js/%40ambientum%2Fcli.svg)](https://badge.fury.io/js/%40ambientum%2Fcli)
[![Known Vulnerabilities](https://snyk.io/test/github/ambientum/cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ambientum/cli?targetFile=package.json)


Command line interface for **[Ambientum](https://github.com/ambientum/ambientum)**.

```bash
npm -g install @ambientum/cli
```

Ambientum CLI provided the **`amb`** global command, which helps you achieve several goals related to PHP and Node.JS projects:

#### Feature 1: Replace PHP and Node.JS local installations with Docker ones.

That's right, with Ambientum you can replace PHP and Node.JS installs by Dockerized versions and keep you system clean.

All data is persisted on special volumes and you current directory is automatically mapped to the container.

###### PHP Examples:

Using Composer:
```
amb -p composer create laravel/laravel my-project
```

Running a PHP script:
```
amb -p php my/path/to/script.php
```

###### Node.JS Examples:

Using NPM
```
amb -n npm -g install @vue/cli
amb -n vue create my-project
```

#### Install

You can install ambientum-cli through NPM, as a global command:

```
npm install -g @ambientum/cli
```

