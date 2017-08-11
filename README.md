# has-require-or-import

> Check if code requires/imports any module or a specific id

A fork of `has-require` by [Ben Drucker](http://bendrucker.me). (Thanks Ben!)

## Installing

```bash
$ npm install --save has-require-or-import
```

## Usage

```js
var hasRequire = require('has-require-or-import')
hasRequire('require("foo")', 'foo') // => true
hasRequire('import foo from "bar"', 'bar') // => true
hasRequire.any('require') // => false
```

## API

For full implementation details, see the [`Checker`](#checker) API.

#### `hasRequire(code, id)` -> `boolean`

##### code

*Required*  
Type: `string`

The code to check.

##### id

*Required*  
Type: `string`

The module id to check, e.g. `'http'`.

##### `hasRequire.any(code)` -> `boolean`

#### code

*Required*  
Type: `string`

The code to check.

<hr>

### `Checker`

#### `new hasRequire.Checker(code)` -> `checker`

##### code

*Required*  
Type: `string`

The code to store on the checker.

##### `checker.any()` -> `boolean`

Checks if any string literal is required. The result is cached. The following code won't be matched:

* `require`
* `require()`
* `require('')`

##### `checker.has(id)` -> `boolean`

##### id

*Required*  
Type: `string`

The module id to check, e.g. `'http'`.

Uses `checker.any()` first, so calling `has` for multiple ids when no `require` is present (`!checker.any()`) will avoid needlessly re-testing the code.

## License

Bulk of the program:<br/>
MIT © [Ben Drucker](http://bendrucker.me)

Small modifications to check for import statements:<br/>
MIT © [Sam Gluck](github.com/sdgluck)
