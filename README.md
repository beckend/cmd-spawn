[![Build Status](https://travis-ci.org/beckend/cmd-spawn.svg?branch=master)](https://travis-ci.org/beckend/cmd-spawn)
[![Coverage Status](https://coveralls.io/repos/github/beckend/cmd-spawn/badge.svg?branch=master)](https://coveralls.io/github/beckend/cmd-spawn?branch=master)
[![npm](https://img.shields.io/npm/v/cmd-spawn.svg??maxAge=2592000)](https://www.npmjs.com/package/cmd-spawn)

# cmd-spawn

Run shell commands as string. Typescript(+typings) ES2015/ES2017 module. Node 6+ spawn with promises, buffered and unbuffered output, inspired by [node-buffered-spawn](https://github.com/IndigoUnited/node-buffered-spawn).

Features:
- Written in typescript and typings are auto generated.
- Promise based (Bluebird instance returned).
- child process exposed in returned promise as `cp` property.
- If shell option is passed to spawn, the shell commands can be run as is, even with pipes.
- Auto passed process.env if spawn env not overriden.
- Normal version and buffered(collects all output and then resolve) option.
- Uses [cross-spawn](https://github.com/IndigoUnited/node-cross-spawn) by default, can be disabled.

## Install

`npm -S i cmd-spawn`


# Usage

### unbuffered(normal spawn)

```js
import { cmdSpawn } from 'cmd-spwawn';
// Inherit process.env auto if not overriden

// Told to run the command as is in a shell
// Returns Bluebird Promise
const promise = cmdSpawn('GITHUB_TOKEN=$TOKEN_ENV git clone git@github.com:beckend/cmd-spawn.git', {
  spawnOpts:
    shell: true
  }
});

// child process is always in property p
promise.cp.on('data', (data: Buffer) => {
  console.log(data.toString());
});

promise.cp.once('close', (code) => {
  if (code === 0) {
    console.log('success');
  } else {
    console.log('fail');
  }
});
```

### buffered spawn
```js
// compile typescript project
const promise = cmdSpawn('tsc --p src/tsconfig-es2015.json', { buffer: true });
// Bluebird
promise
  .then((result) => {
    console.log(result.stdout);
    console.log(result.stderr);
  })
  .catch((er) => {
    // child process error
    console.log(er);
  })
  .finally(() => {
    console.log('done');
  });
```

### More usage examples
Can be found in `src/__test__/cmd-spawn.spec.ts`.


# API

```js
import { cmdSpawn } from 'cmd-spawn';
```
usage: `cmdSpawn(cmd, options)`

| Parameter | Default | Type | Description |
|:---|:---|:---|:---|
| cmd | undefined | `string` or `Array<string>` | command to run, if array is given, the first index is the command and rest is arguments |
| options | `{ spawnOpts: {}, crossSpawn: true, buffer: false }` | `object` | Options described below. |

## options - ? means optional
```js
{
  // Options passed to spawn
  spawnOpts?: SpawnOptions;
  // buffer output flag, default false
  buffer?: boolean;
  // crossSpawn flag, default enabled
  crossSpawn?: boolean;
}
```

## Contributing

### Requires
- `node@6+`
- `npm@4.x` because of `package.json` - `prepare` script. (only required to run hook when publish)
- `npm -g i gulp-cli jest-cli`.

### Usage
- `gulp --tasks` to get going.

### Developing
- `jest --watchAll` to watch recompiled files and rerun tests.

### Testing
Supports:
- `jest`, needs `jest-cli` installed. it will execute the transpiled files from typescript.

### Dist
- `gulp` will run default task which consist of running tasks:
- `lint`, `clean`, `build`, `minify` then `jest` and collect coverage.

Note: All `minified` files are only ES5.
