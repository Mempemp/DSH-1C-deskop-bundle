import { createRequire as __mcpManagerRequire } from "node:module";
const require = __mcpManagerRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/cosmokit@1.8.1/node_modules/cosmokit/lib/index.cjs
var require_lib = __commonJS({
  "../../node_modules/.pnpm/cosmokit@1.8.1/node_modules/cosmokit/lib/index.cjs"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports = {};
    __export2(index_exports, {
      Binary: () => Binary,
      Time: () => Time,
      arrayBufferToBase64: () => arrayBufferToBase64,
      arrayBufferToHex: () => arrayBufferToHex,
      base64ToArrayBuffer: () => base64ToArrayBuffer,
      camelCase: () => camelCase,
      camelize: () => camelize,
      capitalize: () => capitalize,
      clone: () => clone,
      contain: () => contain,
      deduplicate: () => deduplicate,
      deepEqual: () => deepEqual,
      defineProperty: () => defineProperty,
      difference: () => difference,
      filterKeys: () => filterKeys,
      formatProperty: () => formatProperty,
      hexToArrayBuffer: () => hexToArrayBuffer,
      hyphenate: () => hyphenate,
      intersection: () => intersection,
      is: () => is,
      isNonNullable: () => isNonNullable,
      isNullable: () => isNullable,
      isPlainObject: () => isPlainObject,
      makeArray: () => makeArray,
      mapValues: () => mapValues,
      noop: () => noop,
      omit: () => omit,
      paramCase: () => paramCase,
      pick: () => pick,
      remove: () => remove,
      sanitize: () => sanitize,
      snakeCase: () => snakeCase,
      trimSlash: () => trimSlash,
      uncapitalize: () => uncapitalize,
      union: () => union,
      valueMap: () => mapValues
    });
    module.exports = __toCommonJS(index_exports);
    function noop() {
    }
    function isNullable(value) {
      return value === null || value === void 0;
    }
    function isNonNullable(value) {
      return !isNullable(value);
    }
    function isPlainObject(data) {
      return data && typeof data === "object" && !Array.isArray(data);
    }
    function filterKeys(object, filter) {
      return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
    }
    function mapValues(object, transform) {
      return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
    }
    function pick(source, keys, forced) {
      if (!keys) return { ...source };
      const result = {};
      for (const key of keys) {
        if (forced || source[key] !== void 0) result[key] = source[key];
      }
      return result;
    }
    function omit(source, keys) {
      if (!keys) return { ...source };
      const result = { ...source };
      for (const key of keys) {
        Reflect.deleteProperty(result, key);
      }
      return result;
    }
    function defineProperty(object, key, value) {
      return Object.defineProperty(object, key, { writable: true, value, enumerable: false });
    }
    function contain(array1, array2) {
      return array2.every((item) => array1.includes(item));
    }
    function intersection(array1, array2) {
      return array1.filter((item) => array2.includes(item));
    }
    function difference(array1, array2) {
      return array1.filter((item) => !array2.includes(item));
    }
    function union(array1, array2) {
      return Array.from(/* @__PURE__ */ new Set([...array1, ...array2]));
    }
    function deduplicate(array) {
      return [...new Set(array)];
    }
    function remove(list, item) {
      const index = list?.indexOf(item);
      if (index >= 0) {
        list.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function makeArray(source) {
      return Array.isArray(source) ? source : isNullable(source) ? [] : [source];
    }
    function is(type, value) {
      if (arguments.length === 1) return (value2) => is(type, value2);
      return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
    }
    function isArrayBufferLike(value) {
      return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
    }
    function isArrayBufferSource(value) {
      return isArrayBufferLike(value) || ArrayBuffer.isView(value);
    }
    var Binary;
    ((Binary2) => {
      Binary2.is = isArrayBufferLike;
      Binary2.isSource = isArrayBufferSource;
      function fromSource(source) {
        if (ArrayBuffer.isView(source)) {
          return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
        } else {
          return source;
        }
      }
      Binary2.fromSource = fromSource;
      function toBase64(source) {
        source = fromSource(source);
        if (typeof Buffer !== "undefined") {
          return Buffer.from(source).toString("base64");
        }
        let binary = "";
        const bytes = new Uint8Array(source);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      Binary2.toBase64 = toBase64;
      function fromBase64(source) {
        if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "base64"));
        return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
      }
      Binary2.fromBase64 = fromBase64;
      function toHex(source) {
        source = fromSource(source);
        if (typeof Buffer !== "undefined") return Buffer.from(source).toString("hex");
        return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
      }
      Binary2.toHex = toHex;
      function fromHex(source) {
        if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "hex"));
        const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
        const buffer = [];
        for (let i = 0; i < hex.length; i += 2) {
          buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
        }
        return Uint8Array.from(buffer).buffer;
      }
      Binary2.fromHex = fromHex;
    })(Binary || (Binary = {}));
    var base64ToArrayBuffer = Binary.fromBase64;
    var arrayBufferToBase64 = Binary.toBase64;
    var hexToArrayBuffer = Binary.fromHex;
    var arrayBufferToHex = Binary.toHex;
    function clone(source, refs = /* @__PURE__ */ new Map()) {
      if (!source || typeof source !== "object") return source;
      if (is("Date", source)) return new Date(source.valueOf());
      if (is("RegExp", source)) return new RegExp(source.source, source.flags);
      if (isArrayBufferLike(source)) return source.slice(0);
      if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
      const cached = refs.get(source);
      if (cached) return cached;
      if (Array.isArray(source)) {
        const result2 = [];
        refs.set(source, result2);
        source.forEach((value, index) => {
          result2[index] = Reflect.apply(clone, null, [value, refs]);
        });
        return result2;
      }
      const result = Object.create(Object.getPrototypeOf(source));
      refs.set(source, result);
      for (const key of Reflect.ownKeys(source)) {
        const descriptor = { ...Reflect.getOwnPropertyDescriptor(source, key) };
        if ("value" in descriptor) {
          descriptor.value = Reflect.apply(clone, null, [descriptor.value, refs]);
        }
        Reflect.defineProperty(result, key, descriptor);
      }
      return result;
    }
    function deepEqual(a, b, strict) {
      if (a === b) return true;
      if (!strict && isNullable(a) && isNullable(b)) return true;
      if (typeof a !== typeof b) return false;
      if (typeof a !== "object") return false;
      if (!a || !b) return false;
      function check(test, then) {
        return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
      }
      return check(Array.isArray, (a2, b2) => a2.length === b2.length && a2.every((item, index) => deepEqual(item, b2[index]))) ?? check(is("Date"), (a2, b2) => a2.valueOf() === b2.valueOf()) ?? check(is("RegExp"), (a2, b2) => a2.source === b2.source && a2.flags === b2.flags) ?? check(isArrayBufferLike, (a2, b2) => {
        if (a2.byteLength !== b2.byteLength) return false;
        const viewA = new Uint8Array(a2);
        const viewB = new Uint8Array(b2);
        for (let i = 0; i < viewA.length; i++) {
          if (viewA[i] !== viewB[i]) return false;
        }
        return true;
      }) ?? Object.keys({ ...a, ...b }).every((key) => deepEqual(a[key], b[key], strict));
    }
    function capitalize(source) {
      return source.charAt(0).toUpperCase() + source.slice(1);
    }
    function uncapitalize(source) {
      return source.charAt(0).toLowerCase() + source.slice(1);
    }
    function camelCase(source) {
      return source.replace(/[_-][a-z]/g, (str) => str.slice(1).toUpperCase());
    }
    function tokenize2(source, delimiters, delimiter) {
      const output = [];
      let state = 0;
      for (let i = 0; i < source.length; i++) {
        const code = source.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          if (state === 1) {
            const next = source.charCodeAt(i + 1);
            if (next >= 97 && next <= 122) {
              output.push(delimiter);
            }
            output.push(code + 32);
          } else {
            if (state !== 0) {
              output.push(delimiter);
            }
            output.push(code + 32);
          }
          state = 1;
        } else if (code >= 97 && code <= 122) {
          output.push(code);
          state = 2;
        } else if (delimiters.includes(code)) {
          if (state !== 0) {
            output.push(delimiter);
          }
          state = 0;
        } else {
          output.push(code);
        }
      }
      return String.fromCharCode(...output);
    }
    function paramCase(source) {
      return tokenize2(source, [45, 95], 45);
    }
    function snakeCase(source) {
      return tokenize2(source, [45, 95], 95);
    }
    var camelize = camelCase;
    var hyphenate = paramCase;
    function formatProperty(key) {
      if (typeof key !== "string") return `[${key.toString()}]`;
      return /^[a-z_$][\w$]*$/i.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;
    }
    function trimSlash(source) {
      return source.replace(/\/$/, "");
    }
    function sanitize(source) {
      if (!source.startsWith("/")) source = "/" + source;
      return trimSlash(source);
    }
    var Time;
    ((Time2) => {
      Time2.millisecond = 1;
      Time2.second = 1e3;
      Time2.minute = Time2.second * 60;
      Time2.hour = Time2.minute * 60;
      Time2.day = Time2.hour * 24;
      Time2.week = Time2.day * 7;
      let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
      function setTimezoneOffset(offset) {
        timezoneOffset = offset;
      }
      Time2.setTimezoneOffset = setTimezoneOffset;
      function getTimezoneOffset() {
        return timezoneOffset;
      }
      Time2.getTimezoneOffset = getTimezoneOffset;
      function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
        if (typeof date === "number") date = new Date(date);
        if (offset === void 0) offset = timezoneOffset;
        return Math.floor((date.valueOf() / Time2.minute - offset) / 1440);
      }
      Time2.getDateNumber = getDateNumber;
      function fromDateNumber(value, offset) {
        const date = new Date(value * Time2.day);
        if (offset === void 0) offset = timezoneOffset;
        return new Date(+date + offset * Time2.minute);
      }
      Time2.fromDateNumber = fromDateNumber;
      const numeric = /\d+(?:\.\d+)?/.source;
      const timeRegExp = new RegExp(`^${[
        "w(?:eek(?:s)?)?",
        "d(?:ay(?:s)?)?",
        "h(?:our(?:s)?)?",
        "m(?:in(?:ute)?(?:s)?)?",
        "s(?:ec(?:ond)?(?:s)?)?"
      ].map((unit) => `(${numeric}${unit})?`).join("")}$`);
      function parseTime(source) {
        const capture = timeRegExp.exec(source);
        if (!capture) return 0;
        return (parseFloat(capture[1]) * Time2.week || 0) + (parseFloat(capture[2]) * Time2.day || 0) + (parseFloat(capture[3]) * Time2.hour || 0) + (parseFloat(capture[4]) * Time2.minute || 0) + (parseFloat(capture[5]) * Time2.second || 0);
      }
      Time2.parseTime = parseTime;
      function parseDate(date) {
        const parsed = parseTime(date);
        if (parsed) {
          date = Date.now() + parsed;
        } else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
          date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
        } else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
          date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
        }
        return date ? new Date(date) : /* @__PURE__ */ new Date();
      }
      Time2.parseDate = parseDate;
      function format(ms) {
        const abs = Math.abs(ms);
        if (abs >= Time2.day - Time2.hour / 2) {
          return Math.round(ms / Time2.day) + "d";
        } else if (abs >= Time2.hour - Time2.minute / 2) {
          return Math.round(ms / Time2.hour) + "h";
        } else if (abs >= Time2.minute - Time2.second / 2) {
          return Math.round(ms / Time2.minute) + "m";
        } else if (abs >= Time2.second) {
          return Math.round(ms / Time2.second) + "s";
        }
        return ms + "ms";
      }
      Time2.format = format;
      function toDigits(source, length = 2) {
        return source.toString().padStart(length, "0");
      }
      Time2.toDigits = toDigits;
      function template(template2, time = /* @__PURE__ */ new Date()) {
        return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
      }
      Time2.template = template;
    })(Time || (Time = {}));
  }
});

// ../../node_modules/.pnpm/schemastery@3.18.0/node_modules/schemastery/lib/index.cjs
var require_lib2 = __commonJS({
  "../../node_modules/.pnpm/schemastery@3.18.0/node_modules/schemastery/lib/index.cjs"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var import_cosmokit = require_lib();
    var kSchema = /* @__PURE__ */ Symbol.for("schemastery");
    var kValidationError = /* @__PURE__ */ Symbol.for("ValidationError");
    globalThis.__schemastery_index__ ??= 0;
    globalThis.__schemastery_refs__ = void 0;
    var ValidationError = class extends TypeError {
      constructor(message, options) {
        let prefix = "$";
        for (const segment of options.path || []) {
          if (typeof segment === "string") {
            prefix += "." + segment;
          } else if (typeof segment === "number") {
            prefix += "[" + segment + "]";
          } else if (typeof segment === "symbol") {
            prefix += `[Symbol(${segment.toString()})]`;
          }
        }
        if (prefix.startsWith(".")) prefix = prefix.slice(1);
        super((prefix === "$" ? "" : `${prefix} `) + message);
        this.options = options;
      }
      static {
        __name(this, "ValidationError");
      }
      name = "ValidationError";
      static is(error) {
        return !!error?.[kValidationError];
      }
    };
    Object.defineProperty(ValidationError.prototype, kValidationError, {
      value: true
    });
    var Schema = /* @__PURE__ */ __name(function(options) {
      const schema = /* @__PURE__ */ __name(function(data, options2 = {}) {
        return Schema.resolve(data, schema, options2)[0];
      }, "schema");
      if (options.refs) {
        const refs = (0, import_cosmokit.valueMap)(options.refs, (options2) => new Schema(options2));
        const getRef = /* @__PURE__ */ __name((uid) => refs[uid], "getRef");
        for (const key in refs) {
          const options2 = refs[key];
          options2.sKey = getRef(options2.sKey);
          options2.inner = getRef(options2.inner);
          options2.list = options2.list && options2.list.map(getRef);
          options2.dict = options2.dict && (0, import_cosmokit.valueMap)(options2.dict, getRef);
        }
        return refs[options.uid];
      }
      Object.assign(schema, options);
      if (typeof schema.callback === "string") {
        try {
          schema.callback = new Function("return " + schema.callback)();
        } catch {
        }
      }
      Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
      Object.setPrototypeOf(schema, Schema.prototype);
      schema.meta ||= {};
      schema.toString = schema.toString.bind(schema);
      return schema;
    }, "Schema");
    Schema.prototype = Object.create(Function.prototype);
    Schema.prototype[kSchema] = true;
    Object.defineProperty(Schema.prototype, "~standard", {
      get() {
        return {
          version: 1,
          vendor: "schemastery",
          validate: /* @__PURE__ */ __name((value) => {
            try {
              return { value: Schema.resolve(value, this, {})[0] };
            } catch (error) {
              if (ValidationError.is(error)) {
                return { issues: [{ message: error.message, path: error.options.path }] };
              }
              throw error;
            }
          }, "validate")
        };
      }
    });
    Schema.ValidationError = ValidationError;
    Schema.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
      if (globalThis.__schemastery_refs__) {
        globalThis.__schemastery_refs__[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
        return this.uid;
      }
      globalThis.__schemastery_refs__ = { [this.uid]: { ...this } };
      globalThis.__schemastery_refs__[this.uid] = JSON.parse(JSON.stringify({ ...this }));
      const result = { uid: this.uid, refs: globalThis.__schemastery_refs__ };
      globalThis.__schemastery_refs__ = void 0;
      return result;
    }, "toJSON");
    Schema.prototype.set = /* @__PURE__ */ __name(function set(key, value) {
      this.dict[key] = value;
      return this;
    }, "set");
    Schema.prototype.push = /* @__PURE__ */ __name(function push(value) {
      this.list.push(value);
      return this;
    }, "push");
    function mergeDesc(original, messages) {
      const result = typeof original === "string" ? { "": original } : { ...original };
      for (const locale in messages) {
        const value = messages[locale];
        if (value?.$description || value?.$desc) {
          result[locale] = value.$description || value.$desc;
        } else if (typeof value === "string") {
          result[locale] = value;
        }
      }
      return result;
    }
    __name(mergeDesc, "mergeDesc");
    function getInner(value) {
      return value?.$value ?? value?.$inner;
    }
    __name(getInner, "getInner");
    function extractKeys(data) {
      return (0, import_cosmokit.filterKeys)(data ?? {}, (key) => !key.startsWith("$"));
    }
    __name(extractKeys, "extractKeys");
    Schema.prototype.i18n = /* @__PURE__ */ __name(function i18n(messages) {
      const schema = Schema(this);
      const desc = mergeDesc(schema.meta.description, messages);
      if (Object.keys(desc).length) schema.meta.description = desc;
      if (schema.dict) {
        schema.dict = (0, import_cosmokit.valueMap)(schema.dict, (inner, key) => {
          return inner.i18n((0, import_cosmokit.valueMap)(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
        });
      }
      if (schema.list) {
        schema.list = schema.list.map((inner, index) => {
          return inner.i18n((0, import_cosmokit.valueMap)(messages, (data = {}) => {
            if (Array.isArray(getInner(data))) return getInner(data)[index];
            if (Array.isArray(data)) return data[index];
            return extractKeys(data);
          }));
        });
      }
      if (schema.inner) {
        schema.inner = schema.inner.i18n((0, import_cosmokit.valueMap)(messages, (data) => {
          if (getInner(data)) return getInner(data);
          return extractKeys(data);
        }));
      }
      if (schema.sKey) {
        schema.sKey = schema.sKey.i18n((0, import_cosmokit.valueMap)(messages, (data) => data?.$key));
      }
      return schema;
    }, "i18n");
    Schema.prototype.extra = /* @__PURE__ */ __name(function extra(key, value) {
      const schema = Schema(this);
      schema.meta = { ...schema.meta, [key]: value };
      return schema;
    }, "extra");
    for (const key of ["required", "disabled", "collapse", "hidden", "loose"]) {
      Object.assign(Schema.prototype, {
        [key](value = true) {
          const schema = Schema(this);
          schema.meta = { ...schema.meta, [key]: value };
          return schema;
        }
      });
    }
    Schema.prototype.deprecated = /* @__PURE__ */ __name(function deprecated() {
      const schema = Schema(this);
      schema.meta.badges ||= [];
      schema.meta.badges.push({ text: "deprecated", type: "danger" });
      return schema;
    }, "deprecated");
    Schema.prototype.experimental = /* @__PURE__ */ __name(function experimental() {
      const schema = Schema(this);
      schema.meta.badges ||= [];
      schema.meta.badges.push({ text: "experimental", type: "warning" });
      return schema;
    }, "experimental");
    Schema.prototype.pattern = /* @__PURE__ */ __name(function pattern(regexp) {
      const schema = Schema(this);
      const pattern2 = (0, import_cosmokit.pick)(regexp, ["source", "flags"]);
      schema.meta = { ...schema.meta, pattern: pattern2 };
      return schema;
    }, "pattern");
    Schema.prototype.simplify = /* @__PURE__ */ __name(function simplify(value) {
      if ((0, import_cosmokit.deepEqual)(value, this.meta.default, this.type === "dict")) return null;
      if ((0, import_cosmokit.isNullable)(value)) return value;
      if (this.type === "object" || this.type === "dict") {
        const result = {};
        for (const key in value) {
          const schema = this.type === "object" ? this.dict[key] : this.inner;
          const item = schema?.simplify(value[key]);
          if (this.type === "dict" || !(0, import_cosmokit.isNullable)(item)) result[key] = item;
        }
        if ((0, import_cosmokit.deepEqual)(result, this.meta.default, this.type === "dict")) return null;
        return result;
      } else if (this.type === "array" || this.type === "tuple") {
        const result = [];
        value.forEach((value2, index) => {
          const schema = this.type === "array" ? this.inner : this.list[index];
          const item = schema ? schema.simplify(value2) : value2;
          result.push(item);
        });
        return result;
      } else if (this.type === "intersect") {
        const result = {};
        for (const item of this.list) {
          Object.assign(result, item.simplify(value));
        }
        return result;
      } else if (this.type === "union") {
        for (const schema of this.list) {
          try {
            Schema.resolve(value, schema, {});
            return schema.simplify(value);
          } catch {
          }
        }
      }
      return value;
    }, "simplify");
    Schema.prototype.toString = /* @__PURE__ */ __name(function toString(inline) {
      return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
    }, "toString");
    Schema.prototype.role = /* @__PURE__ */ __name(function role(role, extra2) {
      const schema = Schema(this);
      schema.meta = { ...schema.meta, role, extra: extra2 };
      return schema;
    }, "role");
    for (const key of ["default", "link", "comment", "description", "max", "min", "step"]) {
      Object.assign(Schema.prototype, {
        [key](value) {
          const schema = Schema(this);
          schema.meta = { ...schema.meta, [key]: value };
          return schema;
        }
      });
    }
    var resolvers = {};
    Schema.extend = /* @__PURE__ */ __name(function extend(type, resolve22) {
      resolvers[type] = resolve22;
    }, "extend");
    Schema.resolve = /* @__PURE__ */ __name(function resolve4(data, schema, options = {}, strict = false) {
      if (!schema) return [data];
      if (options.ignore?.(data, schema)) return [data];
      if ((0, import_cosmokit.isNullable)(data) && schema.type !== "lazy") {
        if (schema.meta.required) throw new ValidationError(`missing required value`, options);
        let current = schema;
        let fallback = schema.meta.default;
        while (current?.type === "intersect" && (0, import_cosmokit.isNullable)(fallback)) {
          current = current.list[0];
          fallback = current?.meta.default;
        }
        if ((0, import_cosmokit.isNullable)(fallback)) return [data];
        data = (0, import_cosmokit.clone)(fallback);
      }
      const callback = resolvers[schema.type];
      if (!callback) throw new ValidationError(`unsupported type "${schema.type}"`, options);
      try {
        return callback(data, schema, options, strict);
      } catch (error) {
        if (!schema.meta.loose) throw error;
        return [schema.meta.default];
      }
    }, "resolve");
    Schema.from = /* @__PURE__ */ __name(function from(source) {
      if ((0, import_cosmokit.isNullable)(source)) {
        return Schema.any();
      } else if (["string", "number", "boolean"].includes(typeof source)) {
        return Schema.const(source).required();
      } else if (source[kSchema]) {
        return source;
      } else if (typeof source === "function") {
        switch (source) {
          case String:
            return Schema.string().required();
          case Number:
            return Schema.number().required();
          case Boolean:
            return Schema.boolean().required();
          case Function:
            return Schema.function().required();
          default:
            return Schema.is(source).required();
        }
      } else {
        throw new TypeError(`cannot infer schema from ${source}`);
      }
    }, "from");
    Schema.lazy = /* @__PURE__ */ __name(function lazy(builder) {
      const toJSON2 = /* @__PURE__ */ __name(() => {
        if (!schema.inner[kSchema]) {
          schema.inner = schema.builder();
          schema.inner.meta = { ...schema.meta, ...schema.inner.meta };
        }
        return schema.inner.toJSON();
      }, "toJSON");
      const schema = new Schema({ type: "lazy", builder, inner: { toJSON: toJSON2 } });
      return schema;
    }, "lazy");
    Schema.natural = /* @__PURE__ */ __name(function natural() {
      return Schema.number().step(1).min(0);
    }, "natural");
    Schema.percent = /* @__PURE__ */ __name(function percent() {
      return Schema.number().step(0.01).min(0).max(1).role("slider");
    }, "percent");
    Schema.date = /* @__PURE__ */ __name(function date() {
      return Schema.union([
        Schema.is(Date),
        Schema.transform(Schema.string().role("datetime"), (value, options) => {
          const date2 = new Date(value);
          if (isNaN(+date2)) throw new ValidationError(`invalid date "${value}"`, options);
          return date2;
        }, true)
      ]);
    }, "date");
    Schema.regExp = /* @__PURE__ */ __name(function regExp(flag = "") {
      return Schema.union([
        Schema.is(RegExp),
        Schema.transform(Schema.string().role("regexp", { flag }), (value, options) => {
          try {
            return new RegExp(value, flag);
          } catch (e) {
            throw new ValidationError(e.message, options);
          }
        }, true)
      ]);
    }, "regExp");
    Schema.arrayBuffer = /* @__PURE__ */ __name(function arrayBuffer(encoding) {
      return Schema.union([
        Schema.is(ArrayBuffer),
        Schema.is(SharedArrayBuffer),
        Schema.transform(Schema.any(), (value, options) => {
          if (import_cosmokit.Binary.isSource(value)) return import_cosmokit.Binary.fromSource(value);
          throw new ValidationError(`expected ArrayBufferSource but got ${value}`, options);
        }, true),
        ...encoding ? [Schema.transform(Schema.string(), (value, options) => {
          try {
            return encoding === "base64" ? import_cosmokit.Binary.fromBase64(value) : import_cosmokit.Binary.fromHex(value);
          } catch (e) {
            throw new ValidationError(e.message, options);
          }
        }, true)] : []
      ]);
    }, "arrayBuffer");
    Schema.extend("lazy", (data, schema, options, strict) => {
      if (!schema.inner[kSchema]) {
        schema.inner = schema.builder();
        schema.inner.meta = { ...schema.meta, ...schema.inner.meta };
      }
      return Schema.resolve(data, schema.inner, options, strict);
    });
    Schema.extend("any", (data) => {
      return [data];
    });
    Schema.extend("never", (data, _, options) => {
      throw new ValidationError(`expected nullable but got ${data}`, options);
    });
    Schema.extend("const", (data, { value }, options) => {
      if ((0, import_cosmokit.deepEqual)(data, value)) return [value];
      throw new ValidationError(`expected ${value} but got ${data}`, options);
    });
    function checkWithinRange(data, meta, description, options, skipMin = false) {
      const { max = Infinity, min = -Infinity } = meta;
      if (data > max) throw new ValidationError(`expected ${description} <= ${max} but got ${data}`, options);
      if (data < min && !skipMin) throw new ValidationError(`expected ${description} >= ${min} but got ${data}`, options);
    }
    __name(checkWithinRange, "checkWithinRange");
    Schema.extend("string", (data, { meta }, options) => {
      if (typeof data !== "string") throw new ValidationError(`expected string but got ${data}`, options);
      if (meta.pattern) {
        const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
        if (!regexp.test(data)) throw new ValidationError(`expect string to match regexp ${regexp}`, options);
      }
      checkWithinRange(data.length, meta, "string length", options);
      return [data];
    });
    function decimalShift(data, digits) {
      const str = data.toString();
      if (str.includes("e")) return data * Math.pow(10, digits);
      const index = str.indexOf(".");
      if (index === -1) return data * Math.pow(10, digits);
      const frac = str.slice(index + 1);
      const integer = str.slice(0, index);
      if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
      return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
    }
    __name(decimalShift, "decimalShift");
    function isMultipleOf(data, min, step) {
      step = Math.abs(step);
      if (!/^\d+\.\d+$/.test(step.toString())) {
        return (data - min) % step === 0;
      }
      const index = step.toString().indexOf(".");
      const digits = step.toString().slice(index + 1).length;
      return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
    }
    __name(isMultipleOf, "isMultipleOf");
    Schema.extend("number", (data, { meta }, options) => {
      if (typeof data !== "number") throw new ValidationError(`expected number but got ${data}`, options);
      checkWithinRange(data, meta, "number", options);
      const { step } = meta;
      if (step && !isMultipleOf(data, meta.min ?? 0, step)) {
        throw new ValidationError(`expected number multiple of ${step} but got ${data}`, options);
      }
      return [data];
    });
    Schema.extend("boolean", (data, _, options) => {
      if (typeof data === "boolean") return [data];
      throw new ValidationError(`expected boolean but got ${data}`, options);
    });
    Schema.extend("bitset", (data, { bits, meta }, options) => {
      let value = 0, keys = [];
      if (typeof data === "number") {
        value = data;
        for (const key in bits) {
          if (data & bits[key]) {
            keys.push(key);
          }
        }
      } else if (Array.isArray(data)) {
        keys = data;
        for (const key of keys) {
          if (typeof key !== "string") throw new ValidationError(`expected string but got ${key}`, options);
          if (key in bits) value |= bits[key];
        }
      } else {
        throw new ValidationError(`expected number or array but got ${data}`, options);
      }
      if (value === meta.default) return [value];
      return [value, keys];
    });
    Schema.extend("function", (data, _, options) => {
      if (typeof data === "function") return [data];
      throw new ValidationError(`expected function but got ${data}`, options);
    });
    Schema.extend("is", (data, { constructor }, options) => {
      if (typeof constructor === "function") {
        if (data instanceof constructor) return [data];
        throw new ValidationError(`expected ${constructor.name} but got ${data}`, options);
      } else {
        if ((0, import_cosmokit.isNullable)(data)) {
          throw new ValidationError(`expected ${constructor} but got ${data}`, options);
        }
        let prototype = Object.getPrototypeOf(data);
        while (prototype) {
          if (prototype.constructor?.name === constructor) return [data];
          prototype = Object.getPrototypeOf(prototype);
        }
        throw new ValidationError(`expected ${constructor} but got ${data}`, options);
      }
    });
    function property(data, key, schema, options) {
      try {
        const [value, adapted] = Schema.resolve(data[key], schema, {
          ...options,
          path: [...options.path || [], key]
        });
        if (adapted !== void 0) data[key] = adapted;
        return value;
      } catch (e) {
        if (!options?.autofix) throw e;
        delete data[key];
        return schema.meta.default;
      }
    }
    __name(property, "property");
    Schema.extend("array", (data, { inner, meta }, options) => {
      if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
      checkWithinRange(data.length, meta, "array length", options, !(0, import_cosmokit.isNullable)(inner.meta.default));
      return [data.map((_, index) => property(data, index, inner, options))];
    });
    Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
      if (!(0, import_cosmokit.isPlainObject)(data)) throw new ValidationError(`expected object but got ${data}`, options);
      const result = {};
      for (const key in data) {
        let rKey;
        try {
          rKey = Schema.resolve(key, sKey, options)[0];
        } catch (error) {
          if (strict) continue;
          throw error;
        }
        result[rKey] = property(data, key, inner, options);
        data[rKey] = data[key];
        if (key !== rKey) delete data[key];
      }
      return [result];
    });
    Schema.extend("tuple", (data, { list }, options, strict) => {
      if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
      const result = list.map((inner, index) => property(data, index, inner, options));
      if (strict) return [result];
      result.push(...data.slice(list.length));
      return [result];
    });
    function merge(result, data) {
      for (const key in data) {
        if (key in result) continue;
        result[key] = data[key];
      }
    }
    __name(merge, "merge");
    Schema.extend("object", (data, { dict }, options, strict) => {
      if (!(0, import_cosmokit.isPlainObject)(data)) throw new ValidationError(`expected object but got ${data}`, options);
      const result = {};
      for (const key in dict) {
        const value = property(data, key, dict[key], options);
        if (!(0, import_cosmokit.isNullable)(value) || key in data) {
          result[key] = value;
        }
      }
      if (!strict) merge(result, data);
      return [result];
    });
    Schema.extend("union", (data, { list, toString: toString2 }, options, strict) => {
      const messages = [];
      for (const inner of list) {
        try {
          return Schema.resolve(data, inner, options, strict);
        } catch (error) {
          messages.push(error);
        }
      }
      throw new ValidationError(`expected ${toString2()} but got ${JSON.stringify(data)}`, options);
    });
    Schema.extend("intersect", (data, { list, toString: toString2 }, options, strict) => {
      if (!list.length) return [data];
      let result;
      for (const inner of list) {
        const value = Schema.resolve(data, inner, options, true)[0];
        if ((0, import_cosmokit.isNullable)(value)) continue;
        if ((0, import_cosmokit.isNullable)(result)) {
          result = value;
        } else if (typeof result !== typeof value) {
          throw new ValidationError(`expected ${toString2()} but got ${JSON.stringify(data)}`, options);
        } else if (typeof value === "object") {
          merge(result ??= {}, value);
        } else if (result !== value) {
          throw new ValidationError(`expected ${toString2()} but got ${JSON.stringify(data)}`, options);
        }
      }
      if (!strict && (0, import_cosmokit.isPlainObject)(data)) merge(result, data);
      return [result];
    });
    Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
      const [result, adapted = data] = Schema.resolve(data, inner, options, true);
      if (preserve) {
        return [callback(result)];
      } else {
        return [callback(result), callback(adapted)];
      }
    });
    var formatters = {};
    function defineMethod(name2, keys, format) {
      formatters[name2] = format;
      Object.assign(Schema, {
        [name2](...args) {
          const schema = new Schema({ type: name2 });
          keys.forEach((key, index) => {
            switch (key) {
              case "sKey":
                schema.sKey = args[index] ?? Schema.string();
                break;
              case "inner":
                schema.inner = Schema.from(args[index]);
                break;
              case "list":
                schema.list = args[index].map(Schema.from);
                break;
              case "dict":
                schema.dict = (0, import_cosmokit.valueMap)(args[index], Schema.from);
                break;
              case "bits": {
                schema.bits = {};
                for (const key2 in args[index]) {
                  if (typeof args[index][key2] !== "number") continue;
                  schema.bits[key2] = args[index][key2];
                }
                break;
              }
              case "callback": {
                const callback = schema.callback = args[index];
                callback["toJSON"] ||= () => callback.toString();
                break;
              }
              case "constructor": {
                const constructor = schema.constructor = args[index];
                if (typeof constructor === "function") {
                  ;
                  constructor["toJSON"] ||= () => constructor["name"];
                }
                break;
              }
              default:
                schema[key] = args[index];
            }
          });
          if (name2 === "object" || name2 === "dict") {
            schema.meta.default = {};
          } else if (name2 === "array" || name2 === "tuple") {
            schema.meta.default = [];
          } else if (name2 === "bitset") {
            schema.meta.default = 0;
          }
          return schema;
        }
      });
    }
    __name(defineMethod, "defineMethod");
    defineMethod("is", ["constructor"], ({ constructor }) => {
      if (typeof constructor === "function") {
        return constructor.name;
      } else {
        return constructor;
      }
    });
    defineMethod("any", [], () => "any");
    defineMethod("never", [], () => "never");
    defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
    defineMethod("string", [], () => "string");
    defineMethod("number", [], () => "number");
    defineMethod("boolean", [], () => "boolean");
    defineMethod("bitset", ["bits"], () => "bitset");
    defineMethod("function", [], () => "function");
    defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
    defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
    defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
    defineMethod("object", ["dict"], ({ dict }) => {
      if (Object.keys(dict).length === 0) return "{}";
      return `{ ${Object.entries(dict).map(([key, inner]) => {
        return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
      }).join(", ")} }`;
    });
    defineMethod("union", ["list"], ({ list }, inline) => {
      const result = list.map(({ toString: format }) => format()).join(" | ");
      return inline ? `(${result})` : result;
    });
    defineMethod("intersect", ["list"], ({ list }) => {
      return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
    });
    defineMethod("transform", ["inner", "callback", "preserve"], ({ inner }, isInner) => inner.toString(isInner));
    module.exports = Schema;
  }
});

// lib/index.js
import { dirname as dirname11 } from "node:path";

// ../../shared/settings-namespace.js
function isUnloading(ctx) {
  const fiber = ctx && typeof ctx === "object" && "fiber" in ctx ? ctx.fiber : void 0;
  const state = fiber && typeof fiber === "object" ? fiber.state : void 0;
  return state === "unloading" || state === "unloaded" || state === "disposed" || state === 4 || state === 5;
}
function warnLog(ctx, message) {
  const logger = ctx && typeof ctx === "object" && "logger" in ctx ? ctx.logger : void 0;
  if (typeof logger?.warn === "function")
    logger.warn(message);
}
function stableStringifyForms(value) {
  try {
    return JSON.stringify(sortKeysForms(value));
  } catch {
    try {
      return String(value);
    } catch {
      return "";
    }
  }
}
function sortKeysForms(value) {
  if (Array.isArray(value))
    return value.map(sortKeysForms);
  if (value !== null && typeof value === "object") {
    const record = value;
    const next = {};
    for (const key of Object.keys(record).sort())
      next[key] = sortKeysForms(record[key]);
    return next;
  }
  return value;
}
function isDeepEqualForms(a, b) {
  if (Object.is(a, b))
    return true;
  return stableStringifyForms(a) === stableStringifyForms(b);
}
function snapshotFormsValue(value) {
  try {
    if (typeof structuredClone === "function")
      return structuredClone(value);
  } catch {
  }
  try {
    return value === void 0 ? void 0 : JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
}
function findFormsDescriptor(settings, ns) {
  try {
    const describe = settings.describe;
    if (typeof describe !== "function")
      return void 0;
    const entries = describe.call(settings);
    if (!Array.isArray(entries))
      return void 0;
    for (const item of entries) {
      if (!item || typeof item !== "object")
        continue;
      const record = item;
      if (record.ns === ns)
        return record;
    }
  } catch {
  }
  return void 0;
}
function isFormRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function mergeFormLayers(base, user) {
  if (!isFormRecord(base))
    return snapshotFormsValue(user);
  if (!isFormRecord(user))
    return snapshotFormsValue(base);
  const merged = { ...base };
  for (const [key, value] of Object.entries(user)) {
    merged[key] = isFormRecord(value) && isFormRecord(merged[key]) ? mergeFormLayers(merged[key], value) : snapshotFormsValue(value);
  }
  return merged;
}
function readFormsValue(settings, ns, entry) {
  const record = findFormsDescriptor(settings, ns);
  if (record === void 0)
    return entry;
  if (isFormRecord(record.base) || isFormRecord(record.user)) {
    const base = isFormRecord(record.base) ? record.base : record.value;
    const user = isFormRecord(record.user) ? record.user : {};
    return mergeFormLayers(base, user);
  }
  return "value" in record ? record.value : entry;
}
function isFormsNamespaceServed(settings, ns) {
  return findFormsDescriptor(settings, ns) !== void 0;
}
function subscribeFormsDocumentUpdated(ctx, sctx, ns, listener) {
  for (const candidate of eventTargetsOf(ctx, sctx)) {
    const disposer = subscribeOne(candidate, ns, listener);
    if (disposer !== void 0)
      return disposer;
  }
  return () => {
  };
}
function eventTargetsOf(ctx, sctx) {
  const sctxOn = sctx && typeof sctx === "object" && "on" in sctx ? sctx.on : void 0;
  const ctxOn = ctx && typeof ctx === "object" && "on" in ctx ? ctx.on : void 0;
  const candidates = [{ on: sctxOn, target: sctx }];
  if (typeof ctxOn === "function" && ctxOn !== sctxOn)
    candidates.push({ on: ctxOn, target: ctx });
  return candidates;
}
function subscribeOne(candidate, ns, listener) {
  if (typeof candidate.on !== "function")
    return void 0;
  try {
    const on = candidate.on;
    const disposer = on.call(candidate.target, "settings/document-updated", (...args) => {
      const evNs = args.length > 0 ? args[0] : void 0;
      if (String(evNs) !== String(ns))
        return;
      listener(evNs, args.length > 1 ? args[1] : void 0);
    }, { global: true });
    return typeof disposer === "function" ? disposer : () => {
    };
  } catch {
    return void 0;
  }
}
function disposeSubscription(unwatch) {
  try {
    unwatch();
  } catch {
  }
}
function missingWriteMethod(method) {
  return new Error(`settings service unavailable: ${String(method)} 缺失`);
}
function stateOfFiber(fiber) {
  return fiber && typeof fiber === "object" ? fiber.state : void 0;
}
function fiberSettled(state) {
  return state === void 0 || state === 2 || state === "active";
}
function scopeBlockedBy(state) {
  return state.scopeDelivered || state.deliveringScope || !state.ownerReady || state.disposed || typeof state.hooks?.onScope !== "function" || isUnloading(state.ctx);
}
function installViaForms(ctx, sctx, settings, ns, entry, hooks) {
  const readCurrent = () => readFormsValue(settings, ns, entry);
  const writeVia = (method, payload, expectedRevision) => {
    const fn = settings[method];
    if (typeof fn !== "function")
      return Promise.reject(missingWriteMethod(method));
    const args = expectedRevision === void 0 ? [ns, payload] : [ns, payload, expectedRevision];
    try {
      return fn.call(settings, ...args);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  const scope = {
    get: () => readCurrent(),
    update: (patch, expectedRevision) => writeVia("update", patch, expectedRevision),
    replace: (section, expectedRevision) => writeVia("replace", section, expectedRevision),
    mutate: (ops, expectedRevision) => writeVia("mutate", ops, expectedRevision)
  };
  const ownerFiber = ctx && typeof ctx === "object" ? ctx.fiber : void 0;
  const ownerReady0 = fiberSettled(stateOfFiber(ownerFiber));
  let ownerReady = typeof ownerFiber?.await !== "function" || ownerReady0;
  let scopeDelivered = false;
  let deliveringScope = false;
  let disposed = false;
  const deliverScope = () => {
    if (scopeBlockedBy({ scopeDelivered, deliveringScope, ownerReady, disposed, hooks, ctx })) {
      return;
    }
    deliveringScope = true;
    try {
      if (!isFormsNamespaceServed(settings, ns))
        return;
      if (disposed || isUnloading(ctx))
        return;
      scopeDelivered = true;
      hooks.onScope(scope, settings);
    } finally {
      deliveringScope = false;
    }
  };
  let unwatchForms = () => {
  };
  if (typeof sctx?.effect === "function") {
    sctx.effect(() => () => {
      disposed = true;
      disposeSubscription(unwatchForms);
      if (isUnloading(ctx))
        return;
      hooks.setSource(() => entry);
      hooks.onChange();
    });
  }
  let last = snapshotFormsValue(readCurrent());
  const onDocumentUpdated = () => {
    if (isUnloading(ctx))
      return;
    deliverScope();
    let next;
    try {
      next = readCurrent();
    } catch {
      return;
    }
    if (isDeepEqualForms(next, last))
      return;
    last = snapshotFormsValue(next);
    try {
      hooks.onChange();
    } catch {
    }
  };
  unwatchForms = subscribeFormsDocumentUpdated(ctx, sctx, ns, onDocumentUpdated);
  if (typeof ownerFiber?.await === "function" && !ownerReady) {
    void ownerFiber.await().then(() => {
      if (disposed || isUnloading(ctx) || !fiberSettled(stateOfFiber(ownerFiber)))
        return;
      ownerReady = true;
      deliverScope();
    }, () => {
    });
  }
  deliverScope();
  hooks.setSource(() => scope.get());
  hooks.onChange();
}
function installSettingsNamespace(ctx, ns, schema, entry, hooks) {
  void schema;
  if (typeof ctx?.inject !== "function") {
    warnLog(ctx, `${ns}: ctx.inject 不可用 — 设置命名空间未注册，卡片降级`);
    return;
  }
  ctx.inject(["settings"], (sctx) => {
    const settings = sctx && sctx.settings;
    if (!settings || typeof settings !== "object" || typeof settings.describe !== "function") {
      warnLog(ctx, `${ns}: settings 服务缺席 — 设置命名空间未注册，卡片降级`);
      return;
    }
    installViaForms(ctx, sctx, settings, ns, entry, hooks);
  });
}

// ../../shared/host-utils.js
import { Buffer as Buffer2 } from "node:buffer";
function isLoopbackPeerAddress(request) {
  const address = request.socket?.remoteAddress;
  return address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
}
function loopbackHostUrlOf(request) {
  const host = request.headers.host;
  if (typeof host !== "string")
    return void 0;
  let hostUrl;
  try {
    hostUrl = new URL(`http://${host}`);
  } catch {
    return void 0;
  }
  if (hostUrl.hostname !== "127.0.0.1" && hostUrl.hostname !== "localhost" && hostUrl.hostname !== "[::1]") {
    return void 0;
  }
  return hostUrl;
}
function crossSiteRequestAllowed(request, options) {
  if (request.headers["sec-fetch-site"] !== "cross-site")
    return true;
  return options.allowCrossSiteNoCors === true && request.headers["sec-fetch-mode"] === "no-cors";
}
function isLoopbackRequest(request, options = {}) {
  if (!isLoopbackPeerAddress(request))
    return false;
  const hostUrl = loopbackHostUrlOf(request);
  if (hostUrl === void 0)
    return false;
  if (!crossSiteRequestAllowed(request, options))
    return false;
  const origin = request.headers.origin;
  if (origin === void 0)
    return true;
  try {
    return new URL(origin).host === hostUrl.host;
  } catch {
    return false;
  }
}
function liveConnectionAdmission(ctx) {
  return () => {
    const connection = ctx.get("connection", false);
    if (connection === null || typeof connection !== "object" || !("requestRejection" in connection) || typeof connection.requestRejection !== "function") {
      return void 0;
    }
    const requestRejection = connection.requestRejection;
    return (request) => requestRejection.call(connection, request);
  };
}
function isRemotePeerScope(value) {
  return value !== null && typeof value === "object" && "ctx" in value && value.ctx !== null && typeof value.ctx === "object" && "effect" in value.ctx && typeof value.ctx.effect === "function";
}
function currentRemoteSource(source) {
  try {
    return source?.();
  } catch {
    return void 0;
  }
}
function normalizeRemoteRejection(value) {
  if (value === void 0)
    return void 0;
  return value === 401 || value === 403 ? value : 403;
}
function normalizePeerAdmissionResult(value) {
  if (value !== null && typeof value === "object") {
    if ("peer" in value && isRemotePeerScope(value.peer))
      return { peer: value.peer };
    if ("rejection" in value && (value.rejection === 401 || value.rejection === 403)) {
      return { rejection: value.rejection };
    }
  }
  return { rejection: 403 };
}
function liveConnectionPeerAdmission(ctx) {
  return () => {
    const connection = ctx.get("connection", false);
    if (connection === null || typeof connection !== "object" || !("admit" in connection) || typeof connection.admit !== "function") {
      return void 0;
    }
    const admit = connection.admit;
    return (request) => normalizePeerAdmissionResult(admit.call(connection, request));
  };
}
function admitLongLivedRequest(request, options = {}) {
  if (isLoopbackPeerAddress(request)) {
    return isLoopbackRequest(request, options) ? {} : { rejection: 403 };
  }
  const admission = currentRemoteSource(options.remotePeerAdmission);
  if (typeof admission !== "function")
    return { rejection: 403 };
  try {
    return normalizePeerAdmissionResult(admission(request));
  } catch {
    return { rejection: 403 };
  }
}
function bindPeerLifecycle(peer, cleanup, label) {
  const dispose = peer.ctx.effect(() => () => cleanup(), label);
  let disposed = false;
  return () => {
    if (disposed)
      return;
    disposed = true;
    if (typeof dispose === "function")
      void dispose();
  };
}
function routeFenceRejection(request, options = {}) {
  if (isLoopbackPeerAddress(request)) {
    return isLoopbackRequest(request, options) ? void 0 : 403;
  }
  const admission = currentRemoteSource(options.remoteAdmission);
  if (typeof admission !== "function")
    return 403;
  try {
    return normalizeRemoteRejection(admission(request));
  } catch {
    return 403;
  }
}
function guardLoopbackMethod(req, res, methods, loopbackOptions) {
  const rejection = routeFenceRejection(req, loopbackOptions);
  if (rejection !== void 0) {
    writeJson(res, rejection, {
      error: rejection === 401 ? "unauthorized" : "forbidden: loopback-only"
    });
    return false;
  }
  if (!methods.includes(req.method)) {
    writeJson(res, 405, { error: `method not allowed: ${req.method}` });
    return false;
  }
  return true;
}
function writeJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "referrer-policy": "no-referrer"
  });
  res.end(JSON.stringify(payload));
}
function sseData(payload) {
  return `data: ${JSON.stringify(payload)}

`;
}
async function readJsonBodyOutcome(req, limit = 2 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  try {
    for await (const chunk of req) {
      size += chunk.length;
      if (size > limit)
        return { kind: "invalid", reason: "too-large" };
      chunks.push(chunk);
    }
  } catch {
    return { kind: "invalid", reason: "unreadable" };
  }
  let text;
  try {
    text = Buffer2.concat(chunks).toString("utf8");
  } catch {
    return { kind: "invalid", reason: "unreadable" };
  }
  if (text.trim() === "")
    return { kind: "absent" };
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { kind: "invalid", reason: "malformed" };
  }
  if (typeof parsed !== "object" || parsed === null)
    return { kind: "invalid", reason: "not-object" };
  return { kind: "json", value: parsed };
}
async function readJsonBody(req, limit = 2 * 1024 * 1024) {
  const outcome = await readJsonBodyOutcome(req, limit);
  return outcome.kind === "json" ? outcome.value : void 0;
}

// lib/server/connection/orchestrator/impl/service/index.js
var OrchestratorPorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: connection/orchestrator 子层只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本子层没有别的活资源要释放。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 子层内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成行为
   * 正常但参数不对（配置归一化、目录缓存路径与连接监督器静默换成别处的实现或值），症状与本
   * 插件毫无字面关联。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: connection/orchestrator 子层未装配——组合根未在入口调用 installOrchestrator（src/index.ts）");
    }
    return deps;
  }
};
var orchestratorPorts = new OrchestratorPorts();

// lib/server/connection/orchestrator/manager.js
import { randomBytes as randomBytes2 } from "node:crypto";
import { mkdir as mkdir2, rename as rename2, rm as rm2, writeFile as writeFile2 } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname as dirname3 } from "node:path";

// lib/shared/placement-math.js
var DEFAULT_Z_INDEX_BASE = 10;
var Z_INDEX_BASE_MIN = 1;
var Z_INDEX_BASE_MAX = 9e3;
function clampZIndexBase(value, dflt) {
  if (typeof value !== "number" || !Number.isFinite(value))
    return dflt;
  return Math.min(Z_INDEX_BASE_MAX, Math.max(Z_INDEX_BASE_MIN, Math.round(value)));
}
function panelTopForAnchor(anchor, pillTop, pillBottom, panelHeight, gap) {
  return anchor === "bottom" ? Math.max(6, pillTop - panelHeight - gap) : Math.max(6, pillBottom + gap);
}

// lib/shared/status.js
var SERVER_STATES = {
  connected: "connected",
  connecting: "connecting",
  reconnecting: "reconnecting",
  disabled: "disabled",
  stopped: "stopped",
  failed: "failed"
};
var EMPTY_STATUS_COUNTS = {
  connected: 0,
  connecting: 0,
  reconnecting: 0,
  disabled: 0,
  stopped: 0,
  failed: 0
};

// lib/shared/frames.js
var SSE_FRAMES = {
  summary: "summary",
  uiConfigChanged: "ui-config-changed",
  ping: "ping"
};

// lib/shared/routes.js
var ROUTES = {
  servers: "/api/dsh-mcp/servers",
  config: "/api/dsh-mcp/config",
  session: "/api/dsh-mcp/session",
  resume: "/api/dsh-mcp/resume",
  connect: "/api/dsh-mcp/servers/connect",
  disconnect: "/api/dsh-mcp/servers/disconnect",
  reconnect: "/api/dsh-mcp/servers/reconnect",
  importJson: "/api/dsh-mcp/import/json",
  events: "/api/dsh-mcp/events",
  health: "/api/dsh-mcp/health",
  toolDisable: "/api/dsh-mcp/tool-disable"
};
var ROUTE_FENCE = {
  servers: { guarded: ["GET", "POST", "PATCH", "DELETE"], loopbackExempt: [] },
  config: { guarded: ["POST"], loopbackExempt: ["GET"] },
  session: { guarded: ["POST"], loopbackExempt: [] },
  resume: { guarded: ["POST"], loopbackExempt: [] },
  connect: { guarded: ["POST"], loopbackExempt: [] },
  disconnect: { guarded: ["POST"], loopbackExempt: [] },
  reconnect: { guarded: ["POST"], loopbackExempt: [] },
  importJson: { guarded: ["POST"], loopbackExempt: [] },
  events: { guarded: ["GET"], loopbackExempt: [] },
  health: { guarded: ["GET"], loopbackExempt: [] },
  toolDisable: { guarded: ["PATCH"], loopbackExempt: [] }
};

// lib/shared/constants.js
var SCOPE_GLOBAL = "global";
var SCOPE_PROJECT = "project";
var MIDDLEWARE_GLOBAL_ROOT = "@global";
var MCP_MANAGER_BUNDLE_PACKAGE = "@wingsky-1/dsh-mcp-manager";
var MCP_MANAGER_ROW_ID = "dsh-mcp-manager";
var MCP_MANAGER_SETTINGS_NAMESPACE = "dsh-mcp-manager";
var MCP_MANAGER_IDENTITY = Object.freeze({
  bundlePackage: MCP_MANAGER_BUNDLE_PACKAGE,
  rowId: MCP_MANAGER_ROW_ID,
  settingsNamespace: MCP_MANAGER_SETTINGS_NAMESPACE,
  rowConfigKey: `${MCP_MANAGER_BUNDLE_PACKAGE}#${MCP_MANAGER_ROW_ID}`
});

// lib/server/shared/file-io.js
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname as dirname2 } from "node:path";

// lib/server/shared/paths.js
import { basename, dirname, join as join3 } from "node:path";

// ../../shared/dsh-home.js
import { homedir } from "node:os";
import { join } from "node:path";
function userHome() {
  const env = process.platform === "win32" ? process.env.USERPROFILE ?? process.env.HOME : process.env.HOME;
  return env !== void 0 && env.trim().length > 0 ? env : homedir();
}
function dshHome() {
  const env = process.env.DSH_HOME;
  return env !== void 0 && env.trim().length > 0 ? env : join(userHome(), ".dsh");
}

// ../../shared/paths.js
import { join as join2 } from "node:path";
function pluginHome(base, ...segments) {
  return join2(base, ...segments);
}

// lib/server/shared/paths.js
var PACKAGE_DIR = "@wingsky-1/dsh-mcp-manager";
var PACKAGE_DIR_MODE = 448;
var CONFIG_FILE_NAME = "mcp.json";
var USER_STATE_FILE_NAME = "user-state.json";
var CATALOG_DIR_NAME = "catalog";
var CATALOG_SUMMARY_FILE_NAME = "catalog-summary.json";
var STATS_FILE_NAME = "stats.json";
var VERSION_FILE_NAME = "version";
var PROJECT_CONFIG_DIR_NAME = ".dsh";
var PROJECT_CONFIG_FILE_NAME = "mcp.json";
var LEGACY_LAYOUT = {
  config: "dsh-mcp.json",
  userState: "dsh-mcp-user-state.json"
};
function mcpManagerHome() {
  return pluginHome(dshHome(), PACKAGE_DIR);
}
function mcpManagerFile(fileName) {
  return join3(mcpManagerHome(), fileName);
}
function configFile() {
  return mcpManagerFile(CONFIG_FILE_NAME);
}
function userStatePath() {
  return mcpManagerFile(USER_STATE_FILE_NAME);
}
function catalogDir() {
  return mcpManagerFile(CATALOG_DIR_NAME);
}
function catalogFile(hash) {
  return join3(catalogDir(), `${hash}.json`);
}
function catalogSummaryFile() {
  return mcpManagerFile(CATALOG_SUMMARY_FILE_NAME);
}
function statsFile() {
  return mcpManagerFile(STATS_FILE_NAME);
}
function versionFile() {
  return mcpManagerFile(VERSION_FILE_NAME);
}
function projectConfigFile(projectRoot) {
  return join3(projectRoot, PROJECT_CONFIG_DIR_NAME, PACKAGE_DIR, PROJECT_CONFIG_FILE_NAME);
}
function legacyProjectConfigFile(projectRoot) {
  return join3(projectRoot, PROJECT_CONFIG_DIR_NAME, PROJECT_CONFIG_FILE_NAME);
}
function legacyFile(fileName) {
  return join3(dshHome(), fileName);
}
function isProjectConfigFile(path) {
  if (basename(path) !== PROJECT_CONFIG_FILE_NAME)
    return false;
  const leafDir = dirname(path);
  return basename(leafDir) === basename(PACKAGE_DIR) && basename(dirname(dirname(leafDir))) === PROJECT_CONFIG_DIR_NAME;
}
var FILE_MODES = [
  { matches: (path) => path === configFile(), mode: 384 },
  { matches: (path) => path === userStatePath(), mode: 420 },
  { matches: (path) => dirname(path) === catalogDir(), mode: 420 },
  { matches: (path) => path === catalogSummaryFile(), mode: 420 },
  { matches: (path) => path === statsFile(), mode: 420 },
  { matches: (path) => path === versionFile(), mode: 420 },
  { matches: (path) => isProjectConfigFile(path), mode: null }
];
function fileMode(file) {
  const entry = FILE_MODES.find((candidate) => candidate.matches(file));
  if (entry === void 0) {
    throw new Error(`落盘路径未登记 mode（先加入 server/shared/paths.ts 的登记表）：${file}`);
  }
  return entry.mode;
}
function directoryMode(dir) {
  if (dir === mcpManagerHome() || dir === catalogDir())
    return PACKAGE_DIR_MODE;
  if (basename(dir) === PROJECT_CONFIG_DIR_NAME)
    return null;
  if (basename(dir) === basename(PACKAGE_DIR) && basename(dirname(dirname(dir))) === PROJECT_CONFIG_DIR_NAME) {
    return null;
  }
  throw new Error(`落盘目录未登记 mode（先加入 server/shared/paths.ts 的登记表）：${dir}`);
}

// lib/server/shared/file-io.js
function temporaryNameFor(file) {
  return `${file}.${process.pid}.${Date.now().toString(36)}.${randomBytes(6).toString("hex")}.tmp`;
}
async function ensureDir(dir) {
  const mode = directoryMode(dir);
  await mkdir(dir, mode === null ? { recursive: true } : { recursive: true, mode });
}
async function writeOnce(file, data) {
  const mode = fileMode(file);
  await ensureDir(dirname2(file));
  const temporary = temporaryNameFor(file);
  try {
    await writeFile(temporary, data, mode === null ? { encoding: "utf8" } : { encoding: "utf8", mode });
    await rename(temporary, file);
  } catch (cause) {
    await rm(temporary, { force: true }).catch(() => void 0);
    throw cause;
  }
}
// 同文件写队列只保留**最新**负载（本地补丁，见 packages/dsh-mcp-manager/README.md）：
// 原来的 promise 链让每个排队调用都挟着自己的完整快照，tools/change 风暴下
// 链长即堆占用，宿主撞上 V8 堆上限退出（exit 134）。
var writeSlots = /* @__PURE__ */ new Map();
function writeFileAtomic(file, data) {
  let slot = writeSlots.get(file);
  if (slot === void 0) {
    slot = { data: void 0, waiters: [], running: false };
    writeSlots.set(file, slot);
  }
  // 合并：被覆盖的负载对调用方没有意义——现有调用方写的都是整份文件快照，
  // 后写覆盖先写是正确契约（last-write-wins）。
  slot.data = data;
  const promise = new Promise((resolve, reject) => slot.waiters.push({ resolve, reject }));
  if (!slot.running)
    void drainWriteSlot(file, slot).catch(() => void 0);
  return promise;
}
async function drainWriteSlot(file, slot) {
  if (slot.running)
    return;
  slot.running = true;
  try {
    // 条件用 waiters.length 而不是 data：数据为 undefined 的调用不能因此永远挂住。
    while (slot.waiters.length > 0) {
      const batch = slot.waiters;
      const data = slot.data;
      slot.waiters = [];
      slot.data = void 0;
      try {
        await writeOnce(file, data);
        for (const waiter of batch)
          waiter.resolve();
      } catch (error) {
        for (const waiter of batch)
          waiter.reject(error);
      }
    }
  } finally {
    slot.running = false;
    // Пока шла запись, могли прийти новые вызовы: они ждут этот проход, а не новый слот.
    if (slot.waiters.length > 0)
      void drainWriteSlot(file, slot).catch(() => void 0);
    else
      writeSlots.delete(file);
  }
}
async function readTextFile(file) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}
async function readJsonFile(file) {
  const text = await readTextFile(file);
  if (text === null)
    return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// lib/server/shared/compose.js
import { isAbsolute } from "node:path";

// lib/server/shared/constants.js
var DEFAULT_ANNOUNCE_CATALOG = true;
var DEFAULT_CATALOG_MAX_ENTRIES = 6;
var DEFAULT_TOOL_CALL_TIMEOUT_MS = 15e3;
var CONNECT_TIMEOUT_MS = 1e4;
var DISCOVERY_TIMEOUT_MS = 1e4;
var LIST_DEFAULT_TOOLS_PER_SERVER = 50;
var SERVER_NAME_PATTERN = /^[A-Za-z0-9_-]{1,32}$/;
var OFFICIAL_MCP_CLIENT_SPECIFIER = "@deepseek-ai/dsh-mcp-client";
var OFFICIAL_MCP_CLIENT_LOG_NAME = "mcp-client";
var MAX_MCP_IMAGE_BYTES = 8 * 1024 * 1024;
var MAX_MCP_IMAGES_PER_RESULT = 10;
function exceedsMcpImageCount(count) {
  return count > MAX_MCP_IMAGES_PER_RESULT;
}
function exceedsMcpImageBytes(byteLength) {
  return byteLength > MAX_MCP_IMAGE_BYTES;
}
function assertMcpImageBatch(inputs) {
  if (exceedsMcpImageCount(inputs.length)) {
    throw new Error(`too many images in one result (>${MAX_MCP_IMAGES_PER_RESULT})`);
  }
  for (const input of inputs) {
    if (exceedsMcpImageBytes(input.data.byteLength)) {
      throw new Error("the image data exceeds 8 MiB");
    }
  }
}

// lib/server/shared/compose.js
function guardedAttachments(ctx) {
  return {
    async saveImages(inputs) {
      assertMcpImageBatch(inputs);
      const store = ctx.get("attachments");
      if (store === void 0 || store === null || typeof store.saveImages !== "function") {
        throw new Error("no attachment store is mounted");
      }
      return store.saveImages(inputs);
    }
  };
}
function bindHost(ctx) {
  return {
    logger: ctx.logger,
    logs: {
      capture: (handler) => {
        const dispose = ctx.logger.exporter({
          levels: { default: 2 },
          export: (message) => handler(message)
        });
        return () => {
          void dispose();
        };
      }
    },
    register: { register: (route) => ctx.webServer.register(route) },
    tools: {
      register: (definition) => ctx.tools.register(definition),
      // 现读宿主注册表而不是装配期快照：六态投影靠它判「该 id 下已有注册工具」（设计 §3.1 输入面 B）。
      // scope 原样转交：省略 scope 是查询方的语义选择，绑定层不得替它把参数丢掉。
      schemas: (scope) => ctx.tools.schemas(scope)
    },
    prompt: { section: (section) => ctx.systemPrompt.section(section) },
    expose: { provide: (name2, service) => ctx.provide(name2, service) },
    events: {
      onPreStep: (handler) => ctx.on("agent/pre-step", handler),
      // agent 作用域边：restrict 只在**作用域**上下文上可用（全局调用被宿主当场拒），故这里把
      // agent 自己的 tools 面连同 id 一起交出去——域拿不到 Context，也就没有第二处作用域入口。
      // 0.1.7-rc.1 引入、rc.2 沿用的 serial：`agent/created` 监听须返回 `undefined | Promise<undefined>`。
      // 转发 handler 保持同步，并显式 `return undefined` 满足监听返回契约。
      onAgentCreated: (handler) => ctx.on("agent/created", ({ agent }) => {
        handler({ id: agent.id, tools: agent.ctx.tools });
        return void 0;
      }),
      onAgentDisposed: (handler) => ctx.on("agent/disposed", ({ agent }) => handler({ id: agent.id })),
      onToolsChange: (handler) => ctx.on("tools/change", handler),
      // 装载时的全量 reconcile 用：同名服务缺席（假 ctx / 早期装配）时给空表，不抛。
      liveAgents: () => {
        if (typeof ctx.get !== "function")
          return [];
        const agents = ctx.get("agents");
        return (agents?.list() ?? []).map((agent) => ({ id: agent.id, tools: agent.ctx.tools }));
      }
    },
    // 晚读 thunk（不是装配期快照）：attachments/llm 都是晚到服务，apply 期取恒 undefined。
    attachments: () => ctx.get("attachments"),
    models: () => ctx.get("llm"),
    // 活动工作目录（#1137 语义 A）：晚读 + **逐 session** 取原始投影。
    // 不读官方 WorkingDirectoryService.get()——它的实现是
    // `stateOf(...) ?? this.defaultDirectory`，而 defaultDirectory 兜底 process.cwd()，
    // 会把「投影未记录」悄悄变成进程 cwd，正是语义 A 禁止的隐式退路（F01）。
    workingDirectory: () => {
      if (typeof ctx.get !== "function")
        return void 0;
      const projections = ctx.get("sessionProjections");
      if (projections === void 0 || projections === null)
        return void 0;
      return (session) => {
        if (session === void 0 || session === null)
          return void 0;
        let raw;
        try {
          raw = projections.stateOf(session, "workingDirectory");
        } catch {
          return void 0;
        }
        if (typeof raw !== "string")
          return void 0;
        const directory = raw.trim();
        if (directory === "")
          return void 0;
        if (!isAbsolute(directory))
          return void 0;
        return directory;
      };
    },
    loader: {
      load: async (specifier) => {
        const loader = ctx.get("loader");
        if (loader === void 0 || loader === null) {
          throw new Error("dsh-mcp-manager: 宿主未提供 loader 服务，无法按包名解析官方 MCP 客户端——裸包名只有 loader 能解析（锚 ctx.baseUrl）");
        }
        return await loader.import(specifier);
      },
      mount: (module, config) => {
        const isolated = ctx.isolate("attachments");
        const fiber = isolated.plugin({
          name: "dsh-mcp-manager:guarded-mcp-client",
          async apply(inner) {
            inner.provide("attachments", guardedAttachments(ctx));
            const child = inner.plugin(module, config);
            await child.await();
          }
        });
        const state = { disposed: false };
        const handle = {
          ready: fiber.await().then(() => void 0),
          get disposed() {
            return state.disposed;
          },
          async dispose() {
            state.disposed = true;
            await fiber.dispose();
          }
        };
        ctx.effect(() => () => {
          void handle.dispose();
        }, "dsh-mcp-manager: loader mount");
        return handle;
      }
    }
  };
}

// lib/server/shared/tool-names.js
import { createHash } from "node:crypto";
var MAX_PUBLIC_NAME_LENGTH = 64;
var INVALID_NAME_CHARS = /[^A-Za-z0-9_-]/g;
var HASH_LENGTH = 12;
function publicToolName(serverName, rawName) {
  const joined = `mcp__${serverName}__${rawName}`;
  const normalized = joined.replace(INVALID_NAME_CHARS, "_");
  if (normalized === joined && normalized.length <= MAX_PUBLIC_NAME_LENGTH)
    return normalized;
  const hash = createHash("sha256").update(`${serverName}\0${rawName}`).digest("hex").slice(0, HASH_LENGTH);
  return `${normalized.slice(0, MAX_PUBLIC_NAME_LENGTH - HASH_LENGTH - 1)}_${hash}`;
}

// lib/server/connection/orchestrator/manager.js
function isPlainRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isProjectionPlaceholder(value) {
  return typeof value === "string" && (value.includes("[REDACTED]") || value.includes("%5BREDACTED%5D"));
}
function carriesProjectionPlaceholder(key, value) {
  if (key === "args" && Array.isArray(value))
    return value.some(isProjectionPlaceholder);
  if ((key === "env" || key === "headers") && isPlainRecord(value))
    return Object.values(value).some(isProjectionPlaceholder);
  return isProjectionPlaceholder(value);
}
function findProjectionPlaceholderKey(server) {
  for (const [key, value] of Object.entries(server)) {
    if (carriesProjectionPlaceholder(key, value))
      return key;
  }
  return void 0;
}
function buildDesiredServers(store, projectStore, runtimeRegistry, poolRootFor) {
  const desired = /* @__PURE__ */ new Map();
  const keyFor = (scope, name2) => `${poolRootFor(scope)}\0${name2}`;
  for (const server of store.data.servers) {
    desired.set(keyFor(SCOPE_GLOBAL, server.name), {
      name: server.name,
      server,
      scope: SCOPE_GLOBAL
    });
  }
  if (projectStore !== void 0) {
    for (const server of projectStore.data.servers) {
      const key = keyFor(SCOPE_PROJECT, server.name);
      if (!desired.has(key)) {
        desired.set(key, { name: server.name, server, scope: SCOPE_PROJECT });
      }
    }
  }
  for (const [name2, server] of runtimeRegistry) {
    desired.set(keyFor(SCOPE_GLOBAL, name2), { name: name2, server, scope: SCOPE_GLOBAL });
  }
  return desired;
}
async function writeCatalogCacheFile(file, data) {
  let registered = true;
  try {
    fileMode(file);
  } catch {
    registered = false;
  }
  if (registered) {
    await writeFileAtomic(file, data);
    return;
  }
  const dir = dirname3(file);
  if (!existsSync(dir))
    await mkdir2(dir, { recursive: true });
  const tmp = `${file}.${process.pid}.${Date.now().toString(36)}.${randomBytes2(6).toString("hex")}.tmp`;
  try {
    await writeFile2(tmp, data, "utf8");
    await rename2(tmp, file);
  } catch (cause) {
    await rm2(tmp, { force: true }).catch(() => void 0);
    throw cause;
  }
}
function hasProjectionSecrets(server) {
  if (hasSecretTable(server.env))
    return true;
  if (hasSecretTable(server.headers))
    return true;
  return urlCarriesSecrets(server.url);
}
function hasSecretTable(table) {
  return table !== void 0 && Object.keys(table).length > 0;
}
function urlCarriesSecrets(url) {
  if (typeof url !== "string" || url === "")
    return false;
  try {
    const parsed = new URL(url);
    if (parsed.username !== "" || parsed.password !== "")
      return true;
    for (const value of parsed.searchParams.values()) {
      if (value !== "")
        return true;
    }
  } catch {
  }
  return false;
}
function redactUrlForSummary(url) {
  if (typeof url !== "string" || url === "")
    return void 0;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  const secrets = /* @__PURE__ */ new Set();
  const addSecret = (value) => {
    if (value.length === 0)
      return;
    secrets.add(value);
    try {
      secrets.add(encodeURIComponent(value));
    } catch {
    }
  };
  addSecret(parsed.username);
  addSecret(parsed.password);
  for (const value of parsed.searchParams.values())
    addSecret(value);
  if (secrets.size === 0)
    return url;
  const ordered = [...secrets].sort((left, right) => right.length - left.length);
  let out = url;
  for (const secret of ordered)
    out = out.split(secret).join("[REDACTED]");
  return out;
}
function projectServerForSummary(server, maskSecretArgsForDisplay2) {
  const projected = projectBaseFieldsForSummary(server);
  const transport = server.transport === "stdio" ? projectStdioFieldsForSummary(server, maskSecretArgsForDisplay2) : { fields: projectHttpFieldsForSummary(server), argsHadSecret: false };
  Object.assign(projected, transport.fields);
  projected.hasSecrets = hasProjectionSecrets(server) || transport.argsHadSecret;
  return projected;
}
function projectBaseFieldsForSummary(server) {
  const projected = {
    name: server.name,
    transport: server.transport
  };
  if (server.enabled !== void 0)
    projected.enabled = server.enabled;
  if (server.toolCallTimeoutMs !== void 0)
    projected.toolCallTimeoutMs = server.toolCallTimeoutMs;
  if (server.reconnect !== void 0)
    projected.reconnect = server.reconnect;
  if (server.description !== void 0)
    projected.description = server.description;
  return projected;
}
function projectStdioFieldsForSummary(server, maskSecretArgsForDisplay2) {
  const fields = {};
  if (server.command !== void 0)
    fields.command = server.command;
  let argsHadSecret = false;
  if (server.args !== void 0) {
    const masked = maskSecretArgsForDisplay2(server.args);
    fields.args = masked;
    argsHadSecret = masked.some((entry) => entry.includes("[REDACTED]"));
  }
  if (server.cwd !== void 0)
    fields.cwd = server.cwd;
  return { fields, argsHadSecret };
}
function projectHttpFieldsForSummary(server) {
  const fields = {};
  const redactedUrl = redactUrlForSummary(server.url);
  if (redactedUrl !== void 0)
    fields.url = redactedUrl;
  return fields;
}
function stripProjectionPatch(patch) {
  const next = { ...patch };
  if (isProjectionPlaceholder(next.url))
    delete next.url;
  if (Array.isArray(next.args) && next.args.some(isProjectionPlaceholder))
    delete next.args;
  for (const key of PROJECTION_SECRET_TABLES) {
    const table = next[key];
    if (!isPlainRecord(table))
      continue;
    const kept = Object.entries(table).filter(([, value]) => !isProjectionPlaceholder(value));
    if (kept.length === 0)
      delete next[key];
    else
      next[key] = Object.fromEntries(kept);
  }
  return next;
}
var PROJECTION_SECRET_TABLES = ["env", "headers"];
function isBlankCwd(cwd) {
  return cwd === void 0 || cwd === null || cwd === "";
}
async function projectRootForCwd(cwd, findProjectRoot2) {
  if (isBlankCwd(cwd))
    return void 0;
  return findProjectRoot2(cwd);
}
function serverEntry(server) {
  return [server.name, server];
}
function collectCatalogServers(into, entries, scope) {
  for (const [name2, server] of entries) {
    if (server.enabled === false)
      continue;
    into.set(name2, { server, scope });
  }
}
async function reloadStoreQuietly(store, onFail) {
  try {
    return await store.reloadIfChanged();
  } catch (error) {
    onFail(error);
    return false;
  }
}
function touchUnitInBackground(middleware, target, onFail) {
  void middleware.projectUnitFor(target).then((unit) => {
    if (unit !== void 0)
      middleware.evictIfNeeded();
  }, (error) => onFail(error));
}
function releaseUndesiredConnections(middleware, desired) {
  if (middleware === void 0)
    return false;
  let released = false;
  for (const unit of [...middleware.units.values()]) {
    for (const serverName of [...unit.connections.keys()]) {
      const want = desired.get(`${unit.root}\0${serverName}`);
      if (want !== void 0 && want.server.enabled !== false)
        continue;
      if (middleware.releaseConnection(unit.root, serverName))
        released = true;
    }
  }
  return released;
}
function absentFromPool(middleware, root, name2) {
  if (middleware === void 0)
    return false;
  return !(middleware.units.get(root)?.connections.has(name2) ?? false);
}
function touchRootFor(scope, projectRoot) {
  return scope === SCOPE_PROJECT ? projectRoot : MIDDLEWARE_GLOBAL_ROOT;
}
function syncPool(middleware, desired, projectRoot, start) {
  let changed = releaseUndesiredConnections(middleware, desired);
  for (const want of desired.values()) {
    if (want.server.enabled === false)
      continue;
    const root = touchRootFor(want.scope, projectRoot);
    if (root === void 0)
      continue;
    if (absentFromPool(middleware, root, want.name))
      changed = true;
    start(want.name, want.scope);
  }
  return changed;
}
function resolveConnectableServer(store, runtimeRegistry, name2, scope, warn) {
  const stored = store.find(name2);
  if (stored !== void 0)
    return stored;
  if (scope !== SCOPE_GLOBAL)
    return void 0;
  const runtime = runtimeRegistry.get(name2);
  if (runtime === void 0)
    return void 0;
  warn(`dsh-mcp-manager: server "${name2}" not in store; using runtime registry entry`);
  return runtime;
}
function catalogToolNames(catalog) {
  if (catalog === void 0 || catalog.unavailable !== void 0)
    return [];
  return [...catalog.tools.keys()];
}
function pooledErrorText(entry, catalog, redact) {
  const raw = entry.error !== void 0 ? entry.error : catalog?.unavailable;
  return raw === void 0 ? void 0 : redact(raw);
}
function isToolDisabledIn(tool, disabled, inheritedDisabled) {
  return (disabled?.has(tool) ?? false) || (inheritedDisabled?.has(tool) ?? false);
}
function summarizePooled(base, scope, view) {
  const disabledList = view.tools.filter((tool) => isToolDisabledIn(tool, view.disabled, view.inheritedDisabled));
  return {
    ...base,
    scope,
    status: view.status,
    // 目录发现失败（unavailable）时透出原因：解释 connected 却 0 工具。
    error: view.error,
    tools: [...view.tools],
    disabledTools: disabledList.length > 0 ? disabledList : void 0
  };
}
function summarizeAbsent(base, scope, server) {
  return {
    ...base,
    scope,
    status: server.enabled === false ? SERVER_STATES.disabled : SERVER_STATES.stopped,
    error: void 0,
    tools: [],
    disabledTools: void 0
  };
}
var McpManager = class {
  httpConnections = /* @__PURE__ */ new Map();
  httpEpochs = /* @__PURE__ */ new Map();
  httpSequence = 0;
  userStateQueue = Promise.resolve();
  connectionKey(root, scope, name2) {
    return JSON.stringify([root, scope, name2]);
  }
  invalidateHttpConnection(root, scope, name2) {
    const key = this.connectionKey(root, scope, name2);
    this.httpEpochs.set(key, ++this.httpSequence);
    this.httpConnections.delete(key);
  }
  markDisabled(mw, root, name2) {
    const disabled = mw.disabledByRoot.get(root) ?? /* @__PURE__ */ new Set();
    disabled.add(name2);
    mw.disabledByRoot.set(root, disabled);
    return disabled;
  }
  async rootForRequest(scope, cwd) {
    if (scope !== SCOPE_PROJECT)
      return MIDDLEWARE_GLOBAL_ROOT;
    const captured = this.projectRoot;
    const root = cwd !== void 0 ? await projectRootForCwd(cwd, orchestratorPorts.get().workspace.findProjectRoot) : captured;
    if (root === void 0)
      throw new Error("no active project session (call session with a cwd first)");
    return root;
  }
  /** HTTP 受理入口；宿主 connect 仍等待完整连接。 */
  async acceptConnection(name2, scope, cwd) {
    const started = this.httpSequence;
    const root = await this.rootForRequest(scope, cwd);
    const key = this.connectionKey(root, scope, name2);
    const epoch = this.httpEpochs.get(key) ?? 0;
    if (epoch > started)
      throw new Error("connection request cancelled");
    await this.validateHttpTarget(root, scope, name2);
    if ((this.httpEpochs.get(key) ?? 0) !== epoch)
      throw new Error("connection request cancelled");
    const mw = this.middleware;
    if (mw === void 0)
      throw new Error("middleware is not initialized (apply first)");
    if (this.httpConnections.get(key)?.state === "connecting")
      return root;
    const job = { state: "connecting" };
    this.httpConnections.set(key, job);
    this.emitStatus();
    void this.runHttpConnection(mw, root, name2, key, job);
    return root;
  }
  async validateHttpTarget(root, scope, name2) {
    const store = scope === SCOPE_PROJECT ? await this.projectStoreFor(root) : this.store;
    if (store === void 0)
      throw new Error(`workspace ${root} has no project MCP config`);
    const server = resolveConnectableServer(store, this.runtimeRegistry, name2, scope, (message) => this.logger.warn(message));
    if (server === void 0)
      throw new Error(`server "${name2}" not found in ${scope} scope`);
    if (server.enabled === false)
      throw new Error(`server "${name2}" is disabled`);
  }
  async runHttpConnection(mw, root, name2, key, job) {
    const current = () => this.httpConnections.get(key) === job;
    try {
      const unit = await mw.projectUnitFor(root);
      if (!current())
        return;
      if (unit === void 0)
        throw new Error(`workspace ${root} has no project MCP config`);
      unit.userDisabled.delete(name2);
      mw.disabledByRoot.get(root)?.delete(name2);
      await this.saveUserState(mw.units);
      if (!current())
        return;
      await mw.ensureConnected(root, name2, { force: true });
      if (!current())
        return;
      if (!unit.connections.has(name2))
        throw new Error(`server "${name2}" did not start`);
      this.httpConnections.delete(key);
    } catch (error) {
      if (!current())
        return;
      job.state = "failed";
      job.failedEntry = this.entryForRoot(root, name2);
      try {
        job.error = this.redactError(error);
      } catch {
        job.error = "connection failed";
      }
    }
    this.emitStatus();
  }
  entryForRoot(root, name2) {
    return this.middleware?.units.get(root)?.connections.get(name2);
  }
  async disconnectForRequest(name2, scope, cwd) {
    const root = await this.rootForRequest(scope, cwd);
    const mw = this.middleware;
    this.invalidateHttpConnection(root, scope, name2);
    if (mw === void 0)
      return root;
    const disabled = this.markDisabled(mw, root, name2);
    const unit = mw.units.get(root);
    if (unit !== void 0) {
      unit.userDisabled.add(name2);
      mw.releaseConnection(root, name2);
      unit.inFlight.delete(name2);
    }
    this.emitStatus();
    const units = new Map(mw.units);
    if (unit === void 0)
      units.set(root, {
        root,
        connections: /* @__PURE__ */ new Map(),
        inFlight: /* @__PURE__ */ new Map(),
        userDisabled: disabled,
        lastTouchedAt: Date.now()
      });
    await this.saveUserState(units);
    return root;
  }
  ctx;
  store;
  listeners;
  logger;
  projectRoot;
  projectStore;
  reconcileBusy;
  projectStores;
  catalogCache;
  catalogCachePath;
  uiConfigSource;
  /** 设置命名空间写入 sink（apply 时经 ctx.inject(["settings"]) 注入；注入不到则写不可用）。 */
  uiUpdate;
  /**
   * SSE 连接枢纽（共享 shared/sse-hub，#515）：makeEventsRoute 惰性创建；
   * 广播/卸载 disposer 收口到 hub（连接表 + 心跳 + stalled/maxAge 主动回收）。
   * 取代旧 sseConnections Set + per-connection 心跳（#268）。
   */
  sseHub;
  /** 中间层实例（连接池 + 目录 + 路由；惰性创建）。 */
  middleware;
  /** userDisabled 持久化路径。 */
  userStatePath;
  /** MCP 调用统计收集器（可用于 debug 模式量化调用指标与渐进式披露漏斗）。 */
  stats;
  /** 运行时注册表（内存态，不落盘）：供其他插件经 ctx.mcpManager 注入服务器。
   * 双轨 reconcile：store.data.servers（持久化）+ runtimeRegistry（运行时）。
   * 同名冲突策略：runtime 优先（运行时注入是「当前会话」语义）。 */
  runtimeRegistry;
  /** registerServer 串行队列（防 reconcileBusy 吞注册；多插件并发注册排队）。 */
  registerQueue;
  /** 注入端目录缓存视图解析器（catalog/impl/cache-view/index.ts 工厂闭包；含 mtime 缓存）。 */
  catalogViewResolver;
  constructor(ctx, store) {
    const { catalog, configStore, stats } = orchestratorPorts.get();
    this.ctx = ctx;
    this.store = store;
    this.listeners = /* @__PURE__ */ new Set();
    this.logger = ctx.logger;
    this.projectRoot = void 0;
    this.projectStore = void 0;
    this.reconcileBusy = false;
    this.projectStores = /* @__PURE__ */ new Map();
    this.catalogCache = /* @__PURE__ */ new Map();
    this.catalogCachePath = catalog.catalogCacheFile();
    this.catalogViewResolver = catalog.makeCatalogViewFor({
      getCatalogCache: () => this.catalogCache,
      getMiddleware: () => this.middleware,
      catalogCachePathFor: (root) => this.catalogCachePathFor(root)
    });
    this.uiConfigSource = () => ({ position: "top-right", offsetX: 8, offsetY: 8, blankY: 40 });
    this.middleware = void 0;
    this.userStatePath = configStore.userStateFile();
    this.stats = new stats.McpStatsCollector({ logger: ctx.logger });
    this.runtimeRegistry = /* @__PURE__ */ new Map();
    this.registerQueue = Promise.resolve();
  }
  /** 读取 settings 命名空间中的 MCP UI 配置（供 /api/dsh-mcp/config 返回）。 */
  uiConfig() {
    return orchestratorPorts.get().configModel.normalizeUiConfig(this.uiConfigSource());
  }
  /**
   * 写入浮窗 UI 配置（/api/dsh-mcp/config POST）。
   * 把客户端扁平形态归一化为 `Config.ui` 嵌套补丁，经设置命名空间持久化
   * （settings.update 落盘 → scope.watch → onChange → SSE 广播一帧），随后返回
   * 归一化后的最新配置。settings 服务不可用时抛错（写不可用）。
   */
  async updateUiConfig(raw) {
    if (typeof this.uiUpdate !== "function") {
      throw new Error("ui config is not writable: settings service unavailable");
    }
    await this.uiUpdate({ ui: orchestratorPorts.get().configModel.buildConfigUiPatch(raw) });
    return this.uiConfig();
  }
  /** 从磁盘加载目录缓存（损坏/缺失 → 空缓存，不崩溃）。 */
  async loadCatalogCache() {
    try {
      const raw = await readTextFile(this.catalogCachePath);
      if (raw === null)
        return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && typeof parsed.entries === "object" && parsed.entries !== null) {
        for (const [name2, entry] of Object.entries(parsed.entries)) {
          if (typeof entry?.summary === "string") {
            this.catalogCache.set(name2, { summary: entry.summary });
          }
        }
      }
    } catch {
    }
  }
  /**
   * 连接成功后记录工具描述摘要到目录缓存（**只在摘要实质变化时落盘**——
   * 保证重连拿到相同描述不触发 digest 变化、不重复注入）。
   * 缓存是持久数据（磁盘），与实时连接状态解耦：断开/重连不清空 → 目录稳定。
   */
  async recordCatalogTools(serverName, toolMeta) {
    const summary = orchestratorPorts.get().catalog.summarizeToolDescriptions(toolMeta);
    const current = this.catalogCache.get(serverName)?.summary;
    if (summary === void 0 || summary === current)
      return;
    this.catalogCache.set(serverName, { summary });
    try {
      const payload = { version: 1, entries: Object.fromEntries(this.catalogCache) };
      await writeCatalogCacheFile(this.catalogCachePath, JSON.stringify(payload, null, 2));
    } catch (error) {
      this.logger.warn(`dsh-mcp-manager: catalog cache write failed: ${this.redactError(error)}`);
    }
  }
  // ------------------------------------------------------------ 直连账本（裁定 AF 形态 B）
  /**
   * 注册面读口：取不到 / 非数组一律当空——六态投影与工具面投影都不许因为读不到注册表而阻塞
   * （与 McpMiddleware.registeredSchemas 同口径）。
   */
  registeredSchemas() {
    const tools = this.ctx?.tools;
    if (tools === void 0 || typeof tools.schemas !== "function")
      return [];
    try {
      const schemas = tools.schemas();
      return Array.isArray(schemas) ? schemas : [];
    } catch {
      return [];
    }
  }
  /** 单元的 root：项目级取当前项目根，其余取全局虚拟 root（与中间层单元同口径）。 */
  poolRootFor(scope) {
    return scope === SCOPE_PROJECT ? this.projectRoot ?? MIDDLEWARE_GLOBAL_ROOT : MIDDLEWARE_GLOBAL_ROOT;
  }
  /**
   * 注册名中段 → (root, 裸名) 反查（id 化的 mcp__ 注册名还原成禁用表键）。
   *
   * 为什么由 manager 提供：id 是装载期由官方实例的 serverName 定下的（裁定 AG① 明确 id 不进
   * 注入面），只有自持账本的一侧知道 (id → root, 裸名)。注入端在装配点把这个能力**按入参**递进
   * guard（与既有 resolveRoot 同一形态），因此不新增跨域值边、也不动任何端口键。
   */
  serverNameForId(id) {
    for (const unit of this.middleware?.units.values() ?? []) {
      for (const [name2, entry] of unit.connections) {
        if (entry.id === id)
          return { root: unit.root, server: name2 };
      }
    }
    return void 0;
  }
  /**
   * 公共查询面 `ctx.mcpManager.getTools` 的数据源（M5 = A，本笔换源）：该服务器在
   * 连接池里的**注册名**清单（`mcp__<id>__<tool>`，与 `ctx.tools` 注册表一致）。
   *
   * 口径不变：返回注册名、不是裸名（裸名是 `summary().tools` / 目录读口的口径）。
   * 数据源从旧直连账本的 `toolMeta` 换成**单元表**——旧实现只由直连路径填充，被中间层
   * 接管的服务器恒返回 `[]`（既有缺陷 A13/B6）；单池合并后那条路径已不存在。
   *
   * 虚拟连接单元（toolDefinitions，无 id/handle）没有宿主注册名，返回空表。
   */
  registeredToolsFor(name2) {
    const entry = this.poolEntryFor(name2);
    if (entry?.id === void 0)
      return [];
    const prefix = `mcp__${entry.id}__`;
    const tools = [];
    for (const schema of this.registeredSchemas()) {
      const toolName = schema?.name;
      if (typeof toolName !== "string" || !toolName.startsWith(prefix))
        continue;
      tools.push({
        name: toolName,
        description: typeof schema.description === "string" ? schema.description : void 0
      });
    }
    return tools;
  }
  /** 池内该裸名的连接条目（跨单元查；同名跨 root 各成一条，取先命中者，与旧账本同口径）。 */
  poolEntryFor(name2) {
    for (const unit of this.middleware?.units.values() ?? []) {
      const entry = unit.connections.get(name2);
      if (entry !== void 0)
        return entry;
    }
    return void 0;
  }
  onStatus(handler) {
    this.listeners.add(handler);
    return () => this.listeners.delete(handler);
  }
  /** 脱敏秘密源的唯一事实源（#770-8）：全局 store + 全部 projectStores 缓存 + runtimeRegistry。
   *
   * 为什么是同步快照：middleware 的 redact/callTool 与本类的 redactError 都是同步路径，
   * 而按 root 取配置的 projectServersFor 是 async（同步内不可 await）；脱敏只读已在内存的
   * 缓存快照，不触发磁盘读。未进缓存的项目 root 不在此列——要读它必须走 async 链（本相按
   * 裁决不做，调用链保持同步，见 MiddlewareHost.redactionServers）。
   *
   * 为什么含 disabled/unconnected：凭据是否出现在错误文案与服务器当下是否启用/已连接
   * 无关——未连接与 disabled 条目的 secret 同样须抹掉（双向缺口的反例）。此处不做
   * enabled 过滤，调用方也不得再过滤。
   *
   * 三处同调：本方法 ↔ middleware.redact ↔ dispatch redactMcpError（经 host.redactionServers
   * 转供的同一快照），底层同 pipeline.createRedactor。
   *
   * #770-A1：快照在调用方展开 ${ENV} 模板（经 configModel.expandServerEnv）再交
   * createRedactor——错误文案里出现的是展开后的凭据明文，不是落盘的模板字面量；
   * redactor 内禁止读 process.env（保持纯函数），展开是调用方的职责。无模板时
   * 展开恒等（新对象、值不变）；未设置的变量展开为空串，由 addSecretPair 跳过
   * （空串不注册，避免把空匹配当秘密）。 */
  getRedactionServers() {
    const { configModel } = orchestratorPorts.get();
    const servers = this.store.data.servers.map((server) => configModel.expandServerEnv(server));
    for (const store of this.projectStores.values()) {
      for (const server of store.data.servers)
        servers.push(configModel.expandServerEnv(server));
    }
    if (this.projectStore !== void 0 && ![...this.projectStores.values()].includes(this.projectStore)) {
      for (const server of this.projectStore.data.servers)
        servers.push(configModel.expandServerEnv(server));
    }
    for (const server of this.runtimeRegistry.values())
      servers.push(configModel.expandServerEnv(server));
    return servers;
  }
  /** B8：错误日志脱敏（经 getRedactionServers 全集 + createRedactor）。
   * 日志与 HTTP body 同口径（C-ERR 契约），error 可能含凭据明文。
   * #770-A2：公开给路由错误边界（RoutesManager.redactError）——manager 已是
   * 路由的结构参数，复用同一秘密源，不为 api 域另开脱敏口（附录 G·G19：api 域
   * 不直持 manager 实例 beyond 既有结构参数，脱敏能力经此方法面递入）。
   * 每次现建 redactor（per-request 可接受：错误路径低频，无缓存必要）。 */
  redactError(error) {
    return orchestratorPorts.get().pipeline.createRedactor(this.getRedactionServers())(error);
  }
  /** coalesce 定时器（同一 tick 内多次状态变化合并为一次广播）。 */
  statusTimer;
  /** 状态变化广播（coalesce：同 tick 多次 emitStatus 只广播一次，防 SSE 风暴）。 */
  emitStatus() {
    if (this.statusTimer !== void 0)
      return;
    this.statusTimer = setTimeout(() => {
      this.statusTimer = void 0;
      for (const handler of [...this.listeners])
        handler();
    }, 0);
    this.statusTimer.unref?.();
  }
  /** 当前会话的项目级存储（无活动项目时抛错）。 */
  async projectStoreOrThrow() {
    if (this.projectStore === void 0) {
      throw new Error("no active project session (call session with a cwd first)");
    }
    return this.projectStore;
  }
  /**
   * 中间层宿主：按 root 读取服务器配置。虚拟 root "@global" 返回
   * 全局配置 **+ runtime 注入条目**（#413：runtime 封装定义服务器由中间层接管，
   * 数据源必须可见；独立合并，不污染 store.data.servers 持久化数组）。
   */
  async projectServersFor(root) {
    if (root === MIDDLEWARE_GLOBAL_ROOT) {
      const servers = [...this.store.data.servers];
      for (const server of this.runtimeRegistry.values())
        servers.push(server);
      return servers;
    }
    const store = await this.projectStoreFor(root);
    return store?.data.servers;
  }
  /** 中间层宿主：该 server 是否 runtime 注入（目录不写盘判定；#413）。 */
  isRuntimeServer(name2) {
    return this.runtimeRegistry.has(name2);
  }
  /** 中间层宿主：该 server 是否全局级（双源：store + runtimeRegistry）。
   * runtime 注册的服务器不落 store，单源会误判「非全局」——P1 修正。 */
  isGlobalServer(name2) {
    return this.store.data.servers.some((server) => server.name === name2) || this.runtimeRegistry.has(name2);
  }
  /** 中间层宿主：全局服务器配置（@global 单元装载用）。 */
  globalServers() {
    return this.store.data.servers;
  }
  /** 中间层宿主：持久化 userDisabled。 */
  async saveUserState(units) {
    const snapshot = new Map([...units].map(([root, unit]) => [
      root,
      { ...unit, userDisabled: new Set(unit.userDisabled) }
    ]));
    const write = this.userStateQueue.then(() => orchestratorPorts.get().configStore.saveUserState(this.userStatePath, snapshot));
    this.userStateQueue = write.catch(() => {
    });
    await write;
  }
  /** 中间层宿主：root 的目录缓存文件路径。 */
  catalogCachePathFor(root) {
    return orchestratorPorts.get().configStore.catalogCacheFileFor(root);
  }
  /**
   * 初始化中间层（apply 时无条件调用；幂等）。单池合并后连接池是唯一连接路径，
   * 池归属恒为「全部服务器」——#767 笔 2 删掉 `middlewarePolicy` 后不再接受任何入参。
   */
  async initMiddleware() {
    const { runtime, configStore, workspace } = orchestratorPorts.get();
    if (this.middleware !== void 0)
      return this.middleware;
    const mw = new runtime.McpMiddleware({
      ctx: this.ctx,
      logger: this.logger,
      projectServersFor: (root) => this.projectServersFor(root),
      redactionServers: () => this.getRedactionServers(),
      globalServers: () => this.globalServers(),
      normalizedProjectRoot: (cwd) => workspace.normalizedProjectRoot(cwd),
      saveUserState: (units) => this.saveUserState(units),
      emitStatus: () => this.emitStatus(),
      catalogCachePath: (root) => this.catalogCachePathFor(root),
      isGlobalServer: (name2) => this.isGlobalServer(name2),
      isRuntimeServer: (name2) => this.isRuntimeServer(name2),
      recordCatalogTools: (name2, tools) => this.recordCatalogTools(name2, tools)
    });
    try {
      this.disabledByRoot = await configStore.loadUserState(this.userStatePath);
      mw.disabledByRoot = this.disabledByRoot;
      this.disabledTools = await configStore.loadDisabledTools(this.userStatePath);
      mw.disabledTools = this.disabledTools;
    } catch (error) {
      this.disabledByRoot = /* @__PURE__ */ new Map();
      this.disabledTools = /* @__PURE__ */ new Map();
      throw error;
    }
    this.middleware = mw;
    return mw;
  }
  /** userDisabled 映射（root → Set<server>），中间层单元创建时合并。 */
  disabledByRoot = /* @__PURE__ */ new Map();
  /** 工具级禁用（root → server → Set<tool>）；root=@global 跨工作空间共享。 */
  disabledTools = /* @__PURE__ */ new Map();
  /**
   * 设置/解除单个工具禁用（宿主 API PATCH /api/dsh-mcp/tool-disable 调用）。
   * 合并式写盘（先读现有文件再覆盖本 root 段，绝不整表覆盖）——
   * 防多工作空间互相抹掉禁用记录。
   * @param root 目标 root（全局服务器用 MIDDLEWARE_GLOBAL_ROOT）。
   * @param server 服务器裸名。
   * @param tool 远端工具裸名。
   * @param disabled true=禁用 / false=解除。
   * 工具级禁用独立于服务器级 enabled：服务器级复活不清工具级状态。
   */
  async setToolDisabled(root, server, tool, disabled) {
    const { configStore } = orchestratorPorts.get();
    const tools = this.disabledTools.get(root) ?? /* @__PURE__ */ new Map();
    const set = tools.get(server) ?? /* @__PURE__ */ new Set();
    if (disabled)
      set.add(tool);
    else
      set.delete(tool);
    if (set.size > 0)
      tools.set(server, set);
    else
      tools.delete(server);
    if (tools.size > 0)
      this.disabledTools.set(root, tools);
    else
      this.disabledTools.delete(root);
    await configStore.saveDisabledTools(this.userStatePath, this.disabledTools);
    this.emitStatus();
  }
  /** 读取/复用某项目根的 store（工作区缓存命中直接返回，不重复读盘）。 */
  async projectStoreFor(root) {
    if (typeof root !== "string" || root === "")
      return void 0;
    const { configStore, upgrade } = orchestratorPorts.get();
    let store = this.projectStores.get(root);
    if (store === void 0) {
      store = await upgrade.withSettledProjectConfig(root, this.logger, async (settledPath) => {
        const fresh = new configStore.McpStore(settledPath);
        await fresh.load();
        return fresh;
      });
      this.projectStores.set(root, store);
    } else {
      const cached = store;
      try {
        await upgrade.withSettledProjectConfig(root, this.logger, async () => {
          await cached.reloadIfChanged();
        });
      } catch (error) {
        this.logger.warn(`dsh-mcp-manager: reload project config failed: ${this.redactError(error)}`);
      }
    }
    return store;
  }
  /**
   * 会话目录数据源：全局服务器 + 该 cwd 所属项目的项目级服务器（**配置层面**，
   * 与 host 当前 setSession 状态解耦）。此前直接用 manager.supervisors（实时
   * 连接状态、跟随"当前工作区"）——切换工作区会断开/连接项目级服务器，导致
   * 别的会话的目录集合抖动、每次抖动注入一条目录更新消息。按 cwd 计算后：
   * 工作区 MCP 没变化 → digest 不变 → 不重新注入。
   *
   * 运行时注入（registerServer 的 runtimeRegistry，内存态）同样并入目录数据源
   * （#359）：插件经运行时注入注册的服务器，连接成功、工具可用，
   * 但此前不在目录里——模型看不到能力，只能自己翻 CLI。同名 runtime 优先
   * （与 reconcile 双轨一致）。
   *
   * 同名碰撞取项目条目（#770-11，项目优先）：与 buildDesiredServers/reconcile
   * 同口径——连接层同名跨 root 各成一条（键含 root，谁也不顶谁），目录按裸名
   * 只取一条时取会话项目那条（scope=SCOPE_PROJECT）。
   * - 预期 breaking：同名碰撞进目录的配置翻转，模型可见工具集/描述随之变化。
   *   digest 只含名集合（见 catalog/impl/digest），名集不变时 digest 不变，
   *   但条目内容仍经 catalogViewFor/compose 进入注入文本。
   * - summary() 仍列全局 + 项目两条（GUI 两条 vs 模型取其一）属预期，不在此收敛。
   */
  async catalogServersFor(cwd) {
    const servers = /* @__PURE__ */ new Map();
    collectCatalogServers(servers, this.store.data.servers.map(serverEntry), SCOPE_GLOBAL);
    collectCatalogServers(servers, this.runtimeRegistry, SCOPE_GLOBAL);
    const { workspace } = orchestratorPorts.get();
    const root = await projectRootForCwd(cwd, workspace.findProjectRoot);
    if (root === void 0)
      return servers;
    const store = await this.projectStoreFor(root);
    if (store === void 0)
      return servers;
    collectCatalogServers(servers, store.data.servers.map(serverEntry), SCOPE_PROJECT);
    return servers;
  }
  /**
   * 合成注入端目录缓存视图（#569 修复核心）：实现在 catalog/impl/cache-view/index.ts
   * （makeCatalogViewFor 工厂闭包，含磁盘 last-good mtime 缓存），本方法为
   * 薄桥接（C-DIR：catalogViewFor 迁出 catalog 域，宿主最小面）。
   * @param cwd 会话 cwd（与 catalogServersFor 同源解析项目 root）。
   * @param servers catalogServersFor 的输出（name → { server, scope }）。
   * @returns CatalogCache 形态视图（name → { summary }），可直接喂 composeCatalogEntries。
   */
  async catalogViewFor(cwd, servers) {
    return this.catalogViewResolver(cwd, servers);
  }
  /**
   * 会话切换：只切 currentRoot + fire-and-forget 惰性启动（不 await 任何连接）。
   * 变更点驱动（#111/#228）：POST /api/dsh-mcp/session 永不挂起——连接/发现
   * 由中间层惰性驱动（per-root in-flight 去重），此处零连接副作用。
   * 单池后项目级连接恒由中间层池按 root 常驻，切走不断开。
   */
  async setSession(cwd) {
    const { workspace } = orchestratorPorts.get();
    const root = await projectRootForCwd(cwd, workspace.findProjectRoot);
    if (root === this.projectRoot && this.projectStore !== void 0)
      return;
    if (root === void 0 && this.projectStore === void 0)
      return;
    this.projectRoot = root;
    this.projectStore = void 0;
    if (root !== void 0) {
      const store = await this.projectStoreFor(root);
      if (this.projectRoot !== root)
        return;
      this.projectStore = store;
    }
    await reloadStoreQuietly(this.store, (error) => {
      this.logger.warn(`dsh-mcp-manager: reload global config failed: ${this.redactError(error)}`);
    });
    if (this.middleware !== void 0) {
      const target = root ?? MIDDLEWARE_GLOBAL_ROOT;
      touchUnitInBackground(this.middleware, target, (error) => {
        this.logger.warn(`dsh-mcp-manager: setSession touch unit(${target}) failed: ${this.redactError(error)}`);
      });
    }
    this.emitStatus();
  }
  /**
   * 切回前台可用性恢复：对本次请求工作空间连接的非强制恢复（对齐 SSE forceReconnect 的
   * 触发时机，不对称其 force 语义，#1120）。
   * 复用官方管理机制与现有 middleware.ensureConnected 的状态投影/在途去重：
   * connected/connecting/reconnecting 走现有短路保留代际与官方退避，不以每次
   * visibilitychange 为由 dispose/restart；entry 缺失、真正失败经正常路径恢复；
   * userDisabled 绝不复活；显式用户 reconnect/force 保持现有能力走 connect()。
   *
   * 不做自研连接或协议 ping：官方挂载层只提供 ready/disposed/工具注册面，无法实时
   * 区分“有工具注册的健康连接”与“有工具注册的半开连接”——自动恢复不声称检测真实
   * 健康；半开仍由用户显式重连恢复（README 已知限制）。
   *
   * @param cwd 本次请求的会话 cwd：undefined=旧无 body 请求回落既有绑定
   *   （this.projectRoot ?? @global）；""=新请求明确无工作区，固定 @global，
   *   不回落到别人的 projectRoot；非空=本次解析并固定 root，不读并发可变的
   *   manager.projectRoot 字段。
   */
  async resumeReconnect(cwd) {
    const mw = this.middleware;
    if (mw === void 0)
      return;
    const { workspace } = orchestratorPorts.get();
    let root;
    if (cwd === void 0) {
      root = this.projectRoot ?? MIDDLEWARE_GLOBAL_ROOT;
    } else if (cwd === "") {
      root = MIDDLEWARE_GLOBAL_ROOT;
    } else {
      root = await workspace.normalizedProjectRoot(cwd) ?? MIDDLEWARE_GLOBAL_ROOT;
    }
    const unit = mw.units.get(root) ?? await mw.projectUnitFor(root);
    if (unit === void 0)
      return;
    const servers = await this.projectServersFor(root);
    const targets = (servers ?? []).filter((server) => server.enabled !== false && !unit.userDisabled.has(server.name)).map((server) => server.name);
    await Promise.all(targets.map((name2) => mw.ensureConnected(root, name2).catch((error) => {
      this.logger.warn(`dsh-mcp-manager: resume ${name2}@${root} failed: ${this.redactError(error)}`);
    })));
  }
  /**
   * 重读磁盘配置（全局 + 当前项目）并同步连接集合。
   * 供「浮窗刷新」等读取路径调用：外部修改 mcp.json 后无需重启宿主。
   * 仅在配置或连接集合实际变化时广播，避免空转 SSE → 客户端 refresh 循环。
   * 变更点驱动（#111）：读取路径不再调用本方法（GET /servers 纯读）；本方法
   * 仅由 fs.watch 变更点与用户操作 API 调用。
   *
   * #616 修复：两次 reloadIfChanged 均为 false（配置未变）时直接早退、不再
   * reconcile——全局 watcher 监听的是整个 `~/.dsh` 目录，插件自身的
   * user-state 写盘（saveUserState/saveDisabledTools，浮窗连接/断开必写）会
   * 触发 watcher 事件；此前无配置变化也走 reconcileServers，是「用户操作
   * 全局服务器 → 项目级单元被误拆」链路的放大器（根因见 start 内注释）。
   */
  async refreshFromDisk() {
    let configChanged = await reloadStoreQuietly(this.store, (error) => {
      this.logger.warn(`dsh-mcp-manager: reload global config failed: ${this.redactError(error)}`);
    });
    if (this.projectStore !== void 0) {
      configChanged = await reloadStoreQuietly(this.projectStore, (error) => {
        this.logger.warn(`dsh-mcp-manager: reload project config failed: ${this.redactError(error)}`);
      }) || configChanged;
    }
    if (!configChanged)
      return;
    this.reconcileServers();
    this.emitStatus();
  }
  /**
   * 按当前配置同步连接池：池内不再需要的（移除 / 禁用 / 归属 root 已变）释放，
   * 配置里新增或恢复的经中间层单元触达。
   *
   * **键是 (归属 root, 裸名)**（单池后与单元表同构）：同名跨 scope（全局 + 项目级）
   * 各成一条，不再互相顶掉——旧直连账本按裸名键，同名只能活一个，那条限制随账本退役。
   * runtime 注入条目仍与 store 全局同名时**优先**（双轨合并，与 summary/catalogServersFor 同口径）。
   *
   * 同步方法（触达与释放都是同步发起 + 异步结算）；防重入（读取路径可并发）。
   * @returns {boolean} 连接集合是否变化（释放了在册连接，或触达了尚未在册的服务器）
   */
  reconcileServers() {
    if (this.reconcileBusy)
      return false;
    this.reconcileBusy = true;
    try {
      return syncPool(this.middleware, buildDesiredServers(this.store, this.projectStore, this.runtimeRegistry, (scope) => this.poolRootFor(scope)), this.projectRoot, (name2, scope) => this.start(name2, scope));
    } finally {
      this.reconcileBusy = false;
    }
  }
  async startAll() {
    for (const server of this.store.data.servers) {
      if (server.enabled !== false)
        this.start(server.name, SCOPE_GLOBAL);
    }
  }
  /**
   * 启动一个服务器的连接（单池后唯一的连接路径）。
   *
   * 全部服务器都归中间层单元持有：项目级幂等触达当前项目单元，全局级触达 @global
   * 单元。startAll / add / update / reconcile / registerServer 各入口自动收敛，
   * 无需逐处特判。配置来源一律是宿主面 `projectServersFor(root)`（store + runtime
   * 注入并集），因此不再需要「config 直传」入参。
   *
   * #616 根因修复保留：项目级分支是幂等触达（projectUnitFor + 单台 ensureConnected），
   * 不是旧 touchMiddlewareUnit 的整单元拆毁——浮窗连接/断开任意服务器触发的
   * reconcile 不再把当前项目单元连人带连接整个拆掉。
   *
   * 中间层实例缺失（未经 apply 装配）时打 warn 并放弃：不退化成官方直装——那条
   * 并行路径已退役，硬装会在池不知情的情况下占住官方 serverName 活体预留。
   */
  start(name2, scope = SCOPE_GLOBAL) {
    if (this.middleware === void 0) {
      this.logger.warn(`dsh-mcp-manager: 中间层未就绪，服务器 "${name2}" 的连接未建立（全部服务器只经中间层单元）`);
      return;
    }
    if (scope === SCOPE_PROJECT)
      this.ensureMiddlewareServer(name2);
    else
      this.touchGlobalUnit(name2);
  }
  /**
   * 触达 @global 单元并确保该全局服务器连接（start 的全局级路径）。
   * projectUnitFor 首次触达会连带惰性连接全部全局服务器，等价 startAll 语义；
   * userDisabled 命中不连（与浮窗断开语义一致）。
   */
  touchGlobalUnit(name2) {
    const mw = this.middleware;
    if (mw === void 0)
      return;
    void mw.projectUnitFor(MIDDLEWARE_GLOBAL_ROOT).then(async (unit) => {
      if (unit === void 0 || unit.userDisabled.has(name2))
        return;
      await mw.ensureConnected(MIDDLEWARE_GLOBAL_ROOT, name2);
    }).catch((error) => {
      this.logger.warn(`dsh-mcp-manager: touchGlobalUnit(${name2}) failed: ${this.redactError(error)}`);
    });
  }
  /**
   * 幂等触达当前项目单元并确保该服务器连接（#616：start 的中间层项目级接管路径，
   * 取代旧 touchMiddlewareUnit 的整单元拆毁语义）。
   * - 单元缺失（宿主重启 / 首次 reconcile）：projectUnitFor 创建 + 惰性连接全部；
   * - 单元已存在（配置热重载 / 误触发的 reconcile）：保留既有连接，仅对**该**服务器
   *   ensureConnected（connected/connecting 短路，幂等）；
   * - entry 已存在但 store 配置已变（手工编辑 mcp.json 热重载）：force 单台重建——
   *   旧实现的配置生效来自整单元拆毁的副作用，此处改为精确到单台，不殃及同单元
   *   其他连接。
   * userDisabled 命中不连（与浮窗断开语义一致）；无活动项目 root 静默返回
   * （与旧 touchMiddlewareUnit 同口径）。
   */
  ensureMiddlewareServer(name2, requestedRoot = this.projectRoot) {
    const mw = this.middleware;
    if (mw === void 0 || requestedRoot === void 0)
      return;
    const root = requestedRoot;
    void mw.projectUnitFor(root).then(async (unit) => {
      if (unit === void 0 || unit.userDisabled.has(name2))
        return;
      const current = this.projectStores.get(root)?.find(name2) ?? (root === this.projectRoot ? this.projectStore?.find(name2) : void 0);
      const entry = unit.connections.get(name2);
      if (entry !== void 0 && current !== void 0 && JSON.stringify(entry.server) !== JSON.stringify(current)) {
        await mw.ensureConnected(root, name2, { force: true });
        return;
      }
      await mw.ensureConnected(root, name2);
    }).catch((error) => {
      this.logger.warn(`dsh-mcp-manager: ensureMiddlewareServer(${name2}) failed: ${this.redactError(error)}`);
    });
  }
  /**
   * 拆除中间层池中该 server 的连接（update/remove 配置变更后强制重建；
   * 不写 userDisabled——与 disconnect 的禁用语义区分）。此前 update/remove 仅
   * 处理项目单元，@global 池连接与目录残留导致「已删服务器仍可调用」。
   */
  dropMiddlewareConnection(name2, root) {
    const mw = this.middleware;
    if (mw === void 0)
      return;
    let dropped = false;
    for (const unit of mw.units.values()) {
      if (root !== void 0 && unit.root !== root)
        continue;
      if (mw.releaseConnection(unit.root, name2))
        dropped = true;
      const { catalogDirectory: catalogDirectory2 } = orchestratorPorts.get().catalog;
      if (catalogDirectory2.entryFor(unit.root, name2) !== void 0) {
        void catalogDirectory2.removeRootEntry(unit.root, name2, {
          cachePath: this.catalogCachePathFor(unit.root),
          warn: (message) => this.logger.warn(message)
        }).catch(() => {
        });
        catalogDirectory2.dropServer(unit.root, name2);
        dropped = true;
      }
    }
    if (root === void 0)
      mw.abandonInFlight(name2);
    else
      mw.units.get(root)?.inFlight.delete(name2);
    if (dropped)
      this.emitStatus();
  }
  /**
   * 运行时注册服务器（内存态，不落盘）。
   * 供其他插件经 ctx.mcpManager 注入（官方 storageDomain service 模式）。
   * - 同名已存在（store 或 runtime）：返回 { name, existing: true }，不抛错；
   * - 注册即连接（走 start 的 config 直传分支，同名 runtime 优先）；
   * - 串行队列防 reconcileBusy 吞注册；多插件并发注册排队。
   * @param options 注册入参；`toolDefinitions` 可选——提供时该服务器工具
   *   全部用调用方封装定义注册（supervisor 跳过远端 schema 投影，execute
   *   来自调用方；命名仍按 publicToolName 的 mcp__ 前缀规则）。
   */
  async registerServer(options) {
    const { toolDefinitions, ...rest } = options;
    const config = orchestratorPorts.get().configModel.normalizeServer(rest);
    if (Array.isArray(toolDefinitions))
      config.toolDefinitions = toolDefinitions;
    const run = this.registerQueue.then(async () => {
      if (this.runtimeRegistry.has(config.name) || this.store.find(config.name) !== void 0) {
        return { name: config.name, existing: true };
      }
      this.runtimeRegistry.set(config.name, config);
      if (config.enabled !== false)
        this.start(config.name, SCOPE_GLOBAL);
      return { name: config.name, existing: false };
    });
    this.registerQueue = run.then(() => void 0, () => void 0);
    return run;
  }
  /**
   * 运行时注销（不影响 store 持久化条目；同名 store 条目回落）。
   * - **先删 runtimeRegistry 再拆中间层连接**（#413 QA P2-1）：drop 时数据源
   *   （projectServersFor 含 runtime）已不再返回该服务器，任何并发
   *   ensureConnected/connect 都查不到配置而无法重建虚拟连接——堵死注销后
   *   瞬时复活窗口，且不写 userDisabled（避免持久化污染导致同名 re-register
   *   被静默阻止连接，与 disconnect 的「用户主动断开」语义区分）；
   * - 拆中间层连接与目录条目（#413：runtime 条目在 @global 单元，须显式清理，
   *   否则 unregister 后 ws_mcp_list/call 残留幽灵）；
   * - reconcile 回落 store 配置。
   */
  async unregisterServer(name2) {
    const run = this.registerQueue.then(async () => {
      if (this.runtimeRegistry.has(name2)) {
        this.runtimeRegistry.delete(name2);
        this.dropMiddlewareConnection(name2);
        this.reconcileServers();
      }
    });
    this.registerQueue = run.then(() => void 0, () => void 0);
    return run;
  }
  async add(server, scope = SCOPE_GLOBAL) {
    const placeholderKey = findProjectionPlaceholderKey(server);
    if (placeholderKey !== void 0) {
      throw new Error(`server ${JSON.stringify(placeholderKey)} must not contain projection placeholder "[REDACTED]" (re-enter the real value)`);
    }
    const config = orchestratorPorts.get().configModel.normalizeServer(server);
    orchestratorPorts.get().configModel.assertEnvPolicy(config.env, config.headers, void 0, config.url, config.args);
    const store = scope === SCOPE_PROJECT ? await this.projectStoreOrThrow() : this.store;
    if (store.find(config.name) !== void 0) {
      throw new Error(`server "${config.name}" already exists in ${scope} scope`);
    }
    store.upsert(config);
    await store.save();
    if (config.enabled !== false)
      this.start(config.name, scope);
    return config;
  }
  async update(name2, patch, scope = SCOPE_GLOBAL, cwd) {
    const { configModel } = orchestratorPorts.get();
    const root = await this.rootForRequest(scope, cwd);
    const store = await this.storeForRoot(root, scope);
    const existing = store.find(name2);
    if (existing === void 0)
      throw new Error(`server "${name2}" not found in ${scope} scope`);
    const merged = configModel.normalizeServer({
      ...existing,
      ...stripProjectionPatch(patch),
      name: name2
    });
    configModel.assertEnvPolicy(merged.env, merged.headers, void 0, merged.url, merged.args);
    const revision = this.reserveUpdate(root, scope, name2);
    store.upsert(merged);
    this.cancelDisabledUpdate(root, scope, name2, merged);
    await store.save();
    if (!this.ownsUpdate(revision))
      return merged;
    this.invalidateHttpConnection(root, scope, name2);
    this.dropMiddlewareConnection(name2, root);
    if (patch.enabled === true)
      await this.acceptConnection(name2, scope, scope === SCOPE_PROJECT ? root : void 0);
    else
      this.startUpdatedServer(root, scope, name2, merged);
    return merged;
  }
  async storeForRoot(root, scope) {
    if (scope !== SCOPE_PROJECT)
      return this.store;
    const store = this.projectStores.get(root) ?? (this.projectRoot === root ? this.projectStore : void 0) ?? await this.projectStoreFor(root);
    if (store === void 0)
      throw new Error(`workspace ${root} has no project MCP config`);
    return store;
  }
  reserveUpdate(root, scope, name2) {
    if (root === void 0)
      return void 0;
    const key = this.connectionKey(root, scope, name2);
    const epoch = ++this.httpSequence;
    this.httpEpochs.set(key, epoch);
    return { key, epoch };
  }
  ownsUpdate(revision) {
    return revision === void 0 || this.httpEpochs.get(revision.key) === revision.epoch;
  }
  cancelDisabledUpdate(root, scope, name2, server) {
    if (root === void 0 || server.enabled !== false)
      return;
    const key = this.connectionKey(root, scope, name2);
    this.httpConnections.delete(key);
    const unit = this.middleware?.units.get(root);
    if (unit !== void 0) {
      this.middleware?.releaseConnection(root, name2);
      unit.inFlight.delete(name2);
    }
    this.emitStatus();
  }
  startUpdatedServer(root, scope, name2, server) {
    if (server.enabled === false)
      return;
    if (scope === SCOPE_PROJECT)
      this.ensureMiddlewareServer(name2, root);
    else
      this.start(name2, scope);
  }
  async remove(name2, scope = SCOPE_GLOBAL, cwd) {
    const root = await this.rootForRequest(scope, cwd);
    const store = await this.storeForRoot(root, scope);
    this.invalidateHttpConnection(root, scope, name2);
    this.dropMiddlewareConnection(name2, root);
    store.remove(name2);
    await store.save();
  }
  /**
   * 显式连接（浮窗「连接」/ 宿主 API）：解除 userDisabled + force 受控重建。
   *
   * 单池后只有一条路径——中间层单元：按 scope 定位 root 单元、清 userDisabled、
   * force 重建该连接。#412：force 是必需的——entry 可能半开卡在 connected，
   * ensureConnected 的 connected 短路会让显式「连接」看起来无效。
   */
  async connect(name2, scope = SCOPE_GLOBAL) {
    const store = scope === SCOPE_PROJECT ? await this.projectStoreOrThrow() : this.store;
    const server = resolveConnectableServer(store, this.runtimeRegistry, name2, scope, (message) => this.logger.warn(message));
    if (server === void 0)
      throw new Error(`server "${name2}" not found in ${scope} scope`);
    const mw = this.middleware;
    if (mw === void 0)
      throw new Error("middleware is not initialized (apply first)");
    const root = scope === SCOPE_PROJECT ? this.projectRoot : MIDDLEWARE_GLOBAL_ROOT;
    if (root === void 0)
      throw new Error("no active project session (call session with a cwd first)");
    const unit = await mw.projectUnitFor(root);
    if (unit === void 0)
      throw new Error(`workspace ${root} has no project MCP config`);
    unit.userDisabled.delete(name2);
    mw.disabledByRoot.get(root)?.delete(name2);
    await this.saveUserState(mw.units);
    await mw.ensureConnected(root, name2, { force: true });
  }
  /**
   * 显式断开（浮窗「断开」/ 宿主 API）：写 userDisabled + 拆池内连接。
   *
   * 定位（单池后只剩池这一侧）：
   * - scope=project → 当前项目 root 单元（#392：避免同名全局服务器把项目级断开错写进 @global）；
   * - 全局配置（store，非 runtime）→ @global 单元（#382：不按 units 遍历序猜）；
   * - 其余（runtime 注入等）→ 遍历命中该条目的单元。
   * 前置约束（#770-11 C/A 相）：无 scope 同名调用仍按上法定 @global，而目录
   * （catalogServersFor）同名取项目——两者分叉；无 scope 调用方须显式传 scope
   * （#392 同式），本相不动 API 缺省（路由层缺 scope 即归一化为 global）。
   * 拆除只发起不等结算（裁定 V）：官方 dispose 会等在途首连，挂死的服务器能把它拖到 SDK 的 60s 超时。
   */
  async disconnect(name2, scope) {
    const mw = this.middleware;
    if (mw === void 0)
      return;
    let targetUnit;
    const scoped = orchestratorPorts.get().workspace.normalizeScope(scope ?? "");
    const requestRoot = scoped === SCOPE_PROJECT ? this.projectRoot : MIDDLEWARE_GLOBAL_ROOT;
    if (requestRoot !== void 0)
      this.invalidateHttpConnection(requestRoot, scoped, name2);
    if (scoped === SCOPE_PROJECT) {
      targetUnit = this.projectRoot !== void 0 ? mw.units.get(this.projectRoot) : void 0;
    } else if (scope !== void 0 || this.store.find(name2) !== void 0) {
      targetUnit = mw.units.get(MIDDLEWARE_GLOBAL_ROOT);
    } else {
      targetUnit = [...mw.units.values()].find((unit) => unit.connections.has(name2) || unit.userDisabled.has(name2));
    }
    if (targetUnit === void 0)
      return;
    targetUnit.userDisabled.add(name2);
    this.markDisabled(mw, targetUnit.root, name2);
    mw.releaseConnection(targetUnit.root, name2);
    targetUnit.inFlight.delete(name2);
    this.emitStatus();
    await this.saveUserState(mw.units);
  }
  async reconnect(name2, scope = SCOPE_GLOBAL) {
    await this.disconnect(name2, scope);
    await this.connect(name2, scope);
  }
  /** 面板数据：配置 + 实时状态 + 工具列表 + 项目信息。 */
  summary() {
    return this.summaryForRoot(this.projectRoot ?? MIDDLEWARE_GLOBAL_ROOT);
  }
  async summaryForCwd(cwd) {
    const root = await projectRootForCwd(cwd, orchestratorPorts.get().workspace.findProjectRoot);
    if (root === void 0)
      return this.summaryForRoot(MIDDLEWARE_GLOBAL_ROOT);
    await this.projectStoreFor(root);
    return this.summaryForRoot(root);
  }
  summaryForRoot(root) {
    const servers = [];
    for (const server of this.store.data.servers) {
      servers.push(this.summarizeForRoot(server, SCOPE_GLOBAL, root));
    }
    const projectStore = this.summaryStoreForRoot(root);
    if (projectStore !== void 0) {
      for (const server of projectStore.data.servers) {
        servers.push(this.summarizeForRoot(server, SCOPE_PROJECT, root));
      }
    }
    for (const server of this.runtimeRegistry.values()) {
      servers.push(this.summarizeForRoot(server, SCOPE_GLOBAL, root));
    }
    const byStatus = { ...EMPTY_STATUS_COUNTS };
    for (const server of servers)
      byStatus[server.status] = (byStatus[server.status] ?? 0) + 1;
    return {
      cwd: root === MIDDLEWARE_GLOBAL_ROOT ? void 0 : root,
      projectRoot: root === MIDDLEWARE_GLOBAL_ROOT ? void 0 : root,
      servers,
      counts: byStatus
    };
  }
  summaryStoreForRoot(root) {
    if (root === MIDDLEWARE_GLOBAL_ROOT)
      return void 0;
    return this.projectStores.get(root) ?? (root === this.projectRoot ? this.projectStore : void 0);
  }
  /**
   * 投影单元：该 (server, scope) 归属的中间层单元。单池后全部条目都在池里，
   * 只剩「单元还没建出来 / 无项目 root」这两种缺失。
   */
  middlewareUnitFor(serverName, scope, projectRoot = this.projectRoot) {
    const mw = this.middleware;
    if (mw === void 0)
      return void 0;
    const root = scope === SCOPE_PROJECT ? projectRoot : MIDDLEWARE_GLOBAL_ROOT;
    return root === void 0 ? void 0 : mw.units.get(root);
  }
  summarize(server, scope) {
    return this.summarizeForRoot(server, scope, this.projectRoot ?? MIDDLEWARE_GLOBAL_ROOT);
  }
  summarizeForRoot(server, scope, root) {
    const { catalog: catalogPort, pipeline } = orchestratorPorts.get();
    const base = projectServerForSummary(server, pipeline.maskSecretArgsForDisplay);
    const httpSummary = this.httpSummary(server, scope, base, root);
    if (httpSummary !== void 0)
      return httpSummary;
    const unit = this.middlewareUnitFor(server.name, scope, root);
    const entry = unit?.connections.get(server.name);
    if (unit === void 0 || entry === void 0)
      return summarizeAbsent(base, scope, server);
    const catalog = catalogPort.catalogDirectory.entryFor(unit.root, server.name);
    return summarizePooled(base, scope, {
      tools: catalogToolNames(catalog),
      disabled: this.disabledTools.get(unit.root)?.get(server.name),
      inheritedDisabled: unit.root === MIDDLEWARE_GLOBAL_ROOT ? void 0 : this.disabledTools.get(MIDDLEWARE_GLOBAL_ROOT)?.get(server.name),
      // 状态经读时刷新的投影取（裁定 U）：entry.status 只在装载窗口结算时写入，
      // 「曾连上、工具前缀消失」这类事实只有重算才看得见。
      status: this.middleware?.statusOf(unit.root, server.name),
      // #770-L4 显示侧脱敏（分诊结论）：settled outcome.error 可含凭据——① handle.ready
      // 拒因来自官方（官方手握展开后的明文 Config，其文案不透明，不能证伪不回显输入）；
      // ② failed 文案经 withOfficialLogs 接入官方日志收集链原文（同不透明）。且状态与错因
      // 分源（status 读时刷新、error 结算时冻结）：常驻重连成功后 connected 可携 stale
      // failed 文案，故 connected 分支亦须脱敏。脱敏只在显示侧（redaction 快照 +
      // redactError），lifecycle 域内原文不动；已脱敏源二次脱敏恒等无害。
      error: pooledErrorText(entry, catalog, (error) => this.redactError(error))
    });
  }
  httpSummary(server, scope, base, projectRoot) {
    const root = scope === SCOPE_PROJECT ? projectRoot : MIDDLEWARE_GLOBAL_ROOT;
    const job = this.httpConnections.get(this.connectionKey(root, scope, server.name));
    if (job === void 0 || server.enabled === false)
      return void 0;
    const current = this.middleware?.units.get(root)?.connections.get(server.name);
    if (job.state === "failed" && current !== job.failedEntry && this.middleware?.statusOf(root, server.name) === SERVER_STATES.connected) {
      this.httpConnections.delete(this.connectionKey(root, scope, server.name));
      return void 0;
    }
    return { ...summarizeAbsent(base, scope, server), status: job.state, error: job.error };
  }
  async dispose() {
    if (this.statusTimer !== void 0) {
      clearTimeout(this.statusTimer);
      this.statusTimer = void 0;
    }
    this.stats.dispose();
    if (this.middleware !== void 0) {
      await this.middleware.dispose();
      this.middleware = void 0;
    }
  }
};

// lib/server/connection/orchestrator/interface.js
function installOrchestrator(deps) {
  orchestratorPorts.install(deps);
}

// lib/server/api/impl/service/index.js
var ApiPorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: api 域只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本域没有别的活资源要释放。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 域内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成行为
   * 正常但参数不对（scope 归一化与 mcpServers 导入解析静默换实现），症状与本插件毫无字面关联。
   * 只在路由 handler 内调用（不在模块求值期），故取到的一定是装配后的能力。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: api 域未装配——组合根未在入口调用 installApi（src/index.ts）");
    }
    return deps;
  }
};
var apiPorts = new ApiPorts();

// ../../shared/sse-hub.js
var DEFAULT_HEARTBEAT_MS = 3e4;
var DEFAULT_STALLED_TIMEOUT_MS = 9e4;
var DEFAULT_MAX_AGE_MS = 120 * 6e4;
var DEFAULT_IDLE_TIMEOUT_MS = 15 * 6e4;
var MAX_WRITE_FAILS = 3;
var PING_FRAME = 'data: {"type":"ping"}\n\n';
function createSseHub(options) {
  const heartbeatMs = options.heartbeatMs ?? DEFAULT_HEARTBEAT_MS;
  const stalledTimeoutMs = options.stalledTimeoutMs ?? DEFAULT_STALLED_TIMEOUT_MS;
  const maxAgeMs = options.maxAgeMs ?? DEFAULT_MAX_AGE_MS;
  const idleTimeoutMs = options.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS;
  const conns = /* @__PURE__ */ new Map();
  const evictStats = {
    close: 0,
    error: 0,
    stalled: 0,
    maxage: 0,
    destroyed: 0,
    dispose: 0
  };
  let heartbeatTimer;
  function evict(res, reason) {
    if (conns.delete(res)) {
      evictStats[reason] += 1;
      try {
        res.destroy();
      } catch {
      }
    }
  }
  function isStalled(state, t) {
    return state.stalledAt !== void 0 && t - state.stalledAt >= stalledTimeoutMs;
  }
  function isExpiredIdle(state, t) {
    if (maxAgeMs <= 0)
      return false;
    if (t - state.registeredAt < maxAgeMs)
      return false;
    return t - state.lastWriteAt > idleTimeoutMs;
  }
  function writeFrame(res, text, activity = true) {
    const state = conns.get(res);
    if (state === void 0)
      return false;
    if (res.destroyed || res.writableEnded) {
      evict(res, "destroyed");
      return false;
    }
    let written = false;
    try {
      written = res.write(text) !== false;
    } catch {
      state.failStreak += 1;
      if (state.failStreak >= MAX_WRITE_FAILS)
        evict(res, "error");
      return false;
    }
    if (written) {
      if (activity)
        state.lastWriteAt = Date.now();
      state.stalledAt = void 0;
      state.failStreak = 0;
      return true;
    }
    if (state.stalledAt === void 0)
      state.stalledAt = Date.now();
    return false;
  }
  function register(res) {
    const t = Date.now();
    conns.set(res, { registeredAt: t, lastWriteAt: t, stalledAt: void 0, failStreak: 0 });
    res.on("close", () => evict(res, "close"));
    res.on("error", () => evict(res, "error"));
    try {
      res.socket?.setKeepAlive?.(true, 6e4);
    } catch {
    }
  }
  function unregister(res) {
    evict(res, "close");
  }
  function broadcast(text) {
    for (const [res] of conns) {
      writeFrame(res, text);
    }
  }
  function size() {
    return conns.size;
  }
  function evictStatsCopy() {
    return { ...evictStats };
  }
  function connHealth(nowMs) {
    const t = nowMs ?? Date.now();
    const out = [];
    for (const state of conns.values()) {
      out.push({
        ageMs: t - state.registeredAt,
        lastWriteAgoMs: t - state.lastWriteAt,
        stalledMs: state.stalledAt === void 0 ? -1 : t - state.stalledAt
      });
    }
    return out;
  }
  function dispose() {
    if (heartbeatTimer !== void 0)
      clearInterval(heartbeatTimer);
    heartbeatTimer = void 0;
    for (const [res] of [...conns])
      evict(res, "dispose");
  }
  function heartbeatTick() {
    const t = Date.now();
    for (const [res, state] of conns) {
      if (res.destroyed || res.writableEnded) {
        evict(res, "destroyed");
        continue;
      }
      if (isStalled(state, t)) {
        evict(res, "stalled");
        continue;
      }
      if (isExpiredIdle(state, t)) {
        evict(res, "maxage");
        continue;
      }
      writeFrame(res, PING_FRAME, false);
    }
  }
  heartbeatTimer = setInterval(heartbeatTick, heartbeatMs);
  heartbeatTimer.unref?.();
  return {
    register,
    unregister,
    broadcast,
    size,
    evictStats: evictStatsCopy,
    connHealth,
    dispose
  };
}

// lib/server/api/routes-helpers.js
function queryParam(url, name2) {
  const value = url.searchParams.get(name2);
  return value === null ? void 0 : value;
}

// lib/server/api/routes-controllers.js
function guardRouteAccess(req, res, methods, helpers) {
  return guardLoopbackMethod(req, res, methods, {
    remoteAdmission: helpers.remoteAdmission
  });
}
function requireNameParam(url, res) {
  const name2 = queryParam(url, "name");
  if (name2 === void 0 || name2 === "") {
    writeJson(res, 400, { error: "name query parameter is required" });
    return void 0;
  }
  return name2;
}
var UI_CONFIG_KEYS = [
  "position",
  "offsetX",
  "offsetY",
  "blankY",
  "zIndexBase"
];
function buildConfigRoute(manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES.config,
    handler: async (req, res) => {
      const method = String(req.method);
      const methods = [...ROUTE_FENCE.config.loopbackExempt, ...ROUTE_FENCE.config.guarded];
      if (!guardRouteAccess(req, res, methods, helpers))
        return;
      if (ROUTE_FENCE.config.loopbackExempt.includes(method)) {
        try {
          writeJson(res, 200, manager.uiConfig());
        } catch (error) {
          helpers.handleError(res, error);
        }
        return;
      }
      if (ROUTE_FENCE.config.guarded.includes(method)) {
        let body;
        try {
          body = await readJsonBody(req);
        } catch {
          writeJson(res, 400, { error: "invalid JSON body" });
          return;
        }
        if (typeof body !== "object" || body === null) {
          writeJson(res, 400, { error: "invalid JSON body" });
          return;
        }
        try {
          const rec = body;
          const unknownKeys = Object.keys(rec).filter((key) => !UI_CONFIG_KEYS.includes(key));
          if (unknownKeys.length > 0) {
            writeJson(res, 400, { error: `unknown config key(s): ${unknownKeys.join(", ")}` });
            return;
          }
          writeJson(res, 200, await manager.updateUiConfig(body));
        } catch (error) {
          helpers.handleError(res, error);
        }
        return;
      }
      writeJson(res, 405, { error: `method not allowed: ${req.method}` });
    }
  };
}
async function handleServersMutation(method, url, req, res, manager, helpers) {
  if (method === "POST") {
    await createServer(req, res, manager, helpers);
    return true;
  }
  if (method !== "PATCH" && method !== "DELETE")
    return false;
  const name2 = requireNameParam(url, res);
  if (name2 === void 0)
    return true;
  await changeServer(method, name2, url, req, res, manager, helpers);
  return true;
}
async function createServer(req, res, manager, helpers) {
  const body = await readJsonBody(req);
  if (body === void 0) {
    writeJson(res, 400, { error: "invalid JSON body" });
    return;
  }
  const { workspace } = apiPorts.get();
  try {
    const rec = body;
    const scope = workspace.normalizeScope(rec.scope);
    if (typeof rec.cwd === "string" && rec.cwd !== "")
      await manager.setSession(rec.cwd);
    const created = await manager.add(rec, scope);
    const server = typeof manager.summarize === "function" ? manager.summarize(created, scope) : created;
    writeJson(res, 201, { server, summary: manager.summary() });
  } catch (error) {
    helpers.handleError(res, error);
  }
}
async function changeServer(method, name2, url, req, res, manager, helpers) {
  try {
    const scope = helpers.scopeParam(url);
    const cwd = queryParam(url, "cwd");
    const root = await manager.rootForRequest(scope, cwd);
    if (method === "DELETE") {
      await manager.remove(name2, scope, scope === SCOPE_PROJECT ? root : cwd);
      writeJson(res, 200, { ok: true, summary: manager.summaryForRoot(root) });
      return;
    }
    const body = await readJsonBody(req);
    if (body === void 0) {
      writeJson(res, 400, { error: "invalid JSON body" });
      return;
    }
    const updated = await manager.update(name2, body, scope, scope === SCOPE_PROJECT ? root : cwd);
    const server = manager.summarizeForRoot(updated, scope, root);
    const status = typeof body.enabled === "boolean" ? 202 : 200;
    writeJson(res, status, { server, summary: manager.summaryForRoot(root) });
  } catch (error) {
    helpers.handleError(res, error);
  }
}
function buildServersRoute(manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES.servers,
    handler: async (req, res) => {
      const url = new URL(req.url ?? "/", "http://localhost");
      const method = req.method ?? "GET";
      if (!guardRouteAccess(req, res, ROUTE_FENCE.servers.guarded, helpers))
        return;
      if (method === "GET") {
        try {
          const cwd = queryParam(url, "cwd");
          const summary = cwd === void 0 ? manager.summary() : await manager.summaryForCwd(cwd);
          writeJson(res, 200, summary);
        } catch (error) {
          helpers.handleError(res, error);
        }
        return;
      }
      if (await handleServersMutation(method, url, req, res, manager, helpers))
        return;
      writeJson(res, 405, { error: `method not allowed: ${method}` });
    }
  };
}
function buildSessionRoute(manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES.session,
    handler: async (req, res) => {
      if (!guardRouteAccess(req, res, ROUTE_FENCE.session.guarded, helpers))
        return;
      const body = await readJsonBody(req);
      if (body === void 0 || typeof body.cwd !== "string") {
        writeJson(res, 400, { error: "body must include a cwd string" });
        return;
      }
      try {
        await manager.setSession(body.cwd);
        writeJson(res, 200, { ok: true, summary: manager.summary() });
      } catch (error) {
        helpers.handleError(res, error);
      }
    }
  };
}
function parseResumeCwd(value) {
  if (Array.isArray(value))
    return { ok: false, error: "invalid JSON body" };
  const rec = value;
  if (!("cwd" in rec))
    return { ok: true };
  if (typeof rec.cwd !== "string")
    return { ok: false, error: "body cwd must be a string" };
  return { ok: true, cwd: rec.cwd };
}
function buildResumeRoute(manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES.resume,
    handler: async (req, res) => {
      if (!guardRouteAccess(req, res, ROUTE_FENCE.resume.guarded, helpers))
        return;
      try {
        if (typeof manager.resumeReconnect !== "function")
          throw new Error("resumeReconnect unavailable");
        const outcome = await readJsonBodyOutcome(req);
        if (outcome.kind === "invalid") {
          writeJson(res, 400, { error: "invalid JSON body" });
          return;
        }
        if (outcome.kind === "absent") {
          await manager.resumeReconnect();
          writeJson(res, 200, { ok: true, summary: manager.summary() });
          return;
        }
        const parsed = parseResumeCwd(outcome.value);
        if (!parsed.ok) {
          writeJson(res, 400, { error: parsed.error });
          return;
        }
        if (parsed.cwd === void 0) {
          await manager.resumeReconnect();
        } else {
          await manager.resumeReconnect(parsed.cwd);
        }
        writeJson(res, 200, { ok: true, summary: manager.summary() });
      } catch (error) {
        helpers.handleError(res, error);
      }
    }
  };
}
function buildNameActionRoute(route, action, manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES[route],
    handler: async (req, res) => {
      if (!guardRouteAccess(req, res, ROUTE_FENCE[route].guarded, helpers))
        return;
      const url = new URL(req.url ?? "/", "http://localhost");
      const name2 = requireNameParam(url, res);
      if (name2 === void 0)
        return;
      try {
        const root = await action(name2, helpers.scopeParam(url), queryParam(url, "cwd"));
        writeJson(res, 202, { ok: true, summary: manager.summaryForRoot(root) });
      } catch (error) {
        helpers.handleError(res, error);
      }
    }
  };
}
function buildConnectRoute(manager, helpers) {
  return buildNameActionRoute("connect", (name2, scope, cwd) => manager.acceptConnection(name2, scope, cwd), manager, helpers);
}
function buildDisconnectRoute(manager, helpers) {
  return buildNameActionRoute("disconnect", (name2, scope, cwd) => manager.disconnectForRequest(name2, scope, cwd), manager, helpers);
}
function buildReconnectRoute(manager, helpers) {
  return buildNameActionRoute("reconnect", (name2, scope, cwd) => manager.acceptConnection(name2, scope, cwd), manager, helpers);
}
async function importOneServer(server, store, scope, overwrite, manager, imported, skipped) {
  if (store.find(server.name) === void 0) {
    await manager.add(server, scope);
    imported.push(server.name);
    return;
  }
  if (!overwrite) {
    skipped.push(server.name);
    return;
  }
  await manager.update(server.name, server, scope);
  imported.push(server.name);
}
function buildImportJsonRoute(manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES.importJson,
    handler: async (req, res) => {
      const { workspace, configModel } = apiPorts.get();
      if (!guardRouteAccess(req, res, ROUTE_FENCE.importJson.guarded, helpers))
        return;
      const body = await readJsonBody(req);
      if (body === void 0 || typeof body.json !== "string") {
        writeJson(res, 400, { error: "body must include a json string" });
        return;
      }
      const imported = [];
      const skipped = [];
      try {
        const rec = body;
        const scope = workspace.normalizeScope(rec.scope);
        if (typeof rec.cwd === "string" && rec.cwd !== "")
          await manager.setSession(rec.cwd);
        const store = scope === SCOPE_PROJECT ? await manager.projectStoreOrThrow() : manager.store;
        const servers = configModel.parseClaudeJson(rec.json);
        for (const server of servers) {
          await importOneServer(server, store, scope, rec.overwrite === true, manager, imported, skipped);
        }
      } catch (error) {
        helpers.handleError(res, error);
        return;
      }
      writeJson(res, 200, { imported, skipped, summary: manager.summary() });
    }
  };
}
function parseToolDisableBody(body) {
  if (body === void 0 || typeof body !== "object" || body === null) {
    return { ok: false, error: "invalid JSON body" };
  }
  const rec = body;
  const server = typeof rec.server === "string" ? rec.server : "";
  const tool = typeof rec.tool === "string" ? rec.tool : "";
  const disabled = rec.disabled === true;
  if (server === "" || tool === "") {
    return { ok: false, error: "server 与 tool 均为必填" };
  }
  return { ok: true, server, tool, disabled };
}
function workspaceMismatchError(root, sessionRoot, server) {
  if (root === MIDDLEWARE_GLOBAL_ROOT || root === sessionRoot)
    return null;
  return `server ${JSON.stringify(server)} 不属于当前工作空间；路由一致性校验失败（防跨空间串台）`;
}
function buildToolDisableRoute(manager, helpers) {
  return {
    kind: "exact",
    path: ROUTES.toolDisable,
    handler: async (req, res) => {
      const { workspace } = apiPorts.get();
      if (!guardRouteAccess(req, res, ROUTE_FENCE.toolDisable.guarded, helpers))
        return;
      const url = new URL(req.url ?? "/", "http://localhost");
      const body = await readJsonBody(req);
      const parsedBody = parseToolDisableBody(body);
      if (!parsedBody.ok) {
        writeJson(res, 400, { error: parsedBody.error });
        return;
      }
      const { server, tool, disabled } = parsedBody;
      const parsed = workspace.parseFullServerName(server);
      if (parsed === void 0) {
        writeJson(res, 400, { error: "server 格式非法，应为 @<root>/<server>" });
        return;
      }
      const root = parsed.root;
      const cwdParam = queryParam(url, "cwd");
      if (cwdParam !== void 0 && cwdParam !== "")
        await manager.setSession(cwdParam);
      const mismatch = workspaceMismatchError(root, manager.projectRoot, server);
      if (mismatch !== null) {
        writeJson(res, 400, { error: mismatch });
        return;
      }
      if (typeof manager.setToolDisabled !== "function") {
        writeJson(res, 400, { error: "tool-disable not writable: middleware unavailable" });
        return;
      }
      try {
        const toolName = workspace.normalizeToolName(parsed.server, tool, "tool-disable");
        await manager.setToolDisabled(root, parsed.server, toolName, disabled);
        writeJson(res, 200, { ok: true, summary: manager.summary() });
      } catch (error) {
        helpers.handleError(res, error);
      }
    }
  };
}

// lib/server/api/routes.js
function makeRoutes(manager, _cwd = process.cwd()) {
  return makeRoutesWithAccess(manager, _cwd);
}
function makeRoutesWithAccess(manager, _cwd = process.cwd(), access = {}) {
  const handleError = (res, error) => {
    let message;
    try {
      message = typeof manager.redactError === "function" ? manager.redactError(error) : error instanceof Error ? error.message : String(error);
    } catch {
      message = error instanceof Error ? error.message : String(error);
    }
    writeJson(res, 400, { error: message });
  };
  const scopeParam = (url) => apiPorts.get().workspace.normalizeScope(queryParam(url, "scope") ?? "");
  const maybeSession = async (url) => {
    const cwdParam = queryParam(url, "cwd");
    if (cwdParam !== void 0 && cwdParam !== "")
      await manager.setSession(cwdParam);
  };
  const helpers = {
    handleError,
    scopeParam,
    maybeSession,
    remoteAdmission: access.remoteAdmission
  };
  return [
    buildConfigRoute(manager, helpers),
    buildServersRoute(manager, helpers),
    buildSessionRoute(manager, helpers),
    buildResumeRoute(manager, helpers),
    buildConnectRoute(manager, helpers),
    buildDisconnectRoute(manager, helpers),
    buildReconnectRoute(manager, helpers),
    buildImportJsonRoute(manager, helpers),
    buildToolDisableRoute(manager, helpers)
  ];
}
function uiConfigChangedFrame() {
  return sseData({ type: SSE_FRAMES.uiConfigChanged });
}
var SSE_PING_FRAME = sseData({ type: SSE_FRAMES.ping });
function broadcastFrame(connections, frame) {
  if (!connections)
    return;
  if (typeof connections.broadcast === "function") {
    connections.broadcast(frame);
    return;
  }
  for (const res of connections) {
    try {
      res.write(frame);
    } catch {
    }
  }
}
function makeEventsRoute(manager, options) {
  return makeEventsRouteWithAccess(manager, options);
}
function makeEventsRouteWithAccess(manager, options) {
  return {
    kind: "exact",
    path: ROUTES.events,
    handler: (req, res) => {
      const admission = admitLongLivedRequest(req, {
        remotePeerAdmission: options?.remotePeerAdmission
      });
      if ("rejection" in admission) {
        writeJson(res, admission.rejection, {
          error: admission.rejection === 401 ? "unauthorized" : "forbidden: loopback-only"
        });
        return;
      }
      if (req.method !== "GET") {
        writeJson(res, 405, { error: `method not allowed: ${req.method}` });
        return;
      }
      let lifecycleSettled = false;
      let disposePeer;
      const closeForPeer = () => {
        if (lifecycleSettled)
          return;
        lifecycleSettled = true;
        disposePeer = void 0;
        hub.unregister(res);
        if (!res.writableEnded && !res.destroyed)
          res.destroy();
      };
      if (admission.peer !== void 0) {
        try {
          disposePeer = bindPeerLifecycle(admission.peer, closeForPeer, "dsh-mcp-manager: raw SSE bound to admitted Peer");
        } catch {
          writeJson(res, 403, { error: "forbidden: peer-unavailable" });
          return;
        }
      }
      const hub = manager.sseHub ??= createSseHub({
        heartbeatMs: options?.heartbeatMs
      });
      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive"
      });
      res.write(": connected\n\n");
      res.write(sseData({ type: SSE_FRAMES.summary }));
      hub.register(res);
      res.on("close", () => {
        hub.unregister(res);
        if (lifecycleSettled)
          return;
        lifecycleSettled = true;
        const dispose = disposePeer;
        disposePeer = void 0;
        dispose?.();
      });
    }
  };
}
function makeHealthRoute(manager) {
  return makeHealthRouteWithAccess(manager);
}
function makeHealthRouteWithAccess(manager, access = {}) {
  return {
    kind: "exact",
    path: ROUTES.health,
    handler: (req, res) => {
      if (!guardLoopbackMethod(req, res, ["GET"], {
        remoteAdmission: access.remoteAdmission
      }))
        return;
      let servers = 0;
      let connected = 0;
      let tools = 0;
      let middlewareUnits = 0;
      let middlewareConnections = 0;
      let middlewareConnected = 0;
      const middleware = manager.middleware;
      for (const unit of middleware?.units.values() ?? []) {
        middlewareUnits += 1;
        for (const serverName of unit.connections.keys()) {
          servers += 1;
          middlewareConnections += 1;
          if (middleware?.statusOf(unit.root, serverName) === SERVER_STATES.connected) {
            connected += 1;
            middlewareConnected += 1;
          }
          tools += middleware?.toolCountOf(unit.root, serverName) ?? 0;
        }
      }
      writeJson(res, 200, {
        ok: true,
        plugin: "dsh-mcp-manager",
        servers,
        connected,
        tools,
        catalogCacheEntries: manager.catalogCache.size,
        middleware: {
          units: middlewareUnits,
          connections: middlewareConnections,
          connected: middlewareConnected
        }
      });
    }
  };
}

// lib/server/api/interface.js
function installApi(deps) {
  apiPorts.install(deps);
}

// lib/server/catalog/interface.js
var interface_exports = {};
__export(interface_exports, {
  CATALOG_ENTRY_MAX_CHARS: () => CATALOG_ENTRY_MAX_CHARS,
  CATALOG_SECTION_NAME: () => CATALOG_SECTION_NAME,
  CATALOG_SOURCE_KIND: () => CATALOG_SOURCE_KIND,
  CATALOG_SOURCE_PLUGIN: () => CATALOG_SOURCE_PLUGIN,
  CATALOG_SUMMARY_MAX_CHARS: () => CATALOG_SUMMARY_MAX_CHARS,
  CATALOG_SUMMARY_PER_TOOL_CHARS: () => CATALOG_SUMMARY_PER_TOOL_CHARS,
  DEFAULT_ANNOUNCE_CATALOG: () => DEFAULT_ANNOUNCE_CATALOG,
  DEFAULT_CATALOG_MAX_ENTRIES: () => DEFAULT_CATALOG_MAX_ENTRIES,
  boundCatalogTools: () => boundCatalogTools,
  catalogCacheFile: () => catalogCacheFile,
  catalogDirectory: () => catalogDirectory,
  catalogHistory: () => catalogHistory,
  composeCatalogEntries: () => composeCatalogEntries,
  digestCatalogEntries: () => digestCatalogEntries,
  escapeCatalogText: () => escapeCatalogText,
  findCatalogMessage: () => findCatalogMessage,
  findToolDetail: () => findToolDetail,
  installCatalog: () => installCatalog,
  isCatalogFresh: () => isCatalogFresh,
  isCatalogSource: () => isCatalogSource,
  listCatalog: () => listCatalog,
  makeCatalogViewFor: () => makeCatalogViewFor,
  readCatalogEntries: () => readCatalogEntries,
  releaseCatalog: () => releaseCatalog,
  renderMcpCatalogMessage: () => renderMcpCatalogMessage,
  renderMcpCatalogUpdate: () => renderMcpCatalogUpdate,
  resolveCatalogEntries: () => resolveCatalogEntries,
  resolveCatalogInjection: () => resolveCatalogInjection,
  scoreTool: () => scoreTool,
  searchCatalog: () => searchCatalog,
  searchCatalogMulti: () => searchCatalogMulti,
  summarizeToolDescriptions: () => summarizeToolDescriptions
});

// lib/server/catalog/impl/service/index.js
var CatalogPorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: catalog 域只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本域没有别的活资源要释放。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 域内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成
   * 行为正常但参数不对（目录 TTL 与检索/装箱限额静默换值），症状与本插件毫无字面关联。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: catalog 域未装配——组合根未在入口调用 installCatalog（src/index.ts）");
    }
    return deps;
  }
};
var catalogPorts = new CatalogPorts();

// lib/server/catalog/impl/entries/index.js
import { randomUUID } from "node:crypto";
var CATALOG_SOURCE_PLUGIN = "@wingsky-1/dsh-mcp-manager";
var CATALOG_SOURCE_KIND = `plugin:${CATALOG_SOURCE_PLUGIN}`;
var CATALOG_SECTION_NAME = "mcp-catalog";
var CATALOG_SUMMARY_MAX_CHARS = 240;
var CATALOG_SUMMARY_PER_TOOL_CHARS = 120;
var CATALOG_ENTRY_MAX_CHARS = 180;
function summarizeToolDescriptions(toolMeta) {
  const collected = collectToolSentences(toolMeta);
  if (collected.length === 0)
    return void 0;
  const sentences = dedupeToolSentences(collected);
  const prefix = collected.length >= 2 ? `${collected.length} tools: ` : "";
  return joinSentencesWithinBudget(sentences, prefix);
}
function collectToolSentences(toolMeta) {
  const collected = [];
  for (const [name2, meta] of toolMeta) {
    const sentence = firstSentenceOf(meta?.description);
    if (sentence === "")
      continue;
    collected.push([name2, sentence]);
  }
  return collected;
}
function dedupeToolSentences(collected) {
  collected.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  const seen = /* @__PURE__ */ new Set();
  const sentences = [];
  for (const [, sentence] of collected) {
    if (seen.has(sentence))
      continue;
    seen.add(sentence);
    sentences.push(truncatePerTool(sentence));
  }
  return sentences;
}
function truncatePerTool(sentence) {
  if (sentence.length <= CATALOG_SUMMARY_PER_TOOL_CHARS)
    return sentence;
  return `${charTruncate(sentence, CATALOG_SUMMARY_PER_TOOL_CHARS - 1)}…`;
}
function joinSentencesWithinBudget(sentences, prefix) {
  let text = prefix;
  for (const sentence of sentences) {
    const separator = text === prefix ? "" : "; ";
    if (text.length + separator.length + sentence.length <= CATALOG_SUMMARY_MAX_CHARS - 1) {
      text += separator + sentence;
      continue;
    }
    if (text === prefix) {
      return `${prefix}${charTruncate(sentence, CATALOG_SUMMARY_MAX_CHARS - prefix.length - 1)}…`;
    }
    return `${text}…`;
  }
  return text;
}
function sentenceBoundaryKind(text, index) {
  if (index > 0 && text[index - 1] >= "0" && text[index - 1] <= "9")
    return false;
  let next = index + 1;
  while (next < text.length && /\s/u.test(text[next]))
    next += 1;
  if (next >= text.length)
    return "end";
  if (/[A-Za-z\u4e00-\u9fff]/u.test(text[next]))
    return "mid";
  return false;
}
function firstSentenceOf(description) {
  const raw = typeof description === "string" ? description : "";
  if (raw.trim() === "")
    return "";
  const firstLine = raw.split(/\r?\n/u)[0] ?? "";
  const text = firstLine.replace(/\s+/gu, " ").trim();
  if (text === "")
    return "";
  for (let index = 0; index < text.length; index += 1) {
    if (!SENTENCE_TERMINATORS.has(text[index]))
      continue;
    const kind = sentenceBoundaryKind(text, index);
    if (kind === false)
      continue;
    if (kind === "end")
      return text;
    return text.slice(0, index + 1);
  }
  return text;
}
var SENTENCE_TERMINATORS = /* @__PURE__ */ new Set([".", "!", "?", "。", "！", "？"]);
function charTruncate(text, maxChars) {
  if (maxChars <= 0)
    return "";
  return [...text].slice(0, maxChars).join("");
}
function composeCatalogEntries(supervisors, maxEntries = DEFAULT_CATALOG_MAX_ENTRIES, cache) {
  const entries = [];
  for (const [name2, supervisor] of supervisors) {
    if (entries.length >= maxEntries)
      break;
    const text = entryTextFor(name2, supervisor.server, cache);
    const scope = typeof supervisor.scope === "string" ? supervisor.scope : void 0;
    const entry = { name: name2 };
    if (text !== void 0)
      entry.text = text;
    if (scope !== void 0)
      entry.scope = scope;
    entries.push(entry);
  }
  return entries;
}
function entryTextFor(name2, server, cache) {
  if (typeof server.description === "string" && server.description !== "") {
    const sentence = firstSentenceOf(server.description);
    const raw = sentence !== "" ? sentence : server.description.trim().replace(/\s+/gu, " ");
    return raw.length <= CATALOG_ENTRY_MAX_CHARS ? raw : `${charTruncate(raw, CATALOG_ENTRY_MAX_CHARS - 1)}…`;
  }
  const cached = cache?.get(name2);
  if (typeof cached?.summary === "string" && cached.summary !== "")
    return cached.summary;
  return void 0;
}
function renderMcpCatalogMessage(entries) {
  const guidance = 'Call via `ws_mcp_call` with server `"@<root>/<server>"` (`"@global/<server>"` for global ones) and the bare tool name; find tools with `ws_mcp_search`, check schema with `ws_mcp_detail` first when unsure.';
  const lines = [
    "<system-reminder>",
    "Available MCP servers (capability snapshot):",
    "",
    "<available_mcp_servers>",
    // 服务器名与描述同为远端可控输入：同口径转义后才可拼入目录正文，避免标签逃逸改写注入语义；摘要仍以原始名计算，转义不改变去重口径。
    ...entries.map((entry) => entry.text === void 0 ? `- \`${escapeCatalogText(entry.name)}\`` : `- \`${escapeCatalogText(entry.name)}\`: ${escapeCatalogText(entry.text)}`),
    "</available_mcp_servers>",
    "",
    guidance,
    "</system-reminder>"
  ].join("\n");
  return {
    id: randomUUID(),
    role: "user",
    content: [{ type: "text", text: lines }],
    source: {
      kind: CATALOG_SOURCE_KIND,
      form: "snapshot",
      sections: [{ name: CATALOG_SECTION_NAME, text: lines }]
    }
  };
}
function escapeCatalogText(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replace(/[\r\n]/gu, " ");
}
function isCatalogSource(source) {
  return source?.kind === CATALOG_SOURCE_KIND;
}
function findCatalogMessage(messages) {
  for (const message of messages) {
    if (isCatalogSource(message?.source))
      return message;
  }
  return void 0;
}
function resolveCatalogEntries(source) {
  if (!isCatalogSource(source))
    return void 0;
  const sections = source?.sections;
  if (!Array.isArray(sections))
    return void 0;
  const section = sections.find((candidate) => typeof candidate === "object" && candidate !== null && candidate.name === CATALOG_SECTION_NAME && typeof candidate.text === "string");
  if (section === void 0)
    return void 0;
  return parseCatalogBody(section.text);
}
function unescapeCatalogText(text) {
  return text.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
}
function parseCatalogBody(body) {
  const lines = body.split("\n");
  const start = lines.indexOf("<available_mcp_servers>");
  if (start < 0)
    return void 0;
  const end = lines.indexOf("</available_mcp_servers>", start + 1);
  if (end < 0)
    return void 0;
  const entries = [];
  for (const line of lines.slice(start + 1, end)) {
    const match = /^- `([^`]+)`(?:: (.*))?$/u.exec(line);
    if (match === null)
      return void 0;
    entries.push(match[2] === void 0 ? { name: unescapeCatalogText(match[1]) } : { name: unescapeCatalogText(match[1]), text: unescapeCatalogText(match[2]) });
  }
  return entries;
}
function readCatalogEntries(source) {
  return resolveCatalogEntries(source);
}
function renderMcpCatalogUpdate(entries) {
  const body = renderMcpCatalogMessage(entries);
  const inner = body.content[0].text.split("\n").slice(3).join("\n");
  const text = [
    "<system-reminder>",
    "MCP catalog updated; this replaces all previous available_mcp_servers lists:",
    "",
    inner,
    "</system-reminder>"
  ].join("\n");
  return {
    ...body,
    content: [{ type: "text", text }],
    source: {
      kind: CATALOG_SOURCE_KIND,
      form: "snapshot",
      sections: [{ name: CATALOG_SECTION_NAME, text }]
    }
  };
}

// lib/server/catalog/impl/digest/index.js
import { createHash as createHash2 } from "node:crypto";
function digestCatalogEntries(entries) {
  const canonical = entries.map((entry) => entry.name).join("\n");
  return createHash2("sha256").update(canonical).digest("hex");
}

// lib/server/catalog/impl/history/index.js
function matchCatalogEvent(event) {
  if (event?.type !== "user/message")
    return void 0;
  if (!isCatalogSource(event.data?.source))
    return void 0;
  return resolveCatalogEntries(event.data?.source);
}
function readCatalogSession(agent) {
  const session = agent?.session;
  return {
    visible: new Set(session?.surface?.nodes ?? []),
    events: session?.snapshotEvents?.() ?? []
  };
}
function catalogHistory(agent) {
  const { visible, events } = readCatalogSession(agent);
  let published = false;
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index];
    const entries = matchCatalogEvent(event);
    if (entries === void 0)
      continue;
    published = true;
    if (visible.has(event?.seq))
      return { visibleDigest: digestCatalogEntries(entries), published };
  }
  return { published };
}

// lib/server/catalog/impl/injection/index.js
function withoutInjectedCatalog(decision, existing) {
  if (existing === void 0)
    return decision;
  return {
    kind: "enter",
    messages: decision.messages.filter((message) => message.id !== existing.id)
  };
}
function injectedDigestMatches(existing, digest) {
  if (existing === void 0)
    return false;
  const existingEntries = resolveCatalogEntries(existing.source);
  return existingEntries !== void 0 && digestCatalogEntries(existingEntries) === digest;
}
function resolveCatalogInjection(decision, messages, supervisors, maxEntries = DEFAULT_CATALOG_MAX_ENTRIES, cache, agent) {
  if (decision.kind === "reject")
    return decision;
  const entries = composeCatalogEntries(supervisors, maxEntries, cache);
  const digest = digestCatalogEntries(entries);
  const history = catalogHistory(agent);
  const existing = findCatalogMessage(decision.messages);
  if (history.visibleDigest === digest) {
    return withoutInjectedCatalog(decision, existing);
  }
  if (injectedDigestMatches(existing, digest))
    return decision;
  if (!history.published && entries.length === 0) {
    return withoutInjectedCatalog(decision, existing);
  }
  const catalog = history.published ? renderMcpCatalogUpdate(entries) : renderMcpCatalogMessage(entries);
  return {
    kind: "enter",
    messages: existing === void 0 ? [...decision.messages, catalog] : decision.messages.map((message) => message.id === existing.id ? catalog : message)
  };
}

// lib/server/catalog/impl/cache-view/index.js
import { existsSync as existsSync3, statSync } from "node:fs";

// lib/server/catalog/impl/directory/index.js
import { randomBytes as randomBytes3 } from "node:crypto";
import { existsSync as existsSync2 } from "node:fs";
import { mkdir as mkdir3, readFile as readFile2, rename as rename3, rm as rm3, writeFile as writeFile3 } from "node:fs/promises";
import { dirname as dirname4 } from "node:path";
function shortCircuitsFresh(invalidated, entry) {
  return !invalidated && isCatalogFresh(entry);
}
async function writeDirectoryCacheFile(file, data) {
  let registered = true;
  try {
    fileMode(file);
  } catch {
    registered = false;
  }
  if (registered) {
    await writeFileAtomic(file, data);
    return;
  }
  const dir = dirname4(file);
  if (!existsSync2(dir))
    await mkdir3(dir, { recursive: true });
  const tmp = `${file}.${process.pid}.${Date.now().toString(36)}.${randomBytes3(6).toString("hex")}.tmp`;
  try {
    await writeFile3(tmp, data, "utf8");
    await rename3(tmp, file);
  } catch (cause) {
    await rm3(tmp, { force: true }).catch(() => void 0);
    throw cause;
  }
}
var CatalogDirectory = class {
  /** root →（裸 server 名 → 目录条目）。 */
  byRoot = /* @__PURE__ */ new Map();
  /** 在册 root 集合：与 byRoot 同步维护，承载「单元存在但目录为空」这一可区分状态。 */
  roots = /* @__PURE__ */ new Set();
  /**
   * 失效账本：`root\0<裸 server 名>` 的脏标记集合（#1014 B7）。
   *
   * 为什么落在这里而不是连接层：本域是目录新鲜度的**唯一裁决点**，而「哪台脏了」是目录
   * 事实。连接层只负责在变更发生时刻登记（markDirty）与在投影时消费，本域不依赖任何
   * 上对能力——deps.ts 不动，域间值边保持 0。
   *
   * 为什么需要它：此前目录投影只按 TTL 短路（24h），tools/change / 重连 / 手工刷新 / 配置
   * 变更全都没有落点，模型会一直看到旧 schema。TTL 是兜底上限，不是刷新策略。
   */
  dirty = /* @__PURE__ */ new Set();
  /**
   * persistRoot 的单飞状态：同 root 只跑一个落盘周期，周期内新到的请求只是
   * 「再跑一轮」的标记，不各自持有快照。
   */
  persistSlots = /* @__PURE__ */ new Map();
  /** 读口：root 的整份目录；root 不在册 → undefined。域外只读，故给 ReadonlyMap。 */
  serversFor(root) {
    return this.byRoot.get(root);
  }
  /** 读口：单服务器条目；root 或服务器不在册 → undefined。 */
  entryFor(root, serverName) {
    return this.byRoot.get(root)?.get(serverName);
  }
  /** 读口：root 在册的服务器裸名表（A1 归因文案用）。 */
  serverNamesFor(root) {
    const servers = this.byRoot.get(root);
    return servers === void 0 ? [] : [...servers.keys()];
  }
  /**
   * 读口：该 id 前缀下是否已有注册工具——「已连上」的唯一正向证据（官方零状态 API）。
   * 注册面视图按入参现给，本域不自己去取宿主注册表。
   */
  hasRegisteredTools(schemas, id) {
    const prefix = `mcp__${id}__`;
    return schemas.some((schema) => typeof schema?.name === "string" && schema.name.startsWith(prefix));
  }
  /**
   * 装载 root 的 last-good 目录缓存（缺失/损坏 → 空）。
   *
   * root 已在册即短路：单元创建是唯一载入点，重复读盘会拿磁盘那份**盖掉**内存里更新的投影
   * （落盘是异步 fire-and-forget，内存态才是权威）。
   */
  async ensureRootLoaded(root, cachePath) {
    if (this.byRoot.has(root))
      return;
    const servers = /* @__PURE__ */ new Map();
    this.byRoot.set(root, servers);
    this.roots.add(root);
    try {
      const parsed = await readJsonFile(cachePath);
      if (parsed && typeof parsed === "object" && typeof parsed.entries === "object" && parsed.entries !== null) {
        for (const [serverName, entry] of parsePersistedEntries(parsed.entries)) {
          servers.set(serverName, entry);
        }
      }
    } catch {
    }
  }
  /** 注销 root 的内存目录（拆毁单元时调用）；root 从未在册则无动作。 */
  dropRoot(root) {
    this.byRoot.delete(root);
    this.roots.delete(root);
    for (const key of [...this.dirty]) {
      if (key.startsWith(`${root}\0`))
        this.dirty.delete(key);
    }
  }
  /**
   * 注销单个服务器的内存目录条目（remove/update 配置变更后调用；#392 遗留①）。
   * @returns 是否真的删掉了条目——调用方据此决定要不要广播状态（与 `Map.delete` 同口径）。
   */
  dropServer(root, serverName) {
    const servers = this.byRoot.get(root);
    if (servers === void 0 || !servers.delete(serverName))
      return false;
    this.clearDirty(root, serverName);
    return true;
  }
  /** 失效键：root 与裸名用 NUL 连接——两者都可能含 `/`，用路径分隔符会撞键。 */
  dirtyKey(root, serverName) {
    return `${root}\0${serverName}`;
  }
  /**
   * 登记失效（#1014 B7）：投影短路前由调用点打上。幂等——同一条重复登记不叠加，
   * 也不区分原因：失效只需要「要重投影」这一个事实。
   */
  markDirty(root, serverName) {
    this.dirty.add(this.dirtyKey(root, serverName));
  }
  /** 失效读口：显式失效压过 TTL 短路（这是本账本存在的全部意义）。 */
  isDirty(root, serverName) {
    return this.dirty.has(this.dirtyKey(root, serverName));
  }
  /**
   * 消费失效：投影成功后清标记。
   *
   * 为什么只在成功后清：投影失败走 markUnavailable 降级，目录并不更新——此时保留标记，
   * 下一次投影仍会绕过 TTL 短路重试；清掉就等于让一次失败把该服务器冻结 24h。
   */
  clearDirty(root, serverName) {
    this.dirty.delete(this.dirtyKey(root, serverName));
  }
  /**
   * 条目不可用（发现或落盘失败）：带脱敏后的原因（unavailable 段），**并保留 last-good 工具表**。
   *
   * 为什么保留（#1014 §2「失败保留 last-good」）：此前实现是把 tools 换成空表，等于一次落盘
   * 失败就让该服务器在模型视野里「工具消失」。落盘失败是本地问题（路径不可写、目录不存在），
   * 与远端工具清单无关——丢掉 last-good 会把一次瞬时失败放大成「这台服务器没有工具」。
   * 目录读口本来就带 unavailable 段，消费者据此知道该快照不新鲜。
   *
   * discoveredAt 仍归零：它是「这份快照有多新」的事实位，归零让 isCatalogFresh 判不新鲜，
   * 下一次投影（含脏标记在途）会重试。
   */
  markUnavailable(root, serverName, reason) {
    const servers = this.byRoot.get(root);
    if (servers === void 0 || !servers.has(serverName))
      return;
    servers.set(serverName, {
      discoveredAt: 0,
      tools: servers.get(serverName).tools,
      unavailable: reason
    });
  }
  /**
   * 注册面 → per-root 目录的投影（裁定 W + 裁定 K）。
   *
   * 官方注册名是 `mcp__<id>__<tool>`，去掉前缀即裸名；description 与 parameters 都在注册面
   * 视图里，不需要第二份工具清单。fresh 短路：TTL 内不重投影（discover 惰性语义），且短路发生
   * 在任何落盘动作之前。落盘失败（含路径求值失败）由本层 catch 收口成 unavailable 降级。
   *
   * 短路条件（#1014 B7）：**无失效标记且** TTL 内才短路。显式失效压过 TTL——否则模型会
   * 一直看着已删除的 schema，而 TTL 是 24h。
   *
   * 当前失效的生产者只有一个：tools/change 经 connection 域的 reprojectCatalogs 逐台 diff
   * 后登记（connection/runtime/middleware.ts）。重连与配置变更只有在宿主顺带发出
   * tools/change 时才间接生效；**手工刷新尚无失效落点**（刷新走的是纯读路径，不触发投影），
   * 仍落在 TTL 短路内——该缺口记在 #1014，未在本批闭合。
   */
  async projectRegisteredTools(input) {
    const servers = this.byRoot.get(input.root);
    if (servers === void 0)
      return;
    if (shortCircuitsFresh(this.isDirty(input.root, input.serverName), servers.get(input.serverName))) {
      return;
    }
    const prefix = `mcp__${input.id}__`;
    try {
      const tools = [];
      for (const schema of input.schemas) {
        const name2 = schema?.name;
        if (typeof name2 !== "string" || !name2.startsWith(prefix))
          continue;
        tools.push({
          name: name2.slice(prefix.length),
          description: typeof schema.description === "string" ? schema.description : "",
          inputSchema: schema.parameters ?? {}
        });
      }
      servers.set(input.serverName, {
        discoveredAt: Date.now(),
        tools: boundCatalogTools(tools)
      });
      await this.persistRoot(input.root, {
        cachePath: input.cachePath,
        isRuntimeServer: input.isRuntimeServer,
        warn: input.warn
      });
      this.clearDirty(input.root, input.serverName);
    } catch (error) {
      this.markUnavailable(input.root, input.serverName, input.redact(error));
    }
  }
  /**
   * #413：从封装定义（toolDefinitions）投影目录，替代远端 discover。
   * 封装 execute 为调用方 JS 直呼（不经远端 MCP），目录数据源即调用方定义：
   * name/description 直取；dsh-tools 的 parameters（ToolSchema）即 JSON Schema
   * 形态，直接作 CatalogTool.inputSchema（与 supervisor 封装分支同口径）。
   */
  projectWrappedTools(input) {
    let servers = this.byRoot.get(input.root);
    if (servers === void 0) {
      servers = /* @__PURE__ */ new Map();
      this.byRoot.set(input.root, servers);
      this.roots.add(input.root);
    }
    servers.set(input.serverName, {
      discoveredAt: Date.now(),
      tools: wrappedToolsOf(input.definitions)
    });
  }
  /**
   * 目录 last-good 持久化（空采集不写盘；public 供测试与外部触发）。
   *
   * 路径求值由**调用方**给（连接层用 host.catalogCachePath(root) 算），写盘失败只 warn；
   * 路径求值失败按设计逃出本层、由投影的 catch 收口成 unavailable 降级。
   *
   * 单飞（本地补丁，issue #3）：同一 root 同时只跑一个落盘周期。此前每次投影都排一个
   * 自己的写：排队者各自挟着整份 root 目录的字符串（最多 ~2 MB），tools/change 风暴下
   * 队列长度就是堆占用（实测 8651 份快照 → 宿主 OOM，exit 134）。现在周期内到达的请求
   * 只是「再来一轮」的标记，快照在周期里现算（persistRootOnce），排队者不持有任何负载。
   *
   * 顺带消掉旧实现登记的残留「两次并发投影的落盘可能乱序」：同一 root 只剩一个写者。
   */
  persistRoot(root, opts) {
    let slot = this.persistSlots.get(root);
    if (slot === void 0) {
      slot = { opts: void 0, waiters: [], running: false };
      this.persistSlots.set(root, slot);
    }
    slot.opts = opts;
    const promise = new Promise((resolve, reject) => slot.waiters.push({ resolve, reject }));
    if (!slot.running)
      void this.drainPersistSlot(root, slot).catch(() => void 0);
    return promise;
  }
  /** persistRoot 的单飞循环：一轮算一次快照、写一次盘，期间新到的请求并到下一轮。 */
  async drainPersistSlot(root, slot) {
    if (slot.running)
      return;
    slot.running = true;
    try {
      while (slot.waiters.length > 0) {
        const batch = slot.waiters;
        const opts = slot.opts;
        slot.waiters = [];
        slot.opts = void 0;
        try {
          await this.persistRootOnce(root, opts);
          for (const waiter of batch)
            waiter.resolve();
        } catch (error) {
          for (const waiter of batch)
            waiter.reject(error);
        }
      }
    } finally {
      slot.running = false;
      if (slot.waiters.length > 0)
        void this.drainPersistSlot(root, slot).catch(() => void 0);
      else
        this.persistSlots.delete(root);
    }
  }
  /** 一轮落盘：快照现算（排队者不持有旧负载），其余与合并前逐字节一致。 */
  async persistRootOnce(root, opts) {
    const servers = this.byRoot.get(root);
    if (servers === void 0)
      return;
    let anyTools = false;
    const payload = {};
    for (const [serverName, entry] of servers) {
      if (opts.isRuntimeServer(serverName))
        continue;
      if (entry.tools.size === 0)
        continue;
      anyTools = true;
      payload[serverName] = {
        discoveredAt: entry.discoveredAt,
        tools: [...entry.tools.entries()].map(([name2, tool]) => ({
          name: name2,
          description: tool.description,
          inputSchema: tool.inputSchema
        }))
      };
    }
    if (!anyTools)
      return;
    const cachePath = opts.cachePath();
    try {
      await writeDirectoryCacheFile(cachePath, JSON.stringify({ version: 1, root, entries: payload }, null, 2));
    } catch (error) {
      opts.warn(`dsh-mcp-manager: catalog cache write failed: ${msgOf(error)}`);
    }
  }
  /**
   * 从磁盘 last-good 目录缓存中清除单服务器条目（remove/update 后调用；#392 遗留①）。
   * persistRoot 是全量覆盖且空采集不写盘——remove 后该 root 目录可能已空，若不显式
   * 清盘，磁盘缓存仍残留已删服务器条目，插件重启/@global 单元重建时 ensureRootLoaded
   * 把幽灵条目载回（ws_mcp_list 再次列出）。这里读现有缓存、删条目、写回；条目删空则
   * 删除缓存文件。内存目录由调用方（dropMiddlewareConnection）先行删除。
   */
  async removeRootEntry(root, serverName, opts) {
    try {
      if (!existsSync2(opts.cachePath))
        return;
      const raw = await readFile2(opts.cachePath, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed === null || typeof parsed !== "object" || typeof parsed.entries !== "object" || parsed.entries === null)
        return;
      if (!(serverName in parsed.entries))
        return;
      delete parsed.entries[serverName];
      if (Object.keys(parsed.entries).length === 0) {
        await rm3(opts.cachePath, { force: true }).catch(() => {
        });
        return;
      }
      const tmp = `${opts.cachePath}.${process.pid}.${Date.now().toString(36)}.${randomBytes3(6).toString("hex")}.tmp`;
      try {
        await writeFile3(tmp, JSON.stringify({ version: 1, root, entries: parsed.entries }, null, 2), "utf8");
        await rename3(tmp, opts.cachePath);
      } catch (writeError) {
        await rm3(tmp, { force: true }).catch(() => {
        });
        throw writeError;
      }
    } catch (error) {
      opts.warn(`dsh-mcp-manager: catalog cache remove failed: ${msgOf(error)}`);
    }
  }
};
var catalogDirectory = new CatalogDirectory();
function isCatalogFresh(catalog) {
  const { connection: { CATALOG_TTL_MS: CATALOG_TTL_MS2 } } = catalogPorts.get();
  return catalog !== void 0 && catalog.unavailable === void 0 && Date.now() - catalog.discoveredAt <= CATALOG_TTL_MS2;
}
function boundCatalogTools(tools) {
  const { connection: { MAX_TOOLS_PER_SERVER: MAX_TOOLS_PER_SERVER2, MAX_BYTES_PER_TOOL: MAX_BYTES_PER_TOOL2, MAX_TOTAL_CATALOG_BYTES: MAX_TOTAL_CATALOG_BYTES2 } } = catalogPorts.get();
  const bounded = /* @__PURE__ */ new Map();
  let totalBytes = 0;
  for (const tool of tools) {
    if (bounded.size >= MAX_TOOLS_PER_SERVER2)
      break;
    const name2 = String(tool.name ?? "");
    if (name2 === "")
      continue;
    const description = typeof tool.description === "string" ? tool.description : "";
    const desc = boundDescription(description, MAX_BYTES_PER_TOOL2);
    const inputSchema = tool.inputSchema ?? {};
    bounded.set(name2, { description: desc, inputSchema });
    totalBytes += entryBytes(desc, inputSchema);
    if (totalBytes > MAX_TOTAL_CATALOG_BYTES2)
      break;
  }
  return bounded;
}
function boundDescription(description, maxBytes) {
  if (Buffer.byteLength(description, "utf8") <= maxBytes)
    return description;
  let bytes = 0;
  let cut = 0;
  while (cut < description.length && bytes + Buffer.byteLength(description[cut], "utf8") <= maxBytes) {
    bytes += Buffer.byteLength(description[cut], "utf8");
    cut += 1;
  }
  return description.slice(0, cut);
}
function entryBytes(description, inputSchema) {
  return Buffer.byteLength(description, "utf8") + Buffer.byteLength(JSON.stringify(inputSchema ?? {}), "utf8");
}
function parsePersistedEntries(entries) {
  const servers = /* @__PURE__ */ new Map();
  for (const [serverName, entry] of Object.entries(entries)) {
    const rec = entry;
    if (typeof rec !== "object" || rec === null)
      continue;
    servers.set(serverName, {
      discoveredAt: typeof rec.discoveredAt === "number" ? rec.discoveredAt : 0,
      tools: parsePersistedTools(rec.tools)
    });
  }
  return servers;
}
function parsePersistedTools(raw) {
  const tools = /* @__PURE__ */ new Map();
  if (!Array.isArray(raw))
    return tools;
  for (const tool of raw) {
    const rec = tool;
    if (typeof rec !== "object" || rec === null || typeof rec.name !== "string")
      continue;
    tools.set(rec.name, {
      description: typeof rec.description === "string" ? rec.description : "",
      inputSchema: rec.inputSchema ?? {}
    });
  }
  return tools;
}
function wrappedToolsOf(definitions) {
  const tools = /* @__PURE__ */ new Map();
  for (const definition of definitions) {
    const def = definition;
    if (typeof def?.name !== "string" || def.name === "")
      continue;
    tools.set(def.name, {
      description: typeof def.description === "string" ? def.description : "",
      inputSchema: def.parameters ?? {}
    });
  }
  return tools;
}
function msgOf(error) {
  return error instanceof Error ? error.message : String(error);
}

// lib/server/catalog/impl/cache-view/index.js
function catalogCacheFile() {
  return catalogSummaryFile();
}
function makeCatalogViewFor(host) {
  const diskCatalogSummaryCache = /* @__PURE__ */ new Map();
  async function middlewareCatalogSummary(mw, root, name2) {
    const catalog = catalogDirectory.entryFor(root, name2);
    const tools = catalog?.tools;
    if (tools !== void 0 && tools.size > 0 && catalog?.unavailable === void 0) {
      return summarizeToolDescriptions(tools);
    }
    return diskCatalogSummary(root, name2);
  }
  async function diskCatalogSummary(root, name2) {
    const { store: { readCatalogServerFromDisk: readCatalogServerFromDisk2 } } = catalogPorts.get();
    const file = host.catalogCachePathFor(root);
    const cachedRoot = diskCatalogSummaryCache.get(root);
    const cached = cachedRoot?.get(name2);
    let mtimeMs = 0;
    try {
      if (!existsSync3(file))
        return void 0;
      const stat2 = statSync(file);
      mtimeMs = stat2.mtimeMs;
    } catch {
      return void 0;
    }
    if (cached?.mtimeMs === mtimeMs)
      return cached.summary;
    const persisted = await readCatalogServerFromDisk2(file, name2);
    if (persisted === void 0)
      return void 0;
    const summary = summarizeToolDescriptions(new Map(persisted.tools.map((tool) => [tool.name, { description: tool.description }])));
    let rootCache = diskCatalogSummaryCache.get(root);
    if (rootCache === void 0) {
      rootCache = /* @__PURE__ */ new Map();
      diskCatalogSummaryCache.set(root, rootCache);
    }
    rootCache.set(name2, { mtimeMs, summary });
    return summary;
  }
  async function projectRootOf(cwd) {
    const { workspace: { normalizedProjectRoot: normalizedProjectRoot2 } } = catalogPorts.get();
    return cwd === void 0 || cwd === null || cwd === "" ? void 0 : await normalizedProjectRoot2(cwd);
  }
  async function overlayFromMiddleware(view, servers, mw, cwdRoot) {
    for (const [name2, { scope }] of servers) {
      if (name2 === "")
        continue;
      const root = scope === SCOPE_PROJECT ? cwdRoot : MIDDLEWARE_GLOBAL_ROOT;
      if (root === void 0)
        continue;
      const summary = await middlewareCatalogSummary(mw, root, name2);
      if (summary !== void 0)
        view.set(name2, { summary });
    }
  }
  return async (cwd, servers) => {
    const catalogCache = host.getCatalogCache();
    const view = /* @__PURE__ */ new Map();
    for (const [name2, entry] of catalogCache)
      view.set(name2, { summary: entry.summary });
    const mw = host.getMiddleware();
    if (mw === void 0)
      return view;
    await overlayFromMiddleware(view, servers, mw, await projectRootOf(cwd));
    return view;
  };
}

// lib/server/catalog/search.js
function tokenize(text) {
  const lowered = text.toLowerCase();
  const words = lowered.match(/[a-z0-9_]+|[\u4e00-\u9fff]+/gu) ?? [];
  return words;
}
function scoreTool(query, server, toolName, tool) {
  if (query === "")
    return { score: 0, matchedTerms: [] };
  const haystack = [
    server,
    toolName,
    tool.description,
    JSON.stringify(Object.keys(tool.inputSchema ?? {}))
  ].join(" ").toLowerCase();
  const cjkQuery = query.match(/[\u4e00-\u9fff]+/gu) ?? [];
  if (cjkQuery.length > 0) {
    const cjk = scoreCjkSegments(cjkQuery, haystack);
    if (cjk !== void 0)
      return cjk;
  }
  const terms = tokenize(query);
  if (terms.length === 0)
    return { score: 0, matchedTerms: [] };
  return scoreTerms(terms, haystack);
}
function scoreCjkSegments(segments, haystack) {
  let score = 0;
  const matchedTerms = [];
  for (const segment of segments) {
    if (segment.length < 2)
      continue;
    if (haystack.includes(segment)) {
      score += 2;
      matchedTerms.push(segment);
    }
  }
  return score > 0 ? { score, matchedTerms } : void 0;
}
function scoreTerms(terms, haystack) {
  let score = 0;
  const matchedTerms = [];
  for (const term of terms) {
    if (term.length < 2)
      continue;
    if (haystack.includes(term)) {
      score += 1;
      matchedTerms.push(term);
    }
  }
  return { score, matchedTerms };
}
function searchCatalog(units, root, query, limit) {
  const { connection: { CATALOG_TTL_MS: CATALOG_TTL_MS2 }, workspace: { fullServerName: fullServerName2 } } = catalogPorts.get();
  if (!units.has(root))
    return { results: [], unavailable: [], truncated: false };
  const servers = catalogDirectory.serversFor(root);
  if (servers === void 0)
    return { results: [], unavailable: [], truncated: false };
  const results = [];
  const unavailable = [];
  let truncated = false;
  for (const [serverName, catalog] of servers) {
    if (catalog.unavailable !== void 0) {
      unavailable.push({ server: fullServerName2(root, serverName), reason: catalog.unavailable });
      continue;
    }
    const fresh = Date.now() - catalog.discoveredAt <= CATALOG_TTL_MS2;
    const scored = [];
    for (const [toolName, tool] of catalog.tools) {
      const { score, matchedTerms } = scoreTool(query, serverName, toolName, tool);
      if (query !== "" && score === 0)
        continue;
      scored.push({ server: serverName, toolName, tool, score, matchedTerms });
    }
    scored.sort((a, b) => b.score - a.score || a.toolName.localeCompare(b.toolName));
    if (scored.length > limit)
      truncated = true;
    for (const hit of scored.slice(0, limit)) {
      results.push({
        server: fullServerName2(root, hit.server),
        tool: hit.toolName,
        description: hit.tool.description,
        inputSchema: hit.tool.inputSchema,
        score: hit.score,
        matchedTerms: hit.matchedTerms,
        fresh
      });
    }
  }
  return { results, unavailable, truncated };
}
function searchCatalogMulti(units, roots, query, limit) {
  if (roots.length === 1) {
    return searchCatalog(units, roots[0], query, limit);
  }
  const results = [];
  const unavailable = [];
  for (const root of roots) {
    const single = searchCatalog(units, root, query, limit);
    results.push(...single.results);
    unavailable.push(...single.unavailable);
  }
  results.sort((a, b) => b.score - a.score || a.tool.localeCompare(b.tool));
  const truncated = results.length > limit;
  return { results: results.slice(0, limit), unavailable, truncated };
}
function buildListToolEntries(tools, safeLimit, disabledTools, root, serverName) {
  const entries = [];
  let truncated = false;
  let index = 0;
  for (const [toolName, tool] of tools) {
    if (index >= safeLimit) {
      truncated = true;
      break;
    }
    const toolEntry = { tool: toolName, description: tool.description };
    if (isToolDisabledForEntry(disabledTools, root, serverName, toolName))
      toolEntry.disabled = true;
    entries.push(toolEntry);
    index += 1;
  }
  return { entries, truncated };
}
function isToolDisabledForEntry(disabledTools, root, serverName, toolName) {
  if (disabledTools?.get(root)?.get(serverName)?.has(toolName) === true)
    return true;
  if (root === MIDDLEWARE_GLOBAL_ROOT)
    return false;
  return disabledTools?.get(MIDDLEWARE_GLOBAL_ROOT)?.get(serverName)?.has(toolName) === true;
}
function resolveListRoots(roots, serverFilter) {
  if (serverFilter !== void 0 && serverFilter.startsWith("@")) {
    const { workspace: { parseFullServerName: parseFullServerName2 } } = catalogPorts.get();
    const parsed = parseFullServerName2(serverFilter);
    if (parsed === void 0 || !roots.includes(parsed.root)) {
      throw new Error(`ws_mcp_list: server ${JSON.stringify(serverFilter)} 不属于当前工作空间（${JSON.stringify(roots)}）；路由一致性校验失败（防跨空间串台）`);
    }
    return /* @__PURE__ */ new Set([parsed.root]);
  }
  return void 0;
}
function listCatalog(units, roots, serverFilter, toolLimit, emptyHint, disabledTools) {
  const { workspace: { fullServerName: fullServerName2 } } = catalogPorts.get();
  const safeLimit = safeToolLimit(toolLimit);
  const rootSet = resolveListRoots(roots, serverFilter);
  const servers = [];
  let totalTools = 0;
  let anyTruncated = false;
  for (const root of roots) {
    if (!rootParticipates(root, rootSet))
      continue;
    const unit = units.get(root);
    if (unit === void 0)
      continue;
    const rootCatalog = catalogDirectory.serversFor(root);
    if (rootCatalog === void 0)
      continue;
    for (const [serverName, catalog] of rootCatalog) {
      if (!matchesServerFilter(serverName, root, serverFilter, fullServerName2))
        continue;
      const built = buildListServerEntry(serverName, root, catalog, unit.userDisabled, safeLimit, disabledTools, fullServerName2);
      servers.push(built.entry);
      if (built.truncated)
        anyTruncated = true;
      totalTools += built.toolCount;
    }
  }
  return finalizeListResult(servers, roots, totalTools, anyTruncated, emptyHint);
}
function safeToolLimit(toolLimit) {
  if (!Number.isFinite(toolLimit) || toolLimit <= 0)
    return LIST_DEFAULT_TOOLS_PER_SERVER;
  return Math.floor(toolLimit);
}
function rootParticipates(root, rootSet) {
  return rootSet === void 0 || rootSet.has(root);
}
function matchesServerFilter(serverName, root, serverFilter, fullServerName2) {
  if (serverFilter === void 0)
    return true;
  return serverName === serverFilter || fullServerName2(root, serverName) === serverFilter;
}
function buildListServerEntry(serverName, root, catalog, userDisabled, safeLimit, disabledTools, fullServerName2) {
  const entry = {
    server: fullServerName2(root, serverName),
    tools: [],
    toolsTruncated: false
  };
  if (userDisabled.has(serverName))
    entry.disabled = true;
  if (catalog.unavailable !== void 0) {
    entry.unavailable = catalog.unavailable;
    return { entry, truncated: false, toolCount: 0 };
  }
  const built = buildListToolEntries(catalog.tools, safeLimit, disabledTools, root, serverName);
  entry.tools = built.entries;
  entry.toolsTruncated = built.truncated;
  return { entry, truncated: built.truncated, toolCount: built.entries.length };
}
function finalizeListResult(servers, roots, totalTools, anyTruncated, emptyHint) {
  const { workspace: { parseFullServerName: parseFullServerName2 } } = catalogPorts.get();
  const rootIndex = new Map(roots.map((root, index) => [root, index]));
  servers.sort(listOrderComparator(rootIndex, parseFullServerName2));
  const result = {
    workspace: roots[0] ?? "@global",
    servers,
    totalServers: servers.length,
    totalTools,
    toolsTruncated: anyTruncated
  };
  if (servers.length === 0)
    result.message = emptyHint;
  return result;
}
function listOrderComparator(rootIndex, parseFullServerName2) {
  return (a, b) => {
    const keyA = listOrderKey(a, rootIndex, parseFullServerName2);
    const keyB = listOrderKey(b, rootIndex, parseFullServerName2);
    if (keyA.rootOrder !== keyB.rootOrder)
      return keyA.rootOrder - keyB.rootOrder;
    return keyA.server.localeCompare(keyB.server);
  };
}
function listOrderKey(entry, rootIndex, parseFullServerName2) {
  const parsed = parseFullServerName2(entry.server);
  return {
    rootOrder: rootIndex.get(parsed?.root ?? "") ?? Number.MAX_SAFE_INTEGER,
    server: parsed?.server ?? entry.server
  };
}
function findToolDetail(units, root, server, tool) {
  const { connection: { CATALOG_TTL_MS: CATALOG_TTL_MS2 }, workspace: { parseFullServerName: parseFullServerName2, normalizeToolName: normalizeToolName2 } } = catalogPorts.get();
  const parsed = parseFullServerName2(server);
  if (parsed === void 0 || parsed.root !== root) {
    throw new Error(`ws_mcp_detail: server ${JSON.stringify(server)} 不属于当前工作空间 ${JSON.stringify(root)}；路由一致性校验失败（防跨空间串台）`);
  }
  const unit = units.get(root);
  if (unit === void 0) {
    throw new Error(`ws_mcp_detail: server 未连接或未发现：${JSON.stringify(server)}`);
  }
  const catalog = catalogDirectory.entryFor(root, parsed.server);
  if (catalog === void 0 || catalog.tools.size === 0) {
    throw toolDetailMissError(catalog, server, unit.userDisabled.has(parsed.server));
  }
  const toolName = normalizeToolName2(parsed.server, tool, "ws_mcp_detail");
  const found = catalog.tools.get(toolName);
  if (found === void 0) {
    throw new Error(`ws_mcp_detail: tool 不存在：${JSON.stringify(`${server}/${toolName}`)}`);
  }
  const fresh = Date.now() - catalog.discoveredAt <= CATALOG_TTL_MS2;
  const detail = {
    server,
    tool: toolName,
    description: found.description,
    inputSchema: found.inputSchema,
    fresh
  };
  if (unit.userDisabled.has(parsed.server))
    detail.disabled = true;
  return detail;
}
function toolDetailMissError(catalog, server, userDisabled) {
  if (catalog?.unavailable !== void 0) {
    return new Error(`ws_mcp_detail: server 发现失败：${JSON.stringify(server)}（${catalog.unavailable}）`);
  }
  if (userDisabled) {
    return new Error(`ws_mcp_detail: server 未连接或未发现：${JSON.stringify(server)}（已被用户禁用）`);
  }
  return new Error(`ws_mcp_detail: server 未连接或未发现：${JSON.stringify(server)}`);
}

// lib/server/catalog/interface.js
function installCatalog(deps) {
  catalogPorts.install(deps);
}
function releaseCatalog() {
  catalogPorts.release();
}

// lib/server/config/interface.js
var interface_exports2 = {};
__export(interface_exports2, {
  BOOLEAN_KEYS: () => BOOLEAN_KEYS,
  COUNT_LIMITS: () => COUNT_LIMITS,
  Config: () => Config,
  DEFAULT_CONFIG: () => DEFAULT_CONFIG,
  DEFAULT_UI_CONFIG: () => DEFAULT_UI_CONFIG,
  SECRET_ENV_NAME: () => SECRET_ENV_NAME,
  SERVER_NAME_PATTERN: () => SERVER_NAME_PATTERN,
  assertEnvPolicy: () => assertEnvPolicy,
  buildConfigUiPatch: () => buildConfigUiPatch,
  expandEnv: () => expandEnv,
  expandEnvObject: () => expandEnvObject,
  expandServerEnv: () => expandServerEnv,
  extractEnvRefs: () => extractEnvRefs,
  fromClaudeEntry: () => fromClaudeEntry,
  isSecretEnvName: () => isSecretEnvName,
  normalizeConfig: () => normalizeConfig,
  normalizeServer: () => normalizeServer,
  normalizeUiConfig: () => normalizeUiConfig,
  panelTopForAnchor: () => panelTopForAnchor,
  parseClaudeJson: () => parseClaudeJson
});

// lib/server/config/normalize.js
var RECONNECT_KEYS = /* @__PURE__ */ new Set(["enabled", "initialDelayMs", "maxDelayMs", "maxAttempts"]);
var MAX_TIMER_DELAY_MS = 2 ** 31 - 1;
var RECONNECT_DEFAULTS = {
  enabled: true,
  initialDelayMs: 500,
  maxDelayMs: 3e4,
  maxAttempts: 10
};
function assertReconnectDelay(value, path) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value > MAX_TIMER_DELAY_MS) {
    throw new Error(`${path} must be a positive finite number no greater than ${MAX_TIMER_DELAY_MS}`);
  }
}
function assertReconnectRelation(out) {
  const initialDelayMs = out.initialDelayMs ?? RECONNECT_DEFAULTS.initialDelayMs;
  const maxDelayMs = out.maxDelayMs ?? RECONNECT_DEFAULTS.maxDelayMs;
  if (initialDelayMs > maxDelayMs) {
    throw new Error("reconnect.initialDelayMs must be less than or equal to maxDelayMs");
  }
  const { maxAttempts } = out;
  if (maxAttempts !== void 0 && (typeof maxAttempts !== "number" || !Number.isInteger(maxAttempts) || maxAttempts < 1)) {
    throw new Error("reconnect.maxAttempts must be a positive integer");
  }
}
function normalizeReconnect(raw) {
  if (raw === void 0 || raw === null)
    return {};
  if (typeof raw !== "object" || Array.isArray(raw))
    throw new Error("reconnect must be an object");
  const out = {};
  for (const [key, value] of Object.entries(raw)) {
    if (RECONNECT_KEYS.has(key))
      out[key] = value;
  }
  assertReconnectFields(out);
  return out;
}
function assertReconnectFields(out) {
  if (out.initialDelayMs !== void 0)
    assertReconnectDelay(out.initialDelayMs, "reconnect.initialDelayMs");
  if (out.maxDelayMs !== void 0)
    assertReconnectDelay(out.maxDelayMs, "reconnect.maxDelayMs");
  if (out.enabled !== void 0 && typeof out.enabled !== "boolean") {
    throw new Error("reconnect.enabled must be a boolean");
  }
  assertReconnectRelation(out);
}
function assertTransportRequired(src, transport) {
  if (transport === "stdio") {
    if (typeof src.command !== "string" || src.command.trim() === "") {
      throw new Error("stdio server requires a command");
    }
    return;
  }
  if (typeof src.url !== "string" || src.url.trim() === "") {
    throw new Error("streamable-http server requires a url");
  }
  let parsed;
  try {
    parsed = new URL(src.url);
  } catch {
    throw new Error(`invalid url: ${src.url}`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`unsupported protocol: ${parsed.protocol}//`);
  }
}
function applyTransportFields(server, src, transport) {
  if (transport === "stdio") {
    server.command = src.command;
    if (Array.isArray(src.args))
      server.args = src.args.map(String);
    if (typeof src.cwd === "string" && src.cwd !== "")
      server.cwd = src.cwd;
    if (typeof src.env === "object" && src.env !== null) {
      server.env = Object.fromEntries(Object.entries(src.env).map(([key, value]) => [
        key,
        String(value)
      ]));
    }
    return;
  }
  server.url = src.url;
  if (typeof src.headers === "object" && src.headers !== null) {
    server.headers = Object.fromEntries(Object.entries(src.headers).map(([key, value]) => [
      key,
      String(value)
    ]));
  }
}
function normalizeToolCallTimeoutMs(value) {
  return typeof value === "number" && value > 0 ? Math.floor(value) : DEFAULT_TOOL_CALL_TIMEOUT_MS;
}
function normalizeDescription(value) {
  if (typeof value !== "string")
    return void 0;
  const trimmed = value.trim();
  return trimmed === "" ? void 0 : trimmed;
}
function normalizeServer(input) {
  if (typeof input !== "object" || input === null)
    throw new Error("server config must be an object");
  const src = input;
  const name2 = String(src.name ?? "").trim();
  if (!SERVER_NAME_PATTERN.test(name2)) {
    throw new Error(`server name must match ${SERVER_NAME_PATTERN.source}`);
  }
  const transport = src.transport === "streamable-http" ? "streamable-http" : src.transport === "stdio" ? "stdio" : void 0;
  if (transport === void 0)
    throw new Error('transport must be "stdio" or "streamable-http"');
  assertTransportRequired(src, transport);
  const server = {
    name: name2,
    transport,
    enabled: src.enabled !== false,
    toolCallTimeoutMs: normalizeToolCallTimeoutMs(src.toolCallTimeoutMs),
    reconnect: normalizeReconnect(src.reconnect),
    // 能力目录的自定义描述（用户手写；MCP 协议无服务器级自描述，完整保留不截断）。
    description: normalizeDescription(src.description)
  };
  applyTransportFields(server, src, transport);
  return server;
}

// lib/server/config/impl/env/index.js
var SECRET_ENV_NAME = /(KEY|TOKEN|SECRET|PASSWORD|PASSWD|CREDENTIAL|AUTH)/i;
function expandEnv(value) {
  return String(value).replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (whole, name2) => {
    const resolved = process.env[name2];
    return resolved !== void 0 ? resolved : "";
  });
}
function expandEnvObject(input) {
  const out = {};
  for (const [key, value] of Object.entries(input ?? {})) {
    out[key] = expandEnv(value);
  }
  return out;
}
function expandServerEnv(server) {
  const next = { ...server };
  if (server.env !== void 0)
    next.env = expandEnvObject(server.env);
  if (server.headers !== void 0)
    next.headers = expandEnvObject(server.headers);
  return next;
}

// lib/server/config/impl/env/policy.js
var SECRET_WORDS = /* @__PURE__ */ new Set([
  // 基础七词：与 SECRET_ENV_NAME 子串正则的词根一一对应，此处是「词」不是「子串」。
  "KEY",
  "TOKEN",
  "SECRET",
  "PASSWORD",
  "PASSWD",
  "CREDENTIAL",
  "AUTH",
  // 复数形态：API_KEYS / AWS_CREDENTIALS / NPM_TOKENS 这类常见实名是凭据，不收即 fail-open。
  // 单数词已覆盖切词命中的大小写，复数只增这四个（KEYS 加了也不误伤：MONKEYS 与 KEYS 全等不等）。
  "KEYS",
  "TOKENS",
  "SECRETS",
  "CREDENTIALS",
  // headers 常见槽位：客户端占位示例即 Authorization: Bearer ${...}——Authorization 若不算
  // 凭据槽，该示例会被当成「秘密进非秘密槽」误杀。AUTH 子串旧口径本就覆盖它，此处收为整词。
  "AUTHORIZATION",
  // 无分隔符复合形态：字面量即 "APIKEY" / "SECRETKEY" / "AUTHTOKEN" 的写法（有分隔符的
  // API_KEY / SECRET_KEY 本就经 KEY/SECRET 词命中，不需要这里）。与前后缀粘连的形态
  // （如 "MYAPIKEY"）切词切不开仍会漏——注释写明：取精确性，宁漏此类怪名，不误伤正当名。
  "APIKEY",
  "SECRETKEY",
  "AUTHTOKEN"
]);
var EXEMPT_ENV_NAMES = /* @__PURE__ */ new Set(["DSH_HOME"]);
function extractEnvRefs(value) {
  if (typeof value !== "string")
    return [];
  const out = [];
  for (const match of value.matchAll(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g)) {
    out.push(match[1]);
  }
  return out;
}
function isSecretEnvName(name2) {
  if (typeof name2 !== "string" || name2 === "")
    return false;
  const upper = name2.toUpperCase();
  if (EXEMPT_ENV_NAMES.has(upper))
    return false;
  if (!SECRET_ENV_NAME.test(name2))
    return false;
  return upper.split(/[^A-Z0-9]+/).some((segment) => {
    if (segment === "")
      return false;
    if (SECRET_WORDS.has(segment))
      return true;
    return SECRET_WORDS.has(segment.replace(/[0-9]+$/, ""));
  });
}
function expandWithSnapshot(value, snapshot) {
  return value.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (whole, refName) => {
    const resolved = snapshot[refName];
    return resolved !== void 0 ? resolved : "";
  });
}
function smuggleError(section, key, secretRef) {
  return new Error(`${section} key ${JSON.stringify(key)} must not reference secret variable \${${secretRef}}: ${JSON.stringify(key)} is not a secret-shaped name, so the live secret would land in a non-secret slot (the child sees it as ordinary data, and name-based redaction/projection cannot identify it); rename the key to the secret name (e.g. ${JSON.stringify(secretRef)}) or remove the reference`);
}
function duplicateError(section, key, matchedVar, keyIsSecret) {
  const fix = keyIsSecret ? `replace the value with the template "\${${key}}" so only the reference is stored` : `move it under a secret-shaped key (e.g. ${JSON.stringify(matchedVar)}) with the template "\${${matchedVar}}", or stop duplicating the live secret`;
  return new Error(`${section} key ${JSON.stringify(key)} duplicates the live value of secret variable \${${matchedVar}}: persisting a live secret as a literal bakes rotation-sensitive material into the config file (it drifts on rotation, against the template-on-disk invariant); ${fix}`);
}
function checkMap(section, map, liveSecrets, snapshot) {
  for (const [key, rawValue] of Object.entries(map ?? {})) {
    const raw = String(rawValue);
    const refs = extractEnvRefs(raw);
    const secretRefs = refs.filter((ref) => isSecretEnvName(ref));
    const keyIsSecret = isSecretEnvName(key);
    if (!keyIsSecret && secretRefs.length > 0) {
      throw smuggleError(section, key, secretRefs[0]);
    }
    if (keyIsSecret && secretRefs.length > 0)
      continue;
    const expanded = expandWithSnapshot(raw, snapshot);
    if (expanded === "")
      continue;
    const matchedVar = liveSecrets.get(expanded);
    if (matchedVar !== void 0) {
      throw duplicateError(section, key, matchedVar, keyIsSecret);
    }
  }
}
function smuggleErrorForSlot(section, slot, secretRef) {
  return new Error(`${section} ${slot} must not reference secret variable \${${secretRef}}: ${section} carries the value to the child/network as ordinary data, and name-based redaction/projection cannot identify it; remove the reference or stop passing the live secret here`);
}
function duplicateErrorForSlot(section, slot, matchedVar, hint) {
  return new Error(`${section} ${slot} duplicates the live value of secret variable \${${matchedVar}}: persisting a live secret as a literal bakes rotation-sensitive material into the config file (it drifts on rotation, against the template-on-disk invariant); ${hint}`);
}
function checkUrl(url, liveSecrets, snapshot) {
  if (typeof url !== "string" || url === "")
    return;
  const secretRefs = extractEnvRefs(url).filter((ref) => isSecretEnvName(ref));
  if (secretRefs.length > 0) {
    throw smuggleErrorForSlot("url", `key "url"`, secretRefs[0]);
  }
  const expanded = expandWithSnapshot(url, snapshot);
  if (expanded === "")
    return;
  let parsed;
  try {
    parsed = new URL(expanded);
  } catch {
    return;
  }
  for (const candidate of urlSecretCandidates(parsed)) {
    const matchedVar = liveSecrets.get(candidate);
    if (matchedVar !== void 0) {
      throw duplicateErrorForSlot("url", `key "url"`, matchedVar, `remove the live secret from the url and pass it via headers with the template "\${${matchedVar}}", or stop embedding the live secret`);
    }
  }
}
function urlSecretCandidates(parsed) {
  const candidates = [];
  if (parsed.username !== "")
    candidates.push(parsed.username);
  if (parsed.password !== "")
    candidates.push(parsed.password);
  for (const value of parsed.searchParams.values()) {
    if (value !== "")
      candidates.push(value);
  }
  return candidates;
}
function checkArgs(args, liveSecrets, snapshot) {
  if (!Array.isArray(args))
    return;
  args.forEach((entry, index) => {
    const raw = String(entry);
    const secretRefs = extractEnvRefs(raw).filter((ref) => isSecretEnvName(ref));
    if (secretRefs.length > 0) {
      throw smuggleErrorForSlot("args", `index ${index}`, secretRefs[0]);
    }
    const expanded = expandWithSnapshot(raw, snapshot);
    if (expanded === "")
      return;
    const candidates = [expanded];
    const eq = expanded.indexOf("=");
    if (eq !== -1)
      candidates.push(expanded.slice(eq + 1));
    for (const candidate of candidates) {
      if (candidate === "")
        continue;
      const matchedVar = liveSecrets.get(candidate);
      if (matchedVar !== void 0) {
        throw duplicateErrorForSlot("args", `index ${index}`, matchedVar, `replace the value with the template "\${${matchedVar}}" so only the reference is stored, or stop passing the live secret here`);
      }
    }
  });
}
function assertEnvPolicy(env, headers, snapshot = process.env, url, args) {
  const liveSecrets = /* @__PURE__ */ new Map();
  for (const [varName, varValue] of Object.entries(snapshot)) {
    if (typeof varValue !== "string" || varValue === "")
      continue;
    if (!isSecretEnvName(varName))
      continue;
    if (!liveSecrets.has(varValue))
      liveSecrets.set(varValue, varName);
  }
  checkMap("env", env, liveSecrets, snapshot);
  checkMap("headers", headers, liveSecrets, snapshot);
  checkUrl(url, liveSecrets, snapshot);
  checkArgs(args, liveSecrets, snapshot);
}

// lib/server/config/import.js
function fromHttpEntry(name2, entry) {
  if (typeof entry.url !== "string" || entry.url === "")
    throw new Error(`server "${name2}": missing url`);
  const server = {
    name: name2,
    transport: "streamable-http",
    url: entry.url
  };
  if (typeof entry.headers === "object" && entry.headers !== null)
    server.headers = entry.headers;
  if (typeof entry.env === "object" && entry.env !== null && Object.keys(entry.env).length > 0) {
    server.sourceEnv = Object.keys(entry.env);
  }
  return server;
}
function fromStdioEntry(name2, entry) {
  if (typeof entry.command !== "string" || entry.command === "") {
    throw new Error(`server "${name2}": unsupported entry (need command or url)`);
  }
  const server = {
    name: name2,
    transport: "stdio",
    command: entry.command
  };
  if (Array.isArray(entry.args))
    server.args = entry.args.map(String);
  if (typeof entry.cwd === "string" && entry.cwd !== "")
    server.cwd = entry.cwd;
  if (typeof entry.env === "object" && entry.env !== null) {
    server.env = Object.fromEntries(Object.entries(entry.env).map(([key, value]) => [key, String(value)]));
  }
  return server;
}
function fromClaudeEntry(name2, entry) {
  const type = entry.type;
  if (type === "http" || type === "sse" || entry.url !== void 0) {
    return fromHttpEntry(name2, entry);
  }
  return fromStdioEntry(name2, entry);
}
function parseClaudeJson(text) {
  const parsed = JSON.parse(text);
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JSON must be an object of { serverName: config }");
  }
  return Object.entries(parsed).map(([name2, entry]) => {
    if (typeof entry !== "object" || entry === null)
      throw new Error(`server "${name2}": entry must be an object`);
    return fromClaudeEntry(name2, entry);
  });
}

// lib/server/config/config-schema.js
var import_schemastery = __toESM(require_lib2(), 1);
var DEFAULT_UI_CONFIG = {
  position: "top-right",
  offset: { x: 8, y: 8, blankY: 40 },
  zIndexBase: DEFAULT_Z_INDEX_BASE
};
var DebugConfigSchema = import_schemastery.default.object({
  callStats: import_schemastery.default.boolean().default(false).description("是否开启 MCP 工具调用统计调试与落盘（默认关闭，仅可通过配置文件开启）"),
  statsFile: import_schemastery.default.string().default("").description("统计落盘路径，留空使用默认 <DSH_HOME>/@wingsky-1/dsh-mcp-manager/stats.json")
}).default({ callStats: false, statsFile: "" });
var UI_POSITIONS = /* @__PURE__ */ new Set([
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left"
]);
var UiConfigSchema = import_schemastery.default.object({
  position: import_schemastery.default.union([
    import_schemastery.default.const("top-right"),
    import_schemastery.default.const("top-left"),
    import_schemastery.default.const("bottom-right"),
    import_schemastery.default.const("bottom-left")
  ]).default("top-right"),
  offset: import_schemastery.default.object({
    x: import_schemastery.default.number().default(8),
    y: import_schemastery.default.number().default(8),
    blankY: import_schemastery.default.number().default(40)
  }).default({ x: 8, y: 8, blankY: 40 }),
  zIndexBase: import_schemastery.default.number().default(DEFAULT_UI_CONFIG.zIndexBase).description("浮窗层级基准（1-9000），胶囊与点击后弹出的主面板同取该配置值")
}).extra("volatile", true);
function isConfigBag(value) {
  return typeof value === "object" && value !== null;
}
function isUiPosition(value) {
  return typeof value === "string" && UI_POSITIONS.has(value);
}
function uiValueBag(raw) {
  if (!isConfigBag(raw))
    return {};
  return isConfigBag(raw.ui) ? raw.ui : raw;
}
function clampNum(value, dflt) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : dflt;
}
function normalizeUiConfig(raw) {
  const ui = uiValueBag(raw);
  const position = isUiPosition(ui.position) ? ui.position : DEFAULT_UI_CONFIG.position;
  const offset = isConfigBag(ui.offset) ? ui.offset : {};
  const offsetX = clampNum(ui.offsetX ?? offset.x, DEFAULT_UI_CONFIG.offset.x);
  const offsetY = clampNum(ui.offsetY ?? offset.y, DEFAULT_UI_CONFIG.offset.y);
  const blankY = clampNum(ui.blankY ?? offset.blankY, DEFAULT_UI_CONFIG.offset.blankY);
  const zIndexBase = clampZIndexBase(ui.zIndexBase, DEFAULT_UI_CONFIG.zIndexBase);
  return { position, offsetX, offsetY, blankY, zIndexBase };
}
function buildConfigUiPatch(raw) {
  const cfg = normalizeUiConfig(raw);
  return {
    position: cfg.position,
    offset: { x: cfg.offsetX, y: cfg.offsetY, blankY: cfg.blankY },
    zIndexBase: cfg.zIndexBase
  };
}
var Config = import_schemastery.default.object({
  enabled: import_schemastery.default.boolean().default(true).description("是否启用本插件").disabled(true),
  announceToAgent: import_schemastery.default.boolean().default(true).description("是否向 Agent 宣告插件（能力清单由 <available_mcp_servers> 承担）").disabled(true),
  storePath: import_schemastery.default.string().description("全局服务器配置路径，留空用默认 <DSH_HOME>/@wingsky-1/dsh-mcp-manager/mcp.json").disabled(true),
  announceCatalog: import_schemastery.default.boolean().default(DEFAULT_ANNOUNCE_CATALOG).description("是否注入 MCP 能力目录（<available_mcp_servers>）").disabled(true),
  catalogMaxEntries: import_schemastery.default.number().default(DEFAULT_CATALOG_MAX_ENTRIES).description("目录注入条目上限").disabled(true),
  debug: DebugConfigSchema.disabled(true),
  ui: UiConfigSchema
});
var DEFAULT_CONFIG = Config({});
function normalizeConfig(input) {
  return Config(input);
}
var BOOLEAN_KEYS = ["enabled", "announceToAgent", "announceCatalog"];
var COUNT_LIMITS = {};

// lib/server/servers/dispatch/interface.js
var interface_exports3 = {};
__export(interface_exports3, {
  executeMcpCall: () => executeMcpCall,
  executeNestedTool: () => executeNestedTool,
  nestedExecutionAgent: () => nestedExecutionAgent
});

// lib/server/servers/dispatch/impl/redact/index.js
function redactMcpError(pipeline, servers, text) {
  const redactor = pipeline.createRedactor([...servers]);
  return redactor(new Error(text));
}

// lib/server/servers/dispatch/impl/call/index.js
function isRuntimeLoader(value) {
  return typeof value === "object" && value !== null && "import" in value && typeof value.import === "function";
}
function isToolPipelineModule(value) {
  return typeof value === "object" && value !== null && "ToolExecutionPipeline" in value && typeof value.ToolExecutionPipeline === "function";
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function loadToolPipeline(ctx) {
  const loader = ctx.get("loader");
  if (!isRuntimeLoader(loader)) {
    throw new Error("dsh-mcp-manager: 宿主未提供 loader 服务，无法加载官方工具执行 pipeline");
  }
  const load = loader.import.bind(loader);
  const module = await load("@deepseek-ai/dsh-tools/pipeline");
  if (!isToolPipelineModule(module)) {
    throw new Error("dsh-mcp-manager: @deepseek-ai/dsh-tools/pipeline 未导出 ToolExecutionPipeline");
  }
  return module;
}
function hasStoredModelImage(content) {
  let found = false;
  for (const block of content) {
    if (!isRecord(block) || block.type !== "image")
      continue;
    if (!("attachment" in block))
      return false;
    found = true;
  }
  return found;
}
function exactNestedToolSource(tools, expectedName, isParentActive) {
  let lookedUp = false;
  let expectedDefinition;
  let projectsContent = false;
  const outerAdmitted = (scope, toolSet) => {
    const outer = toolSet === void 0 ? tools.executable("ws_mcp_call", scope) : tools.executable("ws_mcp_call", scope, toolSet);
    return outer !== void 0;
  };
  const current = (scope, toolSet) => {
    if (!isParentActive() || !outerAdmitted(scope, toolSet))
      return false;
    return lookedUp && expectedDefinition !== void 0 && tools.executable(expectedName) === expectedDefinition;
  };
  return {
    get(name2, scope, toolSet) {
      if (name2 !== expectedName || !isParentActive() || !outerAdmitted(scope, toolSet))
        return void 0;
      if (!lookedUp) {
        lookedUp = true;
        expectedDefinition = tools.executable(expectedName);
        projectsContent = typeof expectedDefinition?.projectContent === "function";
      }
      return tools.executable(expectedName) === expectedDefinition ? expectedDefinition : void 0;
    },
    reject(name2, nested) {
      if (name2 !== expectedName) {
        return new Error(`nested MCP execution rejected unexpected tool ${JSON.stringify(name2)}`);
      }
      if (!nested || !isParentActive()) {
        return new Error(`nested MCP execution ${JSON.stringify(name2)} requires an active enclosing execution token`);
      }
      if (lookedUp && expectedDefinition === void 0) {
        return new Error(`nested MCP execution ${JSON.stringify(name2)} is not a current unconditional registration`);
      }
      return void 0;
    },
    current,
    projectedContent(result) {
      return projectsContent && result.isError === false && hasStoredModelImage(result.content) ? result.content : void 0;
    }
  };
}
function isNestedExecutionAgent(value) {
  return typeof value === "object" && value !== null;
}
function nestedExecutionAgent(value) {
  if (value === void 0)
    return void 0;
  if (isNestedExecutionAgent(value))
    return value;
  throw new Error("ws_mcp_call: nested execution agent must be an object");
}
function commitNestedEffects(result, hooks, canCommit) {
  if (!canCommit)
    return;
  const contexts = result.additionalContexts ?? [];
  if (contexts.length > 0) {
    if (hooks.deferContext === void 0) {
      throw new Error("nested MCP result carries context without an outer execution context");
    }
    for (const context of contexts)
      hooks.deferContext(context);
  }
  if (result.isError === false && result.concludesTurn === true) {
    if (hooks.concludeTurn === void 0) {
      throw new Error("nested MCP result concludes the turn without an outer execution context");
    }
    hooks.concludeTurn();
  }
}
async function executeNestedTool(ctx, input, hooks) {
  const module = await loadToolPipeline(ctx);
  const parentActive = () => input.parent !== void 0 && (hooks.isParentActive?.() ?? false);
  const source = exactNestedToolSource(ctx.tools, input.name, parentActive);
  const executionPipeline = new module.ToolExecutionPipeline(ctx, source);
  const prepared = await executionPipeline.prepare(input);
  const outcome = prepared.kind !== "dispatch" ? prepared : source.current(prepared.exec.agent, prepared.exec.toolSet) ? await executionPipeline.dispatch(prepared.exec) : {
    kind: "final-result",
    result: nestedDependencyUnavailable(input.name)
  };
  const result = await executionPipeline.complete(prepared.exec, outcome);
  const canCommit = parentActive() && !input.signal.aborted;
  commitNestedEffects(result, hooks, canCommit);
  const modelContent = source.projectedContent(result);
  if (canCommit && modelContent !== void 0)
    hooks.onModelContent?.(modelContent);
  return result;
}
function nestedDependencyUnavailable(name2) {
  const reason = `nested MCP dependency ${JSON.stringify(name2)} is no longer executable in the active caller execution`;
  return {
    isError: true,
    content: [{ type: "text", text: `Error: ${reason}` }],
    error: {
      message: reason,
      info: { name: "ToolNotFoundError", code: "UNKNOWN_TOOL", reason }
    }
  };
}
function subCallId(callId) {
  return `${String(callId)}:mcp:1`;
}
function remoteExecutionInput(input, id, tool, args) {
  return {
    callId: subCallId(input.callId),
    ...input.rootCallId === void 0 ? {} : { rootCallId: input.rootCallId },
    name: input.registeredNameFor(id, tool),
    arguments: typeof args === "object" && args !== null ? args : {},
    ...input.agent === void 0 ? {} : { agent: input.agent },
    ...input.toolSet === void 0 ? {} : { toolSet: input.toolSet },
    ...input.parent === void 0 ? {} : { parent: input.parent },
    // 宿主 executor 无条件读 signal.aborted（实测 §2.9-6：给 undefined 当场 TypeError），
    // 而调用方不保证带 signal——没有就现造一个。
    signal: input.signal ?? new AbortController().signal
  };
}
var NOT_DISPATCHABLE_STATES = /* @__PURE__ */ new Set([
  "failed",
  "reconnecting",
  "stopped",
  "disabled",
  void 0
]);
function notReadyError(fullName, status, userDisabled) {
  if (userDisabled) {
    return new Error(`ws_mcp_call: server ${JSON.stringify(fullName)} 已被用户禁用；可先在 GUI「MCP」浮窗中重新连接`);
  }
  if (status === "reconnecting") {
    return new Error(`ws_mcp_call: server ${JSON.stringify(fullName)} 连接失败、正在后台重连；请稍后重试或重新连接`);
  }
  return new Error(`ws_mcp_call: server ${JSON.stringify(fullName)} 未连接或连接失败，请先 ws_mcp_search 或 ws_mcp_list 确认 server 已连接`);
}
function judgeEntryReadiness(fullName, server, userDisabled, entry) {
  const status = entry?.status;
  if (NOT_DISPATCHABLE_STATES.has(status)) {
    return { ready: false, error: notReadyError(fullName, status, userDisabled) };
  }
  if (status === "connecting") {
    return {
      ready: false,
      error: new Error(`ws_mcp_call: server ${JSON.stringify(fullName)} 连接仍在进行，请稍后重试；连接完成后再调用`)
    };
  }
  if (entry === void 0) {
    return { ready: false, error: notReadyError(fullName, status, userDisabled) };
  }
  return { ready: true, entry };
}
function wrappedExecContext(input) {
  return { agent: input.agent };
}
function wrappedContent(def, args, value) {
  if (typeof def.output?.render === "function") {
    return def.output.render(args, value);
  }
  return [
    {
      type: "text",
      text: typeof value === "string" ? value : JSON.stringify(value ?? {})
    }
  ];
}
function resolveCallTarget(input) {
  const parsed = input.workspace.parseFullServerName(input.fullName);
  if (parsed === void 0) {
    throw new Error(`ws_mcp_call: unknown server ${JSON.stringify(input.fullName)}; 格式应为 @<root>/<server>`);
  }
  const unit = input.units.get(parsed.root);
  if (unit === void 0) {
    throw new Error(`ws_mcp_call: 工作空间 ${JSON.stringify(parsed.root)} 未激活；请先 ws_mcp_search 或 ws_mcp_list`);
  }
  const verdict = judgeEntryReadiness(input.fullName, parsed.server, unit.userDisabled.has(parsed.server), unit.connections.get(parsed.server));
  if (!verdict.ready)
    throw verdict.error;
  return { parsed, entry: verdict.entry };
}
async function executeWrappedCall(input, parsed, tool, args, callBudgetMs, wrapped) {
  const { pipeline, signal } = input;
  const def = wrapped.find((d) => d?.name === tool);
  if (def === void 0) {
    throw new Error(`ws_mcp_call: 工具 ${JSON.stringify(`${parsed.server}/${tool}`)} 不存在（封装定义服务器）`);
  }
  try {
    const value = await pipeline.withTimeout(def.execute(typeof args === "object" && args !== null ? args : {}, wrappedExecContext(input)), callBudgetMs + 2e3, `ws_mcp_call: 封装调用超时（${callBudgetMs}ms），可重试；若反复超时请检查插件状态`, signal);
    const content = wrappedContent(def, args, value);
    return {
      content,
      ...value !== void 0 ? { structuredContent: value } : {}
    };
  } catch (error) {
    if (signal?.aborted === true)
      throw signal.reason;
    throw new Error(redactMcpError(pipeline, input.allServers(), `ws_mcp_call: ${JSON.stringify(`${parsed.server}/${tool}`)} 封装调用失败：${pipeline.msgOf(error)}`));
  }
}
async function executeRemoteCall(input, parsed, tool, args, entry, callBudgetMs, stale) {
  const { pipeline, signal } = input;
  const id = entry.id;
  if (id === void 0) {
    throw new Error(`ws_mcp_call: server ${JSON.stringify(input.fullName)} 未就绪（装载未完成）；请稍后重试或重新连接`);
  }
  let result;
  try {
    result = await pipeline.withTimeout(input.execute(remoteExecutionInput(input, id, tool, args)), callBudgetMs + 2e3, `ws_mcp_call: 调用超时（${callBudgetMs}ms），可重试；若反复超时请用 ws_mcp_detail 核对参数或检查服务器状态`, signal);
  } catch (error) {
    if (signal?.aborted === true)
      throw signal.reason;
    throw new Error(redactMcpError(pipeline, input.allServers(), `ws_mcp_call: ${JSON.stringify(`${parsed.server}/${tool}`)} 调用失败：${pipeline.msgOf(error)}`));
  }
  if (result.isError === true) {
    const hostDependencyRejected = result.error.info?.code === "UNKNOWN_TOOL";
    throw new Error(redactMcpError(pipeline, input.allServers(), hostDependencyRejected ? `ws_mcp_call: 调用失败（宿主 MCP 依赖准入拒绝）：${result.error.message}` : `ws_mcp_call: 远端工具返回错误：${result.error.message}；可先用 ws_mcp_detail 核对参数 schema 后重试`));
  }
  const projected = pipeline.projectCallToolResult(result.value, {
    errorText: (content) => `ws_mcp_call: 远端工具返回错误：${pipeline.msgOf(content)}；可先用 ws_mcp_detail 核对参数 schema 后重试`,
    fallbackText: (r) => {
      const raw = typeof r === "object" && r !== null && "content" in r ? r.content : void 0;
      return raw !== void 0 && !Array.isArray(raw) ? pipeline.msgOf(raw) : pipeline.defaultCallResultFallbackText(r);
    }
  });
  if (stale) {
    const hint = {
      type: "text",
      text: "（提示：本工具目录已过期，schema 可能已变更，请重新 ws_mcp_search）"
    };
    const value = {
      content: [hint, ...projected.content],
      ...projected.structuredContent !== void 0 ? { structuredContent: projected.structuredContent } : {}
    };
    return value;
  }
  return projected;
}
async function executeMcpCall(input) {
  const { pipeline, workspace } = input;
  const { parsed, entry } = resolveCallTarget(input);
  const tool = workspace.normalizeToolName(parsed.server, input.toolRaw);
  const policyKey = workspace.fullServerName(parsed.root, parsed.server);
  if (pipeline.isToolDenied(input.disabledTools, policyKey, tool)) {
    throw new Error(pipeline.toolDisabledReason(policyKey, tool));
  }
  const catalog = input.catalogEntryFor(parsed.server);
  const stale = catalog !== void 0 && catalog.unavailable === void 0 && Date.now() - catalog.discoveredAt > input.catalogTtlMs;
  if (stale) {
  }
  const args = pipeline.normalizeArguments(input.rawArgs);
  const callBudgetMs = entry.server?.toolCallTimeoutMs ?? input.defaultCallTimeoutMs;
  const wrapped = entry.server?.toolDefinitions;
  if (Array.isArray(wrapped)) {
    return executeWrappedCall(input, parsed, tool, args, callBudgetMs, wrapped);
  }
  return executeRemoteCall(input, parsed, tool, args, entry, callBudgetMs, stale);
}

// lib/server/servers/lifecycle/interface.js
var interface_exports4 = {};
__export(interface_exports4, {
  attributeOfficialLog: () => attributeOfficialLog,
  awaitMountWindow: () => awaitMountWindow,
  collectOfficialLogs: () => collectOfficialLogs,
  diagnosticText: () => diagnosticText,
  disposeServer: () => disposeServer,
  installLifecycle: () => installLifecycle,
  mountLedger: () => mountLedger,
  mountServer: () => mountServer,
  officialLogText: () => officialLogText,
  projectServerState: () => projectServerState,
  releaseLifecycle: () => releaseLifecycle,
  releaseServer: () => releaseServer
});

// lib/server/servers/lifecycle/impl/service/index.js
var LifecyclePorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: servers/lifecycle 域只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本域的活资源（装载账本）由 `releaseLifecycle` 另行回收。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 域内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成
   * 装载静默失败在没有 loader 的空实现上，症状与本插件毫无字面关联。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: servers/lifecycle 域未装配——组合根未在入口调用 installLifecycle（src/index.ts）");
    }
    return deps;
  }
};
var lifecyclePorts = new LifecyclePorts();

// lib/server/servers/lifecycle/impl/ledger/index.js
var MountLedger = class {
  entries = /* @__PURE__ */ new Map();
  /** 释放后待结算的 dispose：只收不 await，见文件头「已知缺口」。 */
  pending = [];
  disposing = /* @__PURE__ */ new Map();
  trackDisposal(key, disposal) {
    this.disposing.set(key, disposal);
    void disposal.then(
      () => {
        if (this.disposing.get(key) === disposal)
          this.disposing.delete(key);
      },
      // 失败时保留拒因：不能确认同名预留已解除。
      () => {
      }
    );
  }
  async waitForRelease(key) {
    const disposal = this.disposing.get(key);
    if (disposal !== void 0)
      await disposal;
  }
  /** 记账并**发起**装载：先查键再装，撞键当场抛（早失败 + 判词点名键）。 */
  mount(key, module, config) {
    if (this.entries.has(key)) {
      throw new Error(`dsh-mcp-manager: servers/lifecycle 账本已有键 ${key}——同一 serverName 未释放前不得重复 mount`);
    }
    const handle = lifecyclePorts.get().loader.mount(module, config);
    const entry = { key, module, config, handle };
    this.entries.set(key, entry);
    return entry;
  }
  get(key) {
    return this.entries.get(key);
  }
  get size() {
    return this.entries.size;
  }
  /** 该条目是否仍是账本当前代际：被替换或已移除都不算——晚到结算据此丢弃（代际守卫）。 */
  isCurrent(entry) {
    return this.entries.get(entry.key) === entry;
  }
  /**
   * 单键释放，**只发起不等结算**：摘账同步生效（`isCurrent` 立刻为假），dispose 收进既有
   * pending。拆除路径用它——见文件头「已知缺口」；要等结算的重建路径用 `dispose()`。
   */
  releaseOne(key) {
    const entry = this.entries.get(key);
    if (entry === void 0)
      return;
    this.entries.delete(key);
    const disposal = entry.handle.dispose();
    this.trackDisposal(key, disposal);
    void disposal.catch(() => {
    });
    this.pending.push(disposal);
  }
  /** 单键释放：先摘账（同步生效，isCurrent 立刻为假）再等句柄结算。 */
  async dispose(key) {
    const entry = this.entries.get(key);
    if (entry === void 0)
      return;
    this.entries.delete(key);
    const disposal = entry.handle.dispose();
    this.trackDisposal(key, disposal);
    await disposal;
  }
  /** 域卸载：逐条摘账并发起 dispose，不等结算（见文件头「已知缺口」）。 */
  release() {
    const entries = [...this.entries.values()];
    this.entries.clear();
    for (const entry of entries)
      this.pending.push(entry.handle.dispose());
  }
  /**
   * 等待已发起的 dispose 全部落定。任一失败如实上抛：兜底链保证的是「卸载不卡住」，
   * 不是「dispose 永不失败」，吞掉错因会让泄漏变成静默。
   */
  async flushDisposals() {
    const pending = this.pending;
    this.pending = [];
    const settled = await Promise.allSettled(pending);
    const rejected = settled.find((result) => result.status === "rejected");
    if (rejected !== void 0 && rejected.status === "rejected")
      throw rejected.reason;
  }
};
var mountLedger = new MountLedger();

// lib/server/servers/lifecycle/impl/state/index.js
function projectServerState(id, input) {
  if (!input.enabled || input.userDisabled)
    return SERVER_STATES.disabled;
  if (input.tornDown || input.disposed)
    return SERVER_STATES.stopped;
  if (!input.mountStarted)
    return SERVER_STATES.stopped;
  if (!input.readySettled) {
    return input.windowExpired ? SERVER_STATES.failed : SERVER_STATES.connecting;
  }
  return settledState(input, id);
}
function settledState(input, id) {
  if (input.hasTools(id))
    return SERVER_STATES.connected;
  if (!input.everConnected)
    return SERVER_STATES.failed;
  return input.reconnectEnabled ? SERVER_STATES.reconnecting : SERVER_STATES.failed;
}

// lib/server/servers/lifecycle/impl/logs/index.js
var MAX_DIAGNOSTIC_LINES = 3;
var MAX_DIAGNOSTIC_CHARS = 240;
function officialLogText(record) {
  if (record.name !== OFFICIAL_MCP_CLIENT_LOG_NAME)
    return void 0;
  const text = record.args.filter((arg) => typeof arg === "string").join(" ").trim();
  return text === "" ? void 0 : text;
}
function attributeOfficialLog(text, serverName) {
  const prefix = `${OFFICIAL_MCP_CLIENT_LOG_NAME}(${serverName})`;
  if (!text.startsWith(prefix))
    return void 0;
  const rest = text.slice(prefix.length).replace(/^[\s:：]*/u, "").trim();
  return rest === "" ? void 0 : rest;
}
function trimLine(line) {
  const flat = line.replace(/\s+/gu, " ").trim();
  return flat.length > MAX_DIAGNOSTIC_CHARS ? `${flat.slice(0, MAX_DIAGNOSTIC_CHARS)}…` : flat;
}
function diagnosticText(lines) {
  const kept = lines.filter((line) => line.trim() !== "").slice(-MAX_DIAGNOSTIC_LINES).map(trimLine);
  if (kept.length === 0)
    return void 0;
  const omitted = lines.length - kept.length;
  const tail = omitted > 0 ? `（共 ${lines.length} 条，取末 ${kept.length} 条）` : "";
  return `官方日志${tail}：${kept.join(" | ")}`;
}
function collectOfficialLogs(logs, serverName) {
  const lines = [];
  let stopped = false;
  const dispose = logs.capture((record) => {
    const text = officialLogText(record);
    if (text === void 0)
      return;
    const attributed = attributeOfficialLog(text, serverName);
    if (attributed === void 0)
      return;
    lines.push(attributed);
  });
  return {
    lines: () => lines,
    stop() {
      if (stopped)
        return;
      stopped = true;
      try {
        dispose();
      } catch {
      }
    }
  };
}

// lib/server/servers/lifecycle/impl/timeout/index.js
async function awaitMountWindow(input) {
  const { withTimeout: withTimeout2 } = lifecyclePorts.get().pipeline;
  const budgetMs = input.connectTimeoutMs ?? CONNECT_TIMEOUT_MS;
  if (isAbandoned(input))
    return { kind: "discarded" };
  input.onState(SERVER_STATES.connecting);
  let failure;
  try {
    await withTimeout2(input.handle.ready, budgetMs, `连接超时（${budgetMs}ms）：官方实例保留不 dispose，仍在后台退避重连`);
  } catch (error) {
    failure = errorText(error);
  }
  if (isAbandoned(input))
    return { kind: "discarded" };
  if (failure !== void 0) {
    return settle(input, SERVER_STATES.failed, withOfficialLogs(input, failure));
  }
  if (!input.hasTools(input.id)) {
    await yieldOneTick();
    if (isAbandoned(input))
      return { kind: "discarded" };
  }
  if (input.hasTools(input.id))
    return settle(input, SERVER_STATES.connected);
  return settle(input, SERVER_STATES.failed, withOfficialLogs(input, missingToolFaceText()));
}
function isAbandoned(input) {
  return input.handle.disposed || !input.isCurrent();
}
function settle(input, state, error) {
  input.onState(state);
  return error === void 0 ? { kind: "settled", state } : { kind: "settled", state, error };
}
function yieldOneTick() {
  return new Promise((resolve4) => {
    setTimeout(resolve4, 0);
  });
}
function missingToolFaceText() {
  return `已连接但工具注册面未出现（官方发现预算 ${DISCOVERY_TIMEOUT_MS}ms 已在 ready 内结算）：官方实例在后台重连`;
}
function withOfficialLogs(input, text) {
  const diagnostics = input.diagnostics?.();
  const official = diagnostics === void 0 ? void 0 : diagnosticText(diagnostics);
  return official === void 0 ? text : `${text}；${official}`;
}
function errorText(error) {
  return error instanceof Error ? error.message : String(error);
}

// lib/server/servers/lifecycle/impl/mount/index.js
function officialMcpConfig(server, id, expandServerEnv2) {
  const expanded = expandServerEnv2(server);
  const common = officialConfigCommon(server, id);
  if (server.transport === "stdio") {
    return stdioOfficialConfig(server, expanded, common);
  }
  return httpOfficialConfig(server, expanded, common);
}
function officialConfigCommon(server, id) {
  return {
    serverName: id,
    // 恒 false（§3.3）：置 true 会让首连失败直接杀掉实例、官方后台重连随之被回收，等于放弃
    // 「常驻重连」语义；failed 因此是软失败——实例仍在，只是拿不到具体错因（§3.2-1）。
    failOnStartupError: false,
    // 官方默认 60s；本插件的 DEFAULT_TOOL_CALL_TIMEOUT_MS 是 15s，必须显式覆盖。
    toolCallTimeoutMs: server.toolCallTimeoutMs ?? DEFAULT_TOOL_CALL_TIMEOUT_MS,
    // 缺失时给 {}：官方 resolveReconnectPolicy 先补默认值再判关系，本块不重抄一份默认值表。
    reconnect: server.reconnect ?? {}
  };
}
function stdioOfficialConfig(server, expanded, common) {
  if (typeof server.command !== "string" || server.command === "") {
    throw new Error("dsh-mcp-manager: stdio 服务器缺 command，拒绝装载（配置面应已由 normalizeServer 保证非空）");
  }
  return {
    transport: "stdio",
    command: server.command,
    // 三个字段都显式给默认值：官方 schema 虽有默认，但依赖它等于把「配置里到底写没写」与官方
    // rc 的内部实现绑在一起（§2.1 表）。cwd 的空串不能给 undefined——见 §2.3。
    args: server.args ?? [],
    env: expanded.env ?? {},
    cwd: server.cwd ?? "",
    ...common
  };
}
function httpOfficialConfig(server, expanded, common) {
  if (typeof server.url !== "string" || server.url === "") {
    throw new Error("dsh-mcp-manager: streamable-http 服务器缺 url，拒绝装载（配置面应已由 normalizeServer 保证非空）");
  }
  return {
    transport: "streamable-http",
    url: server.url,
    headers: expanded.headers ?? {},
    ...common
  };
}
async function mountServer(input) {
  const { loader, workspace, config, tools, logs } = lifecyclePorts.get();
  const id = workspace.idFor(input.root, input.server.name);
  const officialConfig = officialMcpConfig(input.server, id, config.expandServerEnv);
  const module = await loader.load(OFFICIAL_MCP_CLIENT_SPECIFIER);
  await mountLedger.waitForRelease(id);
  if (input.shouldMount?.() === false)
    throw new Error("connection attempt cancelled");
  const entry = mountLedger.mount(id, module, officialConfig);
  input.onMounted?.(id);
  const collected = collectOfficialLogs(logs, id);
  let outcome;
  try {
    outcome = await awaitMountWindow({
      id,
      handle: entry.handle,
      // 代际守卫读账本：本条目被 dispose 或顶替之后到达的结算一律作废（§3.4 步骤 6）。
      isCurrent: () => mountLedger.isCurrent(entry),
      hasTools: (candidate) => hasRegisteredTools(tools, candidate),
      diagnostics: collected.lines,
      onState: input.onState,
      ...input.connectTimeoutMs === void 0 ? {} : { connectTimeoutMs: input.connectTimeoutMs }
    });
  } finally {
    collected.stop();
  }
  return { id, entry, outcome };
}
function hasRegisteredTools(tools, id) {
  const prefix = `mcp__${id}__`;
  return tools.schemas().some((schema) => schema.name.startsWith(prefix));
}

// lib/server/servers/lifecycle/interface.js
function installLifecycle(deps) {
  lifecyclePorts.install(deps);
}
function releaseLifecycle() {
  mountLedger.release();
  lifecyclePorts.release();
}
function releaseServer(key) {
  mountLedger.releaseOne(key);
}
function disposeServer(key) {
  return mountLedger.dispose(key);
}

// lib/server/pipeline/interface.js
var interface_exports5 = {};
__export(interface_exports5, {
  createRedactor: () => createRedactor,
  defaultCallResultFallbackText: () => defaultCallResultFallbackText,
  globMatch: () => globMatch,
  installPipeline: () => installPipeline,
  isToolDenied: () => isToolDenied,
  maskSecretArgsForDisplay: () => maskSecretArgsForDisplay,
  msgOf: () => msgOf2,
  normalizeArguments: () => normalizeArguments,
  projectCallToolResult: () => projectCallToolResult,
  releasePipeline: () => releasePipeline,
  toolDisabledReason: () => toolDisabledReason,
  withTimeout: () => withTimeout
});

// lib/server/pipeline/impl/service/index.js
var PipelinePorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: pipeline 域只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本域没有别的活资源要释放。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 域内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成
   * 行为正常但参数不对（全名解析与裸名回落静默换实现），症状与本插件毫无字面关联。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: pipeline 域未装配——组合根未在入口调用 installPipeline（src/index.ts）");
    }
    return deps;
  }
};
var pipelinePorts = new PipelinePorts();

// lib/server/pipeline/impl/args/index.js
function unwrapArgumentString(trimmed) {
  if (trimmed.length === 0)
    return { kind: "result", result: {} };
  const head = jsonHeadKind(trimmed);
  if (!head.container && !head.quoted)
    return { kind: "bail" };
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return { kind: "bail" };
  }
  return classifyParsedJson(parsed, head.quoted);
}
function jsonHeadKind(trimmed) {
  const head = trimmed.charCodeAt(0);
  return { container: head === 123 || head === 91, quoted: head === 34 };
}
function classifyParsedJson(parsed, wasQuoted) {
  if (parsed !== null && typeof parsed === "object") {
    if (Array.isArray(parsed))
      return { kind: "result", result: {} };
    return { kind: "result", result: parsed };
  }
  const inner = typeof parsed === "string" ? parsed.trim() : "";
  const innerLooksContainer = inner.startsWith("{") || inner.startsWith("[");
  if (!wasQuoted || !innerLooksContainer)
    return { kind: "bail" };
  return { kind: "next", next: parsed };
}
function normalizeArguments(raw) {
  let value = raw ?? {};
  if (Array.isArray(value))
    return {};
  let depth = 0;
  while (typeof value === "string" && depth < 4) {
    const step = unwrapArgumentString(value.trim());
    if (step.kind === "result")
      return step.result;
    if (step.kind === "bail")
      break;
    value = step.next;
    depth += 1;
  }
  return value;
}

// lib/server/pipeline/impl/msg/index.js
function msgOf2(error) {
  if (error instanceof Error)
    return error.message;
  if (typeof error === "string")
    return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

// lib/server/pipeline/impl/redact/index.js
function addSecretPair(secrets, value) {
  if (value.length === 0)
    return;
  secrets.add(value);
  try {
    secrets.add(encodeURIComponent(value));
  } catch {
  }
}
var SECRET_FLAG_NAMES = /* @__PURE__ */ new Set([
  "token",
  "tokens",
  "secret",
  "secrets",
  "password",
  "passwd",
  "pass",
  "passphrase",
  "key",
  "keys",
  "apikey",
  "api-key",
  "secretkey",
  "secret-key",
  "auth",
  "authorization",
  "authtoken",
  "auth-token",
  "cookie",
  "cookies",
  "credential",
  "credentials",
  "access-token",
  "accesstoken",
  "client-secret",
  "clientsecret"
]);
var SECRET_SHORT_FLAGS = /* @__PURE__ */ new Set(["-p", "-k", "-s"]);
function isSecretFlagName(flag) {
  return SECRET_FLAG_NAMES.has(flag.replace(/^-+/, "").toLowerCase());
}
function collectStdioSecrets(server, secrets) {
  for (const value of Object.values(server.env ?? {}))
    addSecretPair(secrets, value);
  collectArgSecrets(server.args ?? [], secrets);
}
function nonEmpty(value) {
  return value !== void 0 && value.length > 0 ? value : void 0;
}
function secretValueAt(args, index) {
  const argument = args[index] ?? "";
  if (SECRET_SHORT_FLAGS.has(argument))
    return nonEmpty(args[index + 1]);
  const equals = argument.indexOf("=");
  const flag = equals < 0 ? argument : argument.slice(0, equals);
  if (!isSecretFlagName(flag))
    return void 0;
  return nonEmpty(equals < 0 ? args[index + 1] : argument.slice(equals + 1));
}
function collectArgSecrets(args, secrets) {
  for (let index = 0; index < args.length; index += 1) {
    const value = secretValueAt(args, index);
    if (value !== void 0)
      addSecretPair(secrets, value);
  }
}
function maskSecretArgsForDisplay(args) {
  const out = args.map((entry) => String(entry));
  const masked = /* @__PURE__ */ new Set();
  const maskAt = (index) => {
    if (index >= 0 && index < out.length && out[index].length > 0) {
      out[index] = "[REDACTED]";
      masked.add(index);
    }
  };
  const maskEqualsValue = (index, text) => {
    const equals = text.indexOf("=");
    if (equals >= 0 && text.slice(equals + 1).length > 0) {
      out[index] = `${text.slice(0, equals + 1)}[REDACTED]`;
      masked.add(index);
    }
  };
  for (let index = 0; index < out.length; index += 1) {
    if (masked.has(index))
      continue;
    const argument = out[index];
    if (SECRET_SHORT_FLAGS.has(argument)) {
      maskAt(index + 1);
      continue;
    }
    const equals = argument.indexOf("=");
    const flag = equals < 0 ? argument : argument.slice(0, equals);
    if (!isSecretFlagName(flag))
      continue;
    if (equals < 0)
      maskAt(index + 1);
    else
      maskEqualsValue(index, argument);
  }
  return out;
}
function createRedactor(servers) {
  const secrets = /* @__PURE__ */ new Set();
  for (const server of servers) {
    if (server.transport === "stdio") {
      collectStdioSecrets(server, secrets);
      continue;
    }
    for (const value of Object.values(server.headers ?? {}))
      addSecretPair(secrets, value);
    const url = server.url;
    if (typeof url === "string" && url !== "") {
      try {
        const parsed = new URL(url);
        addSecretPair(secrets, parsed.username);
        addSecretPair(secrets, parsed.password);
        for (const value of parsed.searchParams.values())
          addSecretPair(secrets, value);
      } catch {
      }
    }
  }
  const ordered = [...secrets].sort((left, right) => right.length - left.length);
  return (error) => {
    let text;
    try {
      text = error instanceof Error ? error.message : String(error);
    } catch {
      text = "<unprintable error>";
    }
    for (const secret of ordered)
      text = text.split(secret).join("[REDACTED]");
    return text;
  };
}

// lib/server/pipeline/impl/timeout/index.js
function withTimeout(promise, ms, message, signal) {
  if (signal?.aborted === true)
    return Promise.reject(signal.reason ?? new Error("aborted"));
  return new Promise((resolve4, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(message));
    }, ms);
    const onAbort = () => {
      cleanup();
      reject(signal?.reason ?? new Error("aborted"));
    };
    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    void promise.then((value) => {
      cleanup();
      resolve4(value);
    }, (error) => {
      cleanup();
      reject(error);
    });
  });
}

// lib/server/pipeline/impl/authorize/index.js
function globMatch(pattern, name2) {
  if (pattern === "*")
    return true;
  if (!pattern.includes("*"))
    return pattern === name2;
  const escaped = pattern.split("*").map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*");
  return new RegExp(`^${escaped}$`).test(name2);
}
function isToolDenied(disabledTools, serverKey, tool) {
  const { workspace: { parseFullServerName: parseFullServerName2 } } = pipelinePorts.get();
  const parsed = parseFullServerName2(serverKey);
  if (parsed === void 0)
    return false;
  const server = parsed.server;
  if (deniedInScope(disabledTools, parsed.root, server, tool))
    return true;
  return parsed.root !== MIDDLEWARE_GLOBAL_ROOT && deniedInScope(disabledTools, MIDDLEWARE_GLOBAL_ROOT, server, tool);
}
function deniedInScope(disabledTools, root, server, tool) {
  const set = disabledTools?.get(root)?.get(server);
  return set !== void 0 && set.size > 0 && set.has(tool);
}
function toolDisabledReason(serverKey, tool) {
  return `ws_mcp_call: 工具 ${JSON.stringify(`${serverKey}/${tool}`)} 已被用户在「MCP」浮窗禁用；工具级禁用作用于 mcp-manager 管辖的全部 MCP 工具（mcp__ 前缀直呼与中间层 ws_mcp_* 一致生效），纪律裸名不受影响（如需恢复请到浮窗重新勾选）`;
}

// lib/server/pipeline/impl/project/index.js
function defaultCallResultFallbackText(result) {
  const rendered = result !== void 0 && result !== null && typeof result === "object" && "toolResult" in result ? JSON.stringify(result.toolResult) : "(no output)";
  return typeof rendered === "string" ? rendered : "(no output)";
}
function defaultErrorText(content, fallbackText) {
  const parts = [];
  for (const block of content) {
    if (typeof block === "object" && block !== null && block.type === "text" && typeof block.text === "string") {
      parts.push(block.text);
    }
  }
  return parts.length > 0 ? parts.join("\n") : fallbackText;
}
function projectCallToolResult(result, handlers = {}) {
  const resolveFallbackText = () => handlers.fallbackText !== void 0 ? handlers.fallbackText(result) : defaultCallResultFallbackText(result);
  if (!isRawResult(result)) {
    return withStructured({ content: [{ type: "text", text: resolveFallbackText() }] }, void 0);
  }
  const structured = result.structuredContent;
  if (!Array.isArray(result.content)) {
    if (result.isError === true)
      throw new Error(resolveFallbackText());
    return withStructured({ content: [{ type: "text", text: resolveFallbackText() }] }, structured);
  }
  if (result.isError === true) {
    const fallbackText = resolveFallbackText();
    throw new Error(handlers.errorText !== void 0 ? handlers.errorText(result.content) : defaultErrorText(result.content, fallbackText));
  }
  return withStructured({ content: result.content }, structured);
}
function isRawResult(result) {
  return typeof result === "object" && result !== null;
}
function withStructured(base, structured) {
  return structured === void 0 ? base : { ...base, structuredContent: structured };
}

// lib/server/pipeline/interface.js
function installPipeline(deps) {
  pipelinePorts.install(deps);
}
function releasePipeline() {
  pipelinePorts.release();
}

// lib/server/connection/runtime/interface.js
var interface_exports6 = {};
__export(interface_exports6, {
  CALL_TIMEOUT_MS: () => CALL_TIMEOUT_MS,
  CATALOG_TTL_MS: () => CATALOG_TTL_MS,
  CONNECT_TIMEOUT_MS: () => CONNECT_TIMEOUT_MS,
  DEFAULT_TOOL_CALL_TIMEOUT_MS: () => DEFAULT_TOOL_CALL_TIMEOUT_MS,
  DISCOVERY_TIMEOUT_MS: () => DISCOVERY_TIMEOUT_MS,
  LIST_DEFAULT_TOOLS_PER_SERVER: () => LIST_DEFAULT_TOOLS_PER_SERVER,
  LIST_MAX_TOOLS_PER_SERVER: () => LIST_MAX_TOOLS_PER_SERVER,
  MAX_BYTES_PER_TOOL: () => MAX_BYTES_PER_TOOL,
  MAX_TOOLS_PER_SERVER: () => MAX_TOOLS_PER_SERVER,
  MAX_TOTAL_CATALOG_BYTES: () => MAX_TOTAL_CATALOG_BYTES,
  McpMiddleware: () => McpMiddleware,
  installRuntime: () => installRuntime,
  publicToolName: () => publicToolName,
  releaseRuntime: () => releaseRuntime
});

// lib/server/connection/runtime/impl/service/index.js
var RuntimePorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: connection/runtime 子层只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本子层没有别的活资源要释放。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 子层内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成行为
   * 正常但参数不对（结果投影、策略裁决与全名解析静默换成别处的实现），症状与本插件毫无字面
   * 关联。`get()` 只在运行期方法内调用（不在模块求值期），故回调闭包（`errorText`）里取到的
   * 一定是装配后的能力。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: connection/runtime 子层未装配——组合根未在入口调用 installRuntime（src/index.ts）");
    }
    return deps;
  }
};
var runtimePorts = new RuntimePorts();

// lib/server/connection/runtime/limits.js
var CALL_TIMEOUT_MS = 3e4;
var CATALOG_TTL_MS = 24 * 60 * 60 * 1e3;
var MAX_TOOLS_PER_SERVER = 512;
var MAX_BYTES_PER_TOOL = 4096;
var MAX_TOTAL_CATALOG_BYTES = 256 * 1024;
var LIST_MAX_TOOLS_PER_SERVER = 500;

// lib/server/connection/runtime/middleware.js
var pendingRootInits = /* @__PURE__ */ new WeakMap();
function initRegistryFor(self) {
  const registry = pendingRootInits.get(self);
  if (registry === void 0) {
    const created = /* @__PURE__ */ new Map();
    pendingRootInits.set(self, created);
    return created;
  }
  return registry;
}
function cancelPendingInit(self, root) {
  const registry = pendingRootInits.get(self);
  if (registry === void 0)
    return;
  const task = registry.get(root);
  if (task === void 0)
    return;
  task.cancelled = true;
  if (registry.get(root) === task)
    registry.delete(root);
}
async function runRootInit(self, root, task) {
  const registry = initRegistryFor(self);
  if (!initOwned(registry, root, task))
    return void 0;
  const servers = await self.host.projectServersFor(root);
  if (!initOwned(registry, root, task))
    return void 0;
  if (servers === void 0)
    return void 0;
  const unit = buildProjectUnit(root, self.disabledByRoot.get(root));
  if (!initOwned(registry, root, task))
    return void 0;
  self.units.set(root, unit);
  await loadRootCatalog(self, root, unit, task, registry);
  if (!initOwned(registry, root, task) || self.units.get(root) !== unit)
    return void 0;
  launchBackgroundConnects(self, root, servers);
  unit.lastTouchedAt = Date.now();
  return unit;
}
function initOwned(registry, root, task) {
  return !task.cancelled && registry.get(root) === task;
}
function buildProjectUnit(root, userDisabled) {
  return {
    root,
    connections: /* @__PURE__ */ new Map(),
    userDisabled: new Set(userDisabled ?? []),
    lastTouchedAt: Date.now(),
    inFlight: /* @__PURE__ */ new Map()
  };
}
async function loadRootCatalog(self, root, unit, task, registry) {
  try {
    await runtimePorts.get().catalog.catalogDirectory.ensureRootLoaded(root, self.host.catalogCachePath(root));
  } catch (error) {
    if (self.units.get(root) === unit && registry.get(root) === task)
      self.teardownUnit(root);
    throw error;
  }
}
function launchBackgroundConnects(self, root, servers) {
  for (const server of servers) {
    if (server.enabled === false)
      continue;
    void self.ensureConnected(root, server.name).catch(() => {
      self.host.logger.warn(`dsh-mcp-manager: background connect ${server.name}@${root} failed (see entry error)`);
    });
  }
}
async function awaitPendingInit(self, root, task) {
  const registry = initRegistryFor(self);
  try {
    return await task.promise;
  } finally {
    if (registry.get(root) === task)
      registry.delete(root);
  }
}
function connectWrappedServer(unit, root, serverName, server, host) {
  if (!Array.isArray(server.toolDefinitions))
    return false;
  const existingWrapped = unit.connections.get(serverName);
  if (existingWrapped !== void 0 && (existingWrapped.status === "connected" || existingWrapped.status === "connecting"))
    return true;
  const wrappedEntry = {
    server,
    id: void 0,
    handle: void 0,
    status: "connected",
    error: void 0,
    connectedAt: Date.now(),
    readySettled: true,
    everConnected: true,
    disposed: false
  };
  unit.connections.set(serverName, wrappedEntry);
  runtimePorts.get().catalog.catalogDirectory.projectWrappedTools({
    root,
    serverName,
    definitions: server.toolDefinitions
  });
  host.logger.info(`dsh-mcp-manager(${serverName}@${root}): wrapped (toolDefinitions) connected`);
  host.emitStatus();
  return true;
}
function ownsMount(unit, name2, entry) {
  return !entry.disposed && unit.connections.get(name2) === entry;
}
function recordPendingMount(unit, name2, entry, id, release) {
  const pending = { id, released: false };
  entry.pendingMount = pending;
  if (!ownsMount(unit, name2, entry)) {
    pending.released = true;
    release(id);
  }
}
function releaseDiscardedMount(entry, id, release) {
  if (entry.pendingMount?.released !== true)
    release(id);
}
async function mountRemoteServer(unit, root, serverName, server, entry, faces) {
  const { lifecycle } = runtimePorts.get();
  const current = unit.connections.get(serverName);
  if (current !== void 0 && current !== entry)
    return;
  const newEntry = {
    server,
    id: void 0,
    handle: void 0,
    status: "connecting",
    error: void 0,
    connectedAt: void 0,
    readySettled: false,
    everConnected: false,
    disposed: false
  };
  unit.connections.set(serverName, newEntry);
  let mounted;
  try {
    mounted = await lifecycle.mountServer({
      root,
      server,
      shouldMount: () => ownsMount(unit, serverName, newEntry),
      onMounted: (id) => recordPendingMount(unit, serverName, newEntry, id, lifecycle.releaseServer),
      // 六态窗口内只推进状态：装上之后 id/handle 才回得来，这里不能碰代际守卫。
      onState: (next) => {
        if (!ownsMount(unit, serverName, newEntry))
          return;
        newEntry.status = next;
        faces.host.emitStatus();
      }
    });
  } catch (error) {
    if (!ownsMount(unit, serverName, newEntry))
      return;
    newEntry.status = "failed";
    newEntry.error = faces.redact(error);
    newEntry.readySettled = true;
    faces.host.logger.warn(`dsh-mcp-manager(${serverName}@${root}): mount failed: ${faces.redact(error)}`);
    faces.host.emitStatus();
    return;
  }
  newEntry.id = mounted.id;
  newEntry.handle = mounted.entry.handle;
  newEntry.readySettled = true;
  if (!ownsMount(unit, serverName, newEntry)) {
    releaseDiscardedMount(newEntry, mounted.id, lifecycle.releaseServer);
    return;
  }
  if (mounted.outcome.kind === "settled") {
    newEntry.status = mounted.outcome.state;
    newEntry.error = mounted.outcome.error;
    if (mounted.outcome.state === "connected") {
      newEntry.everConnected = true;
      newEntry.connectedAt = Date.now();
      await projectConnectedCatalog(root, serverName, mounted.id, faces);
      faces.host.logger.info(`dsh-mcp-manager(${serverName}@${root}): connected`);
    } else if (mounted.outcome.state === "failed") {
      faces.host.logger.warn(`dsh-mcp-manager(${serverName}@${root}): connection failed: ${mounted.outcome.error}`);
    }
    faces.host.emitStatus();
  }
}
async function projectConnectedCatalog(root, serverName, id, faces) {
  await runtimePorts.get().catalog.catalogDirectory.projectRegisteredTools({
    root,
    serverName,
    id,
    schemas: faces.registeredSchemas(),
    cachePath: () => faces.host.catalogCachePath(root),
    redact: (error) => faces.redact(error),
    isRuntimeServer: (name2) => faces.host.isRuntimeServer(name2),
    warn: (message) => faces.host.logger.warn(message)
  });
  await faces.host.recordCatalogTools?.(serverName, faces.registeredToolMeta(id));
}
function shortCircuitsOnState(state, force) {
  if (force)
    return false;
  return state === "connected" || state === "connecting" || state === "reconnecting";
}
async function disposePreviousGeneration(entry, disposeServer2) {
  if (entry === void 0 || Array.isArray(entry.server.toolDefinitions))
    return;
  entry.disposed = true;
  const pending = entry.pendingMount;
  const id = entry.id ?? (pending?.released === true ? void 0 : pending?.id);
  if (id !== void 0) {
    if (pending !== void 0)
      pending.released = true;
    await disposeServer2(id);
  }
}
function connectableServer(servers, serverName) {
  const server = servers?.find((candidate) => candidate.name === serverName);
  if (server === void 0 || server.enabled === false)
    return void 0;
  return server;
}
function virtualUnitState(entry, userDisabled) {
  if (entry.server.enabled === false || userDisabled)
    return SERVER_STATES.disabled;
  return entry.disposed ? SERVER_STATES.stopped : SERVER_STATES.connected;
}
var McpMiddleware = class {
  host;
  /** root（realpath 归一化）→ 工作空间单元。 */
  units;
  /** 用户禁用映射（root → Set<server>），单元创建时合并。 */
  disabledByRoot = /* @__PURE__ */ new Map();
  /** 工具级禁用（root → server → Set<tool>；root=@global 跨工作空间共享）。 */
  disabledTools = /* @__PURE__ */ new Map();
  /**
   * 在飞的转发子调用登记表：我方 dispatch 经公开 nested `ToolExecutionPipeline` 派出去的
   * 子调用，其 `parent` 就是这次外层调用的 token，派发前登记、结算后注销（try/finally）。
   * pre-execute guard 只按发起者放行（裁定 R/Z）——集合外的一律走工具级裁决，
   * 模型直呼不会因为名字像就被放行。集合随实例消亡，热切换重建中间层即清空。
   */
  forwarding = /* @__PURE__ */ new Set();
  constructor(host) {
    this.host = host;
    this.units = /* @__PURE__ */ new Map();
  }
  /** 读取/创建 root 的单元（root 无项目标记 → undefined）。
   *
   *  #1168 窗口 B（并发初始化去重）：先查在飞 init，再决定要不要建单元——同根的并发
   *  首次调用共享同一个 init 任务（同一代单元），不再各建一份（后写覆盖先写）。init 在
   *  **配置读取开始前**就同步占位（Promise.resolve().then 把真正工作推迟一拍，但登记
   *  在同一同步段完成），堵住「两个调用都越过 units.get 判空」的窗口。
   *
   *  init 何时 resolve：目录缓存（last-good）已载入、且 enabled 连接的 in-flight 任务已
   *  登记之后——不等远端连接本身（连接是 fire-and-forget）。于是并发首次读拿到的一定是
   *  已完成目录载入的完整单元，而不是半初始化对象。
   */
  async projectUnitFor(root) {
    if (root === void 0)
      return void 0;
    const registry = initRegistryFor(this);
    const pending = registry.get(root);
    if (pending !== void 0)
      return awaitPendingInit(this, root, pending);
    const existing = this.units.get(root);
    if (existing !== void 0) {
      existing.lastTouchedAt = Date.now();
      return existing;
    }
    const task = { promise: Promise.resolve(void 0), cancelled: false };
    task.promise = Promise.resolve().then(() => runRootInit(this, root, task));
    registry.set(root, task);
    return awaitPendingInit(this, root, task);
  }
  /** 连接一个服务器（in-flight 去重；失败后台重连）。
   * @param opts.force 用户显式连接（浮窗「连接」/切回前台恢复）时 true：忽略
   *  entry 当前状态（含半开卡在 connected 的死连接），总是受控重建；惰性/重试
   *  路径缺省 false，保持「已 connected 则短路」防重复建连。
   */
  async ensureConnected(root, serverName, opts = {}) {
    const unit = this.units.get(root);
    if (unit === void 0)
      return;
    if (unit.userDisabled.has(serverName))
      return;
    const existing = unit.inFlight.get(serverName);
    if (existing !== void 0)
      return existing;
    const promise = Promise.resolve().then(() => {
      if (this.units.get(root) !== unit || unit.inFlight.get(serverName) !== promise)
        return;
      return this.connectInternal(root, serverName, opts);
    });
    unit.inFlight.set(serverName, promise);
    try {
      await promise;
    } finally {
      if (unit.inFlight.get(serverName) === promise)
        unit.inFlight.delete(serverName);
    }
  }
  /** 废弃某服务器跨全部单元的在途建连标记。
   *  不变式：in-flight 去重只对「存活 entry 的重复建连」有意义——entry 被强制
   *  拆除（remove/update/disconnect）时，同名旧 attempt 可能仍 pending（装载等待窗口
   *  在预算内不返回），残留标记会把后续 ensureConnected（含 force 的用户显式「连接」）
   *  全部吞掉，且旧 attempt 收敛时命中让位/disposed 守卫静默返回、无人补连 → 这段时间内
   *  该服务器无法重连。拆除时必须同步废弃标记；旧 attempt 稍后收敛由 connectInternal
   *  的让位/disposed 守卫兜底，无副作用。 */
  abandonInFlight(serverName) {
    for (const unit of this.units.values())
      unit.inFlight.delete(serverName);
  }
  async connectInternal(root, serverName, opts = {}) {
    const unit = this.units.get(root);
    if (unit === void 0)
      return;
    const attempt = unit.inFlight.get(serverName);
    const stillCurrent = () => this.units.get(root) === unit && unit.inFlight.get(serverName) === attempt && !unit.userDisabled.has(serverName);
    const force = opts.force === true;
    const { lifecycle } = runtimePorts.get();
    const entry = unit.connections.get(serverName);
    if (shortCircuitsOnState(this.statusOf(root, serverName), force))
      return;
    const servers = await this.host.projectServersFor(root);
    const server = connectableServer(servers, serverName);
    if (server === void 0 || !stillCurrent())
      return;
    await disposePreviousGeneration(entry, (id) => lifecycle.disposeServer(id));
    if (!stillCurrent())
      return;
    const freshServers = await this.host.projectServersFor(root);
    const freshServer = connectableServer(freshServers, serverName);
    if (freshServer === void 0 || !stillCurrent())
      return;
    if (connectWrappedServer(unit, root, serverName, freshServer, this.host))
      return;
    await mountRemoteServer(unit, root, serverName, freshServer, entry, this.mountFaces());
  }
  /**
   * 装载面：注册面视图 / 工具元信息 / 脱敏都是本类方法的转发，形状与调用点无关——
   * 建连结算与 #1014 B7b 的重投影共用同一份，故抽成一处。
   */
  mountFaces() {
    return {
      host: this.host,
      registeredSchemas: () => this.registeredSchemas(),
      registeredToolMeta: (id) => this.registeredToolMeta(id),
      redact: (error) => this.redact(error)
    };
  }
  /**
   * 重投影全部在册连接的目录（#1014 B7b）：tools/change 的失效消费口。
   *
   * 为什么按 server diff 而不是无脑全刷：宿主 tools/change **无载荷**（原话「故意不做作用域
   * 过滤」），且本包 visibility 的 restrict 自身也会发它——无条件全刷会把连接翻转期的
   * 事件密度直接转成落盘密度。故这里扫一遍注册面、按 `mcp__<id>__` 前缀与现有目录条目逐台
   * 比对，只对**确实变了**的 server 登记失效并重投影。
   *
   * 「变了」的判定是**内容指纹**（裸名 + description + inputSchema）相等性：目录条目丢过
   * unavailable 的一律视为变了（它已经不是可信快照，得靠一次成功投影重建）。
   *
   * 并发语义（复核后定为**不做在途合并**）：宿主 tools/change 无载荷、无序列化，且本包
   * visibility 的 restrict 自身也发它，一次变更至少两次并发进来。实测过「在途合并」——它
   * 挡不住本场景（首次调用在第一个 await 之前已同步写完目录，第二次是被内容比对挡下的），
   * 且引入了更坏的后果：在途期间内容再变时，第二次被静默跳过又无补偿事件，目录会**一直**
   * 停在旧内容直到下一次变化或 TTL 到期。丢更新比「两次落盘可能乱序」更难自愈，故不做合并。
   * 残留：两次并发投影的落盘可能乱序，磁盘 last-good 短暂落后于内存态；内存态是权威读面，
   * 且下一次投影会覆盖落盘，故按可自愈的已知残留登记，不另加状态面。
   */
  async reprojectCatalogs() {
    const { catalog } = runtimePorts.get();
    const schemas = this.registeredSchemas();
    for (const [root, unit] of this.units) {
      for (const [serverName, entry] of unit.connections) {
        const id = entry.id;
        if (id === void 0 || entry.disposed)
          continue;
        const current = catalog.catalogDirectory.entryFor(root, serverName);
        const live = liveSignature(schemas, id);
        if (!shouldReproject(current?.tools, current?.unavailable !== void 0, currentSignature(current), live)) {
          continue;
        }
        catalog.catalogDirectory.markDirty(root, serverName);
        await projectConnectedCatalog(root, serverName, id, this.mountFaces());
      }
    }
  }
  /**
   * 注册面读口：取不到/非数组一律当空——投影与六态投影都不许因为读不到注册表而阻塞。
   * 视图本身是宿主能力（入参契约），本层现取后按值递给 catalog 域的投影与读口。
   */
  registeredSchemas() {
    const tools = this.host.ctx.tools;
    if (tools === void 0 || typeof tools.schemas !== "function")
      return [];
    try {
      const schemas = tools.schemas();
      return Array.isArray(schemas) ? schemas : [];
    } catch {
      return [];
    }
  }
  /** 注册面 → 注册名→描述 表（B 层摘要缓存的数据源；与目录投影同一次前缀过滤口径）。 */
  registeredToolMeta(id) {
    const prefix = `mcp__${id}__`;
    const meta = /* @__PURE__ */ new Map();
    for (const schema of this.registeredSchemas()) {
      const name2 = schema?.name;
      if (typeof name2 !== "string" || !name2.startsWith(prefix))
        continue;
      meta.set(name2, {
        description: typeof schema.description === "string" ? schema.description : ""
      });
    }
    return meta;
  }
  /** 凭据脱敏（连接/发现/调用错误路径统一使用；#770-8 经宿主全集快照，与 manager/dispatch 同源）。 */
  redact(error) {
    return runtimePorts.get().pipeline.createRedactor([...this.host.redactionServers()])(error);
  }
  /**
   * 读时刷新的六态投影（裁定 U）：域外读点（manager.summarize）与重建短路都从这里取状态，
   * 不再直接读 `entry.status`。为什么必须刷新：官方不暴露状态 API，而「曾连上、工具前缀消失」
   * 只在读的这一刻才可判——不重算，GUI 会永远停在陈旧的 connected（设计 §3.1/§3.3）。
   */
  statusOf(root, serverName) {
    const unit = this.units.get(root);
    const entry = unit?.connections.get(serverName);
    if (unit === void 0 || entry === void 0)
      return void 0;
    if (Array.isArray(entry.server.toolDefinitions)) {
      const state2 = virtualUnitState(entry, unit.userDisabled.has(serverName));
      entry.status = state2;
      return state2;
    }
    const { lifecycle } = runtimePorts.get();
    const state = lifecycle.projectServerState(entry.id ?? "", {
      enabled: entry.server.enabled !== false,
      userDisabled: unit.userDisabled.has(serverName),
      tornDown: entry.disposed,
      disposed: entry.handle?.disposed === true,
      // 条目落进 connections 就等于「我方已发起 mount」（远程分支唯一的创建点）。不用
      // entry.id 当判据：id 要等装载窗口结算才回得来，拿它判会让整个窗口期投影成 stopped，
      // 且 connecting 永远不可达——而窗口期的正确状态就是 connecting。
      mountStarted: true,
      readySettled: entry.readySettled,
      // 窗口在途且已判废才算过期：常规路径下 readySettled 会在写回状态前为真。
      windowExpired: entry.status === "failed" && !entry.readySettled,
      everConnected: entry.everConnected,
      reconnectEnabled: entry.server.reconnect?.enabled !== false,
      hasTools: (id) => runtimePorts.get().catalog.catalogDirectory.hasRegisteredTools(this.registeredSchemas(), id)
    });
    entry.status = state;
    return state;
  }
  /**
   * health 顶层 `tools` 计数的聚合读口（#767 笔 1a）：该 (root, server) 目录投影里的
   * 工具条数。与 `summary().tools` / 目录读口同源（裸名条数即注册名条数）。
   */
  toolCountOf(root, serverName) {
    return runtimePorts.get().catalog.catalogDirectory.entryFor(root, serverName)?.tools.size ?? 0;
  }
  /**
   * 执行 ws_mcp_call。本片（#767 S1-3a）起只是转发壳：路由校验、策略裁决、两条执行分支与
   * 结果投影在 servers/dispatch 域（impl/call 的 executeMcpCall），中间层仍持有单元表、
   * 策略与**转发登记表**，经显式入参按引用递入——不落第二份事实源。脱敏源不由本类持有，
   * 经宿主 redactionServers 快照转供（#770-8，与 manager.redactError 同一秘密源）。
   *
   * @param identity 调用方身份（`ToolRunContext` 里 dispatch 真正需要的字段）。为什么不是
   *   单个 agent：转发改道后 dispatch 要合成子调用 id 并透传 parent（裁定 R/Y/Z），而
   *   `parent` 同时是「这次调用出自我方转发」的标识——guard 只放行同时登记过的发起者。
   */
  async callTool(fullName, toolRaw, rawArgs, signal, identity) {
    const { dispatch, pipeline, workspace, catalog: catalogPort } = runtimePorts.get();
    const catalogRoot = workspace.parseFullServerName(fullName)?.root;
    const registeredNameFor = (id, tool) => publicToolName(id, tool);
    const parent = identity.parent;
    const agent = dispatch.nestedExecutionAgent(identity.agent);
    const execute = (input) => dispatch.executeNestedTool(this.host.ctx, input, {
      ...identity,
      isParentActive: () => parent !== void 0 && this.forwarding.has(parent)
    });
    if (parent !== void 0)
      this.forwarding.add(parent);
    try {
      return await dispatch.executeMcpCall({
        fullName,
        toolRaw,
        rawArgs,
        signal,
        agent,
        callId: identity.callId,
        ...identity.rootCallId === void 0 ? {} : { rootCallId: identity.rootCallId },
        ...parent === void 0 ? {} : { parent },
        toolSet: identity.toolSet,
        forwarding: this.forwarding,
        registeredNameFor,
        execute,
        units: this.units,
        // 目录条目读口：本层持 catalog 域读口，dispatch 不引该域门面（免多一条跨模块边）。
        catalogEntryFor: (serverName) => catalogRoot === void 0 ? void 0 : catalogPort.catalogDirectory.entryFor(catalogRoot, serverName),
        allServers: () => this.host.redactionServers(),
        disabledTools: this.disabledTools,
        catalogTtlMs: CATALOG_TTL_MS,
        defaultCallTimeoutMs: DEFAULT_TOOL_CALL_TIMEOUT_MS,
        pipeline,
        workspace
      });
    } finally {
      if (parent !== void 0)
        this.forwarding.delete(parent);
    }
  }
  /**
   * 拆掉一个 (root, server) 的连接（裁定 X）：换引擎后**账本化拆除的唯一落点**，
   * disconnect / remove / update / unregister / evict / 插件卸载共用。
   *
   * 只**发起** release、不等结算（裁定 V）：拆除是同步语义，而官方 dispose 会等在途首连
   * （挂死的服务器能等到 SDK 的 60s）；要等结算的重建路径走 connectInternal 的 disposeServer。
   *
   * @returns 是否真的拆掉了在册条目（调用方据此决定要不要广播状态）。
   */
  releaseConnection(root, serverName) {
    const unit = this.units.get(root);
    const entry = unit?.connections.get(serverName);
    if (unit === void 0 || entry === void 0)
      return false;
    entry.disposed = true;
    const id = entry.id ?? entry.pendingMount?.id;
    if (id !== void 0) {
      if (entry.pendingMount !== void 0)
        entry.pendingMount.released = true;
      runtimePorts.get().lifecycle.releaseServer(id);
    }
    unit.connections.delete(serverName);
    return true;
  }
  /** LRU 淘汰：无活动引用（lastTouchedAt 最旧）且超过上限时淘汰最旧单元。
   * @global 单元豁免（#382 F3）：全局服务器常连语义不随多项目切换被淘汰
   * （supervisor 时代全局永不淘汰，池接管后需显式豁免保持等价语义）。 */
  evictIfNeeded(maxUnits = 16) {
    while (this.units.size > maxUnits) {
      let oldestKey;
      let oldestAt = Infinity;
      for (const [root, unit] of this.units) {
        if (root === MIDDLEWARE_GLOBAL_ROOT)
          continue;
        if (unit.lastTouchedAt < oldestAt) {
          oldestAt = unit.lastTouchedAt;
          oldestKey = root;
        }
      }
      if (oldestKey === void 0)
        break;
      this.teardownUnit(oldestKey);
    }
  }
  /** 拆毁一个单元（逐条走账本拆除，保留目录缓存）。 */
  teardownUnit(root) {
    cancelPendingInit(this, root);
    const unit = this.units.get(root);
    if (unit === void 0)
      return;
    for (const serverName of [...unit.connections.keys()]) {
      this.releaseConnection(root, serverName);
    }
    unit.connections.clear();
    runtimePorts.get().catalog.catalogDirectory.dropRoot(root);
    this.units.delete(root);
  }
  /** 全部拆毁（插件卸载）。保持同步体：组合根的卸载链依赖这里同步摘账。 */
  async dispose() {
    for (const root of [...this.units.keys()])
      this.teardownUnit(root);
    const registry = pendingRootInits.get(this);
    if (registry !== void 0) {
      for (const root of [...registry.keys()])
        cancelPendingInit(this, root);
    }
    this.units.clear();
  }
};
function liveSignature(schemas, id) {
  const prefix = `mcp__${id}__`;
  const parts = [];
  for (const schema of schemas) {
    const name2 = schema?.name;
    if (typeof name2 !== "string" || !name2.startsWith(prefix))
      continue;
    const description = typeof schema.description === "string" ? schema.description : "";
    const parameters = JSON.stringify(schema.parameters ?? {});
    parts.push(`${name2.slice(prefix.length)}\0${description}\0${parameters}`);
  }
  parts.sort();
  return parts.join("");
}
function shouldReproject(currentTools, hasUnavailable, currentSignature2, liveSignatureText) {
  if (currentTools === void 0 || hasUnavailable)
    return true;
  return currentSignature2 !== liveSignatureText;
}
function currentSignature(entry) {
  if (entry === void 0)
    return "";
  const parts = [];
  for (const [name2, tool] of entry.tools) {
    const value = tool;
    const description = typeof value.description === "string" ? value.description : "";
    parts.push(`${name2}\0${description}\0${JSON.stringify(value.inputSchema ?? {})}`);
  }
  parts.sort();
  return parts.join("");
}

// lib/server/connection/runtime/interface.js
function installRuntime(deps) {
  runtimePorts.install(deps);
}
function releaseRuntime() {
  runtimePorts.release();
}

// lib/server/stats/interface.js
var interface_exports7 = {};
__export(interface_exports7, {
  McpStatsCollector: () => McpStatsCollector,
  defaultStatsPath: () => defaultStatsPath
});

// lib/server/stats/impl/collector.js
import { createHash as createHash3, randomBytes as randomBytes4 } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync, renameSync, existsSync as existsSync4, readFileSync } from "node:fs";
import { dirname as dirname5, resolve } from "node:path";
var EMPTY_SEARCH_BUCKET = "<empty>";
var SEARCH_BUCKET_PREFIX = "h:";
var SEARCH_BUCKET_HASH_LENGTH = 12;
function searchBucket(query) {
  const trimmed = query.trim();
  if (trimmed === "")
    return EMPTY_SEARCH_BUCKET;
  return SEARCH_BUCKET_PREFIX + createHash3("sha256").update(trimmed).digest("hex").slice(0, SEARCH_BUCKET_HASH_LENGTH);
}
function isSearchBucketKey(key) {
  return key === EMPTY_SEARCH_BUCKET || /^h:[0-9a-f]{12}$/.test(key);
}
function onlySearchBuckets(raw) {
  if (raw === null || typeof raw !== "object")
    return {};
  const kept = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!isSearchBucketKey(key))
      continue;
    if (typeof value !== "number" || !Number.isFinite(value))
      continue;
    kept[key] = value;
  }
  return kept;
}
function defaultStatsPath() {
  return statsFile();
}
function mkdirOptionsFor(dir) {
  try {
    const mode = directoryMode(dir);
    return mode === null ? { recursive: true } : { recursive: true, mode };
  } catch {
    return { recursive: true };
  }
}
function writeOptionsFor(file) {
  try {
    const mode = fileMode(file);
    return mode === null ? { encoding: "utf8" } : { encoding: "utf8", mode };
  } catch {
    return { encoding: "utf8" };
  }
}
function restoreServerSnapshot(target, servers) {
  if (servers === void 0 || servers === null || typeof servers !== "object")
    return;
  for (const [sName, sVal] of Object.entries(servers)) {
    target.set(sName, {
      totalCalls: sVal.totalCalls ?? 0,
      successCalls: sVal.successCalls ?? 0,
      failedCalls: sVal.failedCalls ?? 0,
      tools: restoreToolMetrics(sVal.tools)
    });
  }
}
function restoreToolMetrics(tools) {
  const toolsMap = /* @__PURE__ */ new Map();
  if (typeof tools !== "object" || tools === null)
    return toolsMap;
  for (const [tName, tVal] of Object.entries(tools)) {
    toolsMap.set(tName, { ...tVal });
  }
  return toolsMap;
}
function serverBucketFor(servers, server) {
  const found = servers.get(server);
  if (found !== void 0)
    return found;
  const created = {
    totalCalls: 0,
    successCalls: 0,
    failedCalls: 0,
    tools: /* @__PURE__ */ new Map()
  };
  servers.set(server, created);
  return created;
}
function toolMetricFor(bucket, tool) {
  const found = bucket.tools.get(tool);
  if (found !== void 0)
    return found;
  const created = {
    calls: 0,
    success: 0,
    errors: 0,
    totalDurationMs: 0,
    avgDurationMs: 0,
    maxDurationMs: 0
  };
  bucket.tools.set(tool, created);
  return created;
}
var McpStatsCollector = class {
  enabled = false;
  filePath = defaultStatsPath();
  logger;
  startedAt = (/* @__PURE__ */ new Date()).toISOString();
  updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  servers = /* @__PURE__ */ new Map();
  disclosure = {
    searches: {},
    lists: {},
    details: {}
  };
  flushTimer;
  isDirty = false;
  constructor(options) {
    if (options?.enabled !== void 0)
      this.enabled = options.enabled;
    if (options?.filePath)
      this.filePath = resolve(options.filePath);
    this.logger = options?.logger;
    if (this.enabled) {
      this.loadExisting();
    }
  }
  /** 更新运行配置（热重载 / 设置同步）。 */
  configure(options) {
    const prevEnabled = this.enabled;
    const nextEnabled = options.enabled ?? prevEnabled;
    if (options.filePath)
      this.filePath = resolve(options.filePath);
    if (options.logger)
      this.logger = options.logger;
    if (prevEnabled && !nextEnabled) {
      this.flushSync();
      this.enabled = false;
    } else {
      this.enabled = nextEnabled;
      if (nextEnabled && !prevEnabled) {
        this.loadExisting();
      }
    }
  }
  isEnabled() {
    return this.enabled;
  }
  /**
   * 从现有磁盘文件加载既有计数（避免进程重启后归零）。同步读保持：构造器 +
   * `configure` 是同步契约，file-io 只有异步读（`readJsonFile`），此处不可调；
   * 语义（缺失/损坏/目录 → 忽略重计）与 `readJsonFile` 的 null 回落同族。
   */
  loadExisting() {
    try {
      if (!existsSync4(this.filePath))
        return;
      const raw = readFileSync(this.filePath, "utf8");
      const data = JSON.parse(raw);
      if (data && typeof data === "object") {
        if (data.startedAt)
          this.startedAt = data.startedAt;
        restoreServerSnapshot(this.servers, data.servers);
        if (data.disclosure && typeof data.disclosure === "object") {
          this.disclosure.searches = onlySearchBuckets(data.disclosure.searches);
          this.disclosure.lists = { ...data.disclosure.lists };
          this.disclosure.details = { ...data.disclosure.details };
        }
      }
    } catch {
    }
  }
  /** 记录工具调用（ws_mcp_call 或直呼工具）。 */
  recordCall(server, tool, durationMs, success, errorMsg) {
    if (!this.enabled)
      return;
    this.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    const s = serverBucketFor(this.servers, server);
    s.totalCalls += 1;
    if (success) {
      s.successCalls += 1;
    } else {
      s.failedCalls += 1;
    }
    const t = toolMetricFor(s, tool);
    t.calls += 1;
    if (success) {
      t.success += 1;
    } else {
      t.errors += 1;
      if (errorMsg)
        t.lastError = errorMsg.slice(0, 200);
    }
    t.totalDurationMs += durationMs;
    t.avgDurationMs = Math.round(t.totalDurationMs / t.calls);
    if (durationMs > t.maxDurationMs)
      t.maxDurationMs = durationMs;
    t.lastCalledAt = this.updatedAt;
    const status = success ? "ok" : "fail";
    this.logger?.info?.(`[mcp:stats] ${server}/${tool} - ${durationMs}ms - ${status} (total: ${t.calls})`);
    this.scheduleFlush();
  }
  /** 记录渐进式披露漏斗：ws_mcp_search 搜索词。 */
  recordSearch(query) {
    if (!this.enabled)
      return;
    const bucket = searchBucket(query);
    this.disclosure.searches[bucket] = (this.disclosure.searches[bucket] ?? 0) + 1;
    this.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.scheduleFlush();
  }
  /** 记录渐进式披露漏斗：ws_mcp_list 查询过滤项。 */
  recordList(serverFilter) {
    if (!this.enabled)
      return;
    const f = (serverFilter ?? "").trim() === "" ? "<all>" : (serverFilter ?? "").trim().slice(0, 100);
    this.disclosure.lists[f] = (this.disclosure.lists[f] ?? 0) + 1;
    this.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.scheduleFlush();
  }
  /** 记录渐进式披露漏斗：ws_mcp_detail 查询。 */
  recordDetail(server, tool) {
    if (!this.enabled)
      return;
    const key = `${server}/${tool}`;
    this.disclosure.details[key] = (this.disclosure.details[key] ?? 0) + 1;
    this.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.scheduleFlush();
  }
  /** 导出当前快照（只读数据对象）。 */
  snapshot() {
    const serversObj = {};
    for (const [sName, sVal] of this.servers) {
      const toolsObj = {};
      for (const [tName, tVal] of sVal.tools) {
        toolsObj[tName] = { ...tVal };
      }
      serversObj[sName] = {
        totalCalls: sVal.totalCalls,
        successCalls: sVal.successCalls,
        failedCalls: sVal.failedCalls,
        tools: toolsObj
      };
    }
    return {
      startedAt: this.startedAt,
      updatedAt: this.updatedAt,
      servers: serversObj,
      disclosure: {
        searches: { ...this.disclosure.searches },
        lists: { ...this.disclosure.lists },
        details: { ...this.disclosure.details }
      }
    };
  }
  scheduleFlush() {
    this.isDirty = true;
    if (this.flushTimer !== void 0)
      return;
    this.flushTimer = setTimeout(() => {
      this.flushTimer = void 0;
      this.flushSync();
    }, 1e3);
    this.flushTimer.unref?.();
  }
  /**
   * 同步原子落盘（临时文件 + 重命名）。S2-C 等价接入（同步安全形态）：mode 经
   * 登记表取（`writeOptionsFor`/`mkdirOptionsFor`，S2-A 口径），未登记回落既有形状。
   * **不**改调异步 `writeFileAtomic`：同步契约（构造器/`flushSync` 直写断言/B2 关闭刷盘/
   * `manager.dispose` 的 fire-and-forget 链）要求返回时盘上已有数据；异步化会把
   * 「退出刷新」变成不可靠的后台写。序列化形状（`snapshot()` + 2 空格）逐字节不变。
   */
  flushSync() {
    if (!this.isDirty || !this.enabled)
      return;
    try {
      const dir = dirname5(this.filePath);
      if (!existsSync4(dir)) {
        mkdirSync(dir, mkdirOptionsFor(dir));
      }
      const data = JSON.stringify(this.snapshot(), null, 2);
      const tmpPath = `${this.filePath}.tmp.${process.pid}.${Date.now().toString(36)}.${randomBytes4(6).toString("hex")}.tmp`;
      try {
        writeFileSync(tmpPath, data, writeOptionsFor(this.filePath));
        renameSync(tmpPath, this.filePath);
      } catch (writeError) {
        try {
          rmSync(tmpPath, { force: true });
        } catch {
        }
        throw writeError;
      }
      this.isDirty = false;
    } catch (err) {
      this.logger?.info?.(`[mcp:stats] flush to ${this.filePath} failed: ${String(err)}`);
    }
  }
  /** 销毁清理。 */
  dispose() {
    if (this.flushTimer !== void 0) {
      clearTimeout(this.flushTimer);
      this.flushTimer = void 0;
    }
    this.flushSync();
  }
};

// lib/server/store/interface.js
var interface_exports8 = {};
__export(interface_exports8, {
  McpStore: () => McpStore,
  catalogCacheFileFor: () => catalogCacheFileFor,
  defaultStorePath: () => defaultStorePath,
  loadDisabledTools: () => loadDisabledTools,
  loadUserState: () => loadUserState,
  parseDisabledTools: () => parseDisabledTools,
  readCatalogServerFromDisk: () => readCatalogServerFromDisk,
  saveDisabledTools: () => saveDisabledTools,
  saveUserState: () => saveUserState,
  userStateFile: () => userStateFile
});

// lib/server/store/impl/store.js
import { randomBytes as randomBytes5 } from "node:crypto";
import { mkdir as mkdir4, readFile as readFile3, rename as rename4, rm as rm4, stat, writeFile as writeFile4 } from "node:fs/promises";
import { existsSync as existsSync5 } from "node:fs";
import { dirname as dirname6 } from "node:path";
var saveChains = /* @__PURE__ */ new Map();
var windowsRenameRetryDelays = [50, 100, 150, 200, 250];
function isRetryableWindowsRenameError(error) {
  if (process.platform !== "win32" || typeof error !== "object" || error === null)
    return false;
  const code = error.code;
  return code === "EPERM" || code === "EBUSY";
}
function externalModificationError(path) {
  return new Error(`dsh-mcp-manager: 配置文件在外部被修改（${path}），本次写入已中止以防覆盖；请重载后重试`);
}
function wait(milliseconds) {
  return new Promise((resolve4) => setTimeout(resolve4, milliseconds));
}
function temporaryNameFor2(path) {
  return `${path}.tmp.${process.pid}.${Date.now().toString(36)}.${randomBytes5(6).toString("hex")}.tmp`;
}
function defaultStorePath() {
  return configFile();
}
var McpStore = class {
  path;
  data;
  /** 上次读/写时的文件 mtime；undefined = 从未建立基线，0 = 当前文件不存在。 */
  mtimeMs;
  /** 上次读/写时的文件全文快照（同毫秒 mtime 漏检的第二道锁，#903 M3-store）；null = 无文件内容基线。 */
  snapshot = null;
  constructor(path) {
    this.path = path;
    this.data = { version: 1, servers: [] };
    this.mtimeMs = void 0;
  }
  async load() {
    if (!existsSync5(this.path)) {
      this.data = { version: 1, servers: [] };
      this.mtimeMs = 0;
      this.snapshot = null;
      return;
    }
    try {
      const raw = await readFile3(this.path, "utf8");
      const parsed = JSON.parse(raw);
      this.data.servers = Array.isArray(parsed.servers) ? parsed.servers : [];
      this.mtimeMs = (await stat(this.path)).mtimeMs;
      this.snapshot = raw;
    } catch {
      try {
        this.mtimeMs = (await stat(this.path)).mtimeMs;
      } catch {
        this.mtimeMs = 0;
      }
    }
  }
  async save() {
    const previous = saveChains.get(this.path) ?? Promise.resolve();
    const next = previous.then(() => this.writeSnapshot(), () => this.writeSnapshot());
    saveChains.set(this.path, next);
    try {
      await next;
    } finally {
      if (saveChains.get(this.path) === next)
        saveChains.delete(this.path);
    }
  }
  async renameWithRetry(tmp, baseline) {
    for (let retry = 0; ; retry += 1) {
      try {
        await rename4(tmp, this.path);
        return;
      } catch (error) {
        if (!isRetryableWindowsRenameError(error) || retry >= windowsRenameRetryDelays.length) {
          throw error;
        }
        await wait(windowsRenameRetryDelays[retry]);
        if (await this.changedSince(baseline.mtimeMs, baseline.snapshot)) {
          throw externalModificationError(this.path);
        }
      }
    }
  }
  /** 单次落盘：链内写前冲突检查（fail-closed）+ 唯一 tmp 名 + 失败清理后上抛原错误。 */
  async writeSnapshot() {
    const baseline = { mtimeMs: this.mtimeMs, snapshot: this.snapshot };
    const payload = JSON.stringify(this.data, null, 2);
    if (await this.changedSince(baseline.mtimeMs, baseline.snapshot)) {
      throw externalModificationError(this.path);
    }
    const dir = dirname6(this.path);
    if (!existsSync5(dir))
      await mkdir4(dir, { recursive: true });
    let mode;
    try {
      mode = fileMode(this.path);
    } catch {
      mode = 384;
    }
    const tmp = temporaryNameFor2(this.path);
    try {
      await writeFile4(tmp, payload, mode === null ? { encoding: "utf8" } : { encoding: "utf8", mode });
      await this.renameWithRetry(tmp, baseline);
    } catch (error) {
      try {
        await rm4(tmp, { force: true });
      } catch {
      }
      throw error;
    }
    try {
      this.mtimeMs = (await stat(this.path)).mtimeMs;
    } catch {
      this.mtimeMs = 0;
    }
    this.snapshot = payload;
  }
  /** 磁盘文件是否已被外部修改（mtime 不等即变更；mtime 相等再比全文快照，防同毫秒漏检；无基线不视为变更）。 */
  async changedOnDisk() {
    return this.changedSince(this.mtimeMs, this.snapshot);
  }
  async changedSince(mtimeMs, snapshot) {
    if (mtimeMs === void 0)
      return false;
    let current;
    try {
      current = (await stat(this.path)).mtimeMs;
    } catch {
      current = 0;
    }
    if (current !== mtimeMs)
      return true;
    if (snapshot === null)
      return false;
    try {
      return await readFile3(this.path, "utf8") !== snapshot;
    } catch {
      return true;
    }
  }
  /** 外部变更时重读；返回是否发生了重读。 */
  async reloadIfChanged() {
    if (!await this.changedOnDisk())
      return false;
    await this.load();
    return true;
  }
  find(name2) {
    return this.data.servers.find((server) => server.name === name2);
  }
  upsert(server) {
    const index = this.data.servers.findIndex((entry) => entry.name === server.name);
    if (index >= 0)
      this.data.servers[index] = server;
    else
      this.data.servers.push(server);
  }
  remove(name2) {
    const index = this.data.servers.findIndex((entry) => entry.name === name2);
    if (index >= 0)
      this.data.servers.splice(index, 1);
  }
};

// lib/server/store/impl/middleware-state.js
import { createHash as createHash4, randomBytes as randomBytes6 } from "node:crypto";
import { mkdir as mkdir5, rename as rename5, rm as rm5, writeFile as writeFile5 } from "node:fs/promises";
import { existsSync as existsSync6 } from "node:fs";
import { dirname as dirname7, resolve as resolve2 } from "node:path";
var stateTransactions = /* @__PURE__ */ new Map();
function enqueueStateTransaction(file, task) {
  const key = resolve2(file);
  const previous = stateTransactions.get(key) ?? Promise.resolve();
  const current = previous.then(task, task);
  stateTransactions.set(key, current);
  return current.finally(() => {
    if (stateTransactions.get(key) === current)
      stateTransactions.delete(key);
  });
}
async function writeStateFile(file, data) {
  let registered = true;
  try {
    fileMode(file);
  } catch {
    registered = false;
  }
  if (registered) {
    await writeFileAtomic(file, data);
    return;
  }
  const dir = dirname7(file);
  if (!existsSync6(dir))
    await mkdir5(dir, { recursive: true });
  const tmp = `${file}.${process.pid}.${Date.now().toString(36)}.${randomBytes6(6).toString("hex")}.tmp`;
  try {
    await writeFile5(tmp, data, "utf8");
    await rename5(tmp, file);
  } catch (cause) {
    await rm5(tmp, { force: true }).catch(() => void 0);
    throw cause;
  }
}
function userStateFile() {
  return userStatePath();
}
async function loadUserState(file) {
  const out = /* @__PURE__ */ new Map();
  try {
    const parsed = await readJsonFile(file);
    if (parsed && typeof parsed === "object" && typeof parsed.disabled === "object" && parsed.disabled !== null) {
      for (const [root, names] of Object.entries(parsed.disabled)) {
        if (Array.isArray(names))
          out.set(root, new Set(names.filter((name2) => typeof name2 === "string")));
      }
    }
  } catch {
  }
  return out;
}
async function otherKeyOf(file, key) {
  try {
    const parsed = await readJsonFile(file);
    if (parsed && typeof parsed === "object")
      return parsed[key];
  } catch {
  }
  return void 0;
}
async function saveUserState(file, units) {
  const snapshot = new Map([...units].map(([root, unit]) => [root, new Set(unit.userDisabled)]));
  await enqueueStateTransaction(file, () => saveUserStateSnapshot(file, snapshot));
}
async function saveUserStateSnapshot(file, units) {
  const merged = await loadUserState(file);
  for (const [root, disabled2] of units) {
    if (disabled2.size > 0)
      merged.set(root, disabled2);
    else
      merged.delete(root);
  }
  const disabled = {};
  for (const [root, names] of merged) {
    if (names.size > 0)
      disabled[root] = [...names].sort();
  }
  const kept = await otherKeyOf(file, "disabledTools");
  try {
    await writeStateFile(file, JSON.stringify({ version: 1, disabled, ...kept !== void 0 ? { disabledTools: kept } : {} }, null, 2));
  } catch {
  }
}
function catalogCacheFileFor(root) {
  const hash = createHash4("sha256").update(root).digest("hex").slice(0, 16);
  return catalogFile(hash);
}
function cleanPersistedTools(tools) {
  const out = [];
  if (!Array.isArray(tools))
    return out;
  for (const tool of tools) {
    const toolRec = tool;
    if (typeof toolRec !== "object" || toolRec === null || typeof toolRec.name !== "string")
      continue;
    out.push({
      name: toolRec.name,
      description: typeof toolRec.description === "string" ? toolRec.description : ""
    });
  }
  return out;
}
async function readCatalogServerFromDisk(file, serverName) {
  try {
    const parsed = await readJsonFile(file);
    const entry = locatePersistedEntry(parsed, serverName);
    if (!isPersistedRecord(entry))
      return void 0;
    const rec = entry;
    return {
      discoveredAt: typeof rec.discoveredAt === "number" ? rec.discoveredAt : 0,
      tools: cleanPersistedTools(rec.tools)
    };
  } catch {
    return void 0;
  }
}
function isPersistedRecord(value) {
  return typeof value === "object" && value !== null;
}
function locatePersistedEntry(parsed, serverName) {
  if (!isPersistedRecord(parsed))
    return void 0;
  const entries = parsed.entries;
  if (!isPersistedRecord(entries))
    return void 0;
  return entries[serverName];
}
function parseDisabledTools(raw) {
  const out = /* @__PURE__ */ new Map();
  if (typeof raw !== "object" || raw === null)
    return out;
  for (const [root, servers] of Object.entries(raw)) {
    if (typeof servers !== "object" || servers === null)
      continue;
    const serverMap = /* @__PURE__ */ new Map();
    for (const [server, tools] of Object.entries(servers)) {
      if (!Array.isArray(tools))
        continue;
      const set = new Set(tools.filter((tool) => typeof tool === "string" && tool !== ""));
      if (set.size > 0)
        serverMap.set(server, set);
    }
    if (serverMap.size > 0)
      out.set(root, serverMap);
  }
  return out;
}
async function loadDisabledTools(file) {
  try {
    const parsed = await readJsonFile(file);
    return parseDisabledTools(parsed?.disabledTools);
  } catch {
    return /* @__PURE__ */ new Map();
  }
}
async function saveDisabledTools(file, disabledTools) {
  const payload = {};
  for (const [root, servers] of disabledTools) {
    const serverRec = {};
    for (const [server, tools] of servers) {
      if (tools.size > 0)
        serverRec[server] = [...tools].sort();
    }
    if (Object.keys(serverRec).length > 0)
      payload[root] = serverRec;
  }
  await enqueueStateTransaction(file, () => saveDisabledToolsSnapshot(file, payload));
}
async function saveDisabledToolsSnapshot(file, payload) {
  const kept = await otherKeyOf(file, "disabled");
  try {
    await writeStateFile(file, JSON.stringify({ version: 1, disabledTools: payload, ...kept !== void 0 ? { disabled: kept } : {} }, null, 2));
  } catch {
  }
}

// lib/server/inject/impl/service/index.js
var InjectPorts = class {
  /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
  deps;
  /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
  install(deps) {
    if (this.deps !== void 0)
      throw new Error("dsh-mcp-manager: inject 域只能装配一次");
    this.deps = deps;
  }
  /** 卸载：只复位装配标记，本域没有别的活资源要释放。 */
  release() {
    this.deps = void 0;
  }
  /**
   * 域内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成行为
   * 正常但参数不对（检索族与策略裁决静默换实现），症状与本插件毫无字面关联。
   */
  get() {
    const deps = this.deps;
    if (deps === void 0) {
      throw new Error("dsh-mcp-manager: inject 域未装配——组合根未在入口调用 installInject（src/index.ts）");
    }
    return deps;
  }
};
var injectPorts = new InjectPorts();

// lib/server/inject/impl/image-admission/index.js
var IMAGE_MEDIA_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
var CANONICAL_BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
function recordOf(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function stringOf(value) {
  return typeof value === "string" && value !== "" ? value : void 0;
}
function isRemoteImageBlock(block) {
  const rec = recordOf(block);
  return rec !== void 0 && rec.type === "image" && typeof rec.data === "string";
}
function containsRemoteImage(content) {
  return content.some(isRemoteImageBlock);
}
function resolveRoute(agent) {
  const agentRecord = recordOf(agent);
  const session = recordOf(agentRecord?.session);
  const routedConfig = routedConfigOf(session);
  const options = recordOf(agentRecord?.options);
  return {
    provider: stringOf(routedConfig?.provider) ?? stringOf(options?.provider),
    model: stringOf(routedConfig?.model) ?? stringOf(options?.model)
  };
}
function isCallable(value) {
  return typeof value === "function";
}
function routedConfigOf(session) {
  if (session === void 0 || !isCallable(session.requestHeader))
    return void 0;
  try {
    return recordOf(recordOf(session.requestHeader.call(session))?.config);
  } catch {
    return void 0;
  }
}
function imageDiagnostic(block, reason) {
  const mediaType = typeof block.mimeType === "string" ? block.mimeType : "unknown media type";
  return `[image unavailable: ${mediaType}; ${reason}; raw image data remains available to programmatic callers]`;
}
function decodeImage(block) {
  const mediaType = block.mimeType;
  if (typeof mediaType !== "string" || !IMAGE_MEDIA_TYPES.includes(mediaType)) {
    throw new Error("the declared media type is not PNG, JPEG, WebP, or GIF");
  }
  const data = block.data;
  if (typeof data !== "string") {
    throw new Error("the image data is not canonical base64");
  }
  if (data.length > MAX_MCP_IMAGE_BYTES * 2) {
    throw new Error("the image data exceeds 8 MiB");
  }
  if (data.length <= 1024 * 1024 && !CANONICAL_BASE64.test(data)) {
    throw new Error("the image data is not canonical base64");
  }
  const bytes = Buffer.from(data, "base64");
  if (bytes.toString("base64") !== data) {
    throw new Error("the image data is not canonical base64");
  }
  if (exceedsMcpImageBytes(bytes.length)) {
    throw new Error("the image data exceeds 8 MiB");
  }
  return {
    data: bytes,
    mediaType
  };
}
async function resolveAdmission(faces, agent, signal) {
  const attachments = faces.attachments();
  if (attachments === void 0)
    throw new Error("no attachment store is mounted");
  const route = resolveRoute(agent);
  const models = faces.models();
  if (route.provider === void 0 || route.model === void 0 || models === void 0) {
    throw new Error("the current model route could not be resolved");
  }
  let info;
  try {
    info = await models.resolveModelInfo(route.provider, route.model, signal);
  } catch {
    throw new Error("the current model route could not be verified");
  }
  if (info.inputModalities === void 0 || !info.inputModalities.includes("image")) {
    throw new Error(`model "${route.model}" does not declare image input`);
  }
  if (signal?.aborted === true)
    throw new Error("the tool call was canceled before image storage");
  return attachments;
}
function projectContent(content, formatBlock, image) {
  const projected = [];
  for (const [index, block] of content.entries()) {
    if (isRemoteImageBlock(block)) {
      projected.push(image(recordOf(block), index));
      continue;
    }
    projected.push({ type: "text", text: formatBlock(block) });
  }
  return projected;
}
async function projectImageAdmission(request) {
  const { agent, content, projectedContent, signal, faces, formatBlock } = request;
  if (!containsRemoteImage(content))
    return void 0;
  const remoteCount = countRemoteImages(content);
  if (exceedsMcpImageCount(remoteCount)) {
    return diagnosticProjection(content, formatBlock, `too many images in one result (>${MAX_MCP_IMAGES_PER_RESULT})`);
  }
  const decoded = decodeRemoteImages(content);
  if (decoded.validationErrors.size > 0) {
    return projectContent(content, formatBlock, (block, index) => ({
      type: "text",
      text: imageDiagnostic(block, decoded.validationErrors.get(index) ?? "another image in the same result was invalid")
    }));
  }
  if (projectedContent !== void 0)
    return [...projectedContent];
  let attachments;
  try {
    attachments = await resolveAdmission(faces, agent, signal);
  } catch (error) {
    return diagnosticProjection(content, formatBlock, errorText2(error));
  }
  return projectStoredImages(content, formatBlock, attachments, decoded);
}
function countRemoteImages(content) {
  let count = 0;
  for (const block of content)
    if (isRemoteImageBlock(block))
      count += 1;
  return count;
}
function decodeRemoteImages(content) {
  const indexes = [];
  const images = [];
  const validationErrors = /* @__PURE__ */ new Map();
  for (const [index, block] of content.entries()) {
    if (!isRemoteImageBlock(block))
      continue;
    indexes.push(index);
    try {
      images.push(decodeImage(recordOf(block)));
    } catch (error) {
      validationErrors.set(index, errorText2(error));
    }
  }
  return { indexes, images, validationErrors };
}
function diagnosticProjection(content, formatBlock, reason) {
  return projectContent(content, formatBlock, (block) => ({
    type: "text",
    text: imageDiagnostic(block, reason)
  }));
}
async function projectStoredImages(content, formatBlock, attachments, decoded) {
  try {
    const refs = await attachments.saveImages(decoded.images);
    const byIndex = new Map(decoded.indexes.map((index, offset) => [index, refs[offset]]));
    return projectContent(content, formatBlock, (block, index) => {
      const ref = byIndex.get(index);
      return ref === void 0 ? {
        type: "text",
        text: imageDiagnostic(block, "durable image storage rejected the result")
      } : { type: "image", attachment: ref };
    });
  } catch {
    return diagnosticProjection(content, formatBlock, "durable image storage rejected the result");
  }
}
function errorText2(error) {
  return error instanceof Error ? error.message : String(error);
}

// lib/server/inject/impl/call-timeout/index.js
var DEFAULT_SOURCE_TIMEOUT_MS = 15e3;
var OUTER_TAIL_MS = 1e4 + 1e4 + 5e3;
function resolveMiddlewareCallTimeoutMs(sources) {
  let max = DEFAULT_SOURCE_TIMEOUT_MS;
  for (const timeout of sources) {
    if (typeof timeout === "number" && Number.isFinite(timeout) && timeout > max) {
      max = timeout;
    }
  }
  return max + OUTER_TAIL_MS;
}

// lib/server/inject/middleware-register.js
function redactedStatsError(mw, error) {
  try {
    const { pipeline: { msgOf: msgOf3, createRedactor: createRedactor2 } } = injectPorts.get();
    const redactor = createRedactor2([...mw.host.redactionServers()]);
    return redactor(new Error(msgOf3(error))).slice(0, 200);
  } catch {
    return void 0;
  }
}
var SEARCH_EMPTY_HINT = "(No matching MCP tools found in current workspace; use ws_mcp_list for full inventory or verify server/tool names before searching)";
function visibleProjectServers(root) {
  const { catalog } = injectPorts.get();
  return [...new Set(catalog.catalogDirectory.serverNamesFor(root))].sort();
}
async function waitForDiscovery(unit) {
  const { pipeline: { withTimeout: withTimeout2 } } = injectPorts.get();
  const inflight = [...unit.inFlight.values()];
  if (inflight.length === 0)
    return;
  try {
    await withTimeout2(Promise.allSettled(inflight), 8e3, "等待连接/发现超时");
  } catch {
  }
}
function visibleMiddlewareRoots(root) {
  if (root === void 0)
    return [];
  return root === "@global" ? ["@global"] : [root, "@global"];
}
async function checkMiddlewareRoot(caller, server, root) {
  const { workspace: { parseFullServerName: parseFullServerName2 } } = injectPorts.get();
  const parsed = parseFullServerName2(server);
  if (parsed === void 0) {
    throw new Error(`${caller}: server 参数格式非法，应为 @<root>/<server>`);
  }
  if (parsed.root !== root && parsed.root !== MIDDLEWARE_GLOBAL_ROOT) {
    throw new Error(`${caller}: server ${JSON.stringify(server)} 不属于当前工作空间 ${JSON.stringify(root)}；路由一致性校验失败（防跨空间串台）`);
  }
  return parsed.root;
}
function formatSearchHit(hit) {
  const server = String(hit.server ?? "");
  const tool = String(hit.tool ?? "");
  const description = String(hit.description ?? "");
  return `${server}/${tool}: ${description}`;
}
function formatUnavailableServer(entry) {
  return `${String(entry.server ?? "")}: ${String(entry.reason ?? "")}`;
}
function renderSearchOutput(_args, value) {
  const v = value ?? {};
  const lines = (v.results ?? []).map(formatSearchHit);
  let body = lines.length > 0 ? lines.join("\n") : SEARCH_EMPTY_HINT;
  if (v.truncated === true) {
    body += "\n(Results reached limit and may be incomplete — increase limit or use ws_mcp_list for full audit)";
  }
  const unavailable = (v.unavailable ?? []).map(formatUnavailableServer);
  const text = unavailable.length > 0 ? `${body}

Unavailable servers:
${unavailable.join("\n")}` : body;
  return [{ type: "text", text }];
}
function parseSearchParams(args) {
  const params = typeof args === "object" && args !== null ? args : {};
  const query = typeof params.query === "string" ? params.query : "";
  const serverFilter = typeof params.server === "string" ? params.server : void 0;
  const requested = typeof params.limit === "number" ? Math.floor(params.limit) : 5;
  const limit = Math.max(1, Math.min(requested, 10));
  return { query, serverFilter, limit };
}
async function executeSearch(toolCtx, args, exec) {
  const root = await toolCtx.resolveRoot(exec.agent);
  if (root === void 0)
    throw new Error("ws_mcp_search: 无法确定工作空间，请先选择工作区");
  const { query, serverFilter, limit } = parseSearchParams(args);
  if (toolCtx.stats?.isEnabled()) {
    toolCtx.stats.recordSearch(query);
  }
  const roots = visibleMiddlewareRoots(root);
  const unit = await toolCtx.mw.projectUnitFor(root);
  if (unit === void 0) {
    return { results: [], unavailable: [], truncated: false };
  }
  for (const visible of roots) {
    const visibleUnit = visible === root ? unit : await toolCtx.mw.projectUnitFor(visible);
    if (visibleUnit !== void 0)
      await waitForDiscovery(visibleUnit);
  }
  const { catalog: { searchCatalogMulti: searchCatalogMulti2 } } = injectPorts.get();
  const { results, unavailable, truncated } = searchCatalogMulti2(toolCtx.mw.units, roots, query, limit);
  const filtered = serverFilter === void 0 ? results : results.filter((hit) => hit.server === serverFilter);
  return { results: filtered, unavailable, truncated };
}
function buildSearchTool(toolCtx) {
  return {
    name: "ws_mcp_search",
    description: "Search workspace MCP tools catalog by keyword (matches server, tool, description, and parameter names). Search first, then invoke with ws_mcp_call; use ws_mcp_list for full inventory audits. Empty query returns capability summary.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query / keywords; empty returns capability summary"
        },
        server: { type: "string", description: "Optional: @<root>/<server> full name filter" },
        limit: { type: "number", description: "Max results to return (default 5, max 10)" }
      }
    },
    output: {
      schema: {
        type: "object",
        properties: {
          results: { type: "array", items: {} },
          unavailable: { type: "array", items: {} },
          truncated: {
            type: "boolean",
            description: "结果是否因 limit 截断（results 达到 limit 时为 true，提示模型可能未列全）"
          }
        },
        required: ["results", "unavailable", "truncated"],
        additionalProperties: false
      },
      render: renderSearchOutput
    },
    isConcurrencySafe: () => true,
    execute: (args, exec) => executeSearch(toolCtx, args, exec)
  };
}
function formatCallContentBlock(block) {
  if (typeof block !== "object" || block === null) {
    return "[unsupported MCP content]";
  }
  const rec = block;
  if (rec.type === "text" && typeof rec.text === "string") {
    return rec.text;
  }
  if (rec.type === "resource" || rec.type === "resource_link") {
    return "[resource: content discarded]";
  }
  return `[${String(rec.type ?? "unknown")} content]`;
}
function renderCallOutput(_args, value) {
  const v = value ?? {};
  const content = Array.isArray(v.content) ? v.content : [];
  const parts = content.map(formatCallContentBlock);
  return [
    {
      type: "text",
      text: parts.length > 0 ? parts.join("\n") : "(MCP tool returned no content)"
    }
  ];
}
function parseCallParams(args) {
  const params = typeof args === "object" && args !== null ? args : {};
  const server = typeof params.server === "string" ? params.server : "";
  const tool = typeof params.tool === "string" ? params.tool : "";
  return { server, tool, arguments: params.arguments };
}
async function assertCallableTarget(toolCtx, server, root) {
  const { workspace: { parseFullServerName: parseFullServerName2 } } = injectPorts.get();
  const parsed = parseFullServerName2(server);
  if (parsed === void 0)
    throw new Error("ws_mcp_call: server 参数格式非法，应为 @<root>/<server>");
  const targetRoot = await checkMiddlewareRoot("ws_mcp_call", server, root);
  if (targetRoot === void 0) {
    throw new Error(`ws_mcp_call: server ${JSON.stringify(server)} 不属于当前工作空间 ${JSON.stringify(root)}；路由一致性校验失败（防跨空间串台）`);
  }
  const unit = await toolCtx.mw.projectUnitFor(targetRoot);
  if (unit === void 0)
    throw new Error(`ws_mcp_call: 工作空间 ${JSON.stringify(targetRoot)} 无项目级 MCP 配置`);
  return { parsed, unit };
}
function recordCallOk(toolCtx, server, tool, startTime) {
  if (toolCtx.stats?.isEnabled() !== true)
    return;
  toolCtx.stats.recordCall(server, tool, Date.now() - startTime, true);
}
function recordCallFailed(toolCtx, server, tool, startTime, error) {
  if (toolCtx.stats?.isEnabled() !== true)
    return;
  const durationMs = Date.now() - startTime;
  const redacted = redactedStatsError(toolCtx.mw, error);
  if (redacted === void 0)
    toolCtx.stats.recordCall(server, tool, durationMs, false);
  else
    toolCtx.stats.recordCall(server, tool, durationMs, false, redacted);
}
async function executeCall(toolCtx, args, exec) {
  const root = await toolCtx.resolveRoot(exec.agent);
  if (root === void 0)
    throw new Error("ws_mcp_call: 无法确定工作空间，请先选择工作区");
  const { server, tool, arguments: callArguments } = parseCallParams(args);
  if (server === "" || tool === "")
    throw new Error("ws_mcp_call: server 与 tool 均为必填");
  const { parsed, unit } = await assertCallableTarget(toolCtx, server, root);
  await toolCtx.mw.ensureConnected(unit.root, parsed.server);
  const startTime = Date.now();
  let value;
  let nestedModelContent;
  try {
    const nestedIdentity = {
      agent: exec.agent,
      callId: exec.callId,
      ...exec.rootCallId === void 0 ? {} : { rootCallId: exec.rootCallId },
      // token 即本次调用的身份：子调用以它为 parent，guard 据此区分「模型直呼」与「我方转发」。
      ...exec.token === void 0 ? {} : { parent: exec.token },
      toolSet: exec.toolSet,
      deferContext: exec.deferContext,
      concludeTurn: exec.concludeTurn,
      onModelContent: (content) => {
        nestedModelContent = content;
      }
    };
    value = await toolCtx.mw.callTool(server, tool, callArguments, exec.signal, nestedIdentity);
    recordCallOk(toolCtx, parsed.server, tool, startTime);
  } catch (error) {
    recordCallFailed(toolCtx, parsed.server, tool, startTime, error);
    throw error;
  }
  const projection = await projectImageAdmission({
    agent: exec.agent,
    content: callValueContent(value),
    projectedContent: nestedModelContent,
    signal: exec.signal,
    faces: toolCtx.faces,
    formatBlock: formatCallContentBlock
  });
  if (projection !== void 0)
    toolCtx.projections.set(exec, projection);
  return value;
}
function callValueContent(value) {
  const content = value?.content;
  return Array.isArray(content) ? content : [];
}
function buildCallTool(toolCtx, callTimeoutMs) {
  return {
    name: "ws_mcp_call",
    description: "Invoke an MCP tool in the current workspace (executes on live server). Verify parameter schema with ws_mcp_detail beforehand (can invoke directly if server and tool are known); obtain user consent before write or sensitive operations.",
    parameters: {
      type: "object",
      properties: {
        server: {
          type: "string",
          description: "Required: @<root>/<server> full name (from ws_mcp_search / ws_mcp_list)"
        },
        tool: {
          type: "string",
          description: "Required: bare remote tool name (from ws_mcp_search / ws_mcp_list)"
        },
        arguments: {
          type: "object",
          additionalProperties: true,
          description: "Arguments matching inputSchema from ws_mcp_detail (properties/required/enum/description); check with ws_mcp_detail when uncertain"
        }
      },
      required: ["server", "tool"]
    },
    output: {
      schema: {
        type: "object",
        properties: {
          content: { type: "array", items: {} },
          structuredContent: {}
        },
        required: ["content"],
        additionalProperties: false
      },
      render: renderCallOutput
    },
    isConcurrencySafe: () => true,
    // 外层超时由调用方现算递入（#935：max(全量源) + 25s 内部尾；旧 55s 写死值已删）。
    timeoutMs: callTimeoutMs,
    /**
     * 官方 `applyFinalContent` 接缝：把 A+ 图片投影换进模型面（返回 `undefined`
     * 则保留原内容 = 继续走 `render`）。命中即删——每次执行只消费一次。`isError` 时把内容
     * 交回宿主：错误面不该被换面。
     */
    finalizeContent(exec, result) {
      const projection = toolCtx.projections.get(exec);
      if (projection === void 0)
        return void 0;
      toolCtx.projections.delete(exec);
      if (result.isError === true)
        return void 0;
      return projection;
    },
    execute: (args, exec) => executeCall(toolCtx, args, exec)
  };
}
function formatListTool(t) {
  return `  - ${String(t.tool ?? "")}: ${String(t.description ?? "")}`;
}
function formatListServerEntry(entry) {
  const server = String(entry.server ?? "");
  const tools = Array.isArray(entry.tools) ? entry.tools : [];
  const head = tools.length > 0 ? `${server} (${tools.length} tools):
${tools.map(formatListTool).join("\n")}` : `${server} (0 tools)`;
  const disabled = entry.disabled === true ? " [disabled]" : "";
  const unavailable = typeof entry.unavailable === "string" && entry.unavailable !== "" ? ` [unavailable: ${entry.unavailable}]` : "";
  const truncated = entry.toolsTruncated === true ? " [toolsTruncated: tool count reached limit, increase perServerLimit to retry]" : "";
  return `${head}${disabled}${unavailable}${truncated}`;
}
function renderListOutput(_args, value) {
  const v = value ?? {};
  const servers = v.servers ?? [];
  const lines = servers.map(formatListServerEntry);
  const prefix = `Workspace ${String(v.workspace ?? "")}: ${String(v.totalServers ?? 0)} servers / ${String(v.totalTools ?? 0)} tools in total`;
  const body = lines.length > 0 ? lines.join("\n\n") : String(v.message ?? "(No MCP servers found in current workspace)");
  const truncated = v.toolsTruncated === true ? "\n(Some server tool lists were truncated; increase perServerLimit if needed)" : "";
  return [{ type: "text", text: `${prefix}

${body}${truncated}` }];
}
function parseListParams(args) {
  const { runtime: { LIST_MAX_TOOLS_PER_SERVER: LIST_MAX_TOOLS_PER_SERVER2 } } = injectPorts.get();
  const params = typeof args === "object" && args !== null ? args : {};
  const serverFilter = typeof params.server === "string" && params.server !== "" ? params.server : void 0;
  const requested = typeof params.perServerLimit === "number" ? Math.floor(params.perServerLimit) : LIST_DEFAULT_TOOLS_PER_SERVER;
  const toolLimit = Math.max(1, Math.min(requested, LIST_MAX_TOOLS_PER_SERVER2));
  return { serverFilter, toolLimit };
}
function resolveEmptyListMessage(serverFilter, mw, root) {
  if (serverFilter !== void 0) {
    const visible = visibleProjectServers(root);
    const visibleText = visible.length > 0 ? `可见项目级服务器：${visible.join(" / ")}；` : "当前工作空间无已发现的项目级服务器；";
    return `没有匹配 server=${JSON.stringify(serverFilter)} 的项目级服务器。${visibleText}全局级服务器不在此列出：请用 ws_mcp_call 按全名访问（全局级写作 @global/<server>，项目级写作 @<root>/<server>；全名从 ws_mcp_list / ws_mcp_search 读），封装定义条目同样经它访问`;
  }
  return "当前工作空间没有可用 MCP 服务器（项目级与全局均未发现；若刚添加配置，请稍后重试）";
}
async function resolveListWithoutUnit(mw, root, serverFilter, toolLimit) {
  const { catalog: { listCatalog: listCatalog2 } } = injectPorts.get();
  const globalUnit = await mw.projectUnitFor("@global");
  if (globalUnit !== void 0)
    await waitForDiscovery(globalUnit);
  return listCatalog2(mw.units, ["@global"], serverFilter, toolLimit, "当前工作空间没有可用 MCP 服务器（项目级与全局均未发现；若刚添加配置，请稍后重试）", mw.disabledTools);
}
async function executeList(toolCtx, args, exec) {
  const root = await toolCtx.resolveRoot(exec.agent);
  if (root === void 0)
    throw new Error("ws_mcp_list: 无法确定工作空间，请先选择工作区");
  const { serverFilter, toolLimit } = parseListParams(args);
  if (toolCtx.stats?.isEnabled()) {
    toolCtx.stats.recordList(serverFilter);
  }
  const roots = visibleMiddlewareRoots(root);
  const unit = await toolCtx.mw.projectUnitFor(root);
  if (unit === void 0) {
    return resolveListWithoutUnit(toolCtx.mw, root, serverFilter, toolLimit);
  }
  for (const visible of roots) {
    const visibleUnit = visible === root ? unit : await toolCtx.mw.projectUnitFor(visible);
    if (visibleUnit !== void 0)
      await waitForDiscovery(visibleUnit);
  }
  const { catalog: { listCatalog: listCatalog2 } } = injectPorts.get();
  const result = listCatalog2(toolCtx.mw.units, roots, serverFilter, toolLimit, "", toolCtx.mw.disabledTools);
  if (result.servers.length === 0) {
    result.message = resolveEmptyListMessage(serverFilter, toolCtx.mw, root);
  }
  return result;
}
function buildListTool(toolCtx) {
  const { runtime: { LIST_MAX_TOOLS_PER_SERVER: LIST_MAX_TOOLS_PER_SERVER2 } } = injectPorts.get();
  return {
    name: "ws_mcp_list",
    description: "List all MCP servers and their complete tool inventories in current workspace (not truncated by search limit). Returns full server names, tool names, and descriptions. Does not return inputSchema (use ws_mcp_detail for full schemas). Includes project-level and global servers.",
    parameters: {
      type: "object",
      properties: {
        server: {
          type: "string",
          description: "Optional: @<root>/<server> full name or bare name filter (error if root is not in current workspace)"
        },
        perServerLimit: {
          type: "number",
          description: `Optional: max tools per server (default ${LIST_DEFAULT_TOOLS_PER_SERVER}, max ${LIST_MAX_TOOLS_PER_SERVER2}; sets toolsTruncated=true when exceeded)`
        }
      }
    },
    output: {
      schema: {
        type: "object",
        properties: {
          workspace: { type: "string" },
          servers: { type: "array", items: {} },
          totalServers: { type: "number" },
          totalTools: { type: "number" },
          toolsTruncated: { type: "boolean" },
          message: { type: "string" }
        },
        required: ["workspace", "servers", "totalServers", "totalTools", "toolsTruncated"],
        additionalProperties: false
      },
      render: renderListOutput
    },
    isConcurrencySafe: () => true,
    execute: (args, exec) => executeList(toolCtx, args, exec)
  };
}
function renderDetailOutput(_args, value) {
  const v = value ?? {};
  const server = String(v.server ?? "");
  const tool = String(v.tool ?? "");
  const description = typeof v.description === "string" && v.description !== "" ? v.description : "（无描述）";
  const schema = v.inputSchema === void 0 ? "{}" : JSON.stringify(v.inputSchema, null, 2);
  const fresh = v.fresh === true ? "fresh" : "stale";
  const disabled = v.disabled === true ? " [disabled]" : "";
  return [
    {
      type: "text",
      text: `${server}/${tool}（${fresh}${disabled}）：${description}

inputSchema:
${schema}`
    }
  ];
}
function parseDetailParams(args) {
  const params = typeof args === "object" && args !== null ? args : {};
  const server = typeof params.server === "string" ? params.server : "";
  const tool = typeof params.tool === "string" ? params.tool : "";
  return { server, tool };
}
async function executeDetail(toolCtx, args, exec) {
  const root = await toolCtx.resolveRoot(exec.agent);
  if (root === void 0)
    throw new Error("ws_mcp_detail: 无法确定工作空间，请先选择工作区");
  const { server, tool } = parseDetailParams(args);
  if (server === "" || tool === "")
    throw new Error("ws_mcp_detail: server 与 tool 均为必填");
  const { workspace: { parseFullServerName: parseFullServerName2 }, catalog: { findToolDetail: findToolDetail2 } } = injectPorts.get();
  const parsed = parseFullServerName2(server);
  if (toolCtx.stats?.isEnabled()) {
    toolCtx.stats.recordDetail(parsed?.server ?? server, tool);
  }
  const targetRoot = await checkMiddlewareRoot("ws_mcp_detail", server, root);
  if (targetRoot === void 0) {
    throw new Error(`ws_mcp_detail: server ${JSON.stringify(server)} 不属于当前工作空间 ${JSON.stringify(root)}；路由一致性校验失败（防跨空间串台）`);
  }
  const unit = await toolCtx.mw.projectUnitFor(targetRoot);
  if (unit !== void 0)
    await waitForDiscovery(unit);
  return findToolDetail2(toolCtx.mw.units, targetRoot, server, tool);
}
function buildDetailTool(toolCtx) {
  return {
    name: "ws_mcp_detail",
    description: "Query the exact parameter schema (inputSchema: properties/required/enum/description) of a single MCP tool by @<root>/<server> full name and bare tool name. Used before ws_mcp_call. Does not perform keyword search (use ws_mcp_list or ws_mcp_search to find tools).",
    parameters: {
      type: "object",
      properties: {
        server: {
          type: "string",
          description: "Required: @<root>/<server> full name (from ws_mcp_list / ws_mcp_search)"
        },
        tool: {
          type: "string",
          description: "Required: bare remote tool name (from ws_mcp_list / ws_mcp_search)"
        }
      },
      required: ["server", "tool"]
    },
    output: {
      schema: {
        type: "object",
        properties: {
          server: { type: "string" },
          tool: { type: "string" },
          description: { type: "string" },
          inputSchema: {},
          fresh: { type: "boolean" },
          disabled: { type: "boolean" }
        },
        required: ["server", "tool", "description", "inputSchema", "fresh"],
        additionalProperties: false
      },
      render: renderDetailOutput
    },
    isConcurrencySafe: () => true,
    execute: (args, exec) => executeDetail(toolCtx, args, exec)
  };
}
function handleCallGuard(args, mw) {
  const { workspace: { parseFullServerName: parseFullServerName2, fullServerName: fullServerName2 }, pipeline: { isToolDenied: isToolDenied2, toolDisabledReason: toolDisabledReason2 } } = injectPorts.get();
  const { server, tool } = parseCallParams(args);
  const parsed = parseFullServerName2(server);
  if (parsed === void 0 || parsed.server === "")
    return void 0;
  const serverKey = fullServerName2(parsed.root, parsed.server);
  if (isToolDenied2(mw.disabledTools, serverKey, tool)) {
    return { kind: "deny", reason: toolDisabledReason2(serverKey, tool) };
  }
  return void 0;
}
function splitRegisteredName(name2) {
  const rest = name2.slice("mcp__".length);
  const separator = rest.indexOf("__");
  if (separator <= 0)
    return void 0;
  const tool = rest.slice(separator + 2);
  if (tool === "")
    return void 0;
  return { segment: rest.slice(0, separator), tool };
}
async function resolveRegisteredTarget(agent, segment, resolveRoot, resolveServerId) {
  const resolved = resolveServerId?.(segment);
  return {
    server: resolved?.server ?? segment,
    root: resolved?.root ?? await resolveRoot(agent)
  };
}
function globalScopeToolDisabled(disabledTools, server, tool) {
  return disabledTools?.get(MIDDLEWARE_GLOBAL_ROOT)?.get(server)?.has(tool) === true;
}
async function handleDirectMcpGuard(name2, agent, disabledTools, resolveRoot, resolveServerId) {
  const { workspace: { fullServerName: fullServerName2 }, pipeline: { isToolDenied: isToolDenied2, toolDisabledReason: toolDisabledReason2 } } = injectPorts.get();
  const split = splitRegisteredName(name2);
  if (split === void 0)
    return void 0;
  const { segment, tool } = split;
  if (tool.includes("__")) {
    return {
      kind: "deny",
      reason: `工具注册名 ${JSON.stringify(name2)} 含连续双下划线，无法唯一反解 (server, tool)；请经 ws_mcp_call 用服务器裸名与工具裸名调用（该路径确定性裁决）`
    };
  }
  const { server, root } = await resolveRegisteredTarget(agent, segment, resolveRoot, resolveServerId);
  if (root === void 0) {
    if (globalScopeToolDisabled(disabledTools, server, tool)) {
      return {
        kind: "deny",
        reason: toolDisabledReason2(`@${MIDDLEWARE_GLOBAL_ROOT}/${server}`, tool)
      };
    }
    return void 0;
  }
  const serverKey = fullServerName2(root, server);
  if (isToolDenied2(disabledTools, serverKey, tool)) {
    return { kind: "deny", reason: toolDisabledReason2(serverKey, tool) };
  }
  return void 0;
}
function resolveServerIdFor(mw) {
  return (id) => {
    for (const unit of mw.units.values()) {
      for (const [name2, entry] of unit.connections) {
        if (entry.id === id)
          return { root: unit.root, server: name2 };
      }
    }
    return void 0;
  };
}
function registerPreExecuteGuard(ctx, mw, resolveRoot, hostResolveServerId) {
  if (typeof ctx.on !== "function")
    return void 0;
  return ctx.on("tools/pre-execute", async function(exec, next) {
    const name2 = exec?.name;
    if (typeof name2 !== "string" || name2 === "")
      return next();
    if (exec.parent !== void 0 && mw.forwarding.has(exec.parent))
      return next();
    if (name2 === "ws_mcp_call") {
      const decision = handleCallGuard(exec.arguments, mw);
      if (decision !== void 0)
        return decision;
      return next();
    }
    if (name2.startsWith("mcp__")) {
      const poolResolve = resolveServerIdFor(mw);
      const decision = await handleDirectMcpGuard(name2, exec.agent, mw.disabledTools, resolveRoot, (id) => hostResolveServerId?.(id) ?? poolResolve(id));
      if (decision !== void 0)
        return decision;
      return {
        kind: "deny",
        reason: `工具注册名 ${JSON.stringify(name2)} 是内部标识，模型可见面只有 ws_mcp_search / ws_mcp_list / ws_mcp_detail / ws_mcp_call，不可直呼；请经 ws_mcp_call 以服务器全名 + 工具裸名调用（同一次调用不要重试本条）`
      };
    }
    return next();
  });
}
function registerMiddlewareTools(ctx, mw, resolveRoot, options = {}, faces) {
  const disposers = [];
  const disabledTools = options.disabledTools ?? mw.disabledTools;
  if (options.disabledTools !== void 0)
    mw.disabledTools = disabledTools;
  const toolCtx = {
    mw,
    resolveRoot,
    stats: options.stats,
    projections: /* @__PURE__ */ new WeakMap(),
    // faces 缺省：两条能力都取不到 → 图片面退化成诊断文本（与「宿主未挂附件库」同一条文案），
    // 不影响任何无图片的调用面。
    faces: faces ?? { attachments: () => void 0, models: () => void 0 }
  };
  const callTimeoutMs = options.callTimeoutMs ?? resolveMiddlewareCallTimeoutMs([]);
  const tools = [
    buildSearchTool(toolCtx),
    buildCallTool(toolCtx, callTimeoutMs),
    buildListTool(toolCtx),
    buildDetailTool(toolCtx)
  ];
  for (const tool of tools) {
    disposers.push(ctx.tools.register(tool));
  }
  const guardDispose = registerPreExecuteGuard(ctx, mw, resolveRoot, options.resolveServerId);
  if (guardDispose !== void 0) {
    disposers.push(guardDispose);
  }
  return () => {
    for (const dispose of disposers)
      dispose();
  };
}

// lib/server/inject/interface.js
function installInject(deps) {
  injectPorts.install(deps);
}

// lib/server/upgrade/interface.js
var interface_exports9 = {};
__export(interface_exports9, {
  installUpgrade: () => installUpgrade,
  releaseUpgrade: () => releaseUpgrade,
  settleProjectConfig: () => settleProjectConfig,
  withSettledProjectConfig: () => withSettledProjectConfig
});

// ../../shared/upgrade-chain.js
import { existsSync as existsSync7, readFileSync as readFileSync2 } from "node:fs";
import { dirname as dirname8, join as join4 } from "node:path";
var UNKNOWN_VERSION = "0.0.0";
var PACKAGE_ROOT_MAX_DEPTH = 8;
function selectPendingSteps(steps, recorded) {
  return [...steps].sort((left, right) => compareVersions(left.targetVersion, right.targetVersion)).filter((step) => compareVersions(step.fromVersion, recorded) >= 0);
}
function newestTargetVersion(steps) {
  let newest = "";
  for (const step of steps) {
    if (newest === "" || compareVersions(step.targetVersion, newest) > 0) {
      newest = step.targetVersion;
    }
  }
  return newest;
}
function diagnoseGap(steps, recorded, target, label) {
  const gap = compareVersions(recorded, target);
  if (gap === 0)
    return null;
  if (gap < 0) {
    return {
      kind: "behind",
      message: `${label}: 存储版本 ${recorded} 落后于插件版本 ${target}，缺少对应的升级步骤`
    };
  }
  const newest = newestTargetVersion(steps);
  if (newest !== "" && compareVersions(newest, target) > 0) {
    return {
      kind: "ahead-of-steps",
      message: `${label}: 升级链的目标版本 ${newest} 高于插件版本 ${target}（存储已升到 ${recorded}）——步骤表与 package.json 不同步`
    };
  }
  return {
    kind: "downgrade",
    message: `${label}: 存储版本 ${recorded} 高于插件版本 ${target}，本插件的升级链不回退`
  };
}
function compareVersions(left, right) {
  const a = parseVersion(left);
  const b = parseVersion(right);
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (a[index] || 0) - (b[index] || 0);
    if (difference !== 0)
      return difference > 0 ? 1 : -1;
  }
  return 0;
}
function parseVersion(text) {
  const core = text.split("-")[0] ?? "";
  return core.split(".").map((part) => /^\d+$/.test(part) ? Number.parseInt(part, 10) : 0);
}
function packageRootFrom(fromDir) {
  let current = fromDir;
  for (let depth = 0; depth < PACKAGE_ROOT_MAX_DEPTH; depth += 1) {
    if (existsSync7(join4(current, "package.json")))
      return current;
    const parent = dirname8(current);
    if (parent === current)
      return void 0;
    current = parent;
  }
  return void 0;
}
function pluginVersion(fromDir) {
  const root = packageRootFrom(fromDir);
  if (root === void 0)
    return UNKNOWN_VERSION;
  try {
    const parsed = JSON.parse(readFileSync2(join4(root, "package.json"), "utf8"));
    if (typeof parsed !== "object" || parsed === null || !("version" in parsed)) {
      return UNKNOWN_VERSION;
    }
    const version = parsed.version;
    return typeof version === "string" ? version : UNKNOWN_VERSION;
  } catch {
    return UNKNOWN_VERSION;
  }
}
async function runUpgradeChain(ports) {
  const recorded = await ports.readScale();
  for (const step of selectPendingSteps(ports.steps, recorded)) {
    await applyStep(step, ports);
  }
  const gap = diagnoseGap(ports.steps, await ports.readScale(), ports.targetVersion, ports.label);
  if (gap !== null)
    ports.logger.warn(gap.message);
}
async function applyStep(step, ports) {
  try {
    await step.run(ports.deps);
  } catch (cause) {
    throw new Error(`${ports.label}: 存储升级到 ${step.targetVersion} 失败 — ${reasonOf(cause)}`, {
      cause
    });
  }
  try {
    await ports.writeScale(step.targetVersion);
  } catch (cause) {
    throw new Error(`${ports.label}: 存储版本号回写失败（${step.targetVersion}）— ${reasonOf(cause)}`, { cause });
  }
}
function reasonOf(cause) {
  return cause instanceof Error ? cause.message : String(cause);
}
function createUpgradeRunner(label, run) {
  let installed = false;
  let installing = false;
  return {
    async install(deps) {
      if (installed)
        throw new Error(`${label}: upgrade 域只能装配一次`);
      if (installing)
        throw new Error(`${label}: upgrade 域正在装配中，不能并发装配`);
      installing = true;
      try {
        await run(deps);
        installed = true;
      } finally {
        installing = false;
      }
    },
    /** 卸载：本域没有需要释放的东西——它只写了文件；复位标记是为了让重装走完整的链。 */
    release() {
      installed = false;
    }
  };
}

// lib/server/upgrade/impl/chain/index.js
import { dirname as dirname9 } from "node:path";
import { fileURLToPath } from "node:url";

// ../../shared/upgrade-tick.js
async function tickUpgradeVersion() {
}

// lib/server/upgrade/impl/steps/storage-layout.js
import { existsSync as existsSync8, readFileSync as readFileSync3, renameSync as renameSync2, statSync as statSync2 } from "node:fs";
var MIGRATED_SUFFIX = ".migrated.bak";
var EMPTY_CONFIG = `${JSON.stringify({ version: 1, servers: [] }, null, 2)}
`;
var EMPTY_USER_STATE = `${JSON.stringify({ version: 1, disabled: {} }, null, 2)}
`;
var LAYOUT = [
  {
    legacy: LEGACY_LAYOUT.config,
    target: configFile,
    initial: EMPTY_CONFIG,
    takenOver: (deps) => deps.storePath !== ""
  },
  { legacy: LEGACY_LAYOUT.userState, target: userStatePath, initial: EMPTY_USER_STATE }
];
async function migrateStorageLayout(deps) {
  for (const entry of LAYOUT) {
    if (entry.takenOver !== void 0 && entry.takenOver(deps))
      continue;
    await settleOne(legacyFile(entry.legacy), entry.target(), entry.initial, deps);
  }
}
async function settleOne(source, target, initial, deps) {
  if (existsSync8(target)) {
    warnIfDowngraded(source, target, deps);
    archive(source);
    return;
  }
  if (!existsSync8(source)) {
    if (initial !== null)
      await writeFileAtomic(target, initial);
    return;
  }
  await writeFileAtomic(target, readSource(source));
  archive(source);
}
function warnIfDowngraded(source, target, deps) {
  if (!existsSync8(source))
    return;
  if (statSync2(source).mtimeMs <= statSync2(target).mtimeMs)
    return;
  deps.logger.warn(`dsh-mcp-manager: 旧存储文件 ${source} 比目标 ${target} 更新——检测到更旧的降级写入，将归档旧文件并保留目标`);
}
function isRegularFile(path) {
  try {
    return statSync2(path).isFile();
  } catch {
    return false;
  }
}
function readSource(source) {
  try {
    return readFileSync3(source, "utf8");
  } catch (cause) {
    throw new Error(`dsh-mcp-manager: 旧存储文件不可读：${source}`, { cause });
  }
}
function archive(source) {
  if (!existsSync8(source))
    return;
  let target = `${source}${MIGRATED_SUFFIX}`;
  for (let generation = 2; isRegularFile(target); generation += 1) {
    target = `${source}${MIGRATED_SUFFIX}.${generation}`;
  }
  try {
    renameSync2(source, target);
  } catch (cause) {
    throw new Error(`dsh-mcp-manager: 旧存储文件改名失败：${source}`, { cause });
  }
}

// lib/server/upgrade/impl/steps/index.js
var STEPS = [
  { fromVersion: "0.0.0", targetVersion: "0.2.5", run: migrateStorageLayout },
  // 0.2.5 → 0.2.6 为空步（调用超时跟随配置、关面板还焦、客户端类型收窄，无形态变化）：run 指共享空函数。
  { fromVersion: "0.2.5", targetVersion: "0.2.6", run: tickUpgradeVersion },
  // 0.2.6 → 0.2.7 为空步（#1028 项目级会话绑定修复只动客户端，存储形态不变）：run 指共享空函数。
  { fromVersion: "0.2.6", targetVersion: "0.2.7", run: tickUpgradeVersion },
  // 0.2.7 → 0.2.8 为空步（dsh 0.2.0-rc.2 适配 + 导出面收窄，均不落盘）：run 指共享空函数。
  { fromVersion: "0.2.7", targetVersion: "0.2.8", run: tickUpgradeVersion },
  // 0.2.8 → 0.2.9 为空步（本版无 MCP 管理器 home 级存储形态变化）：run 指共享空函数。
  { fromVersion: "0.2.8", targetVersion: "0.2.9", run: tickUpgradeVersion },
  // 0.2.9 → 0.2.10 为空步（本版无 MCP 管理器 home 级存储形态变化）：run 指共享空函数，只推进刻度。
  { fromVersion: "0.2.9", targetVersion: "0.2.10", run: tickUpgradeVersion },
  // 0.2.10 → 0.2.11 为空步（rc.1 适配不改变 home 级存储形态）：run 指共享空函数，只推进刻度。
  { fromVersion: "0.2.10", targetVersion: "0.2.11", run: tickUpgradeVersion },
  // 0.2.11 → 0.2.12 空步（本地补丁：只换写队列，home 级存储形态不变）：run 指共享空函数，只推进刻度。
  { fromVersion: "0.2.11", targetVersion: "0.2.12", run: tickUpgradeVersion }
];

// lib/server/upgrade/impl/version/index.js
var BASELINE_VERSION = "0.0.0";
async function readStoredVersion() {
  const text = await readTextFile(versionFile());
  if (text === null)
    return BASELINE_VERSION;
  const trimmed = text.trim();
  return trimmed === "" ? BASELINE_VERSION : trimmed;
}
async function writeStoredVersion(version) {
  await writeFileAtomic(versionFile(), `${version}
`);
}

// lib/server/upgrade/impl/chain/index.js
var MODULE_DIR = dirname9(fileURLToPath(import.meta.url));
function runUpgradeChain2(deps) {
  return runUpgradeChain({
    label: "dsh-mcp-manager",
    steps: STEPS,
    deps,
    readScale: readStoredVersion,
    writeScale: writeStoredVersion,
    targetVersion: pluginVersion(MODULE_DIR),
    logger: deps.logger
  });
}

// lib/server/upgrade/impl/service/index.js
var upgradeRunner = createUpgradeRunner("dsh-mcp-manager", runUpgradeChain2);

// lib/server/upgrade/impl/steps/project-layout.js
function settleProjectConfig(root, logger) {
  return settleOne(legacyProjectConfigFile(root), projectConfigFile(root), null, {
    logger,
    // settle 路径只用 logger：`storePath` 传空串——takenOver 是 LAYOUT 层的概念，
    // 与项目级无关。
    storePath: ""
  });
}
function withSettledProjectConfig(root, logger, useSettled) {
  return settleProjectConfig(root, logger).then(() => useSettled(projectConfigFile(root)));
}

// lib/server/upgrade/interface.js
function installUpgrade(deps) {
  return upgradeRunner.install(deps);
}
function releaseUpgrade() {
  upgradeRunner.release();
}

// lib/server/visibility/impl/mask/index.js
var MCP_PREFIX = "mcp__";
var ID_SEPARATOR = "__";
function keyOf(names) {
  return [...names].sort().join("\n");
}
function idOf(name2) {
  const rest = name2.slice(MCP_PREFIX.length);
  return rest.slice(0, rest.indexOf(ID_SEPARATOR));
}
function isUnknownNameError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.startsWith("tools.restrict()") && message.toLowerCase().includes("unknown");
}
function collectDenyNames(units, registeredNames) {
  const ids = /* @__PURE__ */ new Set();
  for (const unit of units.values()) {
    for (const entry of unit.connections.values()) {
      if (typeof entry.id === "string" && entry.id !== "")
        ids.add(entry.id);
    }
  }
  const deny = /* @__PURE__ */ new Set();
  for (const name2 of registeredNames()) {
    if (typeof name2 !== "string" || !name2.startsWith(MCP_PREFIX))
      continue;
    const rest = name2.slice(MCP_PREFIX.length);
    const separator = rest.indexOf(ID_SEPARATOR);
    if (separator <= 0 || separator + ID_SEPARATOR.length >= rest.length)
      continue;
    deny.add(name2);
  }
  const sorted = [...deny].sort();
  return {
    deny: sorted,
    batched: sorted.filter((name2) => ids.has(idOf(name2)))
  };
}
function disposeAll(disposers) {
  const errors = [];
  for (const dispose of disposers.splice(0).reverse()) {
    try {
      dispose();
    } catch (error) {
      disposers.unshift(dispose);
      errors.push(error);
    }
  }
  return errors;
}
function isSessionReentry(error) {
  return error instanceof Error && error.message === "session append cannot reenter while another append is being published";
}
function mountDenyList(face, lists, disposers, active, onUnknown) {
  const restrictOne = (name2) => {
    if (!active())
      return;
    try {
      disposers.push(face.tools.restrict({ deny: [name2] }));
    } catch (error) {
      if (!isUnknownNameError(error))
        throw error;
      onUnknown(name2, error);
    }
  };
  if (lists.batched.length > 0 && active()) {
    try {
      disposers.push(face.tools.restrict({ deny: [...lists.batched] }));
    } catch (error) {
      if (!isUnknownNameError(error))
        throw error;
      for (const name2 of lists.batched)
        restrictOne(name2);
    }
  }
  const batched = new Set(lists.batched);
  for (const name2 of lists.deny) {
    if (!batched.has(name2))
      restrictOne(name2);
  }
}
function startAgentVisibility(args) {
  const { events, units, registeredNames, logger } = args;
  const live = /* @__PURE__ */ new Map();
  const retired = /* @__PURE__ */ new Set();
  const pending = /* @__PURE__ */ new Map();
  const queued = /* @__PURE__ */ new Set();
  const unhook = [];
  let reconciling = false;
  let changed = false;
  let stopped = false;
  let degradedWarned = false;
  let skippedUnknownTotal = 0;
  const warnDegraded = (message) => {
    if (degradedWarned)
      return;
    degradedWarned = true;
    logger.warn(message);
  };
  const canonical = (face) => {
    let record = live.get(face.id);
    if (record === void 0) {
      record = { face, disposers: [], cleanup: [], disposed: false };
      live.set(face.id, record);
    }
    return record;
  };
  const skipUnknown = (name2, error) => {
    skippedUnknownTotal += 1;
    logger.warn(`dsh-mcp-manager: 跳过挂载时已销的工具名 ${JSON.stringify(name2)}（累计跳过 ${skippedUnknownTotal} 个）：${String(error)}`);
  };
  const readLists = () => {
    try {
      return collectDenyNames(units, registeredNames);
    } catch (error) {
      warnDegraded(`dsh-mcp-manager: 读取工具注册面失败，模型可见面隐藏降级为 no-op（mcp__* 保持可见）：${String(error)}`);
      return void 0;
    }
  };
  const failed = (record, error, allowRetry, key, cleanup = false) => {
    if (!isSessionReentry(error) || !allowRetry)
      logger.warn(`dsh-mcp-manager: 为 agent ${record.face.id} 应用工具可见面限制失败：${String(error)}`);
    if (allowRetry && (isSessionReentry(error) || cleanup)) {
      if (pending.has(record))
        return;
      pending.set(record, { retryMount: !cleanup, key });
      queueMicrotask(() => {
        const retry = pending.get(record);
        if (!pending.delete(record))
          return;
        reconcile(record, false, !retry?.retryMount);
      });
      return;
    }
  };
  const replace = (record, lists, allowRetry) => {
    const active = () => !stopped && !record.disposed;
    const next = [];
    try {
      mountDenyList(record.face, lists, next, active, skipUnknown);
      if (active()) {
        record.cleanup.push(...record.disposers);
        record.disposers = next;
        record.key = keyOf(lists.deny);
      } else {
        record.cleanup.push(...next);
      }
    } catch (error) {
      record.cleanup.push(...next);
      failed(record, error, allowRetry, keyOf(lists.deny));
    }
  };
  const applyTo = (record, lists, allowRetry) => {
    const key = keyOf(lists?.deny ?? []);
    if (!stopped && !record.disposed && lists !== void 0 && record.key !== key)
      replace(record, lists, allowRetry);
    for (const error of disposeAll(record.cleanup))
      failed(record, error, allowRetry, key, true);
    if (record.disposed && record.cleanup.length === 0)
      retired.delete(record);
  };
  const discover = () => {
    try {
      for (const face of events.liveAgents?.() ?? [])
        canonical(face);
    } catch (error) {
      logger.warn(`dsh-mcp-manager: 读取活 agent 表失败：${String(error)}`);
    }
  };
  const applyQueued = (record, lists, attempted, allowRetry, cleanupOnly) => {
    const target = keyOf(lists?.deny ?? []);
    const retry = pending.get(record);
    if (retry !== void 0) {
      if (lists !== void 0 && retry.key !== target)
        retry.retryMount = true;
      return;
    }
    const key = record.disposed ? "disposed" : target;
    const keys = attempted.get(record) ?? /* @__PURE__ */ new Set();
    if (keys.has(key))
      return;
    keys.add(key);
    attempted.set(record, keys);
    applyTo(record, cleanupOnly ? void 0 : lists, allowRetry);
  };
  const refreshLists = (lists) => {
    if (!changed || stopped)
      return lists;
    const latest = readLists();
    if (latest !== void 0 && keyOf(latest.deny) !== keyOf(lists?.deny ?? [])) {
      for (const record of live.values())
        queued.add(record);
    }
    return latest;
  };
  const queueAll = () => {
    if (!stopped)
      discover();
    for (const record of [...live.values(), ...retired])
      queued.add(record);
  };
  const reconcile = (only, allowRetry = true, cleanupOnly = false) => {
    if (only !== void 0)
      queued.add(only);
    if (reconciling) {
      changed = true;
      return;
    }
    if (only === void 0)
      queueAll();
    reconciling = true;
    const attempted = /* @__PURE__ */ new Map();
    try {
      let lists = stopped ? void 0 : readLists();
      do {
        changed = false;
        const batch = [...queued];
        queued.clear();
        for (const record of batch)
          applyQueued(record, lists, attempted, allowRetry, cleanupOnly && record === only);
        lists = refreshLists(lists);
      } while (queued.size > 0);
    } finally {
      reconciling = false;
    }
  };
  const disposeAgent = (id) => {
    const record = live.get(id);
    if (record === void 0)
      return;
    live.delete(id);
    pending.delete(record);
    record.disposed = true;
    record.cleanup.push(...record.disposers);
    record.disposers = [];
    retired.add(record);
    reconcile(record);
  };
  const onCreated = events.onAgentCreated;
  const onDisposed = events.onAgentDisposed;
  const onChanged = events.onToolsChange;
  if (onCreated === void 0 && onDisposed === void 0 && onChanged === void 0) {
    warnDegraded("dsh-mcp-manager: agent 事件面不可用，模型可见面隐藏降级为 no-op（mcp__* 保持可见）");
    return () => {
    };
  }
  const hook = (subscribe) => {
    if (subscribe !== void 0)
      unhook.push(subscribe);
  };
  try {
    if (onCreated !== void 0)
      hook(onCreated((agent) => {
        if (!stopped) {
          queued.add(canonical(agent));
          reconcile();
        }
      }));
    if (onDisposed !== void 0)
      hook(onDisposed((agent) => disposeAgent(agent.id)));
    if (onChanged !== void 0)
      hook(onChanged(() => {
        if (!stopped)
          reconcile();
      }));
  } catch (error) {
    warnDegraded(`dsh-mcp-manager: 订阅 agent 事件面失败，模型可见面隐藏降级为 no-op：${String(error)}`);
  }
  reconcile();
  return () => {
    stopped = true;
    pending.clear();
    for (const stop of unhook.splice(0)) {
      try {
        stop();
      } catch {
      }
    }
    for (const id of [...live.keys()])
      disposeAgent(id);
    reconcile();
  };
}

// lib/server/erasure/impl/guard/index.js
var SDK_SECTION_NAME = "tools:sdk";
var MCP_PREFIX2 = "mcp__";
function isAttachableLine(line) {
  const text = line.trimStart();
  return text === "" || text.startsWith("/**") || text.startsWith("*/") || text.startsWith("* ") || text === "*";
}
function mcpDeclName(line) {
  const text = line.trimStart();
  if (!text.startsWith(MCP_PREFIX2))
    return void 0;
  const rest = text.slice(MCP_PREFIX2.length);
  const sep = rest.indexOf(":");
  if (sep <= 0)
    return void 0;
  const name2 = rest.slice(0, sep);
  if (name2.length === 0)
    return void 0;
  for (const ch of name2) {
    if (!isDeclIdent(ch))
      return void 0;
  }
  return name2;
}
function isDeclIdent(ch) {
  return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || ch === "_";
}
function braceDelta(line) {
  return line.split("{").length - line.split("}").length;
}
function eraseMcpSdkDeclarations(text) {
  const lines = text.split("\n");
  const kept = [];
  let pending = [];
  let erased = 0;
  let depth = 0;
  const flushPending = () => {
    for (const line of pending)
      kept.push(line);
    pending = [];
  };
  for (const line of lines) {
    if (depth > 0) {
      depth += braceDelta(line);
      if (depth <= 0)
        depth = 0;
      continue;
    }
    if (isAttachableLine(line)) {
      pending.push(line);
      continue;
    }
    const name2 = mcpDeclName(line);
    if (name2 === void 0) {
      flushPending();
      kept.push(line);
      continue;
    }
    const after = line.slice(line.indexOf(":") + 1).trim();
    if (after === "unknown;") {
      pending = [];
      erased += 1;
      continue;
    }
    if (after === "{") {
      pending = [];
      erased += 1;
      depth = 1;
      continue;
    }
    flushPending();
    kept.push(line);
  }
  flushPending();
  return { text: kept.join("\n"), erased };
}
function startSdkErasure(args) {
  const { assemble: assemble2, logger } = args;
  const stats = { rounds: 0, declarations: 0 };
  return assemble2.onAssemble(async (_assembly, _context, next) => {
    const downstream = await next();
    if (!Array.isArray(downstream.sections))
      return downstream;
    let roundErased = 0;
    const nextSections = downstream.sections.map((section) => {
      if (typeof section !== "object" || section === null)
        return section;
      if (section.name !== SDK_SECTION_NAME || typeof section.text !== "string")
        return section;
      const result = eraseMcpSdkDeclarations(section.text);
      if (result.erased === 0)
        return section;
      roundErased += result.erased;
      return { ...section, text: result.text };
    });
    if (roundErased === 0)
      return downstream;
    stats.rounds += 1;
    stats.declarations += roundErased;
    logger.warn("dsh-mcp-manager: erased " + roundErased + " leaked mcp__ declaration(s) from tools:sdk (round " + stats.rounds + ", total " + stats.declarations + "; transient registration race, see #922)");
    return { ...downstream, sections: nextSections };
  });
}

// lib/server/workspace/interface.js
var interface_exports10 = {};
__export(interface_exports10, {
  MIDDLEWARE_GLOBAL_ROOT: () => MIDDLEWARE_GLOBAL_ROOT,
  SCOPE_GLOBAL: () => SCOPE_GLOBAL,
  SCOPE_PROJECT: () => SCOPE_PROJECT,
  bareServerName: () => bareServerName,
  findProjectRoot: () => findProjectRoot,
  fullServerName: () => fullServerName,
  makeResolveRoot: () => makeResolveRoot,
  makeServerIdTable: () => makeServerIdTable,
  normalizeScope: () => normalizeScope,
  normalizeToolName: () => normalizeToolName,
  normalizedProjectRoot: () => normalizedProjectRoot,
  parseFullServerName: () => parseFullServerName
});

// lib/server/workspace/impl/root-resolution/index.js
import { existsSync as existsSync9, realpathSync } from "node:fs";
import { dirname as dirname10, isAbsolute as isAbsolute2, join as join5, resolve as resolve3 } from "node:path";
function dshHomePath() {
  return resolve3(dshHome());
}
async function findProjectRoot(cwd) {
  const home = dshHomePath();
  let current = resolve3(cwd ?? process.cwd());
  for (let depth = 0; depth < 16; depth += 1) {
    const dotDsh = join5(current, ".dsh");
    const hasProjectDsh = existsSync9(dotDsh) && resolve3(dotDsh) !== home;
    if (existsSync9(join5(current, ".git")) || hasProjectDsh || existsSync9(join5(current, ".mcp.json"))) {
      return current;
    }
    const parent = dirname10(current);
    if (parent === current)
      break;
    current = parent;
  }
  return resolve3(cwd ?? process.cwd());
}
async function normalizedProjectRoot(cwd) {
  if (cwd === void 0 || cwd === null || cwd === "")
    return void 0;
  const root = await findProjectRoot(cwd);
  try {
    return realpathSync(root);
  } catch {
    return root;
  }
}
function readActiveDirectory(session, activeDirectory) {
  if (session === void 0 || session === null || activeDirectory === void 0) {
    return { state: "absent" };
  }
  try {
    return { state: "present", value: activeDirectory(session) };
  } catch {
    return { state: "absent" };
  }
}
function selectUsableDirectory(read) {
  if (read.state === "absent")
    return { state: "unusable" };
  if (typeof read.value !== "string")
    return { state: "unusable" };
  if (read.value.trim() === "")
    return { state: "unusable" };
  if (!isAbsolute2(read.value))
    return { state: "unusable" };
  return { state: "usable", path: read.value };
}
function makeResolveRoot(manager, activeDirectory) {
  return async (agent) => {
    if (typeof agent !== "object" || agent === null)
      return void 0;
    const session = agent.session;
    const active = readActiveDirectory(session, activeDirectory);
    const usable = selectUsableDirectory(active);
    const root = await normalizedProjectRoot(usable.state === "usable" ? usable.path : void 0);
    if (root !== void 0)
      return root;
    const globalServers = (await manager.projectServersFor(MIDDLEWARE_GLOBAL_ROOT) ?? []).filter((server) => server.enabled !== false);
    if (globalServers.length > 0)
      return MIDDLEWARE_GLOBAL_ROOT;
    return void 0;
  };
}

// lib/server/workspace/impl/full-name/index.js
function fullServerName(root, server) {
  return `@${root}/${server}`;
}
function parseFullServerName(name2) {
  if (!name2.startsWith("@"))
    return void 0;
  const slash = name2.lastIndexOf("/");
  if (slash <= 1 || slash === name2.length - 1)
    return void 0;
  const rawRoot = name2.slice(1, slash);
  const root = rawRoot === "global" || rawRoot === "@global" ? MIDDLEWARE_GLOBAL_ROOT : rawRoot;
  return { root, server: name2.slice(slash + 1) };
}
function bareServerName(name2) {
  const parsed = parseFullServerName(name2);
  return parsed?.server ?? name2;
}
function normalizeToolName(serverName, toolName, caller = "ws_mcp_call") {
  const prefix = `mcp__${serverName}__`;
  let name2 = toolName;
  if (name2.startsWith("mcp__")) {
    while (name2.startsWith(prefix))
      name2 = name2.slice(prefix.length);
    if (name2.startsWith("mcp__")) {
      throw new Error(`${caller}: tool 参数疑似其他 MCP server 的注册全名（${JSON.stringify(toolName)}，server="${serverName}"）；请传该 server 上的裸名`);
    }
  }
  return name2;
}

// lib/server/workspace/impl/scope/index.js
function normalizeScope(value) {
  return value === SCOPE_PROJECT ? SCOPE_PROJECT : SCOPE_GLOBAL;
}

// lib/server/workspace/impl/server-id/index.js
import { randomBytes as randomBytes7 } from "node:crypto";
var ATTEMPT_LIMIT = 64;
function defaultServerIdFactory() {
  return randomBytes7(9).toString("base64url");
}
function isUsableId(candidate) {
  return typeof candidate === "string" && SERVER_NAME_PATTERN.test(candidate);
}
function makeServerIdTable(options = {}) {
  const idFactory = options.idFactory ?? defaultServerIdFactory;
  const idByScope = /* @__PURE__ */ new Map();
  const assigned = /* @__PURE__ */ new Set();
  return {
    idFor(scope, name2) {
      let scopeTable = idByScope.get(scope);
      if (scopeTable === void 0) {
        scopeTable = /* @__PURE__ */ new Map();
        idByScope.set(scope, scopeTable);
      }
      const assignedId = scopeTable.get(name2);
      if (assignedId !== void 0)
        return assignedId;
      for (let attempt = 0; attempt < ATTEMPT_LIMIT; attempt += 1) {
        const candidate = idFactory();
        if (!isUsableId(candidate)) {
          throw new Error(`server id 生成器产出不满足 SERVER_NAME_PATTERN 的候选值：${JSON.stringify(candidate)}`);
        }
        if (assigned.has(candidate))
          continue;
        assigned.add(candidate);
        scopeTable.set(name2, candidate);
        return candidate;
      }
      throw new Error(`server id 分配失败：${ATTEMPT_LIMIT} 次候选值均与已分配 id 冲突（scope=${scope}，name=${name2}）`);
    },
    has(scope, name2) {
      return idByScope.get(scope)?.has(name2) ?? false;
    }
  };
}

// lib/index.js
installCatalog({ store: interface_exports8, connection: interface_exports6, workspace: interface_exports10 });
installPipeline({ workspace: interface_exports10 });
installInject({
  catalog: interface_exports,
  runtime: interface_exports6,
  pipeline: interface_exports5,
  workspace: interface_exports10
});
installOrchestrator({
  catalog: interface_exports,
  configModel: interface_exports2,
  configStore: interface_exports8,
  runtime: interface_exports6,
  lifecycle: interface_exports4,
  pipeline: interface_exports5,
  stats: interface_exports7,
  workspace: interface_exports10,
  upgrade: interface_exports9
});
installRuntime({
  catalog: interface_exports,
  configEnv: interface_exports2,
  dispatch: interface_exports3,
  lifecycle: interface_exports4,
  pipeline: interface_exports5,
  workspace: interface_exports10
});
installApi({ workspace: interface_exports10, configModel: interface_exports2 });
var name = "mcp-manager";
var inject = ["tools", "webServer", "systemPrompt"];
var MCP_GUIDANCE = "dsh-mcp-manager is active: centrally manages MCP server connections without preset servers. MCP tools execute on real servers with inherited host permissions; results may contain sensitive data — explain and obtain user consent before write or sensitive operations. Terms like 'MCP / context server' refer to this plugin. Invocation rules:\n- Project-level servers: search with `ws_mcp_search`, verify schema with `ws_mcp_detail` if uncertain, then invoke with `ws_mcp_call`. Do NOT call mcp__ prefixed tools directly. mcp__ tools are normally hidden from your tool list; if any mcp__ declarations transiently appear inside the SDK, treat them as hidden and keep routing through `ws_mcp_*`.\n- Global servers: reach them the same way — `ws_mcp_call` addressed by full name `@global/<server>` (project-level servers use `@<root>/<server>`); read the full name from `ws_mcp_list` / `ws_mcp_search`. The `mcp__`-prefixed tools are normally not in your tool list and must never be called directly — a transient appearance inside SDK declarations during connection changes does not authorize direct calls.\n- Do not retry a failing server tool more than twice.";
function resolveStorePath(config) {
  return typeof config?.storePath === "string" && config.storePath !== "" ? config.storePath : defaultStorePath();
}
function resolveDebugConfig(config, settingsSource) {
  const settings = typeof settingsSource === "object" && settingsSource !== null ? settingsSource.debug : void 0;
  const rawDebug = typeof settings === "object" && settings !== null ? settings : config?.debug;
  return {
    callStats: rawDebug?.callStats === true,
    statsFile: typeof rawDebug?.statsFile === "string" ? rawDebug.statsFile : ""
  };
}
function resolveApplyOptions(config, settingsSource) {
  const announceCatalog = config?.announceCatalog ?? DEFAULT_ANNOUNCE_CATALOG;
  const catalogMaxEntries = Number.isFinite(config?.catalogMaxEntries) && config?.catalogMaxEntries > 0 ? Math.floor(config?.catalogMaxEntries) : DEFAULT_CATALOG_MAX_ENTRIES;
  return {
    enabled: config?.enabled !== false,
    announceToAgent: config?.announceToAgent !== false,
    announceCatalog,
    catalogMaxEntries,
    debug: resolveDebugConfig(config, settingsSource)
  };
}
function installConfigSettings(ctx, manager, config, syncFromSettings) {
  const broadcastUiConfigChanged = () => {
    manager.sseHub?.broadcast(uiConfigChangedFrame());
  };
  installSettingsNamespace(ctx, MCP_MANAGER_IDENTITY.settingsNamespace, Config, config ?? {}, {
    setSource: (source) => {
      manager.uiConfigSource = source;
    },
    onScope: (scope) => {
      const uiScope = scope;
      manager.uiUpdate = (patch) => uiScope.update(patch);
    },
    onChange: () => {
      broadcastUiConfigChanged();
      syncFromSettings();
    }
  });
}
function provideMcpManagerService(ctx, manager) {
  if (typeof ctx.provide !== "function")
    return;
  ctx.provide("mcpManager", {
    // 注入面（内存态不落盘，同名幂等；toolDefinitions 可选封装定义透传 supervisor）
    registerServer: (server) => manager.registerServer(server),
    unregisterServer: (name2) => manager.unregisterServer(name2),
    // 控制面（通用 MCP 生命周期：注册即连、注销即断的补充控制）
    connect: (name2, scope) => manager.connect(name2, scope),
    disconnect: (name2, scope) => manager.disconnect(name2, scope),
    reconnect: (name2, scope) => manager.reconnect(name2, scope),
    // 查询面（服务状态感知：连接状态 / 工具列表 / 全量摘要）
    getStatus: (name2) => {
      const servers = manager.summary().servers ?? [];
      const found = servers.find((s) => s.name === name2);
      if (found === void 0)
        return void 0;
      return found;
    },
    getTools: (name2) => {
      return manager.registeredToolsFor(name2);
    },
    // 豁免（#770-14 E）：同上，summary() 宽面经 unknown 中转到 McpServerSummary[]；不断言改动、不重构类型。
    list: () => manager.summary().servers ?? []
  });
}
function collectCallTimeoutSources(manager, mw) {
  const sources = [];
  for (const unit of mw.units.values()) {
    for (const entry of unit.connections.values()) {
      sources.push(entry.server.toolCallTimeoutMs);
    }
  }
  for (const server of manager.runtimeRegistry.values()) {
    sources.push(server.toolCallTimeoutMs);
  }
  return sources;
}
function registerMiddlewareAndGuard(ctx, manager, mw, resolveRoot, faces) {
  const resolveServerId = (id) => manager.serverNameForId(id);
  const callTimeoutMs = resolveMiddlewareCallTimeoutMs(collectCallTimeoutSources(manager, mw));
  const disposeTools = registerMiddlewareTools(
    ctx,
    mw,
    resolveRoot,
    {
      disabledTools: manager.disabledTools,
      stats: manager.stats,
      resolveServerId,
      callTimeoutMs
    },
    // 图片准入的两条晚读 thunk（第 5 个位置参数：options 袋里加键会改导出面声明块）。
    faces === void 0 ? void 0 : { attachments: faces.attachments, models: faces.models }
  );
  return () => {
    disposeTools();
  };
}
function registerCatalogInjection(ctx, manager, catalogMaxEntries, activeDirectory) {
  return ctx.on("agent/pre-step", async ({ agent, messages, signal }, next) => {
    const decision = await next();
    signal.throwIfAborted();
    const activeCwd = agent === void 0 || agent === null ? void 0 : activeDirectory(agent.session);
    const supervisors = await manager.catalogServersFor(activeCwd);
    const catalogView = await manager.catalogViewFor(activeCwd, supervisors);
    return resolveCatalogInjection(decision, messages, supervisors, catalogMaxEntries, catalogView, agent);
  });
}
function setupRoutesAndBroadcast(ctx, manager) {
  const remoteAdmission = liveConnectionAdmission(ctx);
  const remotePeerAdmission = liveConnectionPeerAdmission(ctx);
  const routes = makeRoutesWithAccess(manager, void 0, { remoteAdmission });
  const eventsRoute = makeEventsRouteWithAccess(manager, { remotePeerAdmission });
  const healthRoute = makeHealthRouteWithAccess(manager, { remoteAdmission });
  const disposers = [...routes, eventsRoute, healthRoute].map((route) => ctx.webServer.register(route));
  const unsubscribeStatus = manager.onStatus(() => {
    manager.sseHub?.broadcast(sseData({ type: SSE_FRAMES.summary }));
  });
  return () => {
    unsubscribeStatus();
    for (const dispose of disposers)
      dispose();
    manager.sseHub?.dispose();
    manager.sseHub = void 0;
  };
}
async function setupConfigWatchersAsync(manager) {
  try {
    const fs = await import("node:fs");
    const watchers = [];
    const watched = /* @__PURE__ */ new Set();
    const watchConfig = (dir) => {
      if (watched.has(dir))
        return;
      watched.add(dir);
      let busy = false;
      let rerun = false;
      const run = () => {
        if (busy) {
          rerun = true;
          return;
        }
        busy = true;
        void (async () => {
          try {
            await manager.refreshFromDisk();
          } finally {
            busy = false;
            if (rerun) {
              rerun = false;
              run();
            }
          }
        })();
      };
      try {
        const watcher = fs.watch(dir, { persistent: false }, () => run());
        watcher.on("error", () => {
          const index = watchers.indexOf(watcher);
          if (index >= 0)
            watchers.splice(index, 1);
          try {
            watcher.close();
          } catch {
          }
        });
        watchers.push(watcher);
      } catch {
      }
    };
    watchConfig(dirname11(manager.store.path));
    if (manager.projectStore !== void 0)
      watchConfig(dirname11(manager.projectStore.path));
    const unwatchProject = manager.onStatus(() => {
      if (manager.projectStore !== void 0)
        watchConfig(dirname11(manager.projectStore.path));
    });
    return () => {
      unwatchProject();
      for (const watcher of watchers.splice(0)) {
        try {
          watcher.close();
        } catch {
        }
      }
    };
  } catch {
    return () => {
    };
  }
}
function explicitConfigPaths(config) {
  const debug = typeof config?.debug === "object" && config.debug !== null ? config.debug : void 0;
  return {
    storePath: typeof config?.storePath === "string" ? config.storePath : "",
    statsFile: typeof debug?.statsFile === "string" ? debug.statsFile : ""
  };
}
var MCP_SECTION_ORDER = 160;
async function apply(ctx, config) {
  const options = resolveApplyOptions(config);
  const explicitPaths = explicitConfigPaths(config);
  releaseUpgrade();
  await installUpgrade({
    logger: ctx.logger,
    storePath: explicitPaths.storePath
  });
  const host = bindHost(ctx);
  const serverIds = makeServerIdTable();
  releaseLifecycle();
  installLifecycle({
    loader: host.loader,
    tools: host.tools,
    pipeline: interface_exports5,
    workspace: serverIds,
    config: interface_exports2,
    logs: host.logs
  });
  const store = new McpStore(resolveStorePath(config));
  await store.load();
  const manager = new McpManager(ctx, store);
  provideMcpManagerService(ctx, manager);
  const syncFromSettings = () => {
    const source = manager.uiConfigSource();
    const debugCfg = resolveDebugConfig(config, source);
    manager.stats.configure({
      enabled: debugCfg.callStats,
      filePath: debugCfg.statsFile || void 0,
      logger: manager.logger
    });
  };
  installConfigSettings(ctx, manager, config, syncFromSettings);
  manager.stats.configure({
    enabled: options.debug.callStats,
    filePath: options.debug.statsFile || void 0,
    logger: manager.logger
  });
  let runtime = {
    disposeRoutes: () => {
    },
    disposeSection: () => {
    },
    disposeInjection: () => {
    },
    disposeMiddleware: () => {
    },
    disposeVisibility: () => {
    },
    disposeErasure: () => {
    },
    disposeCatalogInvalidation: () => {
    },
    watchCleanup: () => {
    }
  };
  if (options.enabled) {
    runtime = await assembleEnabledRuntime(ctx, manager, options, syncFromSettings, host);
  }
  ctx.effect(() => () => {
    runtime.disposeInjection();
    runtime.disposeSection();
    void runtime.disposeRoutes();
    runtime.disposeMiddleware();
    runtime.disposeVisibility();
    runtime.disposeErasure();
    runtime.disposeCatalogInvalidation();
    runtime.watchCleanup();
    void manager.dispose();
    releaseLifecycle();
    void mountLedger.flushDisposals().catch((error) => {
      ctx.logger.warn(`dsh-mcp-manager: flush loader disposals failed: ${String(error)}`);
    });
    releaseUpgrade();
  }, "dsh-mcp-manager: dispose");
}
async function assembleEnabledRuntime(ctx, manager, options, syncFromSettings, faces) {
  const activeDirectory = faces.workingDirectory();
  const resolveRoot = makeResolveRoot(manager, activeDirectory);
  let currentMiddlewareDispose = () => {
  };
  const mw = await manager.initMiddleware();
  let currentCallTimeoutMs = resolveMiddlewareCallTimeoutMs(collectCallTimeoutSources(manager, mw));
  currentMiddlewareDispose = registerMiddlewareAndGuard(ctx, manager, mw, resolveRoot, faces);
  let callTimeoutWatched = true;
  const refreshCallTimeout = () => {
    if (!callTimeoutWatched)
      return;
    const next = resolveMiddlewareCallTimeoutMs(collectCallTimeoutSources(manager, mw));
    if (next === currentCallTimeoutMs)
      return;
    currentCallTimeoutMs = next;
    currentMiddlewareDispose();
    currentMiddlewareDispose = registerMiddlewareAndGuard(ctx, manager, mw, resolveRoot, faces);
  };
  {
    const origAdd = manager.add.bind(manager);
    manager.add = (async (...args) => {
      const created = await origAdd(...args);
      refreshCallTimeout();
      return created;
    });
    const origUpdate = manager.update.bind(manager);
    manager.update = (async (...args) => {
      const updated = await origUpdate(...args);
      refreshCallTimeout();
      return updated;
    });
    const origRemove = manager.remove.bind(manager);
    manager.remove = (async (...args) => {
      await origRemove(...args);
      refreshCallTimeout();
    });
    const origRegisterServer = manager.registerServer.bind(manager);
    manager.registerServer = (async (...args) => {
      const result = await origRegisterServer(...args);
      refreshCallTimeout();
      return result;
    });
    const origUnregisterServer = manager.unregisterServer.bind(manager);
    manager.unregisterServer = (async (...args) => {
      await origUnregisterServer(...args);
      refreshCallTimeout();
    });
    const origStart = manager.start.bind(manager);
    manager.start = ((...args) => {
      origStart(...args);
      refreshCallTimeout();
    });
    const origEvict = mw.evictIfNeeded.bind(mw);
    mw.evictIfNeeded = ((...args) => {
      origEvict(...args);
      refreshCallTimeout();
    });
  }
  const timeoutStatusUnsub = manager.onStatus(() => {
    refreshCallTimeout();
  });
  const disposeVisibility = startAgentVisibility({
    events: faces.events,
    units: mw.units,
    registeredNames: () => faces.tools.schemas().map((schema) => schema.name),
    logger: faces.logger
  });
  const disposeErasure = startSdkErasure({
    assemble: {
      onAssemble: (handler) => ctx.on("system-prompt/assemble", handler)
    },
    logger: faces.logger
  });
  const disposeCatalogInvalidation = faces.events.onToolsChange(() => {
    void mw.reprojectCatalogs().catch((error) => {
      faces.logger.warn(`dsh-mcp-manager: catalog reprojection failed: ${String(error)}`);
    });
  });
  await manager.startAll();
  await manager.loadCatalogCache();
  manager.reconcileServers();
  manager.logger.info("dsh-mcp-manager: middleware assembled (single pool, all servers via middleware)");
  syncFromSettings();
  let disposeInjection = () => {
  };
  if (options.announceCatalog) {
    disposeInjection = registerCatalogInjection(
      ctx,
      manager,
      options.catalogMaxEntries,
      // 同一次装配内与 resolveRoot 共用同一个读取面（口径必须一致，否则目录注入与
      // 工具路由会在「活动目录缺失」时给出两套答案）。缺席时退化为无活动目录的闭包。
      activeDirectory ?? (() => void 0)
    );
  }
  const disposeRoutes = ctx.effect(() => setupRoutesAndBroadcast(ctx, manager), "dsh-mcp-manager: routes");
  const watchCleanup = await setupConfigWatchersAsync(manager);
  let disposeSection = () => {
  };
  if (options.announceToAgent) {
    disposeSection = ctx.systemPrompt.section({
      name: "plugin:dsh-mcp-manager",
      order: MCP_SECTION_ORDER,
      text: MCP_GUIDANCE
    });
  }
  return {
    disposeRoutes,
    disposeSection,
    disposeInjection,
    // 闭包读当前值：refresh 重建后卸载必须拆最新一次注册（值捕获会漏拆）；同时退订
    // 超时订阅并冻结后续刷新（防卸载后方法织入复活注册）。
    disposeMiddleware: () => {
      callTimeoutWatched = false;
      timeoutStatusUnsub();
      currentMiddlewareDispose();
    },
    disposeVisibility,
    disposeErasure,
    disposeCatalogInvalidation,
    watchCleanup
  };
}
export {
  CATALOG_SECTION_NAME,
  CATALOG_SOURCE_PLUGIN,
  Config,
  DEFAULT_ANNOUNCE_CATALOG,
  DEFAULT_CATALOG_MAX_ENTRIES,
  DEFAULT_TOOL_CALL_TIMEOUT_MS,
  DEFAULT_UI_CONFIG,
  MCP_GUIDANCE,
  MCP_SECTION_ORDER,
  MIDDLEWARE_GLOBAL_ROOT,
  ROUTES,
  SCOPE_GLOBAL,
  SCOPE_PROJECT,
  SERVER_NAME_PATTERN,
  SSE_PING_FRAME,
  apply,
  broadcastFrame,
  buildConfigUiPatch,
  createRedactor,
  defaultStatsPath,
  defaultStorePath,
  findCatalogMessage,
  fromClaudeEntry,
  inject,
  isCatalogSource,
  makeEventsRoute,
  makeHealthRoute,
  makeResolveRoot,
  makeRoutes,
  name,
  normalizeServer,
  normalizeUiConfig,
  parseClaudeJson,
  publicToolName,
  readCatalogEntries,
  registerMiddlewareTools,
  renderMcpCatalogMessage,
  renderMcpCatalogUpdate,
  resolveCatalogEntries,
  resolveCatalogInjection,
  resolveDebugConfig,
  uiConfigChangedFrame
};
