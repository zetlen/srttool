# srttool

Manipulate and correct .srt subtitle files

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/srttool.svg)](https://npmjs.org/package/srttool)
[![Downloads/week](https://img.shields.io/npm/dw/srttool.svg)](https://npmjs.org/package/srttool)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g srttool
$ srttool COMMAND
running command...
$ srttool (--version)
srttool/0.0.0 darwin-arm64 node-v23.0.0
$ srttool --help [COMMAND]
USAGE
  $ srttool COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`srttool hello PERSON`](#srttool-hello-person)
- [`srttool hello world`](#srttool-hello-world)
- [`srttool help [COMMAND]`](#srttool-help-command)
- [`srttool plugins`](#srttool-plugins)
- [`srttool plugins add PLUGIN`](#srttool-plugins-add-plugin)
- [`srttool plugins:inspect PLUGIN...`](#srttool-pluginsinspect-plugin)
- [`srttool plugins install PLUGIN`](#srttool-plugins-install-plugin)
- [`srttool plugins link PATH`](#srttool-plugins-link-path)
- [`srttool plugins remove [PLUGIN]`](#srttool-plugins-remove-plugin)
- [`srttool plugins reset`](#srttool-plugins-reset)
- [`srttool plugins uninstall [PLUGIN]`](#srttool-plugins-uninstall-plugin)
- [`srttool plugins unlink [PLUGIN]`](#srttool-plugins-unlink-plugin)
- [`srttool plugins update`](#srttool-plugins-update)

## `srttool hello PERSON`

Say hello

```
USAGE
  $ srttool hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ srttool hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/zetlen/srttool/blob/v0.0.0/src/commands/hello/index.ts)_

## `srttool hello world`

Say hello world

```
USAGE
  $ srttool hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ srttool hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/zetlen/srttool/blob/v0.0.0/src/commands/hello/world.ts)_

## `srttool help [COMMAND]`

Display help for srttool.

```
USAGE
  $ srttool help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for srttool.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.18/src/commands/help.ts)_

## `srttool plugins`

List installed plugins.

```
USAGE
  $ srttool plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ srttool plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/index.ts)_

## `srttool plugins add PLUGIN`

Installs a plugin into srttool.

```
USAGE
  $ srttool plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into srttool.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SRTTOOL_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SRTTOOL_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ srttool plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ srttool plugins add myplugin

  Install a plugin from a github url.

    $ srttool plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ srttool plugins add someuser/someplugin
```

## `srttool plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ srttool plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ srttool plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/inspect.ts)_

## `srttool plugins install PLUGIN`

Installs a plugin into srttool.

```
USAGE
  $ srttool plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into srttool.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SRTTOOL_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SRTTOOL_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ srttool plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ srttool plugins install myplugin

  Install a plugin from a github url.

    $ srttool plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ srttool plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/install.ts)_

## `srttool plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ srttool plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ srttool plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/link.ts)_

## `srttool plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ srttool plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ srttool plugins unlink
  $ srttool plugins remove

EXAMPLES
  $ srttool plugins remove myplugin
```

## `srttool plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ srttool plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/reset.ts)_

## `srttool plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ srttool plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ srttool plugins unlink
  $ srttool plugins remove

EXAMPLES
  $ srttool plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/uninstall.ts)_

## `srttool plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ srttool plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ srttool plugins unlink
  $ srttool plugins remove

EXAMPLES
  $ srttool plugins unlink myplugin
```

## `srttool plugins update`

Update installed plugins.

```
USAGE
  $ srttool plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.19/src/commands/plugins/update.ts)_

<!-- commandsstop -->
