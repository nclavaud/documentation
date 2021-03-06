---
title: Bundler Configuration
modified_at: 2019-12-19 00:00:00
tags: Ruby Bundler
---

Bundler is the tool used to manager Ruby dependencies. It can be configured by
several ways, through the edition of the `.bundle/config` file in your
application project or through the environment. It is recommended not to check
in the `.bundle/config` file in your GIT repository and keep this file to
configure your development setup. The best practice here is to configure
Bundler through environment variables.

## Dependencies Installation

During the deployment of a Ruby application, the following command is run:

```
bundle install --without development:test --path vendor/bundle --binstubs vendor/bundle/bin
```

Most options of the `bundle install` command are configurable through
environment variables starting with `BUNDLE_`. For instance, if you have a
dependency group `ci`, and you want to exclude it from the production
deployment you can define:

```
$ scalingo env-set BUNDLE_WITHOUT=development:test:ci
```

## Gem Source protected by User and Password

If you need to install a gem which is in a repository requiring authentication:

```
gem "custom-gem", source: "https://gems.acmecorp.com"
```

You can inject the authentication thanks to the following environment variable:

```
$ scalingo env-set BUNDLE_GEMS__ACMECORP__COM=username:password
```

Then, Bundler will automatically use these credentials. It is recommended to try the configuration
locally before deploying, as if it fails locally, it will fail on Scalingo:

```
## Example: BUNDLE_SUBDOMAIN__DOMAIN__TLD=user:password

$ BUNDLE_GEMS__ACMECORP__COM=username:password bundle install
```

## Gem Build Configuration

Some gems can get optional flags when they are installed. It's especially
common for gems built from C code, which can receive compilation option flags,
for instance with the gem `sassc`

```
gem install sassc -- --disable-march-tune-native
```

If you want to use these flags when the gem is installed with Bundler, you need
to define the following environment variable:

```
## Example: BUNDLE_BUILD__<GEM>=<options>

$ scalingo env-set BUNDLE_BUILD__SASSC=--disable-march-tune-native
```

Once the variable is setup, it will automatically be used by Bundler when `bundle install` used.

