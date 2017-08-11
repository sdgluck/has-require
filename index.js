'use strict'

var escape = require('escape-string-regexp')

module.exports = hasRequire

function hasRequire (code, id) {
  return new RequireChecker(code).has(id)
}

hasRequire.any = function anyRequire (code) {
  return new RequireChecker(code).any()
}

hasRequire.Checker = RequireChecker

function RequireChecker (code) {
  this.code = code
}

var anyRequireRegExp = createRequireRegExp('@?[A-Za-z0-9/_.-]+')
var anyImportRegExp = createImportRegExp('@?[A-Za-z0-9/_.-]+')
RequireChecker.prototype.any = function anyRequire () {
  if (this._any != null) return this._any
  this._any = (
    anyRequireRegExp.test(this.code) ||
    anyImportRegExp.test(this.code)
  )
  return this._any
}

RequireChecker.prototype.has = function has (id) {
  if (!id) throw new Error('module id is required')
  return this.any() && (
      createRequireRegExp(escape(id)).test(this.code) ||
    createImportRegExp(escape(id)).test(this.code)
  )
}

function createRequireRegExp (input) {
  return new RegExp([
    escape('require('),
    '\\s*[\'"]',
    input,
    '[\'"]\\s*',
    escape(')')
  ].join(''))
}

function createImportRegExp (input) {
  return new RegExp([
    'from',
    '\\s+[\'"]',
    input,
    '[\'"]\\s*'
  ].join(''))
}
