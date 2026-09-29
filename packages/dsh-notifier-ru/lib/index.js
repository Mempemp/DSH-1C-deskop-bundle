import { createRequire as __notifierRequire } from "node:module";
const require = __notifierRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/identity.js"(exports) {
    "use strict";
    var ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
    var DOC = /* @__PURE__ */ Symbol.for("yaml.document");
    var MAP = /* @__PURE__ */ Symbol.for("yaml.map");
    var PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
    var SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
    var SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
    var NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    var identity = require_identity();
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name2 = parts.shift();
        switch (name2) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name2}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name2 = `${prefix}${i}`;
        if (!exclude.has(name2))
          return name2;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          prevAnchors ?? (prevAnchors = anchorNames(doc));
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports.NodeBase = NodeBase;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc, ctx) {
        if (ctx?.maxAliasCount === 0)
          throw new ReferenceError("Alias resolution is disabled");
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit.visit(doc, {
            Node: (_key, node) => {
              if (identity.isAlias(node) || identity.hasAnchor(node))
                nodes.push(node);
            }
          });
          if (ctx)
            ctx.aliasResolveCache = nodes;
        }
        let found = void 0;
        for (const node of nodes) {
          if (node === this)
            break;
          if (node.anchor === this.source)
            found = node;
        }
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data = anchors2.get(source);
        if (!data) {
          toJS.toJS(source, null, ctx);
          data = anchors2.get(source);
        }
        if (data?.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          ref.anchor ?? (ref.anchor = onAnchor(value));
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      if (lineWidth < minContentWidth)
        minContentWidth = 0;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i, indent.length);
          end = i + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i, indent) {
      let end = i;
      let start = i + 1;
      let ch = text[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent) {
          ch = text[++i];
        } else {
          do {
            ch = text[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text[start];
        }
      }
      return end;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (!literal) {
        const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
          foldOptions.onOverflow = () => {
            literalFallback = true;
          };
        }
        const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
          return `>${header}
${indent}${body}`;
      }
      value = value.replace(/\n+/g, `$&${indent}`);
      return `|${header}
${indent}${start}${value}${end}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        let match = tags.filter((t) => t.identify?.(obj));
        if (match.length > 1) {
          const testMatch = match.filter((t) => t.test);
          if (testMatch.length > 0)
            match = testMatch;
        }
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name2 = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
        throw new Error(`Tag not resolved for ${name2} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n" && valueComment)
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    var node_process = __require("process");
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof node_process.emitWarning === "function")
          node_process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/merge.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var MERGE_KEY = "<<";
    var merge = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    var isMergeKey = (ctx, key) => (merge.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
    function addMergeToJSMap(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (identity.isSeq(source))
        for (const it of source.items)
          mergeValue(ctx, map, it);
      else if (Array.isArray(source))
        for (const it of source)
          mergeValue(ctx, map, it);
      else
        mergeValue(ctx, map, source);
    }
    function mergeValue(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function resolveAliasValue(ctx, value) {
      return ctx && identity.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
    }
    exports.addMergeToJSMap = addMergeToJSMap;
    exports.isMergeKey = isMergeKey;
    exports.merge = merge;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    var log = require_log();
    var merge = require_merge();
    var stringify = require_stringify();
    var identity = require_identity();
    var toJS = require_toJS();
    function addPairToJSMap(ctx, map, { key, value }) {
      if (identity.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
      else if (merge.isMergeKey(ctx, key))
        merge.addMergeToJSMap(ctx, map, value);
      else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
        if (i < items.length - 1) {
          str += ",";
        } else if (ctx.options.trailingComma) {
          if (ctx.options.lineWidth > 0) {
            reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
          }
          if (reqNewline) {
            str += ",";
          }
        }
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str}
${indent}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports.map = map;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports.seq = seq;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    var node_buffer = __require("buffer");
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof node_buffer.Buffer === "function") {
          return node_buffer.Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
          return "";
        const buf = value;
        let str;
        if (typeof node_buffer.Buffer === "function") {
          str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      merge.merge,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      merge: merge.merge,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:merge": merge.merge,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName, addMergeTag) {
      const schemaTags = schemas.get(schemaName);
      if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge.merge) ? schemaTags.concat(merge.merge) : schemaTags.slice();
      }
      let tags = schemaTags;
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      if (addMergeTag)
        tags = tags.concat(merge.merge);
      return tags.reduce((tags2, tag) => {
        const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
        if (!tagObj) {
          const tagName = JSON.stringify(tag);
          const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags2.includes(tagObj))
          tags2.push(tagObj);
        return tags2;
      }, []);
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name2) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name2 || prev.has(name2) ? anchors.findNewAnchor(name2 || "a", prev) : name2;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name2, pos, code, message) {
        super();
        this.name = name2;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "…" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "…";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "…\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let reqSpace = false;
      let tab = null;
      let anchor = null;
      let tag = null;
      let newlineAfterProp = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        if (tab) {
          if (atNewline && token.type !== "comment" && token.type !== "newline") {
            onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
          }
          tab = null;
        }
        switch (token.type) {
          case "space":
            if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
              tab = token;
            }
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else if (!found || indicator !== "seq-item-ind")
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              newlineAfterProp = token;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          // else fallthrough
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      }
      if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports.mapIncludes = mapIncludes;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: bm.indent,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: bm.indent,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          parentIndent: bs.indent,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value?.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop: for (const st of start) {
              switch (st.type) {
                case "comma":
                case "space":
                  break;
                case "comment":
                  prevItemComment = st.source.substring(1);
                  break loop;
                default:
                  break loop;
              }
            }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          ctx.atKey = true;
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          ctx.atKey = false;
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source?.[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            const endRange = (valueNode ?? keyNode).range;
            map.range = [keyNode.range[0], endRange[1], endRange[2]];
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name2 = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name2} must end with a ${expectedEnd}` : `${name2} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, props, onError) {
      const tagToken = props.tag;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (token.type === "block-seq") {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
          const message = "Missing newline after block sequence props";
          onError(lastProp, "MISSING_CHAR", message);
        }
      }
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(ctx, scalar, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          if (trimIndent === 0 && !ctx.atRoot) {
            const message = "Block scalar values in collections must be indented";
            onError(offset, "BAD_INDENT", message);
          }
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          // fallthrough
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          /* istanbul ignore next should not happen */
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        /* istanbul ignore next should not happen */
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        /* istanbul ignore next should not happen */
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = next === "x" ? 2 : next === "u" ? 4 : 8;
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "",
      // Unicode next line
      _: " ",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      try {
        return String.fromCodePoint(code);
      } catch {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      let tag;
      if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity.SCALAR];
      } else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
      else if (token.type === "scalar")
        tag = findScalarTagByTest(ctx, value, token, onError);
      else
        tag = ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        pos ?? (pos = before.length);
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const atKey = ctx.atKey;
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          try {
            node = composeCollection.composeCollection(CN, ctx, token, props, onError);
            if (anchor)
              node.anchor = anchor.source.substring(1);
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            onError(token, "RESOURCE_EXHAUSTION", message);
          }
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          isSrcToken = false;
        }
      }
      node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
        const msg = "With stringKeys, all keys must be strings";
        onError(tag ?? token, "NON_STRING_KEY", msg);
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    var node_process = __require("process");
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          for (let i = 0; i < this.errors.length; ++i)
            doc.errors.push(this.errors[i]);
          for (let i = 0; i < this.warnings.length; ++i)
            doc.warnings.push(this.warnings[i]);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (node_process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports.visit = visit;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = new Set("0123456789ABCDEFabcdef");
    var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    var flowIndicatorChars = new Set(",[]{}");
    var invalidAnchorChars = new Set(" ,[]{}\n\r	");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string")
            throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return "block-start";
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          // fallthrough
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          // fallthrough
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
          switch (ch) {
            case " ":
              indent += 1;
              break;
            case "\n":
              nl = i2;
              indent = 0;
              break;
            case "\r": {
              const next = this.buffer[i2 + 1];
              if (!next && !this.atEnd)
                return this.setNext("block-scalar");
              if (next === "\n")
                break;
            }
            // fallthrough
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === " ")
          ch = this.buffer[++i];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
            ch = this.buffer[++i];
          nl = i - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r")
              ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " ")
              ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
              nl = i2;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        let n = 0;
        loop: while (true) {
          switch (this.charAt(0)) {
            case "!":
              n += yield* this.pushTag();
              n += yield* this.pushSpaces(true);
              continue loop;
            case "&":
              n += yield* this.pushUntil(isNotAnchorChar);
              n += yield* this.pushSpaces(true);
              continue loop;
            case "-":
            // this is an error
            case "?":
            // this is an error outside flow collections
            case ":": {
              const inFlow = this.flowLevel > 0;
              const ch1 = this.charAt(1);
              if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
                if (!inFlow)
                  this.indentNext = this.indentValue + 1;
                else if (this.flowKey)
                  this.flowKey = false;
                n += yield* this.pushCount(1);
                n += yield* this.pushSpaces(true);
                continue loop;
              }
            }
          }
          break loop;
        }
        return n;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.has(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports.Lexer = Lexer;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    var node_process = __require("process");
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop: while (--i >= 0) {
        switch (prev[i].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function arrayPushArray(target, source) {
      if (source.length < 1e5)
        Array.prototype.push.apply(target, source);
      else
        for (let i = 0; i < source.length; ++i)
          target.push(source[i]);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                arrayPushArray(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              arrayPushArray(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && top?.type !== "doc-end") {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            /* istanbul ignore next should not happen */
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start, explicitKey: true });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: true }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top?.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, explicitKey: true }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          // fallthrough
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var identity = require_identity();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      if (identity.isDocument(value) && !_replacer)
        return value.toString(options);
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});

// ../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity.isAlias;
    exports.isCollection = identity.isCollection;
    exports.isDocument = identity.isDocument;
    exports.isMap = identity.isMap;
    exports.isNode = identity.isNode;
    exports.isPair = identity.isPair;
    exports.isScalar = identity.isScalar;
    exports.isSeq = identity.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});

// ../../shared/loopback.js
function isLoopbackPeerAddress(request) {
  const address = request.socket?.remoteAddress;
  return address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
}
function loopbackHostUrlOf(request) {
  const host = request.headers.host;
  if (typeof host !== "string") return void 0;
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
  if (request.headers["sec-fetch-site"] !== "cross-site") return true;
  return options.allowCrossSiteNoCors === true && request.headers["sec-fetch-mode"] === "no-cors";
}
function isLoopbackRequest(request, options = {}) {
  if (!isLoopbackPeerAddress(request)) return false;
  const hostUrl = loopbackHostUrlOf(request);
  if (hostUrl === void 0) return false;
  if (!crossSiteRequestAllowed(request, options)) return false;
  const origin = request.headers.origin;
  if (origin === void 0) return true;
  try {
    return new URL(origin).host === hostUrl.host;
  } catch {
    return false;
  }
}

// lib/shared/tones.js
var FOLLOW_SYSTEM_TONE = "default";
var TONES = {
  [FOLLOW_SYSTEM_TONE]: {
    notes: [
      { freq: 880, at: 0, dur: 0.16 },
      { freq: 660, at: 0.16, dur: 0.22 }
    ],
    linuxFile: ["message-new-instant.oga"],
    darwinSound: "Glass",
    win32File: ["Windows Notify System Generic.wav", "Windows Ding.wav"]
  },
  ding: {
    notes: [
      { freq: 1318, at: 0, dur: 0.14 },
      { freq: 1760, at: 0.16, dur: 0.22 }
    ],
    linuxFile: ["message-new-instant.oga"],
    darwinSound: "Glass",
    win32File: ["Windows Ding.wav"]
  },
  bell: {
    notes: [{ freq: 880, at: 0, dur: 0.5 }],
    linuxFile: ["bell.oga"],
    darwinSound: "Tink",
    win32File: ["Windows Chimes.wav"]
  },
  chime: {
    notes: [
      { freq: 660, at: 0, dur: 0.3 },
      { freq: 880, at: 0.15, dur: 0.3 },
      { freq: 1320, at: 0.3, dur: 0.5 }
    ],
    linuxFile: ["complete.oga", "dialog-information.oga"],
    darwinSound: "Sosumi",
    win32File: ["Windows Chord.wav", "Windows Notify System Generic.wav"]
  },
  pop: {
    notes: [{ freq: 392, at: 0, dur: 0.12, type: "triangle" }],
    linuxFile: ["message.oga", "dialog-information.oga"],
    darwinSound: "Pop",
    win32File: ["Windows Balloon.wav", "Windows Notify System Generic.wav"]
  }
};

// lib/shared/sounds.js
var SOUND_ID_LIST = ["ding", "bell", "chime", "pop"];
function isSoundId(value) {
  return typeof value === "string" && SOUND_ID_LIST.includes(value);
}

// lib/shared/kinds.js
var BUILTIN_KINDS = [
  "ask",
  "question",
  "done",
  "subagent-done",
  "error",
  "turn-end",
  "test"
];
function isBuiltinKind(kind) {
  return BUILTIN_KINDS.includes(kind);
}
var KIND_SEVERITY = {
  ask: "warning",
  question: "info",
  done: "success",
  "subagent-done": "info",
  error: "failure",
  "turn-end": "info",
  test: "info"
};
var NOTIFY_SEVERITIES = [
  "info",
  "success",
  "warning",
  "failure"
];
function isNotifySeverity(value) {
  return NOTIFY_SEVERITIES.includes(value);
}
var KIND_SWITCHES = {
  ask: "notifyAsk",
  question: "notifyQuestion",
  done: "notifyTaskDone",
  "subagent-done": "notifySubagentDone",
  error: "notifyTaskError",
  "turn-end": "notifyTurnEnd"
};

// lib/shared/channels.js
var BUILTIN_CHANNELS = { browser: "browser", system: "system" };
var BUILTIN_CHANNEL_TYPES = [
  "browser",
  "system"
];
function isBuiltinChannelType(value) {
  return typeof value === "string" && BUILTIN_CHANNEL_TYPES.includes(value);
}
function channelIdFor(channel) {
  return String(channel.type || "") + ":" + String(channel.id || "");
}
function channelIdOf(channel) {
  const type = String(channel.type || "");
  return isBuiltinChannelType(type) ? type : channelIdFor(channel);
}

// lib/shared/webhooks.js
var WEBHOOK_PRESETS = ["ntfy", "gotify", "custom"];
var WEBHOOK_DEFAULT_TEMPLATES = {
  ntfy: '{\n  "topic": "<topic>",\n  "title": "{{title}}",\n  "message": "{{message}}",\n  "tags": ["{{kind}}"],\n  "priority": "{{priority}}"\n}',
  gotify: '{\n  "title": "{{title}}",\n  "message": "{{message}}",\n  "priority": "{{priority}}"\n}',
  raw: '{\n  "event": "{{kind}}",\n  "title": "{{title}}",\n  "body": "{{message}}",\n  "severity": "{{severity}}",\n  "ts": {{ts}}\n}'
};
var WEBHOOK_PRIORITY = {
  ntfy: { failure: "urgent", warning: "high", success: "low", info: "default" },
  gotify: { failure: "9", warning: "7", success: "3", info: "3" },
  raw: { failure: "failure", warning: "warning", success: "success", info: "info" }
};
var WEBHOOK_AUTHS = ["none", "bearer", "basic", "header"];
function deliveryPresetOf(preset) {
  return preset === "custom" ? "raw" : preset;
}

// lib/shared/reason-codes.js
var REASON_LEGACY = "reasonLegacy";

// lib/shared/quiet.js
var QUIET_WINDOWS_LIMIT = 5;
var CLOCK_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
function isClockText(text) {
  return CLOCK_RE.test(text);
}
function clockToMinutes(text) {
  const match = /^(\d{2}):(\d{2})$/.exec(text);
  if (match === null)
    return NaN;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59)
    return NaN;
  return hours * 60 + minutes;
}
function inWindowMinutes(minutes, start, end) {
  const from = clockToMinutes(start);
  const to = clockToMinutes(end);
  if (Number.isNaN(from) || Number.isNaN(to))
    return false;
  if (from === to)
    return false;
  if (from < to)
    return minutes >= from && minutes < to;
  return minutes >= from || minutes < to;
}

// lib/shared/refusal.js
var REFUSAL_CODES = {
  /** 非回环来源 (含 Host 头不是回环): 回环围栏拒绝. */
  FORBIDDEN_LOOPBACK: "FORBIDDEN_LOOPBACK",
  /** 方法不在端点的方法表里: 方法围栏拒绝. */
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED"
};

// lib/shared/disposers.js
function createDisposerStack() {
  const teardowns = [];
  let attached = false;
  let released = false;
  let report;
  function run2(teardown) {
    try {
      teardown();
    } catch (error) {
      report?.(error);
    }
  }
  function release() {
    if (released)
      return;
    released = true;
    for (const teardown of teardowns.splice(0).reverse())
      run2(teardown);
  }
  function enqueue(teardown) {
    if (released) {
      run2(teardown);
      return;
    }
    teardowns.push(teardown);
  }
  return {
    own: enqueue,
    acquire(make, release2) {
      const value = make();
      enqueue(() => release2(value));
      return value;
    },
    attach(host, id, onError) {
      if (attached) {
        throw new Error("createDisposerStack: attach вызывается один раз (повторная запись оставит первую версию без освобождения)");
      }
      attached = true;
      report = onError;
      host.effect(() => () => release(), id);
    }
  };
}

// lib/server/api/impl/route/index.js
function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...headers
  });
  res.end(JSON.stringify(body));
}
function sendFailure(res, status, failure, headers = {}) {
  sendJson(res, status, { ok: false, error: failure }, headers);
}
function sendRefused(res, status, code, reason2, headers = {}) {
  sendJson(res, status, { error: reason2, code, status }, headers);
}
function registerEndpoints(register, endpoints, logger) {
  const disposers = [];
  for (const endpoint of endpoints) {
    disposers.push(register({
      kind: "exact",
      path: endpoint.path,
      handler: (req, res) => {
        if (!isLoopbackRequest(req)) {
          sendRefused(res, 403, REFUSAL_CODES.FORBIDDEN_LOOPBACK, "forbidden: loopback-only");
          return;
        }
        const handle = endpoint.methods[req.method ?? ""];
        if (handle === void 0) {
          sendRefused(res, 405, REFUSAL_CODES.METHOD_NOT_ALLOWED, `method not allowed: ${req.method}`, {
            allow: Object.keys(endpoint.methods).join(", ")
          });
          return;
        }
        try {
          const done = handle(req, res);
          if (done instanceof Promise) {
            done.catch((cause) => {
              reportFailure(res, logger, cause instanceof Error ? cause.message : String(cause));
            });
          }
        } catch (cause) {
          reportFailure(res, logger, cause instanceof Error ? cause.message : String(cause));
        }
      }
    }));
  }
  return disposers;
}
function reportFailure(res, logger, reason2) {
  logger.warn(`dsh-notifier: сбой обработки браузерной точки — ${reason2}`);
  if (!res.headersSent)
    sendFailure(res, 500, { error: reason2 });
}

// lib/server/api/impl/journal/index.js
var JournalEndpoints = class {
  stores;
  constructor(stores) {
    this.stores = stores;
  }
  /** GET /history: 最近记录 (截断与倒序由客户端做, 它要的条数由界面决定). */
  read = async (_req, res) => {
    sendJson(res, 200, { ok: true, records: await this.stores.readHistory() });
  };
  /** DELETE /history: 清空, 返回被清空条数 (键名 `removed` 是客户端锁定的契约). */
  clear = async (_req, res) => {
    sendJson(res, 200, { ok: true, removed: await this.stores.clearHistory() });
  };
  /** GET /status: 各频道最近一次投递终态. */
  readStatus = async (_req, res) => {
    sendJson(res, 200, { ok: true, channels: await this.stores.readStatus() });
  };
};

// ../../shared/host-utils.js
import { Buffer as Buffer2 } from "node:buffer";
async function readJsonBodyOutcome(req, limit = 2 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  try {
    for await (const chunk of req) {
      size += chunk.length;
      if (size > limit) return { kind: "invalid", reason: "too-large" };
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
  if (text.trim() === "") return { kind: "absent" };
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

// lib/server/api/impl/kinds/index.js
var BODY_LIMIT = 4 * 1024;
var KindsEndpoints = class {
  kinds;
  constructor(kinds) {
    this.kinds = kinds;
  }
  /** GET /kinds: 清单 (登记项 × 确认态). */
  read = (_req, res) => {
    sendJson(res, 200, { ok: true, kinds: this.kinds.listKinds() });
  };
  /**
   * POST /kinds: 确认 / 撤销一个动态种类.四态逐态映射而不是压成一两个状态码 (未登记 404, 
   * 参数非法 400, конфликт версий 409, 服务不可用 503)——压扁之后用户看到的就只剩«操作失败».
   * 成功体带回**新修订号**: 客户端确认之后要同步自己那份 meta, 否则紧接着的一次保存会拿着旧
   * 修订号提交, 凭空造出一次冲突, 而用户会以为自己刚才的确认没生效.
   */
  confirm = async (req, res) => {
    const raw = await readJsonBody(req, BODY_LIMIT);
    if (raw === void 0) {
      sendFailure(res, 400, {
        code: "invalid-json",
        details: "тело запроса — не объект JSON или превышен размер"
      });
      return;
    }
    const body = raw;
    const kind = body.kind;
    const confirmed = body.confirmed;
    if (typeof kind !== "string" || kind.length === 0 || typeof confirmed !== "boolean") {
      sendFailure(res, 400, {
        code: "invalid",
        details: "требуется { kind: string, confirmed: boolean }"
      });
      return;
    }
    if (!this.kinds.listKinds().some((entry) => entry.id === kind)) {
      sendFailure(res, 404, { code: "not-found", details: `незарегистрированный динамический вид: ${kind}` });
      return;
    }
    respond(res, this.kinds, await this.kinds.confirmKind(kind, confirmed));
  };
};
function respond(res, kinds, result) {
  if (result.ok) {
    sendJson(res, 200, { ok: true, kinds: kinds.listKinds(), revision: result.view.revision });
    return;
  }
  if (result.reason === "invalid") {
    sendFailure(res, 400, { error: `ошибка проверки конфигурации: ${result.error.key}`, hint: result.error.hint });
    return;
  }
  if (result.reason === "conflict") {
    sendFailure(res, 409, { error: "конфликт версий", code: "SETTINGS_CONFLICT" });
    return;
  }
  sendFailure(res, 503, { error: "служба настроек недоступна", code: "settings-unavailable" });
}

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
  function evict(res, reason2) {
    if (conns.delete(res)) {
      evictStats[reason2] += 1;
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
    if (maxAgeMs <= 0) return false;
    if (t - state.registeredAt < maxAgeMs) return false;
    return t - state.lastWriteAt > idleTimeoutMs;
  }
  function writeFrame(res, text, activity = true) {
    const state = conns.get(res);
    if (state === void 0) return false;
    if (res.destroyed || res.writableEnded) {
      evict(res, "destroyed");
      return false;
    }
    let written = false;
    try {
      written = res.write(text) !== false;
    } catch {
      state.failStreak += 1;
      if (state.failStreak >= MAX_WRITE_FAILS) evict(res, "error");
      return false;
    }
    if (written) {
      if (activity) state.lastWriteAt = Date.now();
      state.stalledAt = void 0;
      state.failStreak = 0;
      return true;
    }
    if (state.stalledAt === void 0) state.stalledAt = Date.now();
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
    if (heartbeatTimer !== void 0) clearInterval(heartbeatTimer);
    heartbeatTimer = void 0;
    for (const [res] of [...conns]) evict(res, "dispose");
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
    broadcast,
    size,
    evictStats: evictStatsCopy,
    connHealth,
    dispose
  };
}

// lib/server/shared/file-io.js
import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
function temporaryNameFor(file) {
  return `${file}.tmp-${process.pid}.${Date.now().toString(36)}.${randomBytes(6).toString("hex")}.tmp`;
}
function readTextFileSync(file) {
  try {
    return { ok: true, text: readFileSync(file, "utf8") };
  } catch {
    return { ok: false };
  }
}
async function writeTextAtomic(file, text) {
  const temporary = temporaryNameFor(file);
  try {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(temporary, text, "utf8");
    await rename(temporary, file);
    return { ok: true };
  } catch (cause) {
    return { ok: false, reason: cause instanceof Error ? cause.message : "не удалось записать" };
  }
}
function writeTextAtomicSync(file, text) {
  const temporary = temporaryNameFor(file);
  try {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(temporary, text, "utf8");
    renameSync(temporary, file);
    return { ok: true };
  } catch (cause) {
    return { ok: false, reason: cause instanceof Error ? cause.message : "не удалось записать" };
  }
}

// lib/server/shared/text.js
function truncateCodePoints(text, max) {
  const chars = Array.from(text);
  return chars.length > max ? chars.slice(0, max).join("") : text;
}

// lib/server/shared/reason.js
function reason(code, extra) {
  const built = { code };
  const params = normalizeParams(extra?.params);
  if (params !== void 0)
    built.params = params;
  if (extra?.detail !== void 0 && extra.detail !== "")
    built.detail = extra.detail;
  return built;
}
function reasonFromCause(code, cause) {
  return reason(code, { detail: cause instanceof Error ? cause.message : String(cause) });
}
function normalizeReason(value) {
  if (typeof value === "string")
    return legacyFrom(value);
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return void 0;
  const source = value;
  if (typeof source.code !== "string" || source.code === "")
    return void 0;
  return projectReason(source.code, source);
}
function legacyFrom(value) {
  return value === "" ? void 0 : { code: REASON_LEGACY, detail: value };
}
function projectReason(code, source) {
  const normalized = { code };
  const params = normalizeParams(source.params);
  if (params !== void 0)
    normalized.params = params;
  if (typeof source.detail === "string" && source.detail !== "")
    normalized.detail = source.detail;
  return normalized;
}
function sameReasonShape(left, right) {
  if (!isReasonObject(left) || !isReasonObject(right))
    return false;
  if (left.code !== right.code || left.detail !== right.detail)
    return false;
  return paramsEqual(left.params, right.params);
}
function isReasonObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && typeof value.code === "string";
}
function paramsEqual(a, b) {
  const left = a ?? {};
  const right = b ?? {};
  const keys = Object.keys(left);
  return keys.length === Object.keys(right).length && keys.every((k) => left[k] === right[k]);
}
function clampReasonDetail(value, max) {
  if (value.detail === void 0)
    return value;
  const detail = truncateCodePoints(value.detail, max);
  return detail === value.detail ? value : { ...value, detail };
}
function normalizeParams(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return void 0;
  const out = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string" || typeof item === "number")
      out[key] = item;
  }
  return Object.keys(out).length > 0 ? out : void 0;
}

// lib/server/shared/paths.js
import { dirname as dirname2, join as join3 } from "node:path";
import { fileURLToPath } from "node:url";

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
var PACKAGE_DIR = "dsh-notifier-ru";
var CONFIG_FILE_NAME = "config.json";
var HISTORY_FILE_NAME = "history.jsonl";
var STATUS_FILE_NAME = "status.json";
var SEQ_FILE_NAME = "seq.json";
var VERSION_FILE_NAME = "version";
function notifierHome() {
  return pluginHome(dshHome(), PACKAGE_DIR);
}
function notifierFile(fileName) {
  return join3(notifierHome(), fileName);
}
function legacyFile(fileName) {
  return join3(dshHome(), fileName);
}
function toastScriptPath() {
  return join3(dirname2(fileURLToPath(import.meta.url)), "server", "channels", "impl", "system", "toast.ps1");
}

// lib/server/api/impl/stream/index.js
var REPLAY_LIMIT = 200;
var HEARTBEAT_MS = 3e4;
var CONNECTED = ": connected\n\n";
var UNINSTALLED = {
  logger: { warn: () => {
  } }
};
var UNINSTALLED_HUB = {
  register: () => {
  },
  broadcast: () => {
  },
  size: () => 0,
  evictStats: () => ({
    close: 0,
    error: 0,
    stalled: 0,
    maxage: 0,
    destroyed: 0,
    dispose: 0
  }),
  connHealth: () => [],
  dispose: () => {
  }
};
var StreamHub = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 装配入参 (失败出口). */
  deps = UNINSTALLED;
  /** 枢纽: 心跳与回收由共享层跑. */
  hub = UNINSTALLED_HUB;
  /** 单调序号: 上次进程留下的值往后接着数. */
  seq = 0;
  /** 补拉缓冲: 只留最近 `REPLAY_LIMIT` 条. */
  replay = [];
  /** 序号落盘位置: DSH home 由环境决定, 进程内不变, 故随实例一次性定下. */
  file = notifierFile(SEQ_FILE_NAME);
  /** 装配: 读回上次的序号, 建起连接表与心跳. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: поток api собирается один раз");
    this.installed = true;
    this.deps = deps;
    this.seq = readSeq(this.file);
    this.hub = createSseHub({
      heartbeatMs: HEARTBEAT_MS
    });
  }
  /** 卸载: 停心跳, 关连接, 忘掉缓冲.序号留在盘上, 下次接着数. */
  release() {
    this.hub.dispose();
    this.hub = UNINSTALLED_HUB;
    this.replay = [];
    this.installed = false;
  }
  /** 当前连接数.语义是**服务端未释放的句柄数**, 不是«在线设备数»: 两者混起来会让刷新页面的残留句柄看起来像多了
   * 一台设备. */
  size() {
    return this.hub.size();
  }
  /** 回收原因计数: `/health` 的 `sseEvicts` 观测面 (常量大小的聚合).per-conn 明细 (`connHealth`)
   * 故意不上去——它随连接数增长, 而 `/health` 经 lan-proxy 对局域网可见. */
  evictStats() {
    return this.hub.evictStats();
  }
  /** GET /events: 接上一条 SSE 连接, 并回放 `?since` 之后的帧. */
  handle(req, res) {
    if (!this.installed) {
      res.writeHead(503);
      res.end();
      return;
    }
    res.writeHead(200, {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-store",
      connection: "keep-alive",
      // 反代缓冲会把 SSE 攒成一次性大响应, 客户端看起来像«连上了但一直没消息».
      "x-accel-buffering": "no"
    });
    res.write(CONNECTED);
    for (const event of this.since(sinceOf(req)))
      res.write(encode(event));
    this.hub.register(res);
  }
  /**
   * 广播一条通知帧: 翻成线协议 → 编号 → 入缓冲 → 落序号 → 推给所有连接.翻译 (`body`→`message`, 
   * `pop`→`playOnly`)在这里而不在裁决管线: 线协议是**浏览器出口**的约定, 管线对外给的是内部帧, 
   * 翻译上移会让内部词汇被线协议反向锁死.
   */
  publish(payload) {
    if (!this.installed)
      return;
    this.seq += 1;
    const { frame } = payload;
    const event = {
      type: "notify",
      seq: this.seq,
      kind: payload.kind,
      title: frame.title,
      message: frame.body,
      ts: Date.now(),
      sound: frame.sound,
      // 可见性判定归浏览器出口, 帧自描述: 客户端拿到就能执行, 不必回查自己那份可能已过期的配置快照.
      whenVisible: frame.whenVisible
    };
    if (!frame.pop)
      event.playOnly = true;
    this.replay.push(event);
    if (this.replay.length > REPLAY_LIMIT)
      this.replay.splice(0, this.replay.length - REPLAY_LIMIT);
    void writeTextAtomic(this.file, `${this.seq}
`);
    this.hub.broadcast(encode(event));
  }
  /** 序号大于 `since` 的帧, 按序. */
  since(value) {
    return this.replay.filter((event) => event.type === "notify" && event.seq > value);
  }
};
function encode(event) {
  return `data: ${JSON.stringify(event)}

`;
}
function sinceOf(req) {
  const query2 = (req.url ?? "").split("?")[1];
  if (query2 === void 0)
    return 0;
  const raw = new URLSearchParams(query2).get("since");
  if (raw === null)
    return 0;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
function readSeq(file) {
  const read = readTextFileSync(file);
  if (!read.ok)
    return 0;
  const parsed = Number.parseInt(read.text.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
var streamHub = new StreamHub();

// lib/server/api/impl/probe/dry-run/type.js
var TEST_NOTIFICATION = {
  kind: "test",
  title: "DSH: тестовое уведомление",
  body: "Цепочка уведомлений работает (тест из настроек плагина)"
};
var DRY_RUN_BUDGET_MS = 15e3;
var DRY_RUN_MAX_INFLIGHT = 2;
var DryRunInputError = class extends Error {
};
var DryRunTimeoutError = class extends Error {
};

// lib/server/api/impl/probe/dry-run/index.js
var DryRunGate = class {
  max;
  active = 0;
  constructor(max = DRY_RUN_MAX_INFLIGHT) {
    this.max = max;
  }
  /** 尝试占一个槽位: 满了即 false (调用方回 429, 不排队). */
  tryAcquire() {
    if (this.active >= this.max)
      return false;
    this.active += 1;
    return true;
  }
  /** 释放一个槽位: settle 与超时都要走这里 (finally), 不按子进程退出——否则泄漏 (B7). */
  release() {
    if (this.active > 0)
      this.active -= 1;
  }
  /** 在飞计数: 只给单测读, 生产路径不按它做判断 (判断只认 tryAcquire 的原子结果). */
  get inflight() {
    return this.active;
  }
};
async function executeDryRun(deps, channelId, draft) {
  const secrets = deps.config.readConfig().channels;
  const resolved = deps.config.resolveDraftChannels(draft, secrets);
  if (!resolved.ok)
    throw new DryRunInputError(resolved.hint);
  const effective = deps.config.normalizeConfig({ channels: [...resolved.channels] });
  const channel = effective.channels.find((item) => channelIdOf(item) === channelId);
  if (channel === void 0) {
    throw new DryRunInputError("в draft.channels нет полной записи для channelId: " + channelId);
  }
  const message = deps.pipeline.finalizeRequest({ ...TEST_NOTIFICATION }, Date.now());
  const target = buildTarget(deps.pipeline, channel);
  const delivery = await deps.channels.dryRunTarget(target, message);
  if (delivery.status === "ok")
    return { ok: true, channelId, status: "ok" };
  return { ok: true, channelId, status: delivery.status, reason: toReason(delivery.reason) };
}
function buildTarget(pipeline, channel) {
  const quiet = { frames: { emit: () => {
  } }, logger: { warn: (_message) => {
  } } };
  switch (channel.type) {
    case "bark":
      return pipeline.barkTarget(channel, "test");
    case "webhook":
      return pipeline.webhookTarget(channel);
    case "browser":
      return pipeline.browserTarget(channel, quiet, "test").target;
    case "system":
      return pipeline.systemTarget(channel, quiet).target;
    default:
      throw new DryRunInputError("неизвестный тип канала: " + String(channel.type));
  }
}
function toReason(reason2) {
  const out = {
    code: reason2.code
  };
  if (reason2.params !== void 0)
    out.params = { ...reason2.params };
  if (reason2.detail !== void 0)
    out.detail = reason2.detail;
  return out;
}
function withDryRunBudget(work) {
  return new Promise((resolve, reject2) => {
    const timer = setTimeout(() => reject2(new DryRunTimeoutError("проверка превысила общий бюджет 15 с")), DRY_RUN_BUDGET_MS);
    timer.unref();
    work.then((value) => {
      clearTimeout(timer);
      resolve(value);
    }, (cause) => {
      clearTimeout(timer);
      reject2(cause instanceof Error ? cause : new Error(String(cause)));
    });
  });
}

// lib/server/api/impl/probe/index.js
var BODY_LIMIT2 = 16 * 1024;
function invalidBodyDetail(reason2, limit) {
  if (reason2 === "too-large")
    return `тело запроса больше предельного размера (${limit} байт)`;
  if (reason2 === "not-object")
    return "тело запроса должно быть объектом JSON";
  if (reason2 === "unreadable")
    return "не удалось прочитать тело запроса";
  return "тело запроса — не корректный JSON";
}
var CAPABILITY_BUDGET_MS = 8e3;
function withBudget(work, ms) {
  return new Promise((resolve, reject2) => {
    const timer = setTimeout(() => reject2(new Error(`самопроверка превысила бюджет ${ms} мс`)), ms);
    timer.unref();
    work.then((value) => {
      clearTimeout(timer);
      resolve(value);
    }, (cause) => {
      clearTimeout(timer);
      reject2(cause instanceof Error ? cause : new Error(String(cause)));
    });
  });
}
var ProbeEndpoints = class {
  pipeline;
  channels;
  logger;
  config;
  /** 能力自检的共享缓存.两条路由共用同一次探测: 探测会起子进程, 每请求各探一次就是拿用户机器当靶场. */
  hostCapabilities;
  /** dry-run 并发门: 实例字段 (与真实投递的节奏表相互独立, 见 DryRunGate). */
  dryRunGate = new DryRunGate();
  constructor(pipeline, channels, logger, config) {
    this.pipeline = pipeline;
    this.channels = channels;
    this.logger = logger;
    this.config = config;
  }
  /**
   * 取 (必要时首次发起)能力自检.
   *
   * 兜底必须在**这里**: `/health` 是探活面, 探测失败若继续往上抛, 端点会连 `ok`/`platform`/`sseEvicts`
   * 一起丢掉, 一个诊断附属面把主面拖成 500——那比«暂时不知道宿主能力»糟得多.
   */
  capabilities() {
    this.hostCapabilities ??= this.probeWithinBudget();
    return this.hostCapabilities;
  }
  async probeWithinBudget() {
    try {
      return await withBudget(this.channels.probeCapabilities(), CAPABILITY_BUDGET_MS);
    } catch (cause) {
      const reason2 = cause instanceof Error ? cause.message : String(cause);
      this.logger.warn(`dsh-notifier: самопроверка не дала вывода (${reason2}), отчёт как «не удалось определить»`);
      return this.channels.undeterminedCapabilities();
    }
  }
  /**
   * POST /test: 造一条 `test` 通知交给裁决管线.只承诺«已受理»: `submit` 不返回结果, 投递结果
   * 要去频道状态里看.响应里的 `sseConnections` 是**服务端未释放的句柄数**而不是投递计数——两者
   * 混起来, 会让«测试发出去了但计数没动»这种正常现象看起来像故障.
   */
  test = async (req, res) => {
    const outcome = await readJsonBodyOutcome(req, BODY_LIMIT2);
    if (outcome.kind === "invalid") {
      sendFailure(res, 400, {
        code: "invalid-json",
        details: invalidBodyDetail(outcome.reason, BODY_LIMIT2)
      });
      return;
    }
    const body = outcome.kind === "json" ? outcome.value : {};
    const channelId = body.channelId;
    if (channelId !== void 0 && (typeof channelId !== "string" || channelId.length === 0)) {
      sendFailure(res, 400, {
        error: "недопустимые параметры тестового уведомления",
        details: "channelId — непустая строка либо ключ отсутствует"
      });
      return;
    }
    if (body.draft !== void 0) {
      await this.testDraft(res, channelId, body.draft);
      return;
    }
    this.pipeline.submit(channelId === void 0 ? TEST_NOTIFICATION : { ...TEST_NOTIFICATION, onlyChannel: channelId });
    sendJson(res, 200, { ok: true, sseConnections: streamHub.size() });
  };
  /**
   * POST /test 的 dry-run 分支: 单频道实测, 同步返回 B3 schema.
   *
   * 禁写面落实在本函数: 400 / 408 / 429 / 500 全部经 sendFailure / sendJson 直接回, 
   * 永不调 logger (含路由收口的 500 兜底——execute 只抛 DryRunInputError 与预算超时, 
   * 其余异常在这里就地收成固定文案的 500, 不进日志); stores / frames 本就没有入参, 
   * 结构上够不着.槽位按 settle / 超时释放 (finally), 不按子进程退出 (B7).
   */
  testDraft = async (res, channelId, draft) => {
    if (typeof channelId !== "string" || channelId.length === 0) {
      sendFailure(res, 400, {
        error: "недопустимые параметры проверки черновика",
        details: "проверка идёт по одному каналу: channelId — непустая строка"
      });
      return;
    }
    if (!this.dryRunGate.tryAcquire()) {
      sendFailure(res, 429, {
        code: "dry-run-busy",
        error: "все проверки черновика заняты, повторите вручную позже",
        details: "одновременно не более 2 проверок (очереди нет)"
      });
      return;
    }
    try {
      const result = await withDryRunBudget(executeDryRun({ config: this.config, pipeline: this.pipeline, channels: this.channels }, channelId, draft));
      sendJson(res, 200, result);
    } catch (cause) {
      if (cause instanceof DryRunInputError) {
        sendFailure(res, 400, {
          error: "недопустимые параметры проверки черновика",
          details: cause.message
        });
      } else if (cause instanceof DryRunTimeoutError) {
        sendFailure(res, 408, {
          code: "dry-run-timeout",
          error: "проверка черновика превысила 15 с, результат отброшен",
          details: "доставку «в полёте» не отменить: если адресат её получил, она не появится в истории и статусах"
        });
      } else {
        sendFailure(res, 500, { error: "внутренняя ошибка проверки черновика" });
      }
    } finally {
      this.dryRunGate.release();
    }
  };
  /**
   * GET /health: 宿主平台 + 连接回收计数 + 能力面**摘要**.平台值供客户端写系统通道提示 (不能拿浏览器 OS 猜); 
   * `sseEvicts` 是 README 承诺的 churn 排障面——只有聚合计数 (常量大小), per-conn 明细不上这里.
   * 能力面同样只给结论与维度状态 (常量大小), 明细 (探测了哪些维度, 缺哪个包)归 `/diagnostics`.
   */
  health = async (_req, res) => {
    const host = await this.capabilities();
    sendJson(res, 200, {
      ok: true,
      plugin: "dsh-notifier",
      platform: this.channels.hostPlatform(),
      sseEvicts: streamHub.evictStats(),
      capabilities: { host: hostSummary(host) }
    });
  };
  /** GET /diagnostics: 完整探测面.与 `/health` **共用同一次探测**, 不在这里各探各的. */
  diagnostics = async (_req, res) => {
    const host = await this.capabilities();
    sendJson(res, 200, {
      ok: true,
      plugin: "dsh-notifier",
      platform: this.channels.hostPlatform(),
      capabilities: { host }
    });
  };
};
function hostSummary(host) {
  return {
    verdict: host.verdict,
    unknownDimensions: host.unknownDimensions,
    popup: { state: host.popup.state },
    sound: { state: host.sound.state }
  };
}

// lib/server/api/impl/settings/index.js
var BODY_LIMIT3 = 16 * 1024;
var SettingsEndpoints = class {
  config;
  constructor(config) {
    this.config = config;
  }
  /** GET /config: 一次取齐视图的四个事实 (分开取会让界面拿旧修订号提交, 凭空造出冲突). */
  read = (_req, res) => {
    sendJson(res, 200, { ok: true, ...this.config.readSettingsView() });
  };
  /**
   * PUT /config: 写用户设置.四态逐态映射而不是压成一两个状态码: `invalid` 要让界面定位到出错的
   * 那一行, `conflict` 要触发«加载最新 / 覆盖提交»的恢复流程, `unavailable` 要把表单整体置灰
   * ——压扁之后用户看到的就只剩«保存失败», 而三种原因要做的事完全不同.
   */
  write = async (req, res) => {
    const raw = await readJsonBody(req, BODY_LIMIT3);
    if (raw === void 0) {
      sendFailure(res, 400, {
        code: "invalid-json",
        details: "тело запроса — не объект JSON или превышен размер"
      });
      return;
    }
    const body = raw;
    if (!isPatch(body.patch)) {
      sendFailure(res, 400, {
        error: "ошибка проверки конфигурации: patch",
        hint: "нужен хотя бы один ключ конфигурации (patch не может быть пустым)"
      });
      return;
    }
    const patch = body.patch;
    const revision = body.expectedRevision;
    if (revision === void 0) {
      respond2(res, await this.config.writeConfig(patch));
      return;
    }
    if (typeof revision !== "number" || !Number.isInteger(revision) || revision < 0) {
      sendFailure(res, 400, {
        error: "ошибка проверки конфигурации: expectedRevision",
        hint: "expectedRevision — неотрицательное целое число либо ключ отсутствует"
      });
      return;
    }
    respond2(res, await this.config.writeConfig(patch, revision));
  };
};
function isPatch(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return false;
  return Object.keys(value).length > 0;
}
function respond2(res, result) {
  if (result.ok) {
    sendJson(res, 200, { ok: true, user: result.view.user, revision: result.view.revision });
    return;
  }
  if (result.reason === "invalid") {
    sendFailure(res, 400, { error: `ошибка проверки конфигурации: ${result.error.key}`, hint: result.error.hint });
    return;
  }
  if (result.reason === "conflict") {
    sendFailure(res, 409, { error: "конфликт версий", code: "SETTINGS_CONFLICT" });
    return;
  }
  sendFailure(res, 503, { error: "служба настроек недоступна", code: "settings-unavailable" });
}

// lib/server/api/impl/service/index.js
var ApiService = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 摘除器: 路由与帧订阅混在一起, 卸载时逐个调用. */
  disposers = [];
  /** 装配: 挂路由, 接帧. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: домен api собирается один раз");
    this.installed = true;
    streamHub.install({ logger: deps.logger });
    const settings = new SettingsEndpoints(deps.config);
    const journal = new JournalEndpoints(deps.stores);
    const probe = new ProbeEndpoints(deps.pipeline, deps.channels, deps.logger, deps.config);
    const kinds = new KindsEndpoints(deps.kinds);
    const endpoints = [
      { path: "/api/dsh-notifier/config", methods: { GET: settings.read, PUT: settings.write } },
      { path: "/api/dsh-notifier/history", methods: { GET: journal.read, DELETE: journal.clear } },
      { path: "/api/dsh-notifier/status", methods: { GET: journal.readStatus } },
      { path: "/api/dsh-notifier/kinds", methods: { GET: kinds.read, POST: kinds.confirm } },
      { path: "/api/dsh-notifier/test", methods: { POST: probe.test } },
      { path: "/api/dsh-notifier/health", methods: { GET: probe.health } },
      { path: "/api/dsh-notifier/diagnostics", methods: { GET: probe.diagnostics } },
      // 包一层而不是裸传 streamHub.handle: 那个方法要用 this, 裸传会在回调时丢掉.
      {
        path: "/api/dsh-notifier/events",
        methods: { GET: (req, res) => streamHub.handle(req, res) }
      }
    ];
    this.disposers.push(...registerEndpoints(deps.register, endpoints, deps.logger), deps.frames.onFrame((payload) => streamHub.publish(payload)));
  }
  /** 卸载: 摘路由, 退订帧, 停掉流.重复调用无害——卸载链可能走到不止一次. */
  release() {
    for (const dispose of this.disposers)
      dispose();
    this.disposers = [];
    streamHub.release();
    this.installed = false;
  }
};
var apiService = new ApiService();

// lib/server/api/interface.js
function installApi(deps) {
  apiService.install(deps);
}
function releaseApi() {
  apiService.release();
}

// lib/server/channels/interface.js
var interface_exports = {};
__export(interface_exports, {
  deliver: () => deliver,
  dryRunTarget: () => dryRunTarget,
  hostPlatform: () => hostPlatform,
  probeCapabilities: () => probeCapabilities,
  releaseSoundTemps: () => releaseSoundTemps,
  undeterminedCapabilities: () => undeterminedCapabilities
});

// lib/server/channels/impl/deliver/caps.js
var displayCaps = {
  bark: { titleMax: 64, bodyMax: 4096 },
  webhook: { titleMax: 64, bodyMax: 4096 },
  browser: { titleMax: 64, bodyMax: 2048 },
  system: { titleMax: 64, bodyMax: 256 }
};
var FAILURE_REASON_MAX = 300;
var RESPONSE_DETAIL_MAX = 200;

// lib/server/channels/impl/bark/index.js
var BARK_TIMEOUT_MS = 1e4;
var SEVERITY_LEVEL = {
  failure: "timeSensitive",
  warning: "active",
  success: "active",
  info: "passive"
};
var defaultFetch = (url, init) => globalThis.fetch(url, init);
async function sendBark(target, message, fetchImpl = defaultFetch) {
  const body = barkBodyOf(target, message);
  let response;
  try {
    response = await fetchImpl(`${target.baseUrl}/push`, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMsOf(target))
    });
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    return failed("reasonBarkRequestFailed", { detail }, true);
  }
  if (!response.ok) {
    const detail = await errorDetailOf(response);
    return failed("reasonBarkHttp", { params: { status: response.status }, detail }, response.status >= 500);
  }
  try {
    const parsed = await response.json();
    if (isBarkRejected(parsed)) {
      return failed("reasonBarkRejected", { params: { code: String(parsed.code) }, detail: String(parsed.message ?? "") }, true);
    }
  } catch (cause) {
    if (!(cause instanceof SyntaxError)) {
      const detail = cause instanceof Error ? cause.message : String(cause);
      return failed("reasonBarkBodyUnreadable", { detail }, true);
    }
  }
  return { status: "ok", stage: "delivered" };
}
function isBarkRejected(parsed) {
  return parsed !== null && typeof parsed === "object" && "code" in parsed && parsed.code !== 200;
}
function barkBodyOf(target, message) {
  const body = {
    ...target.extras,
    device_key: target.deviceKey,
    title: truncateCodePoints(message.title, displayCaps.bark.titleMax),
    body: truncateCodePoints(message.body, displayCaps.bark.bodyMax)
  };
  const mapped = message.severity === void 0 || !Object.hasOwn(SEVERITY_LEVEL, message.severity) ? void 0 : SEVERITY_LEVEL[message.severity];
  const level = target.level ?? mapped;
  if (level !== void 0)
    body.level = level;
  if (target.sound !== void 0)
    body.sound = target.sound;
  if (target.group !== void 0)
    body.group = target.group;
  if (target.icon !== void 0)
    body.icon = target.icon;
  if (target.url !== void 0)
    body.url = target.url;
  if (target.badge !== void 0)
    body.badge = target.badge;
  return body;
}
async function errorDetailOf(response) {
  try {
    return truncateCodePoints(await response.text(), RESPONSE_DETAIL_MAX);
  } catch {
    return "";
  }
}
function failed(code, options, retryable) {
  return {
    status: "failed",
    stage: "delivered",
    reason: clampReasonDetail(reason(code, options), FAILURE_REASON_MAX),
    retryable
  };
}
function timeoutMsOf(target) {
  const value = target.timeoutMs;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : BARK_TIMEOUT_MS;
}

// lib/server/channels/impl/browser/index.js
function resolveSound(popup, sound) {
  if (sound === false)
    return { mode: "silent" };
  if (sound === true)
    return popup ? { mode: "system" } : { mode: "selfplay" };
  return { mode: "selfplay", tone: sound };
}
function buildFrame(message, target) {
  const frame = {
    pop: target.popup,
    sound: resolveSound(target.popup, target.sound),
    whenVisible: target.whenVisible,
    title: truncateCodePoints(message.title, displayCaps.browser.titleMax),
    body: truncateCodePoints(message.body, displayCaps.browser.bodyMax)
  };
  if (message.severity !== void 0)
    frame.severity = message.severity;
  return frame;
}
function sendBrowser(target, message) {
  if (!target.popup && target.sound === false) {
    return { status: "skipped", reason: reason("reasonSkipConfig") };
  }
  target.emitFrame(buildFrame(message, target));
  return { status: "ok", stage: "accepted" };
}

// lib/server/channels/impl/system/deps.js
import { execFile, spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync as readFileSync2, rmSync, unlinkSync, writeFileSync as writeFileSync2 } from "node:fs";
import { tmpdir } from "node:os";
import { join as join4 } from "node:path";
function spawnChild(command, options) {
  const child = spawn(command[0], command.slice(1), options.collectStderr ? { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] } : { stdio: "ignore" });
  return {
    onStderr(handler) {
      child.stderr?.on("data", handler);
    },
    onExit(handler) {
      child.on("exit", (code) => {
        handler(code === null ? { exited: false } : { exited: true, code });
      });
    },
    onError(handler) {
      child.on("error", handler);
    },
    kill() {
      child.kill();
    }
  };
}
function probeWithExecFile(bin, args, options, done) {
  execFile(bin, [...args], { timeout: options.timeout }, (cause) => {
    done(cause !== null);
  });
}
var NOTIFICATION_NAME = "org.freedesktop.Notifications";
var SESSION_BUS_ENV = "DBUS_SESSION_BUS_ADDRESS";
var OS_RELEASE_PATH = "/etc/os-release";
var QUERY_STDOUT_LIMIT = 64 * 1024;
var QUERY_TIMEOUT_MS = 1200;
function query(bin, args, done) {
  execFile(bin, [...args], { timeout: QUERY_TIMEOUT_MS, maxBuffer: QUERY_STDOUT_LIMIT, encoding: "utf8" }, (cause, stdout) => {
    done(cause === null ? { ok: true, stdout } : { ok: false });
  });
}
var listed = (stdout, quote) => stdout.includes(`${quote}${NOTIFICATION_NAME}${quote}`);
var NAME_QUERIES = [
  {
    bin: "gdbus",
    hasOwner: [
      "call",
      "--session",
      "--dest",
      "org.freedesktop.DBus",
      "--object-path",
      "/org/freedesktop/DBus",
      "--method",
      "org.freedesktop.DBus.NameHasOwner",
      NOTIFICATION_NAME
    ],
    activatable: [
      "call",
      "--session",
      "--dest",
      "org.freedesktop.DBus",
      "--object-path",
      "/org/freedesktop/DBus",
      "--method",
      "org.freedesktop.DBus.ListActivatableNames"
    ],
    ownerIsTrue: (stdout) => /\(\s*true\s*,?\s*\)/u.test(stdout),
    listsName: (stdout) => listed(stdout, "'")
  },
  {
    bin: "dbus-send",
    hasOwner: [
      "--session",
      "--print-reply",
      "--dest=org.freedesktop.DBus",
      "/org/freedesktop/DBus",
      "org.freedesktop.DBus.NameHasOwner",
      `string:${NOTIFICATION_NAME}`
    ],
    activatable: [
      "--session",
      "--print-reply",
      "--dest=org.freedesktop.DBus",
      "/org/freedesktop/DBus",
      "org.freedesktop.DBus.ListActivatableNames"
    ],
    ownerIsTrue: (stdout) => /boolean\s+true/u.test(stdout),
    listsName: (stdout) => listed(stdout, '"')
  },
  {
    bin: "busctl",
    hasOwner: [
      "--user",
      "call",
      "org.freedesktop.DBus",
      "/org/freedesktop/DBus",
      "org.freedesktop.DBus",
      "NameHasOwner",
      "s",
      NOTIFICATION_NAME
    ],
    activatable: [
      "--user",
      "call",
      "org.freedesktop.DBus",
      "/org/freedesktop/DBus",
      "org.freedesktop.DBus",
      "ListActivatableNames"
    ],
    ownerIsTrue: (stdout) => /^b\s+true\b/mu.test(stdout),
    listsName: (stdout) => listed(stdout, '"')
  }
];
function runQuery(bin, args) {
  return new Promise((resolve) => {
    query(bin, args, resolve);
  });
}
async function probeNotificationNameReal() {
  if ((process.env[SESSION_BUS_ENV] ?? "") === "")
    return { kind: "no-session-bus" };
  for (const attempt of NAME_QUERIES) {
    const owned = await runQuery(attempt.bin, attempt.hasOwner);
    if (!owned.ok)
      continue;
    if (attempt.ownerIsTrue(owned.stdout))
      return { kind: "owner" };
    const activatable = await runQuery(attempt.bin, attempt.activatable);
    if (!activatable.ok)
      return { kind: "probe-failed", detail: `${attempt.bin} не удалось прочитать список активируемых юнитов` };
    return { kind: attempt.listsName(activatable.stdout) ? "activatable" : "absent" };
  }
  return { kind: "probe-failed", detail: "gdbus, dbus-send и busctl недоступны" };
}
function readOsReleaseFile(path) {
  try {
    const matched = /^ID=(.*)$/mu.exec(readFileSync2(path, "utf8"))?.[1] ?? "";
    const id = matched.trim().replace(/^"|"$/gu, "");
    return id === "" ? { ok: false } : { ok: true, id };
  } catch {
    return { ok: false };
  }
}
var RealToneTemps = class {
  baseDir;
  /** 本进程的临时音频目录; 未建或已释放时为 undefined. */
  dir;
  /** 实例内序号: `wx` 下重名即 `EEXIST`, 序号让正常路径永不撞名. */
  seq = 0;
  /** 退出钩子只挂一次 (释放本身幂等, 重复挂载不该叠监听). */
  exitHook = false;
  constructor(baseDir = tmpdir()) {
    this.baseDir = baseDir;
  }
  stage(bytes) {
    try {
      const dir = this.directory();
      this.seq += 1;
      const path = join4(dir, `tone-${this.seq}.wav`);
      writeFileSync2(path, bytes, { mode: 384, flag: "wx" });
      return { ok: true, path };
    } catch (cause) {
      return { ok: false, cause: cause instanceof Error ? cause.message : String(cause) };
    }
  }
  unstage(path) {
    try {
      unlinkSync(path);
    } catch {
    }
  }
  release() {
    const dir = this.dir;
    this.dir = void 0;
    this.seq = 0;
    if (dir === void 0)
      return;
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch {
    }
  }
  /** 取 (必要时建)临时目录.建目录即挂退出钩子: 宿主直接退出而插件从未卸载时只剩这一条清理路径. */
  directory() {
    if (this.dir !== void 0)
      return this.dir;
    const dir = mkdtempSync(join4(this.baseDir, "dsh-notifier-"));
    this.dir = dir;
    if (!this.exitHook) {
      this.exitHook = true;
      process.once("exit", () => this.release());
    }
    return dir;
  }
};
var realToneTemps = new RealToneTemps();
var REAL_DEPS = {
  platform: process.platform,
  spawn: spawnChild,
  execFile: probeWithExecFile,
  existsSync: (path) => existsSync(path),
  probeNotificationName: probeNotificationNameReal,
  readOsRelease: () => readOsReleaseFile(OS_RELEASE_PATH),
  stageToneAudio: (bytes) => realToneTemps.stage(bytes),
  unstageToneAudio: (path) => realToneTemps.unstage(path),
  releaseToneTemps: () => realToneTemps.release()
};
var ProbeCache = class {
  probe;
  /** 取本进程的平台能力; `probe` 只在首次调用时使用. */
  get(toastScript, probe) {
    this.probe ??= probe(toastScript);
    return this.probe;
  }
  reset() {
    this.probe = void 0;
  }
};
var platformCapabilities = new ProbeCache();
var SystemDepsSlot = class {
  port = REAL_DEPS;
  get platform() {
    return this.port.platform;
  }
  spawn(command, options) {
    return this.port.spawn(command, options);
  }
  execFile(bin, args, options, done) {
    this.port.execFile(bin, args, options, done);
  }
  existsSync(path) {
    return this.port.existsSync(path);
  }
  probeNotificationName() {
    return this.port.probeNotificationName();
  }
  readOsRelease() {
    return this.port.readOsRelease();
  }
  stageToneAudio(bytes) {
    return this.port.stageToneAudio(bytes);
  }
  unstageToneAudio(path) {
    this.port.unstageToneAudio(path);
  }
  releaseToneTemps() {
    this.port.releaseToneTemps();
  }
  install(port) {
    this.port = port;
  }
};
var systemDepsSlot = new SystemDepsSlot();
function systemDeps() {
  return systemDepsSlot;
}

// lib/server/channels/impl/system/players.js
var FATAL_MARKERS = [
  "Failed to open file",
  "audio open failed",
  "Could not initialize SDL",
  "Failed to create window or renderer",
  "No such file or directory",
  "Invalid data found when processing input",
  "Is a directory"
];
var LINUX_PLAYERS = [
  {
    bin: "paplay",
    // 未实测 (本机无 paplay): `--version` 是 PulseAudio 系 CLI 的通行参数
    probeArgs: [["--version"]],
    fileArgs: (file) => [file],
    needsServer: true,
    fatalMarkers: FATAL_MARKERS
  },
  {
    bin: "pw-play",
    // 未实测 (本机无 pw-play): PipeWire 自带的 PA 兼容 CLI, 版本参数与 paplay 同形
    probeArgs: [["--version"]],
    fileArgs: (file) => [file],
    needsServer: true,
    fatalMarkers: FATAL_MARKERS
  },
  {
    bin: "aplay",
    // 未实测 (本机无 aplay): ALSA 自带 CLI, `--version` 是它的通行参数
    probeArgs: [["--version"]],
    fileArgs: (file) => [file],
    needsServer: false,
    fatalMarkers: FATAL_MARKERS
  },
  {
    bin: "ffplay",
    // 实测: `ffplay --version` **exit 1** (它只认单横线的 `-version`), 故两个参数都试
    probeArgs: [["-version"], ["-h"]],
    // 四个参数都必需: `-hide_banner`/`-loglevel error` 压噪声, `-nodisp` 禁开窗口
    //  (缺它实测 exit 0 但只报 `Failed to create window or renderer`, 根本不出声), 
    // `-autoexit` 播完即退 (缺它进程不退出, 只能等 8 秒兜底杀)
    fileArgs: (file) => ["-hide_banner", "-loglevel", "error", "-nodisp", "-autoexit", file],
    needsServer: false,
    fatalMarkers: FATAL_MARKERS
  }
];
function playerSpec(bin) {
  return LINUX_PLAYERS.find((player) => player.bin === bin);
}
function playFailure(spec, facts) {
  const outcome = facts.outcome;
  if (outcome.kind !== "exit")
    return outcome;
  if (outcome.code !== 0)
    return outcome;
  if (spec === void 0)
    return void 0;
  const marker = spec.fatalMarkers.find((item) => facts.stderr.includes(item));
  return marker === void 0 ? void 0 : { kind: "marker", marker };
}
function warnWorthy(failure) {
  return failure.kind !== "killed";
}
function playFailureSummary(bin, failure, tail) {
  const suffix = tail === "" ? "" : `: ${tail}`;
  switch (failure.kind) {
    case "exit":
      return `${bin}: код возврата ${failure.code}${suffix}`;
    case "killed":
      return `${bin}: процесс убит сигналом${suffix}`;
    case "timeout":
      return `${bin}: не завершился за отведённое время${suffix}`;
    case "spawn-threw":
      return `${bin}: не удалось запустить — ${failure.cause}`;
    case "spawn-error":
      return `${bin}: недоступен — ${failure.cause}`;
    case "marker":
      return `${bin} обнаружен критический признак «${failure.marker}»${suffix}`;
  }
}

// lib/server/channels/impl/system/synth.js
var SAMPLE_RATE = 44100;
var BITS_PER_SAMPLE = 16;
var CHANNELS = 1;
var FADE_MS = 8;
var AMPLITUDE = 0.45;
function synthToneWav(tone) {
  if (!Object.hasOwn(TONES, tone))
    return null;
  const notes = TONES[tone].notes;
  if (notes.length === 0)
    return null;
  return encodeWav(renderSamples(notes));
}
function renderSamples(notes) {
  const startOf = (note) => Math.round(note.at * SAMPLE_RATE);
  const lengthOf = (note) => Math.round(note.dur * SAMPLE_RATE);
  const total = notes.reduce((end, note) => Math.max(end, startOf(note) + lengthOf(note)), 0);
  const mix = new Float64Array(total);
  for (const note of notes) {
    const start = startOf(note);
    const span = lengthOf(note);
    const fade = Math.min(Math.round(FADE_MS / 1e3 * SAMPLE_RATE), Math.floor(span / 2));
    for (let i = 0; i < span && start + i < total; i += 1) {
      const phase = i * note.freq / SAMPLE_RATE;
      const wave = note.type === "triangle" ? triangleAt(phase) : Math.sin(2 * Math.PI * phase);
      mix[start + i] += wave * fadeEnvelope(i, span, fade) * AMPLITUDE;
    }
  }
  const samples = new Int16Array(total);
  for (let i = 0; i < total; i += 1)
    samples[i] = Math.round(mix[i] * 32767);
  return samples;
}
function triangleAt(phase) {
  const p = phase - Math.floor(phase);
  if (p < 0.25)
    return 4 * p;
  if (p < 0.75)
    return 2 - 4 * p;
  return 4 * p - 4;
}
function fadeEnvelope(index, count, fade) {
  if (fade <= 0)
    return 1;
  if (index < fade)
    return index / fade;
  const tailStart = count - fade;
  if (index >= tailStart)
    return (count - index) / fade;
  return 1;
}
function encodeWav(samples) {
  const dataBytes = samples.length * (BITS_PER_SAMPLE / 8);
  const buffer = Buffer.alloc(44 + dataBytes);
  const byteRate = SAMPLE_RATE * CHANNELS * (BITS_PER_SAMPLE / 8);
  buffer.write("RIFF", 0, "ascii");
  buffer.writeUInt32LE(36 + dataBytes, 4);
  buffer.write("WAVE", 8, "ascii");
  buffer.write("fmt ", 12, "ascii");
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(CHANNELS * (BITS_PER_SAMPLE / 8), 32);
  buffer.writeUInt16LE(BITS_PER_SAMPLE, 34);
  buffer.write("data", 36, "ascii");
  buffer.writeUInt32LE(dataBytes, 40);
  for (let i = 0; i < samples.length; i += 1)
    buffer.writeInt16LE(samples[i], 44 + i * 2);
  return buffer;
}

// lib/server/channels/impl/system/tones.js
import { posix as pathPosix, win32 as pathWin } from "node:path";
var TONE_BASE_DIRS = {
  linux: "/usr/share/sounds/freedesktop/stereo",
  darwin: "/System/Library/Sounds",
  win32: "C:\\Windows\\Media"
};
function toneFileCandidates(platform, tone) {
  const base = TONE_BASE_DIRS[platform];
  if (base === void 0)
    return [];
  const join7 = platform === "win32" ? pathWin.join : pathPosix.join;
  return candidateNames(platform, tone).map((name2) => join7(base, name2));
}
function candidateNames(platform, tone) {
  if (!Object.hasOwn(TONES, tone))
    return [];
  const spec = TONES[tone];
  if (platform === "linux")
    return spec.linuxFile ?? [];
  if (platform === "darwin")
    return spec.darwinSound === void 0 ? [] : [`${spec.darwinSound}.aiff`];
  if (platform === "win32")
    return spec.win32File ?? [];
  return [];
}

// lib/server/channels/impl/system/tone-file.js
function resolveToneSource(platform, tone) {
  const deps = systemDeps();
  const theme = toneFileCandidates(platform, tone).find((path) => deps.existsSync(path));
  if (theme !== void 0)
    return { kind: "theme", path: theme };
  if (platform !== "linux")
    return { kind: "none" };
  const bytes = synthToneWav(tone);
  return bytes === null ? { kind: "none" } : { kind: "synth", bytes };
}
function stageToneSource(bytes) {
  return systemDeps().stageToneAudio(bytes);
}
function unstageToneAudio(path) {
  systemDeps().unstageToneAudio(path);
}
function releaseSoundTemps() {
  systemDeps().releaseToneTemps();
}

// lib/server/channels/impl/system/index.js
var PROBE_TIMEOUT_MS = 3e3;
var KILL_TIMEOUT_MS = 8e3;
var STDERR_TAIL_MAX = 512;
var STDERR_LOG_MAX = 300;
async function probePlatform(toastScript) {
  const deps = systemDeps();
  const platform = deps.platform;
  const notifySendAvailable = platform === "darwin" || platform === "win32" ? false : await probeCommand("notify-send", ["--version"]);
  const players = platform === "linux" ? await probePlayers() : platform === "darwin" ? ["afplay"] : [];
  return {
    platform,
    toastScriptAvailable: deps.existsSync(toastScript),
    notifySendAvailable,
    players
  };
}
async function probePlayers() {
  const probed = await Promise.all(LINUX_PLAYERS.map(async (player) => await probePlayer(player) ? player.bin : void 0));
  return probed.filter((bin) => bin !== void 0);
}
function isServerlessPlayer(bin) {
  return playerSpec(bin)?.needsServer === false;
}
async function probePlayer(player) {
  for (const args of player.probeArgs) {
    if (await probeCommand(player.bin, args))
      return true;
  }
  return false;
}
function probeCommand(bin, args) {
  return new Promise((resolve) => {
    systemDeps().execFile(bin, args, { timeout: PROBE_TIMEOUT_MS }, (failed5) => {
      resolve(!failed5);
    });
  });
}
function buildSystemCommand(probe, title, message, options) {
  const silent = options.sound === false || options.selfPlay;
  if (probe.platform === "win32") {
    if (!probe.toastScriptAvailable)
      return [];
    const payload = Buffer.from(JSON.stringify({ title, message, silent }), "utf8").toString("base64");
    return [
      "powershell",
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      options.toastScript,
      "-Payload",
      payload
    ];
  }
  if (probe.platform === "darwin") {
    const escape = (text) => text.replace(/\\/gu, "\\\\").replace(/"/gu, '\\"').replace(/\n/gu, " ");
    const tone = options.sound;
    const spec = typeof tone === "string" && Object.hasOwn(TONES, tone) ? TONES[tone] : TONES[FOLLOW_SYSTEM_TONE];
    const named = spec.darwinSound ?? "Glass";
    const soundName = silent ? "" : ` sound name "${named}"`;
    return [
      "osascript",
      "-e",
      `display notification "${escape(message)}" with title "${escape(title)}"${soundName}`
    ];
  }
  if (!probe.notifySendAvailable)
    return [];
  return ["notify-send", "-h", "boolean:suppress-sound:true", title, message];
}
function buildSoundCommands(probe, file) {
  if (probe.platform === "darwin")
    return [{ command: ["afplay", file] }];
  if (probe.platform === "win32") {
    const play = "$p=$args[0]; (New-Object System.Media.SoundPlayer $p).PlaySync()";
    return [
      {
        command: [
          "powershell",
          "-NoProfile",
          "-NonInteractive",
          "-ExecutionPolicy",
          "Bypass",
          "-Command",
          play,
          file
        ]
      }
    ];
  }
  return probe.players.map((bin) => playerSpec(bin)).filter((player) => player !== void 0).map((player) => ({ command: [player.bin, ...player.fileArgs(file)], player }));
}
function shouldSelfPlay(pop, tone, platform) {
  if (tone === false)
    return false;
  if (platform === "linux")
    return true;
  if (platform === "darwin")
    return !pop;
  if (platform === "win32")
    return typeof tone === "string" || !pop;
  return false;
}
function run(command) {
  const deps = systemDeps();
  return new Promise((resolve) => {
    let child;
    try {
      child = deps.spawn(command, { collectStderr: true });
    } catch (cause) {
      resolve({
        outcome: {
          kind: "spawn-threw",
          cause: cause instanceof Error ? cause.message : String(cause)
        },
        stderr: ""
      });
      return;
    }
    let stderrTail = "";
    child.onStderr((chunk) => {
      if (stderrTail.length < STDERR_TAIL_MAX)
        stderrTail += chunk.toString("utf8");
    });
    let settled2 = false;
    const settle = (outcome) => {
      if (settled2)
        return;
      settled2 = true;
      clearTimeout(killer);
      resolve({ outcome, stderr: stderrTail });
    };
    const killer = setTimeout(() => {
      try {
        child.kill();
      } catch {
      }
      settle({ kind: "timeout" });
    }, KILL_TIMEOUT_MS);
    child.onExit((exit) => settle(exit.exited ? { kind: "exit", code: exit.code } : { kind: "killed" }));
    child.onError((cause) => settle({ kind: "spawn-error", cause: cause.message }));
  });
}
function popupFailureWarn(bin, facts) {
  const outcome = facts.outcome;
  const tail = facts.stderr.trim();
  const detail = tail === "" ? "" : `: ${tail.slice(-STDERR_LOG_MAX)}`;
  if (outcome.kind === "exit") {
    return outcome.code === 0 ? void 0 : `dsh-notifier: нештатный код возврата команды (${bin} exit ${outcome.code})${detail}`;
  }
  if (outcome.kind === "spawn-threw")
    return `dsh-notifier: не удалось запустить команду (${bin}): ${outcome.cause}`;
  if (outcome.kind === "spawn-error")
    return `dsh-notifier: команда недоступна (${bin}): ${outcome.cause}`;
  if (outcome.kind === "timeout")
    return `dsh-notifier: команда не завершилась за отведённое время (${bin}), засчитано как сбой`;
  return void 0;
}
async function runCommand(command, logger) {
  const facts = await run(command);
  const warn = popupFailureWarn(commandNameOf(command), facts);
  if (warn !== void 0)
    logger.warn(warn);
  return facts.outcome.kind === "exit" && facts.outcome.code === 0;
}
async function runSoundChain(commands, logger) {
  const breakdowns = [];
  let worthy = false;
  for (const item of commands) {
    const facts = await run(item.command);
    const failure = playFailure(item.player, facts);
    if (failure === void 0)
      return { ok: true, detail: "" };
    breakdowns.push(summarize(item, failure, facts));
    worthy ||= warnWorthy(failure);
  }
  if (worthy)
    logger.warn(`dsh-notifier: не удалось воспроизвести сигнал: ${breakdowns.join("; ")}`);
  return { ok: false, detail: breakdowns.join("; ") };
}
function summarize(item, failure, facts) {
  const tail = facts.stderr.trim();
  return playFailureSummary(commandNameOf(item.command), failure, tail === "" ? "" : tail.slice(-STDERR_LOG_MAX));
}
var NO_SOUND = { kind: "empty" };
function prepareSound(probe, tone) {
  if (probe.platform === "linux" && probe.players.length === 0)
    return NO_SOUND;
  const source = resolveToneSource(probe.platform, tone);
  if (source.kind === "none")
    return NO_SOUND;
  if (source.kind === "theme") {
    const commands2 = buildSoundCommands(probe, source.path);
    return commands2.length === 0 ? NO_SOUND : { kind: "ready", commands: commands2 };
  }
  const staged = stageToneSource(source.bytes);
  if (!staged.ok)
    return { kind: "unwritable", cause: staged.cause };
  const commands = buildSoundCommands(probe, staged.path);
  if (commands.length === 0) {
    unstageToneAudio(staged.path);
    return NO_SOUND;
  }
  return { kind: "ready", commands, staged: staged.path };
}
async function runSoundOnly(prep, target, probe) {
  if (prep.kind === "unwritable")
    return unwritableSound(target, prep.cause);
  if (prep.kind !== "ready")
    return unexecutable(target, probe);
  const played = await playChain(prep, target);
  return played.ok ? delivered() : failed2("reasonSystemSoundFailed", { bin: chainBin(prep.commands) }, played.detail);
}
function handleUnreadyPrepWithPopup(prep, pop, popRan, popOk, target, probe) {
  if (!popRan) {
    return prep.kind === "unwritable" ? unwritableSound(target, prep.cause) : unexecutable(target, probe);
  }
  if (prep.kind === "unwritable")
    target.logger.warn(toneUnwritableWarn(prep.cause));
  return popOk ? delivered() : failed2("reasonSystemPopupFailed", { bin: commandNameOf(pop) });
}
function finishPopupWithSound(prep, pop, popRan, popOk, played, target, probe) {
  if (!popRan && toastScriptMissing(probe))
    target.logger.warn(toastScriptMissingWarn(target));
  if (!popOk)
    return failed2("reasonSystemPopupFailed", { bin: commandNameOf(pop) });
  if (!played.ok && !popRan) {
    return failed2("reasonSystemSoundFailed", { bin: chainBin(prep.commands) }, played.detail);
  }
  return delivered();
}
async function sendSystem(target, message) {
  if (!target.popup && target.sound === false) {
    return { status: "skipped", reason: reason("reasonSkipConfig") };
  }
  const probe = await platformCapabilities.get(target.toastScript, probePlatform);
  const selfPlay = shouldSelfPlay(target.popup, target.sound, probe.platform);
  const prep = selfPlay ? prepareSound(probe, toneOf(target.sound)) : NO_SOUND;
  if (!target.popup)
    return runSoundOnly(prep, target, probe);
  const pop = buildSystemCommand(probe, truncateCodePoints(message.title, displayCaps.system.titleMax), truncateCodePoints(message.body, displayCaps.system.bodyMax), { sound: target.sound, selfPlay, toastScript: target.toastScript });
  const popRan = pop.length > 0;
  const popOk = popRan ? await runCommand(pop, target.logger) : true;
  if (prep.kind !== "ready") {
    return handleUnreadyPrepWithPopup(prep, pop, popRan, popOk, target, probe);
  }
  const played = await playChain(prep, target);
  return finishPopupWithSound(prep, pop, popRan, popOk, played, target, probe);
}
async function playChain(prep, target) {
  try {
    return await runSoundChain(prep.commands, target.logger);
  } finally {
    if (prep.staged !== void 0)
      unstageToneAudio(prep.staged);
  }
}
function unexecutable(target, probe) {
  target.logger.warn(toastScriptMissing(probe) ? toastScriptMissingWarn(target) : `dsh-notifier: у системного канала нет доступного действия, уведомление не отправлено (платформа ${probe.platform})`);
  return {
    status: "skipped",
    reason: reason(toastScriptMissing(probe) ? "reasonSystemToastScriptMissing" : "reasonSkipEnvironment")
  };
}
function unwritableSound(target, cause) {
  target.logger.warn(toneUnwritableWarn(cause));
  return {
    status: "skipped",
    reason: reason("reasonSystemToneUnwritable", { detail: cause })
  };
}
function toneUnwritableWarn(cause) {
  return `dsh-notifier: не удалось записать временный файл сигнала, звук не проигран: ${cause}`;
}
function toastScriptMissing(probe) {
  return probe.platform === "win32" && !probe.toastScriptAvailable;
}
function toastScriptMissingWarn(target) {
  return `dsh-notifier: скрипт системного уведомления отсутствует, всплывающее окно Windows не показано: ${target.toastScript}`;
}
function chainBin(commands) {
  const first = commands[0];
  return first === void 0 ? "unknown" : commandNameOf(first.command);
}
function commandNameOf(command) {
  return command[0] ?? "unknown";
}
function toneOf(sound) {
  return typeof sound === "string" ? sound : FOLLOW_SYSTEM_TONE;
}
function delivered() {
  return { status: "ok", stage: "delivered" };
}
function failed2(code, params, detail) {
  const extra = {};
  if (params !== void 0)
    extra.params = params;
  if (detail !== void 0 && detail !== "")
    extra.detail = detail;
  return {
    status: "failed",
    stage: "delivered",
    reason: reason(code, extra),
    retryable: false
  };
}

// lib/server/channels/impl/webhook/index.js
var MIN_TIMEOUT_SEC = 1;
var MAX_TIMEOUT_SEC = 60;
var DEFAULT_TIMEOUT_SEC = 10;
var TOKEN_RE = /\{\{\s*(title|message|kind|severity|priority|source)\s*\}\}/g;
function priorityFor(preset, severity) {
  const mapped = severity !== void 0 && Object.hasOwn(WEBHOOK_PRIORITY[preset], severity) ? WEBHOOK_PRIORITY[preset][severity] : void 0;
  if (mapped !== void 0)
    return mapped;
  return preset === "raw" ? "" : WEBHOOK_PRIORITY[preset].info;
}
function renderWebhookBody(template, preset, vars) {
  const source = template.length > 0 ? template : WEBHOOK_DEFAULT_TEMPLATES[preset];
  const step1 = source.split("{{ts}}").join(String(Math.round(vars.ts)));
  let tree;
  try {
    tree = JSON.parse(step1);
  } catch (cause) {
    const reason2 = cause instanceof Error ? cause.message : String(cause);
    throw new Error(`шаблон webhook — не корректный JSON: ${reason2}`);
  }
  return JSON.stringify(renderTree(tree, {
    title: vars.title,
    message: vars.message,
    kind: vars.kind,
    severity: vars.severity ?? "",
    priority: priorityFor(preset, vars.severity),
    source: ""
  }));
}
function renderTree(node, values) {
  if (typeof node === "string") {
    return node.replace(TOKEN_RE, (match, name2) => Object.hasOwn(values, name2) ? values[name2] : match);
  }
  if (Array.isArray(node))
    return node.map((item) => renderTree(item, values));
  if (typeof node === "object" && node !== null) {
    const rebuilt = {};
    for (const [key, value] of Object.entries(node))
      rebuilt[key] = renderTree(value, values);
    return rebuilt;
  }
  return node;
}
var defaultFetch2 = (url, init) => globalThis.fetch(url, init);
async function sendWebhook(target, message, fetchImpl = defaultFetch2) {
  let body;
  try {
    body = renderWebhookBody(target.template ?? "", target.preset, {
      title: truncateCodePoints(message.title, displayCaps.webhook.titleMax),
      message: truncateCodePoints(message.body, displayCaps.webhook.bodyMax),
      kind: message.kind,
      severity: message.severity,
      ts: message.ts
    });
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    return failed3("reasonWebhookTemplateInvalid", { detail });
  }
  const headers = { ...target.headers };
  setHeader(headers, "content-type", "application/json; charset=utf-8");
  applyAuthHeader(headers, target.auth);
  let response;
  try {
    response = await fetchImpl(target.url, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(clampTimeoutSec(target.timeoutSec) * 1e3)
    });
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    return failed3("reasonWebhookRequestFailed", { detail });
  }
  if (!response.ok) {
    let detail = "";
    try {
      detail = truncateCodePoints(await response.text(), RESPONSE_DETAIL_MAX);
    } catch {
    }
    return failed3("reasonWebhookHttp", { params: { status: response.status }, detail });
  }
  return { status: "ok", stage: "delivered" };
}
function applyAuthHeader(headers, auth) {
  if (auth === void 0)
    return;
  if (auth.kind === "bearer") {
    setHeader(headers, "authorization", `Bearer ${auth.token}`);
    return;
  }
  if (auth.kind === "basic") {
    const pair = Buffer.from(`${auth.user}:${auth.password}`).toString("base64");
    setHeader(headers, "authorization", `Basic ${pair}`);
  }
}
function setHeader(headers, name2, value) {
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === name2)
      delete headers[key];
  }
  headers[name2] = value;
}
function clampTimeoutSec(value) {
  if (typeof value !== "number" || !Number.isFinite(value))
    return DEFAULT_TIMEOUT_SEC;
  return Math.min(MAX_TIMEOUT_SEC, Math.max(MIN_TIMEOUT_SEC, Math.round(value)));
}
function failed3(code, options = {}) {
  return {
    status: "failed",
    stage: "delivered",
    reason: clampReasonDetail(reason(code, options), FAILURE_REASON_MAX),
    // 零重试是硬约束: 失败即终态, 交回管线也没有第二次
    retryable: false
  };
}

// lib/server/channels/impl/deliver/index.js
async function deliverImpl(message, targets) {
  return Promise.all(targets.map((target) => deliverOne(target, message)));
}
async function deliverOne(target, message) {
  try {
    const kind = target.type;
    switch (target.type) {
      case "bark":
        return await sendBark(target, message);
      case "webhook":
        return await sendWebhook(target, message);
      case "browser":
        return sendBrowser(target, message);
      case "system":
        return await sendSystem(target, message);
    }
    return unknownTarget(kind);
  } catch (cause) {
    return {
      status: "failed",
      stage: "accepted",
      reason: reasonFromCause("reasonChannelThrew", cause),
      retryable: false
    };
  }
}
function unknownTarget(kind) {
  return {
    status: "failed",
    stage: "accepted",
    reason: reason("reasonUnknownTarget", { params: { kind } }),
    retryable: false
  };
}

// lib/server/channels/impl/capabilities/table.js
var ALLOWED_CHECKED = {
  linux: {
    popup: ["notify-send", "dbus-name-owner", "dbus-activatable", "session-bus"],
    sound: ["players", "tone-file"]
  },
  darwin: { popup: [], sound: ["tone-file"] },
  win32: { popup: [], sound: ["tone-file"] }
};
var POSIX_CHECKS = {
  popup: ["notify-send", "dbus-name-owner", "dbus-activatable", "session-bus"],
  sound: []
};
var PACKAGE_FAMILIES = {
  debian: "apt",
  ubuntu: "apt",
  linuxmint: "apt",
  pop: "apt",
  raspbian: "apt",
  kali: "apt",
  fedora: "dnf",
  rhel: "dnf",
  centos: "dnf",
  rocky: "dnf",
  almalinux: "dnf",
  arch: "pacman",
  archarm: "pacman",
  manjaro: "pacman",
  endeavouros: "pacman"
};
var PLAYER_PACKAGES = {
  apt: ["alsa-utils", "ffmpeg"],
  dnf: ["alsa-utils", "ffmpeg"],
  pacman: ["alsa-utils", "ffmpeg"]
};

// lib/server/channels/impl/capabilities/index.js
var TONE_FOR_PROBE = FOLLOW_SYSTEM_TONE;
var SEVERITY = {
  ok: 0,
  degraded: 1,
  unknown: 2,
  unreachable: 3
};
function checksFor(platform) {
  return ALLOWED_CHECKED[platform] ?? POSIX_CHECKS;
}
async function probeHostCapabilities() {
  const deps = systemDeps();
  const probe = await platformCapabilities.get(toastScriptPath(), probePlatform);
  const name2 = isSystemToolPlatform(probe.platform) ? { kind: "absent" } : await deps.probeNotificationName();
  const candidates = toneFileCandidates(probe.platform, TONE_FOR_PROBE);
  const toneFileAvailable = candidates.some((path) => deps.existsSync(path));
  const popup = popupCapability(probe, name2);
  const sound = soundCapability(probe, {
    toneFileAvailable,
    toneFileProbed: candidates.length > 0
  });
  return {
    verdict: groupVerdict([popup.state, sound.state]),
    unknownDimensions: dimensionsIn([
      ["popup", popup.state],
      ["sound", sound.state]
    ], "unknown"),
    popup,
    sound,
    remediation: remediationOf({
      probe,
      name: name2,
      popup,
      sound,
      osRelease: deps.readOsRelease()
    })
  };
}
function groupVerdict(states) {
  return states.reduce((worst, state) => SEVERITY[state] > SEVERITY[worst] ? state : worst, "ok");
}
function dimensionsIn(entries, wanted) {
  return entries.filter(([, state]) => state === wanted).map(([dimension]) => dimension);
}
function popupCapability(probe, name2) {
  if (probe.platform === "darwin")
    return { state: "ok", checked: [] };
  if (probe.platform === "win32") {
    return { state: probe.toastScriptAvailable ? "ok" : "unreachable", checked: [] };
  }
  return { state: popupStateOf(probe, name2), checked: popupChecked(probe.platform, name2) };
}
function isSystemToolPlatform(platform) {
  return platform === "darwin" || platform === "win32";
}
function popupStateOf(probe, name2) {
  if (name2.kind === "no-session-bus")
    return "unreachable";
  if (name2.kind === "probe-failed")
    return "unknown";
  if (!probe.notifySendAvailable)
    return "unreachable";
  if (name2.kind === "owner")
    return "ok";
  return name2.kind === "activatable" ? "unknown" : "unreachable";
}
function popupChecked(platform, name2) {
  if (name2.kind === "no-session-bus")
    return allowed(platform, "popup", ["session-bus"]);
  const queried = ["notify-send", "dbus-name-owner", "session-bus"];
  if (name2.kind === "activatable" || name2.kind === "absent")
    queried.push("dbus-activatable");
  return allowed(platform, "popup", queried);
}
function allowed(platform, dimension, dims) {
  const permitted = checksFor(platform)[dimension];
  return dims.filter((dim) => permitted.includes(dim));
}
function soundCapability(probe, tone) {
  const checked = allowed(probe.platform, "sound", [
    ...probe.platform === "linux" ? ["players"] : [],
    ...tone.toneFileProbed ? ["tone-file"] : []
  ]);
  const base = { players: probe.players, toneFileAvailable: tone.toneFileAvailable, checked };
  if (probe.platform === "linux") {
    if (probe.players.length === 0)
      return { state: "unreachable", ...base };
    const serverless = probe.players.some(isServerlessPlayer);
    return { state: serverless ? "ok" : "degraded", ...base };
  }
  if (isSystemToolPlatform(probe.platform)) {
    return { state: tone.toneFileAvailable ? "ok" : "degraded", ...base };
  }
  return { state: "unknown", ...base };
}
function undeterminedCapabilities() {
  return {
    verdict: "unknown",
    unknownDimensions: ["popup", "sound"],
    popup: { state: "unknown", checked: [] },
    sound: { state: "unknown", players: [], toneFileAvailable: false, checked: [] },
    remediation: []
  };
}
function remediationOf(input) {
  const out = [...popupRemedies(input)];
  if (input.sound.state === "unreachable" && input.probe.platform === "linux") {
    out.push(packageRemedy(input.osRelease, "host-no-sound-server-and-player"));
  }
  if (input.sound.state === "degraded") {
    out.push(input.probe.platform === "linux" ? packageRemedy(input.osRelease, "host-only-sound-server-players") : { code: "host-no-tone-file" });
  }
  if (input.popup.state === "unreachable" && input.sound.state === "unreachable") {
    out.push({ code: "host-managed-by-others" });
  }
  return out;
}
function popupRemedies(input) {
  if (input.popup.state !== "unreachable")
    return [];
  if (input.name.kind === "no-session-bus")
    return [{ code: "host-no-dbus-session" }];
  if (input.name.kind === "absent" && input.probe.notifySendAvailable) {
    return [{ code: "host-popup-no-daemon" }];
  }
  if (input.probe.platform === "linux" && input.name.kind === "absent" && !input.probe.notifySendAvailable) {
    return [{ code: "host-no-notify-send" }];
  }
  return [];
}
function packageRemedy(osRelease, code) {
  const family = osRelease.ok ? PACKAGE_FAMILIES[osRelease.id.toLowerCase()] : void 0;
  if (family === void 0)
    return { code };
  return {
    code,
    params: { packagemanager: family, packages: PLAYER_PACKAGES[family] }
  };
}

// lib/server/channels/impl/dry-run/secure-fetch.js
import { promises as dnsPromises } from "node:dns";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";
var MAX_REDIRECTS = 5;
var RESPONSE_CAP = 16 * 1024;
var REDIRECT_STATUS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
async function secureFetch(input, init, ports = {}) {
  const dns = ports.dns ?? defaultDns;
  const transport = ports.transport ?? realTransport;
  let current = input;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const admitted = urlGate(current);
    if (!admitted.ok)
      return failed4(admitted.cause);
    const pinned = await pinHost(admitted.url.hostname, dns);
    if (!pinned.ok)
      return failed4(pinned.cause);
    const dialed = await dialPinned(transport, admitted.url, pinned, init);
    if (!dialed.ok)
      return failed4(dialed.cause);
    const landed = landHop(dialed.outcome, admitted.url, hop);
    if (landed.kind === "done")
      return landed.outcome;
    current = landed.url;
  }
  return failed4(tooManyRedirects);
}
function landHop(outcome, base, hop) {
  if (outcome.kind !== "redirect") {
    return { kind: "done", outcome: { ok: true, status: outcome.status, body: outcome.body } };
  }
  if (hop === MAX_REDIRECTS)
    return { kind: "done", outcome: failed4(tooManyRedirects) };
  const next = redirectNext(outcome.location, base);
  return next === void 0 ? { kind: "done", outcome: failed4("некорректный адрес перенаправления") } : { kind: "next", url: next };
}
var tooManyRedirects = "слишком много перенаправлений (больше " + MAX_REDIRECTS + " переходов)";
function failed4(cause) {
  return { ok: false, cause };
}
function urlGate(current) {
  let url;
  try {
    url = new URL(current);
  } catch {
    return { ok: false, cause: "не удалось разобрать URL" };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, cause: "разрешены только http(s), отклонено " + url.protocol };
  }
  if (url.username !== "" || url.password !== "") {
    return { ok: false, cause: "в URL нельзя встраивать userinfo (учётные данные только в заголовках)" };
  }
  return { ok: true, url };
}
function causeText(cause) {
  return cause instanceof Error ? cause.message : String(cause);
}
async function dialPinned(transport, url, pinned, init) {
  try {
    const outcome = await transport(url, pinned.ip, pinned.family, {
      method: init.method,
      headers: init.headers,
      body: init.body,
      timeoutMs: init.timeoutMs
    });
    return { ok: true, outcome };
  } catch (cause) {
    return { ok: false, cause: causeText(cause) };
  }
}
function redirectNext(location, base) {
  try {
    return new URL(location, base).toString();
  } catch {
    return void 0;
  }
}
var defaultDns = {
  resolveAll: (hostname) => dnsPromises.lookup(hostname, { all: true })
};
async function pinHost(hostname, dns) {
  const literal = parseIpLiteral(hostname);
  if (literal !== void 0) {
    const cause = ipBlockCause(literal);
    return cause === void 0 ? { ok: true, ip: literal.text, family: literal.family } : { ok: false, cause };
  }
  let answers;
  try {
    answers = await dns.resolveAll(hostname);
  } catch {
    return { ok: false, cause: "не удалось разрешить имя (DNS): " + hostname };
  }
  if (answers.length === 0)
    return { ok: false, cause: "DNS не вернул записей для " + hostname };
  for (const answer of answers) {
    const parsed = parseIpLiteral(answer.address);
    const cause = parsed === void 0 ? "DNS вернул некорректный адрес: " + answer.address : ipBlockCause(parsed);
    if (cause !== void 0) {
      return { ok: false, cause: "DNS указывает на непубличный адрес (" + cause + "), запрос отклонён целиком" };
    }
  }
  const first = answers[0];
  return { ok: true, ip: first.address, family: first.family === 6 ? 6 : 4 };
}
function parseIpLiteral(text) {
  const stripped = text.trim().replace(/\.$/, "");
  const v4 = parseIpv4Loose(stripped);
  if (v4 !== void 0)
    return { family: 4, octets: v4, text: v4.join(".") };
  const noBracket = stripped.startsWith("[") && stripped.endsWith("]") ? stripped.slice(1, -1) : stripped;
  if (isIP(noBracket) !== 6)
    return void 0;
  const words = expandIpv6(noBracket.toLowerCase());
  if (words === void 0)
    return void 0;
  return { family: 6, words, text: noBracket.toLowerCase() };
}
function parseIpv4Loose(text) {
  if (text === "" || text.includes(":"))
    return void 0;
  const parts = text.split(".");
  if (parts.length < 1 || parts.length > IPV4_MAX_PARTS)
    return void 0;
  const values = [];
  for (const part of parts) {
    const value = decodeIpv4Part(part);
    if (value === void 0)
      return void 0;
    values.push(value);
  }
  if (ipV4PartOverflows(values))
    return void 0;
  const full = assembleIpv4(values);
  if (full < 0 || full > 4294967295)
    return void 0;
  return ipv4Bytes(full);
}
var IPV4_MAX_PARTS = 4;
var IPV4_BASE_PATTERNS = {
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/
};
var IPV4_PART_LIMITS = [4294967295, 16777215, 65535, 255];
var IPV4_LEADING_SHIFTS = [24, 16, 8];
function ipv4PartBase(part) {
  if (part.startsWith("0x") || part.startsWith("0X")) {
    return { base: 16, digits: part.slice(2) };
  }
  if (part.length > 1 && part.startsWith("0")) {
    return { base: 8, digits: part.slice(1) };
  }
  return { base: 10, digits: part };
}
function decodeIpv4Part(part) {
  if (part === "")
    return void 0;
  const { base, digits } = ipv4PartBase(part);
  if (digits === "")
    return void 0;
  if (!IPV4_BASE_PATTERNS[base].test(digits))
    return void 0;
  const value = Number.parseInt(digits, base);
  return Number.isSafeInteger(value) ? value : void 0;
}
function ipV4PartOverflows(values) {
  return values.some((value, index) => value < 0 || value > (IPV4_PART_LIMITS[index] ?? 255));
}
function assembleIpv4(values) {
  const last = values.length - 1;
  let full = 0;
  for (let index = 0; index < last; index += 1) {
    full += (values[index] ?? 0) * 2 ** (IPV4_LEADING_SHIFTS[index] ?? 0);
  }
  return full + (values[last] ?? 0);
}
function ipv4Bytes(full) {
  return [
    Math.floor(full / 2 ** 24) % 256,
    Math.floor(full / 2 ** 16) % 256,
    Math.floor(full / 2 ** 8) % 256,
    full % 256
  ];
}
function ipBlockCause(parsed) {
  if (parsed.family === 4)
    return v4BlockCause(parsed.octets);
  return v6BlockCause(parsed.words);
}
function v4BlockCause(octets) {
  return V4_BLOCK_RULES.find((rule) => covers(rule, ipv4Value(octets)))?.cause;
}
var V4_BLOCK_RULES = [
  { prefix: 0, mask: 4278190080, cause: "неопределённый адрес (0.0.0.0/8)" },
  { prefix: 167772160, mask: 4278190080, cause: "частная сеть (10.0.0.0/8)" },
  { prefix: 2886729728, mask: 4293918720, cause: "частная сеть (172.16.0.0/12)" },
  { prefix: 3232235520, mask: 4294901760, cause: "частная сеть (192.168.0.0/16)" },
  { prefix: 1681915904, mask: 4290772992, cause: "диапазон CGNAT (100.64.0.0/10)" },
  { prefix: 2130706432, mask: 4278190080, cause: "адрес обратной петли (127.0.0.0/8)" },
  {
    prefix: 2851995648,
    mask: 4294901760,
    cause: "канал-локальный адрес (169.254.0.0/16, включая адреса метаданных облака)"
  },
  {
    prefix: 3221225472,
    mask: 4294967040,
    cause: "диапазон, зарезервированный IETF (192.0.0.0/24, включая документационный)"
  },
  { prefix: 3221225984, mask: 4294967040, cause: "диапазон, зарезервированный IETF (192.0.0.0/24, включая документационный)" },
  { prefix: 3227017984, mask: 4294967040, cause: "выведенный из эксплуатации диапазон 6to4 (192.88.99.0/24)" },
  { prefix: 3221254400, mask: 4294967040, cause: "документационный диапазон (TEST-NET, не маршрутизируется)" },
  { prefix: 3325256704, mask: 4294967040, cause: "документационный диапазон (TEST-NET, не маршрутизируется)" },
  { prefix: 3405803776, mask: 4294967040, cause: "документационный диапазон (TEST-NET, не маршрутизируется)" },
  { prefix: 3323068416, mask: 4294836224, cause: "диапазон тестов производительности (198.18.0.0/15)" },
  { prefix: 3758096384, mask: 4026531840, cause: "адрес многоадресной рассылки (224.0.0.0/4)" },
  { prefix: 4026531840, mask: 4026531840, cause: "зарезервированный адрес (240.0.0.0/4, включая широковещательный)" }
];
function covers(rule, value) {
  return (value & rule.mask) >>> 0 === rule.prefix >>> 0;
}
function ipv4Value(octets) {
  const [first = 0, second = 0, third = 0, fourth = 0] = octets;
  return first * 2 ** 24 + second * 2 ** 16 + third * 2 ** 8 + fourth;
}
function v6BlockCause(words) {
  if (words.length !== 8)
    return "не удалось разобрать IPv6";
  return v6WholeAddressCause(words) ?? v6EmbeddedV4Cause(words) ?? v6PrefixCause(words);
}
function v6WholeAddressCause(words) {
  return V6_WHOLE_ADDRESS_CAUSES.find((entry) => words.every((word, index) => word === entry.words[index]))?.cause;
}
function v6EmbeddedV4Cause(words) {
  const headZero5 = words.slice(0, 5).every((word) => word === 0);
  if (headZero5 && (words[5] === 65535 || words[5] === 0))
    return v4BlockCause(innerV4(words));
  if (words[0] === 8194)
    return v4BlockCause(sixToFourInner(words));
  return void 0;
}
function v6PrefixCause(words) {
  const head32 = (words[0] ?? 0) * 2 ** 16 + (words[1] ?? 0) >>> 0;
  return V6_PREFIX_RULES.find((rule) => covers(rule, head32))?.cause;
}
var V6_WHOLE_ADDRESS_CAUSES = [
  { words: [0, 0, 0, 0, 0, 0, 0, 0], cause: "неопределённый адрес (::)" },
  { words: [0, 0, 0, 0, 0, 0, 0, 1], cause: "адрес обратной петли (::1)" }
];
var V6_PREFIX_RULES = [
  { prefix: 4269801472, mask: 4290772992, cause: "канал-локальный адрес (fe80::/10)" },
  { prefix: 4227858432, mask: 4261412864, cause: "уникальный локальный адрес (fc00::/7)" },
  { prefix: 4278190080, mask: 4278190080, cause: "адрес многоадресной рассылки (ff00::/8)" },
  { prefix: 536939960, mask: 4294967295, cause: "документационный диапазон (2001:db8::/32)" },
  { prefix: 536936448, mask: 4294967295, cause: "диапазон Teredo (2001::/32)" }
];
function sixToFourInner(words) {
  const high = words[1] ?? 0;
  const low = words[2] ?? 0;
  return [high >>> 8 & 255, high & 255, low >>> 8 & 255, low & 255];
}
function innerV4(words) {
  const high = words[6] ?? 0;
  const low = words[7] ?? 0;
  return [high >>> 8 & 255, high & 255, low >>> 8 & 255, low & 255];
}
function expandIpv6(text) {
  const split = splitIpv6Tail(text);
  if (split === void 0)
    return void 0;
  const halves = split.head.split("::");
  if (halves.length > 2)
    return void 0;
  return halves.length === 1 ? expandIpv6Full(halves[0] ?? "", split.tailWords) : expandIpv6Compressed(halves[0] ?? "", halves[1] ?? "", split.tailWords);
}
function splitIpv6Tail(text) {
  if (!text.includes("."))
    return { head: text, tailWords: [] };
  const at = text.lastIndexOf(":");
  if (at === -1)
    return void 0;
  const v4 = parseIpv4Loose(text.slice(at + 1));
  if (v4 === void 0)
    return void 0;
  let head = text.slice(0, at);
  if (head.endsWith(":"))
    head = head.slice(0, -1);
  if (head === "")
    head = "::";
  return { head, tailWords: [v4[0] * 256 + v4[1], v4[2] * 256 + v4[3]] };
}
function expandIpv6Full(group, tailWords) {
  const all = parseHextets(group);
  if (all === void 0 || all.length !== 8 - tailWords.length)
    return void 0;
  return [...all, ...tailWords];
}
function expandIpv6Compressed(left, right, tailWords) {
  const head = parseHextets(left);
  const tail = parseHextets(right);
  if (head === void 0 || tail === void 0)
    return void 0;
  const missing = 8 - tailWords.length - head.length - tail.length;
  if (missing < 1)
    return void 0;
  return [...head, ...new Array(missing).fill(0), ...tail, ...tailWords];
}
function parseHextets(group) {
  if (group === "")
    return [];
  const out = [];
  for (const part of group.split(":")) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(part))
      return void 0;
    out.push(Number.parseInt(part, 16));
  }
  return out;
}
function realTransport(url, ip, family, init) {
  return new Promise((resolve, reject2) => {
    let settled2 = false;
    const settleResolve = (outcome) => {
      if (settled2)
        return;
      settled2 = true;
      resolve(outcome);
    };
    const settleReject = (cause) => {
      if (settled2)
        return;
      settled2 = true;
      reject2(cause instanceof Error ? cause : new Error(String(cause)));
    };
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(url, {
      method: init.method,
      headers: init.headers,
      lookup: (_host, _options, callback) => callback(null, ip, family)
    }, (res) => {
      const location = res.headers.location;
      if (typeof res.statusCode === "number" && REDIRECT_STATUS.has(res.statusCode) && typeof location === "string") {
        res.resume();
        settleResolve({ kind: "redirect", location });
        return;
      }
      const chunks = [];
      let size = 0;
      res.on("data", (chunk) => {
        if (size >= RESPONSE_CAP)
          return;
        const room = RESPONSE_CAP - size;
        chunks.push(chunk.length > room ? chunk.subarray(0, room) : chunk);
        size += chunk.length;
        if (size >= RESPONSE_CAP) {
          settleResolve({
            kind: "response",
            status: res.statusCode ?? 0,
            body: Buffer.concat(chunks).toString("utf8")
          });
          req.destroy();
        }
      });
      res.on("end", () => settleResolve({
        kind: "response",
        status: res.statusCode ?? 0,
        body: Buffer.concat(chunks).toString("utf8")
      }));
      res.on("error", settleReject);
    });
    req.on("socket", (socket) => {
      const verify = () => {
        const remote = socket.remoteAddress ?? "";
        if (remote === "")
          return;
        if (!sameEndpoint(remote, ip)) {
          settleReject(new Error("адрес узла не совпал с проверенным, запрос прерван (remoteAddress=" + remote + ")"));
          req.destroy();
        }
      };
      if ((socket.remoteAddress ?? "") === "") {
        socket.once("connect", verify);
        socket.once("secureConnect", verify);
      } else {
        verify();
      }
    });
    req.on("timeout", () => {
      settleReject(new Error("превышено время ожидания (" + init.timeoutMs + "ms)"));
      req.destroy();
    });
    req.on("error", settleReject);
    req.setTimeout(init.timeoutMs);
    req.end(init.body);
  });
}
function sameEndpoint(remote, expected) {
  const left = remote.trim().toLowerCase().replace(/^\[|\]$/g, "");
  const right = expected.trim().toLowerCase().replace(/^\[|\]$/g, "");
  if (left === right)
    return true;
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(left);
  return mapped !== null && mapped[1] === right;
}

// lib/server/channels/impl/dry-run/index.js
var DRY_RUN_FETCH_CAP_MS = 15e3;
function dryRunFetchTimeoutMs(target) {
  const base = target.type === "bark" ? timeoutMsOf(target) : clampTimeoutSec(target.timeoutSec) * 1e3;
  return Math.min(base, DRY_RUN_FETCH_CAP_MS);
}
async function dryRunTarget(target, message, ports) {
  switch (target.type) {
    case "bark":
      return settled(await sendBark(target, message, dryRunFetch(target, ports)));
    case "webhook":
      return settled(await sendWebhook(target, message, dryRunFetch(target, ports)));
    case "browser":
      return settled(sendBrowser({ ...target, emitFrame: () => {
      } }, message));
    case "system":
      return settled(await sendSystem(target, message));
  }
}
function dryRunFetch(target, ports) {
  return (url, init) => secureFetch(url, {
    method: init.method,
    headers: init.headers,
    body: init.body,
    timeoutMs: dryRunFetchTimeoutMs(target)
  }, ports ?? {}).then((outcome) => {
    if (!outcome.ok)
      throw new Error(outcome.cause);
    return {
      ok: outcome.status >= 200 && outcome.status < 300,
      status: outcome.status,
      text: () => Promise.resolve(outcome.body),
      json: () => {
        try {
          return Promise.resolve(JSON.parse(outcome.body));
        } catch {
          return Promise.reject(new SyntaxError("тело ответа — не корректный JSON"));
        }
      }
    };
  });
}
function settled(result) {
  if (result.status === "ok")
    return result;
  const normalized = normalizeReason(clampReasonDetail(result.reason, FAILURE_REASON_MAX));
  if (normalized === void 0)
    return result;
  return { ...result, reason: normalized };
}

// lib/server/channels/interface.js
async function deliver(message, targets) {
  return deliverImpl(message, targets);
}
async function probeCapabilities() {
  return probeHostCapabilities();
}
function hostPlatform() {
  return systemDeps().platform;
}

// lib/server/config/interface.js
var interface_exports2 = {};
__export(interface_exports2, {
  installConfig: () => installConfig,
  normalizeConfig: () => normalizeConfig,
  readConfig: () => readConfig,
  readSettingsView: () => readSettingsView,
  releaseConfig: () => releaseConfig,
  resolveDraftChannels: () => resolveDraftChannels,
  writeConfig: () => writeConfig
});

// lib/server/config/impl/service/index.js
import { createHash } from "node:crypto";

// lib/server/config/impl/model/index.js
var DEFAULT_CONFIG = {
  notifyAsk: true,
  notifyQuestion: true,
  notifyTaskDone: true,
  notifySubagentDone: false,
  notifyTaskError: true,
  notifyTurnEnd: false,
  // 渠道形态只有一处表达: 下面两条内置条目.0.2.3 的顶层渠道键在升级时被搬进条目并删除.
  quietHours: { enabled: false, windows: [{ start: "22:00", end: "08:00" }] },
  // 内置频道恒在场且恒在最前: 默认表就带它们, 读面物化才有«与默认表逐字一致»的比对基准.
  channels: [
    { type: "browser", id: "browser", enabled: true, popup: true, sound: true, whenVisible: false },
    { type: "system", id: "system", enabled: true, popup: true, sound: true }
  ],
  kindRoutes: {},
  allowKinds: [],
  historyMaxAgeDays: 0
};

// lib/server/config/impl/input/index.js
var BARK_LEVELS = ["active", "timeSensitive", "passive", "critical"];
var BARK_RESERVED_KEYS = ["device_key", "device_keys", "ciphertext"];
var WEBHOOK_RESERVED_KEYS = [
  "auth_token",
  "access_token",
  "bearer_token",
  "api_key",
  "apikey",
  "client_secret",
  "secret",
  "password_hash"
];
var BARK_KNOWN_KEYS = [
  "id",
  "type",
  "enabled",
  "name",
  "baseUrl",
  "deviceKey",
  "level",
  "levels",
  "group",
  "sound",
  "icon",
  "url",
  "badge",
  "timeoutMs"
];
var WEBHOOK_KNOWN_KEYS = [
  "id",
  "type",
  "enabled",
  "name",
  "url",
  "preset",
  "auth",
  "token",
  "username",
  "password",
  "headerName",
  "headerValue",
  "template",
  "headers",
  "timeoutSec"
];
var CONFIG_KEYS = Object.keys(DEFAULT_CONFIG);
var BOOLEAN_KEYS = [
  "notifyAsk",
  "notifyQuestion",
  "notifyTaskDone",
  "notifySubagentDone",
  "notifyTaskError",
  "notifyTurnEnd"
];
var MOVED_INTO_CHANNELS_HINT = "ключ переехал в записи каналов при обновлении до 0.2.4; если страница открыта со старой версии — обновите её и повторите";
var CONNECTION_CAP_REMOVED_HINT = "ключ удалён вместе с механизмом лимита SSE-соединений при обновлении до 0.2.5; если страница открыта со старой версии — обновите её и повторите";
var RETIRED_KEYS = {
  systemEnabled: MOVED_INTO_CHANNELS_HINT,
  browserEnabled: MOVED_INTO_CHANNELS_HINT,
  systemNotify: MOVED_INTO_CHANNELS_HINT,
  browserNotify: MOVED_INTO_CHANNELS_HINT,
  notifyWhenVisible: MOVED_INTO_CHANNELS_HINT,
  notifySound: MOVED_INTO_CHANNELS_HINT,
  browserSound: MOVED_INTO_CHANNELS_HINT,
  systemSound: MOVED_INTO_CHANNELS_HINT,
  maxConnections: CONNECTION_CAP_REMOVED_HINT
};
var COUNT_LIMITS = {
  historyMaxAgeDays: 3650
};
function parseJsonObject(text) {
  try {
    const parsed = JSON.parse(text);
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
function normalizeConfig(input) {
  const fallback = DEFAULT_CONFIG;
  const browser = asBrowserChannel(builtinRaw(input.channels, "browser"), input);
  const system = asSystemChannel(builtinRaw(input.channels, "system"), input);
  return {
    notifyAsk: asBoolean(input.notifyAsk, fallback.notifyAsk),
    notifyQuestion: asBoolean(input.notifyQuestion, fallback.notifyQuestion),
    notifyTaskDone: asBoolean(input.notifyTaskDone, fallback.notifyTaskDone),
    notifySubagentDone: asBoolean(input.notifySubagentDone, fallback.notifySubagentDone),
    notifyTaskError: asBoolean(input.notifyTaskError, fallback.notifyTaskError),
    notifyTurnEnd: asBoolean(input.notifyTurnEnd, fallback.notifyTurnEnd),
    quietHours: asQuietHours(input.quietHours, fallback.quietHours),
    channels: [browser, system, ...outboundChannels(input.channels)],
    kindRoutes: asKindRoutes(input.kindRoutes),
    allowKinds: asStrings(input.allowKinds),
    historyMaxAgeDays: asCount(input.historyMaxAgeDays, fallback.historyMaxAgeDays, COUNT_LIMITS.historyMaxAgeDays)
  };
}
function validateSettings(raw) {
  for (const [key, value] of Object.entries(raw)) {
    if (value === void 0)
      continue;
    const retiredHint = Object.hasOwn(RETIRED_KEYS, key) ? RETIRED_KEYS[key] : void 0;
    if (retiredHint !== void 0)
      return reject(key, retiredHint);
    if (!CONFIG_KEYS.includes(key))
      continue;
    const verdict = validateOne(key, value);
    if (!verdict.ok)
      return verdict;
  }
  return { ok: true };
}
function validateOne(key, raw) {
  if (BOOLEAN_KEYS.includes(key))
    return requireBoolean(key, raw);
  const limit = COUNT_LIMITS[key];
  if (Number.isFinite(limit))
    return requireCount(key, raw, limit);
  if (key === "quietHours")
    return validateQuietHours(raw);
  if (key === "channels")
    return validateChannels(raw);
  if (key === "kindRoutes")
    return validateKindRoutes(raw);
  if (key === "allowKinds")
    return requireStringArray(key, raw);
  return { ok: true };
}
function requireBoolean(key, raw) {
  return typeof raw === "boolean" ? { ok: true } : reject(key, "требуется true или false");
}
function requireSoundSetting(key, raw) {
  return typeof raw === "boolean" || isSoundId(raw) ? { ok: true } : reject(key, "требуется false, true или имя встроенного сигнала");
}
function requireCount(key, raw, limit) {
  const inRange = typeof raw === "number" && Number.isInteger(raw) && raw >= 0 && raw <= limit;
  return inRange ? { ok: true } : reject(key, `требуется целое число от 0 до ${limit}`);
}
function requireStringArray(key, raw) {
  return isStringArray(raw) ? { ok: true } : reject(key, "требуется массив строк");
}
function validateQuietHours(raw) {
  if (!isRecord(raw))
    return reject("quietHours", "требуется объект");
  if (typeof raw.enabled !== "boolean")
    return reject("quietHours", "отсутствует enabled");
  if (raw.windows === void 0)
    return reject("quietHours", "отсутствует windows (если страница открыта со старой версии — обновите её и повторите)");
  if (!Array.isArray(raw.windows))
    return reject("quietHours", "windows должен быть массивом");
  if (raw.windows.length > QUIET_WINDOWS_LIMIT)
    return reject("quietHours", "windows: не более " + QUIET_WINDOWS_LIMIT + " шт.");
  const windows = validateQuietWindows(raw.windows);
  if (!windows.ok)
    return windows;
  if ("allowKinds" in raw && !isStringArray(raw.allowKinds))
    return reject("quietHours", "allowKinds должен быть массивом строк");
  return { ok: true };
}
function validateQuietWindows(windows) {
  for (let index = 0; index < windows.length; index += 1) {
    const verdict = validateQuietWindow(windows[index], index);
    if (!verdict.ok)
      return verdict;
  }
  return { ok: true };
}
function validateQuietWindow(item, index) {
  if (!isRecord(item))
    return reject("quietHours", "windows[" + index + "] должен быть объектом");
  if (typeof item.start !== "string" || !isClockText(item.start))
    return reject("quietHours", "windows[" + index + "].start должен быть в формате HH:MM");
  if (typeof item.end !== "string" || !isClockText(item.end))
    return reject("quietHours", "windows[" + index + "].end должен быть в формате HH:MM");
  if (item.start === item.end)
    return reject("quietHours", "windows[" + index + "].start и windows[" + index + "].end не могут совпадать");
  return { ok: true };
}
function validateChannels(raw) {
  if (!Array.isArray(raw))
    return reject("channels", "требуется массив");
  for (const item of raw) {
    const verdict = validateChannel(item);
    if (!verdict.ok)
      return verdict;
  }
  return requireBuiltinsPresent(raw);
}
function requireBuiltinsPresent(list) {
  const types = /* @__PURE__ */ new Set();
  for (const item of list) {
    if (isRecord(item))
      types.add(item.type);
  }
  for (const type of BUILTIN_CHANNEL_TYPES) {
    if (types.has(type))
      continue;
    return reject("channels", `встроенный канал нельзя удалить: нет ${type} (если страница открыта со старой версии — обновите её и повторите)`);
  }
  return { ok: true };
}
function validateChannel(raw) {
  if (!isRecord(raw))
    return reject("channels", "элемент канала должен быть объектом");
  if (raw.type === "browser" || raw.type === "system")
    return validateBuiltinChannel(raw, raw.type);
  if (typeof raw.id !== "string" || raw.id === "")
    return reject("channels", "у канала отсутствует id");
  if (raw.type === "bark")
    return validateBarkChannel(raw, raw.id);
  if (raw.type === "webhook")
    return validateWebhookChannel(raw, raw.id);
  return reject("channels", "тип канала должен быть bark, webhook, browser или system");
}
function validateBuiltinChannel(raw, type) {
  if (raw.id !== void 0 && raw.id !== type)
    return reject("channels", `у встроенного канала ${type} id может быть только ${type}`);
  for (const key of ["enabled", "popup", "whenVisible"]) {
    if (raw[key] === void 0 || typeof raw[key] === "boolean")
      continue;
    return reject("channels", `у встроенного канала ${type} поле ${key} требует true или false`);
  }
  return raw.sound === void 0 ? { ok: true } : requireSoundSetting("channels", raw.sound);
}
function validateBarkChannel(raw, id) {
  if (typeof raw.baseUrl !== "string" || raw.baseUrl === "")
    return reject("channels", `у канала bark ${id} отсутствует baseUrl`);
  if (typeof raw.deviceKey !== "string" || raw.deviceKey === "")
    return reject("channels", `у канала bark ${id} отсутствует deviceKey`);
  if (raw.level !== void 0 && !isMember(raw.level, BARK_LEVELS))
    return reject("channels", `у канала bark ${id} недопустимый level`);
  return validateExtras(raw, id, BARK_KNOWN_KEYS, BARK_RESERVED_KEYS, "bark");
}
function validateWebhookChannel(raw, id) {
  if (typeof raw.url !== "string" || raw.url === "")
    return reject("channels", `у канала webhook ${id} отсутствует url`);
  if (!isMember(raw.auth, WEBHOOK_AUTHS))
    return reject("channels", `у канала webhook ${id} недопустимая auth`);
  if (raw.preset !== void 0 && !isMember(raw.preset, WEBHOOK_PRESETS))
    return reject("channels", `у канала webhook ${id} недопустимый preset`);
  return validateExtras(raw, id, WEBHOOK_KNOWN_KEYS, WEBHOOK_RESERVED_KEYS, "webhook");
}
function validateExtras(raw, id, known, reserved, kindLabel) {
  for (const key of Object.keys(raw)) {
    if (known.includes(key))
      continue;
    if (reserved.includes(key))
      return reject("channels", `${kindLabel}: у канала ${id} поле ${key} зарезервировано — учётные данные только в известных полях`);
    const value = raw[key];
    if (typeof value !== "string" && typeof value !== "number")
      return reject("channels", `${kindLabel}: у канала ${id} поле ${key} может быть только строкой или числом`);
  }
  return { ok: true };
}
function validateKindRoutes(raw) {
  if (!isRecord(raw))
    return reject("kindRoutes", "требуется объект");
  for (const key of Object.keys(raw)) {
    const value = raw[key];
    if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
      return reject("kindRoutes", `${key} должен быть массивом строк`);
    }
  }
  return { ok: true };
}
function reject(key, hint) {
  return { ok: false, error: { key, hint } };
}
function sanitizeSettings(raw) {
  const kept = {};
  if (!isRecord(raw))
    return kept;
  for (const key of CONFIG_KEYS) {
    const value = raw[key];
    if (value === void 0)
      continue;
    kept[key] = value;
  }
  return kept;
}
function isRecord(raw) {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw);
}
function isMember(raw, allowed2) {
  return typeof raw === "string" && allowed2.some((item) => item === raw);
}
function isStringArray(raw) {
  return Array.isArray(raw) && raw.every((item) => typeof item === "string");
}
function asBoolean(raw, fallback) {
  return typeof raw === "boolean" ? raw : fallback;
}
function asString(raw, fallback) {
  return typeof raw === "string" ? raw : fallback;
}
function asCount(raw, fallback, limit) {
  return typeof raw === "number" && Number.isInteger(raw) && raw >= 0 && raw <= limit ? raw : fallback;
}
function asSound(raw, fallback) {
  if (typeof raw === "boolean")
    return raw;
  return isSoundId(raw) ? raw : fallback;
}
function legacySound(legacy, fallback) {
  return typeof legacy === "boolean" ? legacy : fallback;
}
function asStrings(raw) {
  return Array.isArray(raw) ? raw.filter((item) => typeof item === "string") : [];
}
function asQuietHours(raw, fallback) {
  if (!isRecord(raw))
    return copyQuietHours(fallback);
  const enabled = asBoolean(raw.enabled, fallback.enabled);
  const allowKinds = asStrings(raw.allowKinds);
  if (!Array.isArray(raw.windows)) {
    return { enabled, windows: legacyWindows(raw, fallback), allowKinds };
  }
  const windows = [];
  for (const item of raw.windows) {
    const window = asQuietWindow(item);
    if (window !== null)
      windows.push(window);
  }
  return { enabled, windows, allowKinds };
}
function copyQuietHours(fallback) {
  const copied = {
    enabled: fallback.enabled,
    windows: fallback.windows.map((window) => ({ ...window }))
  };
  if (fallback.allowKinds !== void 0)
    copied.allowKinds = [...fallback.allowKinds];
  return copied;
}
function legacyWindows(raw, fallback) {
  const window = asQuietWindow({ start: raw.start, end: raw.end });
  if (window !== null)
    return [window];
  return fallback.windows.map((item) => ({ ...item }));
}
function asQuietWindow(raw) {
  if (!isRecord(raw))
    return null;
  if (typeof raw.start !== "string" || !isClockText(raw.start))
    return null;
  if (typeof raw.end !== "string" || !isClockText(raw.end))
    return null;
  if (raw.start === raw.end)
    return null;
  return { start: raw.start, end: raw.end };
}
function asKindRoutes(raw) {
  const routes = {};
  if (!isRecord(raw))
    return routes;
  for (const key of Object.keys(raw)) {
    routes[key] = asStrings(raw[key]);
  }
  return routes;
}
function outboundChannels(raw) {
  const channels = [];
  if (!Array.isArray(raw))
    return channels;
  for (const item of raw) {
    const read = asChannel(item);
    if (read.ok)
      channels.push(read.channel);
  }
  return channels;
}
function builtinRaw(raw, type) {
  if (!Array.isArray(raw))
    return void 0;
  for (const item of raw) {
    if (isRecord(item) && item.type === type)
      return item;
  }
  return void 0;
}
function asBrowserChannel(raw, input) {
  const fallback = builtinDefault("browser");
  const source = raw ?? {};
  return {
    type: "browser",
    id: "browser",
    enabled: asBoolean(source.enabled, asBoolean(input.browserEnabled, fallback.enabled)),
    popup: asBoolean(source.popup, asBoolean(input.browserNotify, fallback.popup)),
    sound: asSound(source.sound, outletSoundOf(input, input.browserSound, fallback.sound)),
    whenVisible: asBoolean(source.whenVisible, asBoolean(input.notifyWhenVisible, fallback.whenVisible))
  };
}
function asSystemChannel(raw, input) {
  const fallback = builtinDefault("system");
  const source = raw ?? {};
  return {
    type: "system",
    id: "system",
    enabled: asBoolean(source.enabled, asBoolean(input.systemEnabled, fallback.enabled)),
    popup: asBoolean(source.popup, asBoolean(input.systemNotify, fallback.popup)),
    sound: asSound(source.sound, outletSoundOf(input, input.systemSound, fallback.sound))
  };
}
function builtinDefault(type) {
  for (const channel of DEFAULT_CONFIG.channels) {
    if (channel.type === type)
      return channel;
  }
  throw new Error(`dsh-notifier: в настройках по умолчанию нет встроенного канала ${type}`);
}
function outletSoundOf(input, outlet, fallback) {
  if (outlet !== void 0)
    return asSound(outlet, fallback);
  return legacySound(input.notifySound, fallback);
}
function asChannel(raw) {
  if (!isRecord(raw))
    return { ok: false };
  const id = asString(raw.id, "");
  if (id === "")
    return { ok: false };
  if (raw.type === "bark")
    return asBarkChannel(raw, id);
  if (raw.type === "webhook")
    return asWebhookChannel(raw, id);
  return { ok: false };
}
function asBarkChannel(raw, id) {
  const baseUrl = asString(raw.baseUrl, "");
  const deviceKey = asString(raw.deviceKey, "");
  if (baseUrl === "" || deviceKey === "")
    return { ok: false };
  const channel = {
    type: "bark",
    id,
    enabled: asBoolean(raw.enabled, false),
    name: asString(raw.name, ""),
    baseUrl,
    deviceKey,
    group: asString(raw.group, ""),
    sound: asString(raw.sound, ""),
    icon: asString(raw.icon, ""),
    url: asString(raw.url, ""),
    timeoutMs: asCount(raw.timeoutMs, 0, 6e5),
    levels: asLevels(raw.levels)
  };
  if (isMember(raw.level, BARK_LEVELS))
    channel.level = raw.level;
  if (typeof raw.badge === "number")
    channel.badge = raw.badge;
  const extras = extrasOf(raw, BARK_KNOWN_KEYS, BARK_RESERVED_KEYS);
  if (Object.keys(extras).length > 0)
    channel.extras = extras;
  return { ok: true, channel };
}
function extrasOf(raw, known, reserved) {
  const extras = {};
  for (const key of Object.keys(raw)) {
    if (known.includes(key) || reserved.includes(key))
      continue;
    const value = raw[key];
    if (typeof value === "string" || typeof value === "number")
      extras[key] = value;
  }
  return extras;
}
function asLevels(raw) {
  const levels = {};
  if (!isRecord(raw))
    return levels;
  for (const key of Object.keys(raw)) {
    const value = raw[key];
    if (isMember(value, BARK_LEVELS))
      levels[key] = value;
  }
  return levels;
}
function asWebhookChannel(raw, id) {
  const url = asString(raw.url, "");
  if (url === "")
    return { ok: false };
  const channel = {
    type: "webhook",
    id,
    enabled: asBoolean(raw.enabled, false),
    name: asString(raw.name, ""),
    url,
    preset: isMember(raw.preset, WEBHOOK_PRESETS) ? raw.preset : "custom",
    auth: isMember(raw.auth, WEBHOOK_AUTHS) ? raw.auth : "none",
    token: asString(raw.token, ""),
    username: asString(raw.username, ""),
    password: asString(raw.password, ""),
    headerName: asString(raw.headerName, ""),
    headerValue: asString(raw.headerValue, ""),
    template: asString(raw.template, ""),
    headers: asHeaders(raw.headers),
    timeoutSec: asCount(raw.timeoutSec, 0, 600)
  };
  const extras = extrasOf(raw, WEBHOOK_KNOWN_KEYS, WEBHOOK_RESERVED_KEYS);
  if (Object.keys(extras).length > 0)
    channel.extras = extras;
  return { ok: true, channel };
}
function asHeaders(raw) {
  const headers = {};
  if (!isRecord(raw))
    return headers;
  for (const key of Object.keys(raw)) {
    const value = raw[key];
    if (typeof value === "string")
      headers[key] = value;
  }
  return headers;
}

// lib/server/config/impl/redact/index.js
var SECRET_MASK = "********";
var CHANNEL_SECRET_FIELDS = {
  bark: ["deviceKey"],
  webhook: ["token", "password", "headerValue"],
  // 内置频道没有任何凭据字段; 它们在表里必须出现 (Record 强制穷尽), 值就是空清单.
  browser: [],
  system: []
};
function redactConfig(value) {
  const copy = structuredClone(value);
  const channels = copy.channels;
  if (!Array.isArray(channels))
    return copy;
  copy.channels = channels.map(maskChannel);
  return copy;
}
function redactStored(stored) {
  const masked = {};
  for (const [key, value] of Object.entries(stored)) {
    masked[key] = key === "channels" && Array.isArray(value) ? value.map(maskChannel) : structuredClone(value);
  }
  return masked;
}
function unmaskChannels(patchChannels, userChannels) {
  if (!Array.isArray(patchChannels))
    return { ok: false };
  const existing = Array.isArray(userChannels) ? userChannels : [];
  const restored = [];
  for (const item of patchChannels) {
    const read = unmaskChannel(item, existing);
    if (!read.ok)
      return { ok: false };
    restored.push(read.channel);
  }
  return { ok: true, channels: restored };
}
function maskChannel(channel) {
  if (!isRecord2(channel))
    return channel;
  const masked = { ...channel };
  for (const field of secretFieldsOfType(channel.type)) {
    if (typeof masked[field] === "string")
      masked[field] = SECRET_MASK;
  }
  return masked;
}
function unmaskChannel(patch, existing) {
  if (!isRecord2(patch))
    return { ok: true, channel: patch };
  const masked = secretFieldsOf(patch);
  if (masked.length === 0)
    return { ok: true, channel: patch };
  const original = findById(existing, idOf(patch));
  if (!original.ok)
    return { ok: false };
  const restored = { ...patch };
  for (const field of masked) {
    const value = original.channel[field];
    if (typeof value !== "string")
      return { ok: false };
    restored[field] = value;
  }
  return { ok: true, channel: restored };
}
function secretFieldsOfType(type) {
  if (type === "bark" || type === "webhook")
    return CHANNEL_SECRET_FIELDS[type];
  return [];
}
function secretFieldsOf(patch) {
  return secretFieldsOfType(patch.type).filter((field) => patch[field] === SECRET_MASK);
}
function hasResidualMask(channel) {
  if (!isRecord2(channel))
    return false;
  for (const fields of Object.values(CHANNEL_SECRET_FIELDS)) {
    for (const field of fields) {
      if (channel[field] === SECRET_MASK)
        return true;
    }
  }
  return false;
}
function findById(existing, id) {
  if (id === "")
    return { ok: false };
  for (const item of existing) {
    if (isRecord2(item) && item.id === id)
      return { ok: true, channel: item };
  }
  return { ok: false };
}
function idOf(patch) {
  const id = patch.id;
  return typeof id === "string" ? id : "";
}
function isRecord2(raw) {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw);
}

// lib/server/config/impl/service/index.js
var NEW_CHANNEL_MASK_HINT = "для нового канала нельзя отправлять маску — впишите настоящие учётные данные";
var UNSAFE_KEYS = ["__proto__", "constructor", "prototype"];
var UNINSTALLED2 = { logger: { warn: () => {
} } };
var NOOP = () => {
};
var ConfigStore = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 落盘路径: DSH home 由环境决定, 进程内不变, 故随实例一次性定下. */
  file = notifierFile(CONFIG_FILE_NAME);
  /** 装配入参 (失败出口). */
  deps = UNINSTALLED2;
  /** 文件内容原样镜像: 写回时以它为基底, 才不会被一次保存抹掉不认识的键. */
  stored = {};
  /** 用户层 (净化后): 写面做掩码还原, 视图做回显都要它. */
  user = {};
  /** 生效设置: 用户层归一化后的形态, 读面直接给它. */
  effective = DEFAULT_CONFIG;
  /** 用户层修订号 (内容摘要): 乐观并发的比较依据. */
  revision = 0;
  /** 写队列尾: 新写挂在它后面, «读-改-写»不会交错. */
  tail = Promise.resolve();
  /** 装配: 读一次文件定下初值; 此后只经 `write` 变更. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: домен config собирается один раз");
    this.installed = true;
    this.deps = deps;
    const read = readTextFileSync(this.file);
    this.adopt(read.ok ? parseJsonObject(read.text) : {});
  }
  /** 卸载: 放开装配入参并丢掉用户层快照——它同时是«用户层»与«磁盘状态»的记忆. */
  release() {
    this.installed = false;
    this.deps = UNINSTALLED2;
    this.adopt({});
  }
  /** 当前生效设置 (含明文凭据; 不外发). */
  current() {
    return this.effective;
  }
  /** 设置页视图: 脱敏后的用户层与生效值 + 修订号 + 可写性, 同一刻取齐. */
  view() {
    return {
      // `user` 是**存储原样** (只掩码): 陌生键也要看得见——净化后的 this.user 里没有它们, 
      // 而它们确实还在文件里, 视图不显示就等于«文件里有, 界面里没有»两套事实.
      user: redactStored(this.stored),
      revision: this.revision,
      writable: true,
      effective: redactConfig(this.effective)
    };
  }
  /**
   * 写: 掩码还原 → 校验 → 合并 → 落盘 → 刷新快照.
   *
   * 顺序不可换: 掩码不是合法密钥值, 未还原就被校验拦死; 校验早于落盘, 否则非法值会先写进文件.
   * 校验与合并之间不净化: 陌生键是透传保留的, 一次保存不该把它们抹掉.0.2.3 的顶层渠道键已由
   * upgrade 域在装配期搬走, 写面收到它们会被校验直接拒 (退役键清单), 不在这里做二次翻译.
   */
  async write(patch, expectedRevision) {
    const restored = this.restoreSecrets(patch);
    if (!restored.ok) {
      return {
        ok: false,
        reason: "invalid",
        error: { key: "channels", hint: NEW_CHANNEL_MASK_HINT }
      };
    }
    const verdict = validateSettings(restored.patch);
    if (!verdict.ok)
      return { ok: false, reason: "invalid", error: verdict.error };
    const incoming = writableEntries(restored.patch);
    return this.enqueue(() => this.commit(incoming, expectedRevision));
  }
  /**
   * 提交: 版本比对 → 合并 → 原子落盘 → 采纳.
   *
   * 整段在写队列内执行: 比对与写入之间若能被另一次写插入, 乐观并发就形同虚设
   * ——两次写都读到同一旧版本, 都判定通过, 后写的把先写的悄悄覆盖.
   */
  async commit(incoming, expectedRevision) {
    if (expectedRevision !== void 0 && expectedRevision !== this.revision) {
      return { ok: false, reason: "conflict" };
    }
    const merged = { ...this.stored, ...incoming };
    const written = await writeTextAtomic(this.file, `${JSON.stringify(merged, null, 2)}
`);
    if (!written.ok) {
      this.deps.logger.warn(`dsh-notifier: не удалось записать конфигурацию — ${written.reason}`);
      return { ok: false, reason: "unavailable" };
    }
    this.adopt(merged);
    return { ok: true, view: this.view() };
  }
  /** 文件内容到达: 镜像原样留下, 用户层与生效值由它派生. */
  adopt(stored) {
    this.stored = stored;
    this.user = sanitizeSettings(stored);
    this.effective = normalizeConfig(stored);
    this.revision = revisionOf(stored);
  }
  /** 掩码还原: patch 里等于掩码的密钥字段按 id 换回用户层原值; 只有带了频道才需要这一步. */
  restoreSecrets(patch) {
    const channels = patch.channels;
    if (channels === void 0)
      return { ok: true, patch };
    const restored = unmaskChannels(channels, this.user.channels);
    return restored.ok ? { ok: true, patch: { ...patch, channels: restored.channels } } : { ok: false };
  }
  /** 把一次写挂到队列尾; 前一次无论成败, 后一次都照常执行. */
  enqueue(task) {
    const result = this.tail.then(task, task);
    this.tail = result.then(NOOP, NOOP);
    return result;
  }
};
var configStore = new ConfigStore();
function writableEntries(patch) {
  const entries = {};
  for (const [key, value] of Object.entries(patch)) {
    if (value === void 0 || UNSAFE_KEYS.includes(key))
      continue;
    entries[key] = value;
  }
  return entries;
}
function revisionOf(stored) {
  return createHash("sha256").update(stableJson(stored), "utf8").digest().readUInt32BE(0);
}
function stableJson(value) {
  if (isJsonArray(value))
    return `[${value.map(stableJson).join(",")}]`;
  if (isJsonObject(value)) {
    const fields = Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`);
    return `{${fields.join(",")}}`;
  }
  return JSON.stringify(value);
}
function isJsonArray(value) {
  return Array.isArray(value);
}
function isJsonObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// lib/server/config/impl/draft/index.js
var RESIDUAL_MASK_HINT = "в черновике осталась невосстановленная маска (следы смены типа канала или имени) — впишите настоящие учётные данные";
function resolveDraftChannels(draft, secrets) {
  if (!isRecord3(draft))
    return fail("draft требуется объект");
  const raw = draft.channels;
  if (!Array.isArray(raw))
    return fail("draft.channels требуется массив");
  for (const item of raw) {
    const verdict = validateChannel(item);
    if (!verdict.ok)
      return fail(verdict.error.hint);
  }
  const restored = unmaskChannels(raw, secrets);
  if (!restored.ok)
    return fail(NEW_CHANNEL_MASK_HINT);
  const channels = restored.channels;
  if (!Array.isArray(channels))
    return fail("draft.channels требуется массив");
  for (const channel of channels) {
    if (hasResidualMask(channel))
      return fail(RESIDUAL_MASK_HINT);
  }
  return { ok: true, channels };
}
function fail(hint) {
  return { ok: false, hint };
}
function isRecord3(raw) {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw);
}

// lib/server/config/interface.js
function installConfig(deps) {
  configStore.install(deps);
}
function releaseConfig() {
  configStore.release();
}
function readConfig() {
  return configStore.current();
}
function readSettingsView() {
  return configStore.view();
}
async function writeConfig(patch, expectedRevision) {
  return configStore.write(patch, expectedRevision);
}

// lib/server/events/impl/session/index.js
var TITLE_LIMIT = 40;
function sessionTitleOf(agent) {
  try {
    const events = agent.session.snapshotEvents();
    for (let i = events.length - 1; i >= 0; i -= 1) {
      const event = events[i];
      if (event.type !== "session/title")
        continue;
      const title = event.data.title.trim();
      if (title.length === 0)
        return { found: false };
      return { found: true, title: title.slice(0, TITLE_LIMIT) };
    }
  } catch {
  }
  return { found: false };
}
function turnEndEvidenceOf(event) {
  if (event.type !== "turn/end")
    return { found: false };
  const reason2 = event.data.reason;
  if (typeof reason2 !== "object" || reason2 === null)
    return { found: false };
  const turn = event.data.turn;
  if (!Number.isFinite(turn))
    return { found: false };
  return { found: true, evidence: { turn, kind: readTurnKind(reason2) } };
}
function lastTurnEndOf(agent) {
  try {
    const events = agent.session.snapshotEvents();
    for (let i = events.length - 1; i >= 0; i -= 1) {
      const read = turnEndEvidenceOf(events[i]);
      if (read.found)
        return read;
    }
  } catch {
  }
  return { found: false };
}
function isSubagentOf(agent, agents) {
  if (agent.session.header.origin === "subagent")
    return true;
  const parentId = agent.session.header.parentSession;
  if (parentId === void 0)
    return false;
  const parent = agents.lookup(parentId);
  if (!parent.found)
    return false;
  return agents.isOwnedBy(agent.id, parent.agent);
}
function readTurnKind(reason2) {
  const kind = reason2.kind;
  return typeof kind === "string" ? kind : "";
}

// lib/server/events/impl/state/index.js
var NOT_INSTALLED = "dsh-notifier: автомат домена events ещё не собран";
var UNINSTALLED3 = {
  logger: { warn: () => {
  } },
  agents: {
    lookup: () => {
      throw new Error(NOT_INSTALLED);
    },
    isOwnedBy: () => {
      throw new Error(NOT_INSTALLED);
    }
  }
};
var AgentStateMachine = class {
  installed = false;
  deps = UNINSTALLED3;
  runs = /* @__PURE__ */ new Map();
  /** 键是 agent id, 也就是会话 id: `session/event` 只给得到会话 id. */
  turnEnds = /* @__PURE__ */ new Map();
  notifiedTurns = /* @__PURE__ */ new Set();
  /** 装配: 重复装配是编程错误. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: автомат домена events собирается один раз");
    this.installed = true;
    this.deps = deps;
  }
  /** 卸载: 清掉全部状态与集合, 并复位装配标记——同进程的下一次装配不能撞上«只能装配一次». */
  release() {
    this.runs.clear();
    this.turnEnds.clear();
    this.notifiedTurns.clear();
    this.deps = UNINSTALLED3;
    this.installed = false;
  }
  /** 记下一次推送来的 `turn/end` (idle 判定优先用它). */
  rememberTurnEnd(agentId, evidence) {
    this.turnEnds.set(agentId, evidence);
  }
  /** agent 生命周期迁移: running 起记, idle 判定完成. */
  observeStatus(payload) {
    const agent = payload.agent;
    const run2 = this.runOf(agent.id);
    if (payload.status === "idle" && run2.runningSeen)
      return this.settleIdle(agent, run2);
    if (payload.status === "running")
      this.markRunning(agent, run2);
    return { ok: false };
  }
  /** turn 到停止边界: 同一 agent 的同一 turn 只放行一次. */
  observeTurnStopping(payload) {
    const turn = payload.turn;
    const key = `${payload.agent.id}:${Number.isFinite(turn) ? turn : "?"}`;
    if (this.notifiedTurns.has(key))
      return { ok: false };
    this.notifiedTurns.add(key);
    const title = sessionTitleOf(payload.agent);
    return {
      ok: true,
      turn: Number.isFinite(turn) ? turn : void 0,
      taskTitle: title.found ? title.title : void 0
    };
  }
  /** agent 消亡: 清掉它的运行足迹, turn 证据与去重记录 (不产出请求). */
  forget(agentId) {
    this.runs.delete(agentId);
    this.turnEnds.delete(agentId);
    for (const key of [...this.notifiedTurns]) {
      if (key.startsWith(`${agentId}:`))
        this.notifiedTurns.delete(key);
    }
  }
  runOf(agentId) {
    const existing = this.runs.get(agentId);
    if (existing !== void 0)
      return existing;
    const run2 = { runningSeen: false, startedAt: 0 };
    this.runs.set(agentId, run2);
    return run2;
  }
  markRunning(agent, run2) {
    run2.runningSeen = true;
    run2.startedAt = Date.now();
    const baseline = lastTurnEndOf(agent);
    run2.runningBaseline = baseline.found ? baseline.evidence : void 0;
  }
  settleIdle(agent, run2) {
    const durationMs = run2.startedAt > 0 ? Date.now() - run2.startedAt : 0;
    run2.runningSeen = false;
    run2.startedAt = 0;
    const evidence = this.resolveEvidence(agent, run2);
    const best = evidence.best;
    if (best !== void 0)
      run2.lastEndedTurn = best.turn;
    if (best === void 0 || !evidence.hasNewEnd || best.kind !== "completed") {
      this.warnIdleSkipped(agent.id, evidence);
      return { ok: false };
    }
    const title = sessionTitleOf(agent);
    return {
      ok: true,
      kind: isSubagentOf(agent, this.deps.agents) ? "subagent-done" : "done",
      taskTitle: title.found ? title.title : void 0,
      durationMs
    };
  }
  /** 推送证据优先, 快照兜底; 不比进入 running 时更新的快照是上一轮的 (冻结). */
  resolveEvidence(agent, run2) {
    const picked = pickEvidence(agent, run2, this.turnEnds.get(agent.id));
    const rememberedTurn = run2.lastEndedTurn;
    return {
      best: picked.best,
      snapshot: picked.snapshot,
      pushed: picked.pushed,
      source: evidenceSourceOf(picked.stale, picked.pushed, picked.snapshot),
      rememberedTurn,
      hasNewEnd: isNewEnd(picked.best, rememberedTurn)
    };
  }
  /** 完成判定跳过时的诊断——«为什么没发 done»的唯一线索; 文本与旧实现逐字一致. */
  warnIdleSkipped(agentId, evidence) {
    const { best, snapshot, pushed, source, rememberedTurn } = evidence;
    this.deps.logger.warn(`dsh-notifier: завершение пропущено (done не отправляется) agent=${agentId} kind=${best !== void 0 ? best.kind : "none"} источник=${source} снимок turn=${snapshot !== void 0 ? String(snapshot.turn) : "-"} отправлено turn=${pushed !== void 0 ? String(pushed.turn) : "-"} память turn=${rememberedTurn !== void 0 ? String(rememberedTurn) : "-"}`);
  }
};
function pickEvidence(agent, run2, streamed) {
  const pushed = streamed !== void 0 && Number.isFinite(streamed.turn) ? streamed : void 0;
  const read = pushed === void 0 ? lastTurnEndOf(agent) : void 0;
  const snapshot = read !== void 0 && read.found ? read.evidence : void 0;
  const stale = isStaleSnapshot(pushed, snapshot, run2.runningBaseline?.turn);
  return { best: pushed ?? (stale ? void 0 : snapshot), snapshot, pushed, stale };
}
function isStaleSnapshot(pushed, snapshot, baselineTurn) {
  return pushed === void 0 && snapshot !== void 0 && baselineTurn !== void 0 && snapshot.turn <= baselineTurn;
}
function isNewEnd(best, rememberedTurn) {
  return best !== void 0 && (rememberedTurn === void 0 || best.turn > rememberedTurn);
}
function evidenceSourceOf(stale, pushed, snapshot) {
  if (pushed !== void 0)
    return "push";
  if (snapshot === void 0)
    return "нет";
  return stale ? "снимок зафиксирован" : "снимок как резерв";
}
var agentStates = new AgentStateMachine();

// lib/server/events/impl/translate/catalog.js
function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.round(Number(ms) / 1e3));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (hours > 0)
    parts.push(`${hours} ч`);
  if (minutes > 0)
    parts.push(`${minutes} мин`);
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds} с`);
  return parts.join(" ");
}
var TOOL_LABELS = {
  pwsh: "команда PowerShell",
  bash: "команда терминала",
  web_search: "поиск в интернете",
  read: "чтение файла",
  write: "запись файла",
  edit: "правка файла",
  grep: "поиск по содержимому файлов",
  glob: "поиск файлов",
  subagent: "задача субагента",
  subagent_fork: "задача субагента",
  ssh_exec: "выполнение по SSH",
  ssh_upload: "загрузка файла по SSH",
  ssh_download: "скачивание файла по SSH",
  ssh_tunnel: "SSH-туннель",
  ssh_cluster: "выполнение на кластере по SSH",
  ask_user_question: "вопрос к вам",
  todo_write: "обновление списка задач",
  job_list: "список фоновых задач",
  job_output: "вывод задачи",
  job_kill: "остановка фоновой задачи",
  workflow: "оркестрация workflow",
  ralph: "цикл Ralph",
  memory_add: "запись в память проекта",
  memory_search: "поиск по памяти проекта",
  skill: "загрузка скилла",
  create_goal: "создание цели",
  get_goal: "просмотр цели",
  update_goal: "обновление цели"
};
function prettyToolName(name2) {
  const text = name2 ?? "?";
  if (Object.prototype.hasOwnProperty.call(TOOL_LABELS, text))
    return TOOL_LABELS[text];
  const parts = text.split("__");
  if (parts.length >= 3 && parts[0] === "mcp") {
    return `инструмент "${parts.slice(2).join("__")}" сервера MCP "${parts[1]}"`;
  }
  return text;
}
var NOTIFY_KINDS = {
  ask: {
    title: "DSH: нужно подтверждение",
    body: (detail) => {
      const lines = [];
      if (detail.taskTitle)
        lines.push(`Задача «${detail.taskTitle}» ждёт подтверждения (инструмент: ${prettyToolName(detail.tool)})`);
      else
        lines.push(`Инструмент ${prettyToolName(detail.tool)} ждёт подтверждения`);
      if (detail.reason)
        lines.push(`Причина: ${detail.reason}`);
      lines.push("Подтвердите или отклоните в DSH");
      return lines.join("\n");
    }
  },
  question: {
    title: "DSH: вопрос к вам",
    body: (detail) => {
      const lines = [];
      if (detail.taskTitle)
        lines.push(`Задача «${detail.taskTitle}» ждёт вашего ответа`);
      else
        lines.push("Есть вопрос — нужен ваш ответ");
      if (detail.question)
        lines.push(`Вопрос: ${detail.question}`);
      lines.push("Ответьте в DSH");
      return lines.join("\n");
    }
  },
  done: {
    title: "DSH: задача выполнена",
    body: (detail) => {
      const lines = [];
      if (detail.taskTitle)
        lines.push(`Задача «${detail.taskTitle}» выполнена`);
      else
        lines.push("Фоновая задача выполнена");
      lines.push(`Заняло: ${formatDuration(detail.durationMs ?? 0)}`);
      return lines.join("\n");
    }
  },
  "subagent-done": {
    title: "DSH: подзадача выполнена",
    body: (detail) => {
      const lines = [];
      if (detail.taskTitle)
        lines.push(`Подзадача «${detail.taskTitle}» выполнена`);
      else
        lines.push("Подзадача выполнена");
      lines.push(`Заняло: ${formatDuration(detail.durationMs ?? 0)}`);
      return lines.join("\n");
    }
  },
  error: {
    title: "DSH: ошибка задачи",
    body: (detail) => {
      const lines = [];
      if (detail.taskTitle)
        lines.push(`Ошибка при выполнении задачи «${detail.taskTitle}»`);
      else
        lines.push("Ошибка выполнения задачи");
      if (detail.turn)
        lines.push(`Раунд ${detail.turn}${detail.step ? `, шаг ${detail.step}` : ""}: ${detail.message ?? ""}`);
      else if (detail.message)
        lines.push(`Ошибка: ${detail.message}`);
      return lines.join("\n");
    }
  },
  "turn-end": {
    title: "DSH: ход завершён",
    body: (detail) => {
      const turn = detail.turn ? `раунд ${detail.turn}` : "";
      if (detail.taskTitle)
        return `Задача «${detail.taskTitle}»${turn ? `, ${turn}` : ""}: работа завершена`;
      return `${turn ? `${turn}: ` : ""}работа завершена`;
    }
  }
};

// lib/server/events/impl/translate/index.js
var NOT_A_NOTIFICATION = { ok: false };
function render(kind, detail) {
  const text = NOTIFY_KINDS[kind];
  return { ok: true, request: { kind, title: text.title, body: text.body(detail) } };
}
function titleOf(agent) {
  return agent === void 0 ? { found: false } : sessionTitleOf(agent);
}
function translateApproval(request) {
  const title = titleOf(request.agent);
  return render("ask", {
    tool: request.toolName,
    taskTitle: title.found ? title.title : void 0,
    reason: request.reason
  });
}
function translateUserQuestion(request) {
  const first = request.questions[0];
  const title = titleOf(request.agent);
  return render("question", {
    taskTitle: title.found ? title.title : void 0,
    question: first !== void 0 && first.question.length > 0 ? first.question : void 0
  });
}
function translateSessionEvent(sessionId, event) {
  const read = turnEndEvidenceOf(event);
  if (read.found)
    agentStates.rememberTurnEnd(sessionId, read.evidence);
  return NOT_A_NOTIFICATION;
}
function translateAgentStatus(payload) {
  const outcome = agentStates.observeStatus(payload);
  if (!outcome.ok)
    return NOT_A_NOTIFICATION;
  return render(outcome.kind, { taskTitle: outcome.taskTitle, durationMs: outcome.durationMs });
}
function translateAgentDisposed(payload) {
  agentStates.forget(payload.agent.id);
  return NOT_A_NOTIFICATION;
}
function translateTurnStopping(payload) {
  const outcome = agentStates.observeTurnStopping(payload);
  if (!outcome.ok)
    return NOT_A_NOTIFICATION;
  return render("turn-end", { turn: outcome.turn, taskTitle: outcome.taskTitle });
}
function translateAgentError(payload) {
  const title = titleOf(payload.agent);
  return render("error", {
    message: payload.error,
    taskTitle: title.found ? title.title : void 0,
    turn: payload.turn,
    step: payload.step
  });
}

// lib/server/events/impl/listen/index.js
var EventListener = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 退订句柄; 卸载期逐个调用. */
  releases = [];
  /** 装配: 装状态机, 再订阅宿主事件. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: домен events собирается один раз");
    this.installed = true;
    agentStates.install({ logger: deps.logger, agents: deps.agents });
    const { events: port, pipeline } = deps;
    this.releases.push(
      port.onApprovalRequest((request) => forward(pipeline, translateApproval(request))),
      port.onUserQuestion((request) => forward(pipeline, translateUserQuestion(request))),
      port.onSessionEvent((sessionId, event) => forward(pipeline, translateSessionEvent(sessionId, event))),
      // agent 四个事件把官方载荷整份转给翻译: 翻出哪一类通知要看会话日志, header 与
      // turn 证据, 这些都在载荷里的 Agent 对象上, 本块不做拆分.
      port.onAgentStatus((payload) => forward(pipeline, translateAgentStatus(payload))),
      port.onAgentDisposed((payload) => forward(pipeline, translateAgentDisposed(payload))),
      port.onAgentTurnStopping((payload) => forward(pipeline, translateTurnStopping(payload))),
      port.onAgentError((payload) => forward(pipeline, translateAgentError(payload)))
    );
  }
  /** 摘除全部订阅并卸载状态机.重复调用无害——卸载链可能走到不止一次. */
  release() {
    for (const release of this.releases)
      release();
    this.releases.length = 0;
    agentStates.release();
    this.installed = false;
  }
};
function forward(pipeline, translation) {
  if (translation.ok)
    pipeline.submit(translation.request);
}
var eventListener = new EventListener();

// lib/server/events/interface.js
function installEvents(deps) {
  eventListener.install(deps);
}
function releaseEvents() {
  eventListener.release();
}

// lib/server/pipeline/interface.js
var interface_exports3 = {};
__export(interface_exports3, {
  barkTarget: () => barkTarget,
  browserTarget: () => browserTarget,
  finalizeRequest: () => finalizeRequest,
  installPipeline: () => installPipeline,
  isBuiltinKind: () => isBuiltinKind,
  releasePipeline: () => releasePipeline,
  submit: () => submit,
  systemTarget: () => systemTarget,
  webhookTarget: () => webhookTarget
});

// lib/server/pipeline/impl/dispatch/index.js
var POLICIES = {
  bark: { maxRetries: 2, backoffMs: 1e3, maxInflight: 2, throttleMs: 0 },
  webhook: { maxRetries: 0, backoffMs: 0, maxInflight: 0, throttleMs: 0 },
  browser: { maxRetries: 0, backoffMs: 0, maxInflight: 0, throttleMs: 0 },
  system: { maxRetries: 0, backoffMs: 0, maxInflight: 0, throttleMs: 1e3 }
};
var NOT_INSTALLED2 = "dsh-notifier: блок доставки ещё не собран";
var UNINSTALLED4 = {
  channels: {
    deliver: () => Promise.reject(new Error(NOT_INSTALLED2))
  },
  stores: {
    appendHistory: () => {
      throw new Error(NOT_INSTALLED2);
    },
    recordStatus: () => {
      throw new Error(NOT_INSTALLED2);
    }
  }
};
function deliveryOf(channelId, result) {
  if (result.status === "failed")
    return { channelId, status: "failed", reason: result.reason };
  if (result.status === "skipped")
    return { channelId, status: "skipped", reason: result.reason };
  return { channelId, status: "ok" };
}
function reasonOf(cause) {
  return reasonFromCause("reasonChannelThrew", cause);
}
function throttled(channelId) {
  return { channelId, status: "skipped", reason: reason("reasonThrottled") };
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
var Dispatcher = class {
  /** 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 装配入参: 投递出口与频道状态写面. */
  port = UNINSTALLED4;
  /** 逐频道的门与节流状态; `release` 时整表清空. */
  rhythms = /* @__PURE__ */ new Map();
  /** 装配. */
  install(port) {
    if (this.installed)
      throw new Error("dsh-notifier: блок доставки собирается один раз");
    this.installed = true;
    this.port = port;
  }
  /** 卸载: 放开能力面并清空全部节奏状态 (门与节流都不跨装配期存活). */
  release() {
    this.installed = false;
    this.port = UNINSTALLED4;
    this.rhythms.clear();
  }
  /** 投递: 逐目标 fail-soft (出口承诺失败是返回值), 结果与 `targets` 同序同长. */
  async dispatch(message, targets) {
    const port = this.port;
    return Promise.all(targets.map((routed) => this.dispatchSafely(port, message, routed)));
  }
  /**
   * 单目标的违约收口: 一个目标违约只产出它自己的失败明细.
   * 违约若冒给 `dispatch` 里的 `Promise.all`, 整批一起拒绝, 调用方连健康频道的明细都拿不到, 
   * 只能记一条«投递失败»——一次出口打洞就抹掉整批故障现场.
   */
  async dispatchSafely(port, message, routed) {
    try {
      return await this.dispatchOne(port, message, routed);
    } catch (cause) {
      const failure = reasonOf(cause);
      this.recordFailure(port, routed.channelId, failure);
      return deliveryOf(routed.channelId, {
        status: "failed",
        // 违约的出口没给出任何证据, 与通道层收违约时的口径一致.
        stage: "accepted",
        reason: failure,
        // 出口承诺把失败做成返回值, 抛出来说明它有洞; 再投一次只是把同一个洞踩第二遍.
        retryable: false
      });
    }
  }
  /** 违约频道的状态写面: 状态只是观测面, 它自己违约也不能再升级为抛出——明细已经成立. */
  recordFailure(port, channelId, failure) {
    try {
      port.stores.recordStatus(channelId, "failed", failure);
    } catch {
    }
  }
  /** 单目标: 节流 → 在途门 → 重试, 然后写频道状态并返回归档明细. */
  async dispatchOne(port, message, routed) {
    const policy = POLICIES[routed.target.type];
    const rhythm = this.rhythmOf(routed.channelId);
    if (policy.throttleMs > 0) {
      const now = Date.now();
      if (now - rhythm.lastAt < policy.throttleMs)
        return throttled(routed.channelId);
      rhythm.lastAt = now;
    }
    const result = await this.withGate(rhythm, policy.maxInflight, () => this.deliverWithRetry(port, message, routed.target, policy));
    return this.settle(port, routed.channelId, result);
  }
  /** 取 (必要时创建)频道的节奏状态. */
  rhythmOf(channelId) {
    const existing = this.rhythms.get(channelId);
    if (existing !== void 0)
      return existing;
    const fresh = { lastAt: 0, inflight: 0, queue: [] };
    this.rhythms.set(channelId, fresh);
    return fresh;
  }
  /** 在途门: 槽位满时排队等待, 队列无上限. */
  withGate(rhythm, maxInflight, run2) {
    if (maxInflight <= 0)
      return run2();
    return new Promise((resolve, reject2) => {
      const start = () => {
        rhythm.inflight += 1;
        run2().then((value) => {
          this.releaseSlot(rhythm);
          resolve(value);
        }, (cause) => {
          this.releaseSlot(rhythm);
          reject2(cause);
        });
      };
      if (rhythm.inflight >= maxInflight)
        rhythm.queue.push(start);
      else
        start();
    });
  }
  /** 让出一个在途槽位并唤醒队首. */
  releaseSlot(rhythm) {
    rhythm.inflight -= 1;
    const next = rhythm.queue.shift();
    if (next !== void 0)
      next();
  }
  /** 单目标投递 + 重试: 只对出口标注 `retryable` 的失败重试, 线性退避. */
  async deliverWithRetry(port, message, target, policy) {
    let attempt = 0;
    let result = await this.deliverOnce(port, message, target);
    while (result.status === "failed" && result.retryable && attempt < policy.maxRetries) {
      attempt += 1;
      await sleep(policy.backoffMs * attempt);
      result = await this.deliverOnce(port, message, target);
    }
    return result;
  }
  /** 单次投递: 一次只投一个目标, 结果与目标唯一对应. */
  async deliverOnce(port, message, target) {
    const results = await port.channels.deliver(message, [target]);
    return results[0];
  }
  /** 写频道状态并返回归档明细. */
  settle(port, channelId, result) {
    if (result.status === "failed")
      port.stores.recordStatus(channelId, "failed", result.reason);
    else if (result.status === "ok")
      port.stores.recordStatus(channelId, "ok");
    return deliveryOf(channelId, result);
  }
};
var notificationDispatcher = new Dispatcher();

// lib/server/pipeline/impl/finalize/index.js
var TITLE_MAX_CODE_POINTS = 64;
function resolveSeverity(request) {
  const declared = request.severity;
  if (declared !== void 0 && isNotifySeverity(declared)) {
    return { provided: true, severity: declared };
  }
  return isBuiltinKind(request.kind) ? { provided: true, severity: KIND_SEVERITY[request.kind] } : { provided: false };
}
function finalizeRequest(request, ts) {
  const base = {
    kind: request.kind,
    ts,
    title: truncateCodePoints(request.title, TITLE_MAX_CODE_POINTS),
    body: request.body
  };
  const severity = resolveSeverity(request);
  return severity.provided ? { ...base, severity: severity.severity } : base;
}

// lib/server/pipeline/impl/judge/index.js
function inWindow(minutes, start, end) {
  return inWindowMinutes(minutes, start, end);
}
function isQuietNow(now, quietHours) {
  if (quietHours.enabled !== true)
    return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const windows = Array.isArray(quietHours.windows) ? quietHours.windows : [];
  return windows.some((window) => {
    if (typeof window !== "object" || window === null || Array.isArray(window))
      return false;
    const start = window.start;
    const end = window.end;
    if (typeof start !== "string" || typeof end !== "string")
      return false;
    return inWindow(minutes, start, end);
  });
}
function judgeRequest(config, request, enabled) {
  const kind = request.kind;
  if (enabled === false)
    return blocked("disabled");
  if (kind === "test")
    return passed();
  if (isBuiltinKind(kind) && isKindOff(config, kind))
    return blocked("kind-off");
  if (isUnconfirmed(config, kind))
    return blocked("unlisted");
  if (isQuietNow(/* @__PURE__ */ new Date(), config.quietHours) && !allowsInQuiet(config.quietHours, kind)) {
    return blocked("quiet");
  }
  return passed();
}
function isKindOff(config, kind) {
  return config[KIND_SWITCHES[kind]] !== true;
}
function isUnconfirmed(config, kind) {
  return !isBuiltinKind(kind) && !config.allowKinds.includes(kind);
}
function allowsInQuiet(quietHours, kind) {
  const allowed2 = quietHours.allowKinds ?? [];
  return allowed2.includes(kind);
}
function passed() {
  return { ok: true };
}
function blocked(reason2) {
  return { ok: false, reason: reason2 };
}

// lib/server/pipeline/impl/route/index.js
function routeTargets(deps, config, request) {
  return narrowRoutes(config, request, resolvePool(deps, config, request.kind));
}
function resolvePool(deps, config, kind) {
  const pool = [];
  try {
    for (const channel of config.channels) {
      if (!channel.enabled)
        continue;
      switch (channel.type) {
        case "browser":
          pool.push(browserTarget(channel, deps, kind));
          break;
        case "system":
          pool.push(systemTarget(channel, deps));
          break;
        case "bark":
          pool.push({ channelId: channelIdOf(channel), target: barkTarget(channel, kind) });
          break;
        case "webhook":
          pool.push({ channelId: channelIdOf(channel), target: webhookTarget(channel) });
          break;
      }
    }
  } catch (cause) {
    deps.logger.warn(`dsh-notifier: не удалось прочитать каналы (пропущено, fail-soft): ${cause instanceof Error ? cause.message : String(cause)}`);
  }
  return pool;
}
function browserTarget(channel, deps, kind) {
  return {
    channelId: BUILTIN_CHANNELS.browser,
    target: {
      type: "browser",
      popup: channel.popup,
      sound: channel.sound,
      whenVisible: channel.whenVisible,
      // kind 随帧一起出去: 客户端靠它选图标与颜色.
      emitFrame: (frame) => deps.frames.emit({ kind, frame })
    }
  };
}
function systemTarget(channel, deps) {
  return {
    channelId: BUILTIN_CHANNELS.system,
    target: {
      type: "system",
      popup: channel.popup,
      sound: channel.sound,
      toastScript: toastScriptPath(),
      logger: deps.logger
    }
  };
}
function barkTarget(channel, kind) {
  const target = {
    type: "bark",
    baseUrl: channel.baseUrl,
    deviceKey: channel.deviceKey
  };
  const level = channel.levels?.[kind] ?? channel.level;
  assignText(target, "level", level ?? "");
  assignText(target, "group", channel.group ?? "");
  assignText(target, "sound", channel.sound ?? "");
  assignText(target, "icon", channel.icon ?? "");
  assignText(target, "url", channel.url ?? "");
  assignBarkOptional(target, channel);
  return target;
}
function assignBarkOptional(target, channel) {
  if (channel.badge !== void 0)
    target.badge = channel.badge;
  if (channel.timeoutMs !== void 0 && channel.timeoutMs > 0) {
    target.timeoutMs = channel.timeoutMs;
  }
  if (channel.extras !== void 0)
    target.extras = channel.extras;
}
function assignText(target, key, value) {
  if (value.length > 0)
    target[key] = value;
}
function webhookTarget(channel) {
  const target = {
    type: "webhook",
    url: channel.url,
    preset: presetOf(channel)
  };
  if (channel.template !== void 0 && channel.template.length > 0) {
    target.template = channel.template;
  }
  const headers = { ...channel.headers };
  assignAuth(target, channel);
  assignAuthHeader(headers, channel);
  if (Object.keys(headers).length > 0)
    target.headers = headers;
  if (channel.timeoutSec !== void 0 && channel.timeoutSec > 0) {
    target.timeoutSec = channel.timeoutSec;
  }
  if (channel.extras !== void 0)
    target.extras = channel.extras;
  return target;
}
function assignAuth(target, channel) {
  if (channel.auth === "bearer" && channel.token !== void 0 && channel.token.length > 0) {
    target.auth = { kind: "bearer", token: channel.token };
    return;
  }
  if (channel.auth === "basic" && channel.username !== void 0 && channel.username.length > 0) {
    target.auth = { kind: "basic", user: channel.username, password: channel.password ?? "" };
  }
}
function assignAuthHeader(headers, channel) {
  if (channel.auth !== "header")
    return;
  const name2 = channel.headerName;
  const value = channel.headerValue;
  if (name2 !== void 0 && name2.length > 0 && value !== void 0 && value.length > 0) {
    headers[name2] = value;
  }
}
function presetOf(channel) {
  const preset = channel.preset;
  return preset === void 0 ? "ntfy" : deliveryPresetOf(preset);
}
function narrowRoutes(config, request, pool) {
  const only = request.onlyChannel;
  if (only !== void 0)
    return { targets: pool.filter((t) => t.channelId === only), stale: [] };
  const routes = config.kindRoutes[request.kind] ?? [];
  if (routes.length === 0)
    return { targets: pool, stale: [] };
  const wanted = new Set(routes);
  const known = knownChannelIds(config);
  return {
    targets: pool.filter((t) => wanted.has(t.channelId)),
    stale: routes.filter((id) => !known.has(id))
  };
}
function knownChannelIds(config) {
  const known = /* @__PURE__ */ new Set();
  for (const channel of config.channels)
    known.add(channelIdOf(channel));
  return known;
}

// lib/server/pipeline/impl/service/index.js
var NOT_INSTALLED3 = "dsh-notifier: конвейер решений ещё не собран";
var UNINSTALLED5 = {
  enabled: false,
  frames: { emit: () => {
  } },
  logger: { warn: () => {
  } },
  config: {
    readConfig: () => {
      throw new Error(NOT_INSTALLED3);
    }
  },
  stores: {
    appendHistory: () => {
      throw new Error(NOT_INSTALLED3);
    },
    recordStatus: () => {
      throw new Error(NOT_INSTALLED3);
    }
  },
  channels: {
    deliver: () => Promise.reject(new Error(NOT_INSTALLED3))
  }
};
var NotificationPipeline = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 装配入参: 宿主能力, 挂载点值, 以及本域依赖的那几个域. */
  deps = UNINSTALLED5;
  /** 装配.重复装配是编程错误, 当场暴露. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: домен pipeline собирается один раз");
    this.installed = true;
    this.deps = deps;
    notificationDispatcher.install({ channels: deps.channels, stores: deps.stores });
  }
  /** 卸载: 清空投递节奏状态, 放开对宿主面的引用.此后到达的请求一律丢弃. */
  release() {
    this.installed = false;
    this.deps = UNINSTALLED5;
    notificationDispatcher.release();
  }
  /**
   * 提交一条通知请求.
   * 未装配时静默丢弃, 不抛错: 本方法挂在宿主事件链上, 在这里抛会打断别人的流程.
   */
  submit(request) {
    if (!this.installed)
      return;
    const { enabled, frames, logger, config, stores } = this.deps;
    const ts = Date.now();
    const snapshot = config.readConfig();
    const verdict = judgeRequest(snapshot, request, enabled);
    if (!verdict.ok) {
      this.archive(stores, request, ts, { suppressed: verdict.reason });
      return;
    }
    const route = routeTargets({ frames, logger }, snapshot, request);
    const noTargets = route.targets.length === 0;
    for (const id of route.stale) {
      const fate = noTargets ? "уведомление архивировано suppressed:no-target" : "цель отброшена, остальные получат уведомление как обычно";
      logger.warn(`dsh-notifier: kindRoutes[${request.kind}] ссылается на удалённый канал ${id}, ${fate}`);
    }
    if (noTargets) {
      this.archive(stores, request, ts, { suppressed: "no-target" });
      return;
    }
    void this.send(stores, request, ts, route.targets).catch((cause) => {
      const reason2 = cause instanceof Error ? cause.message : String(cause);
      logger.warn(`dsh-notifier: сбой доставки — ${reason2}`);
    });
  }
  /** 定稿, 投递, 归档. */
  async send(stores, request, ts, targets) {
    const message = finalizeRequest(request, ts);
    const deliveries = await notificationDispatcher.dispatch(message, targets);
    this.archive(stores, request, ts, { channels: deliveries });
  }
  /** 归档: 一次通知写一条记录, 发出与压制只在载荷上分叉. */
  archive(stores, request, ts, outcome) {
    const entry = {
      ts,
      kind: request.kind,
      title: request.title,
      message: request.body
    };
    if ("suppressed" in outcome) {
      entry.suppressed = outcome.suppressed;
    } else {
      entry.channels = outcome.channels;
    }
    stores.appendHistory(entry);
  }
};
var notificationPipeline = new NotificationPipeline();

// lib/server/pipeline/interface.js
function installPipeline(deps) {
  notificationPipeline.install(deps);
}
function releasePipeline() {
  notificationPipeline.release();
}
function submit(request) {
  notificationPipeline.submit(request);
}

// lib/server/sdk/interface.js
var interface_exports4 = {};
__export(interface_exports4, {
  NOTIFIER_SERVICE: () => NOTIFIER_SERVICE,
  confirmKind: () => confirmKind,
  installSdk: () => installSdk,
  listKinds: () => listKinds,
  releaseSdk: () => releaseSdk
});

// lib/server/sdk/impl/registry/index.js
var KindRegistry = class {
  labels = /* @__PURE__ */ new Map();
  register(registration) {
    this.labels.set(registration.id, registration.label);
  }
  /** 是否登记过.确认动作只对登记过的种类成立. */
  has(id) {
    return this.labels.has(id);
  }
  /** 清单: 登记项合并已确认名单 (确认名单来自设置). */
  list(confirmed) {
    const allowed2 = new Set(confirmed);
    return [...this.labels].map(([id, label]) => ({ id, label, confirmed: allowed2.has(id) }));
  }
};
var kindRegistry = new KindRegistry();

// lib/server/sdk/impl/service/index.js
var DEFAULT_TITLE = "Уведомление DSH";
var NOT_INSTALLED4 = "dsh-notifier: внешний интерфейс службы ещё не собран";
var NOTIFIER_SERVICE = "wingsky.notifier";
var UNINSTALLED6 = {
  expose: {
    provide: () => {
      throw new Error(NOT_INSTALLED4);
    }
  },
  config: {
    readConfig: () => {
      throw new Error(NOT_INSTALLED4);
    },
    writeConfig: () => Promise.reject(new Error(NOT_INSTALLED4))
  },
  pipeline: {
    submit: () => {
      throw new Error(NOT_INSTALLED4);
    },
    isBuiltinKind: (kind) => {
      void kind;
      throw new Error(NOT_INSTALLED4);
    }
  }
};
function isNamespaceQualified(value) {
  const separator = value.indexOf(":");
  return separator > 0 && separator < value.length - 1;
}
function namespaceOf(value) {
  return value.slice(0, value.indexOf(":"));
}
function toExternalKind(value, pipeline) {
  if (!isNamespaceQualified(value)) {
    throw new Error(`dsh-notifier: недопустимый id динамического вида уведомления — ${value} (нужен <пространство имён>:<id>)`);
  }
  if (pipeline.isBuiltinKind(namespaceOf(value))) {
    throw new Error(`dsh-notifier: пространство имён динамического вида не может совпадать со встроенным — ${value}`);
  }
  return value;
}
function isSendableKind(kind, pipeline) {
  if (pipeline.isBuiltinKind(kind))
    return true;
  return isNamespaceQualified(kind) && !pipeline.isBuiltinKind(namespaceOf(kind));
}
var HostedService = class {
  pipeline;
  /** 类型取自契约上的字面量: 改一处不改另一处是编译错误. */
  apiVersion = 2;
  constructor(pipeline) {
    this.pipeline = pipeline;
  }
  /** 登记一种动态通知种类.非法入参**抛错**而不是静默忽略: 静默的代价不在本插件——插件作者看到的现象是«通知没
   * 发出去», 而设置页上根本没有他那一项, 没有任何线索指向«你的 id 拼错了». */
  registerKind(registration) {
    const id = registration.id;
    if (typeof id !== "string") {
      throw new Error("dsh-notifier: registerKind требует id вида <пространство имён>:<id>");
    }
    const label = registration.label;
    kindRegistry.register({
      id: toExternalKind(id, this.pipeline),
      // 展示名缺省用 id: 设置页上宁可显示一串 id (至少说得出是谁注册的), 也不要显示一行空白.
      label: typeof label === "string" && label.length > 0 ? label : id
    });
  }
  /** 发送一条通知.声明成 `async` 而不是同步方法: 消费方写的是 `.send(...).catch(...)`, 同步返回 `undefined` 会让
   * 那一行在运行时抛 `TypeError`——一个由本插件引起, 却出现在别人代码里的崩溃.形状守卫只做一次收窄, 不判该不该发: 
   * 那是唯一裁决点的事, 在本域再判一遍就是第二个答案. */
  async send(request) {
    const kind = request.kind;
    if (typeof kind !== "string" || !isSendableKind(kind, this.pipeline)) {
      throw new Error(`dsh-notifier: недопустимый вид уведомления — ${String(kind)} (нужен встроенный вид или <пространство имён>:<id>)`);
    }
    const body = request.body;
    if (typeof body !== "string") {
      throw new Error("dsh-notifier: текст уведомления должен быть строкой");
    }
    const title = request.title;
    const submit2 = {
      kind,
      title: typeof title === "string" && title.length > 0 ? title : DEFAULT_TITLE,
      body
    };
    const severity = request.severity;
    if (severity !== void 0)
      submit2.severity = severity;
    this.pipeline.submit(submit2);
  }
};
var SdkService = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 装配入参: 宿主出口与两个域的能力面. */
  deps = UNINSTALLED6;
  /** 摘除器: 本域挂在宿主上的东西只有服务面一件, 但按清单收口, 将来多一件不用改结构. */
  disposers = [];
  /** 装配: 构造服务对象并交出去. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: домен sdk собирается один раз");
    this.installed = true;
    this.deps = deps;
    this.disposers.push(deps.expose.provide(new HostedService(deps.pipeline)));
  }
  /** 卸载: 把服务面从上下文上收回来.重复调用无害——卸载链可能走到不止一次. */
  release() {
    for (const dispose of this.disposers)
      dispose();
    this.disposers = [];
    this.installed = false;
    this.deps = UNINSTALLED6;
  }
  /** 清单: 登记项合并确认名单 (确认名单实时读设置, 不取装配期快照). */
  listKinds() {
    return kindRegistry.list(this.deps.config.readConfig().allowKinds);
  }
  /** 确认 / 撤销一个动态种类.确认态落在设置的 `allowKinds` 里 (跨重启保留)而不是注册表 (它随进程生灭); 写的是
   * **整份名单**而不是增量——设置写面按«这一份是当前想要的»理解, 传增量会让两次并发写互相覆盖.不传期望修订号: 
   * 这是一次点击, 为它引入«基于旧内容»的失败只会让用户看到莫名其妙的冲突.
   * @throws 该种类未登记时抛错——设置端点会先查清单以给出 404, 走到这里说明有人绕过它. */
  async confirmKind(id, confirmed) {
    if (!kindRegistry.has(id)) {
      throw new Error(`dsh-notifier: вид уведомления не зарегистрирован — ${id}`);
    }
    const allowed2 = this.deps.config.readConfig().allowKinds;
    const next = confirmed ? [.../* @__PURE__ */ new Set([...allowed2, id])] : allowed2.filter((kind) => kind !== id);
    return this.deps.config.writeConfig({ allowKinds: next });
  }
};
var sdkService = new SdkService();

// lib/server/sdk/interface.js
function installSdk(deps) {
  sdkService.install(deps);
}
function releaseSdk() {
  sdkService.release();
}
function listKinds() {
  return sdkService.listKinds();
}
function confirmKind(id, confirmed) {
  return sdkService.confirmKind(id, confirmed);
}

// lib/server/stores/interface.js
var interface_exports5 = {};
__export(interface_exports5, {
  appendHistory: () => appendHistory,
  clearHistory: () => clearHistory,
  installStores: () => installStores,
  readHistory: () => readHistory,
  readStatus: () => readStatus,
  recordStatus: () => recordStatus,
  releaseStores: () => releaseStores
});

// lib/server/stores/impl/history/index.js
import { readFile } from "node:fs/promises";
var HISTORY_LIMIT = 200;
var DAY_MS = 864e5;
var UNINSTALLED7 = {
  logger: { warn: () => {
  } },
  config: {
    readConfig: () => {
      throw new Error("dsh-notifier: хранилище истории ещё не собрано");
    }
  }
};
var HistoryStore = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 落盘路径: DSH home 由环境决定, 进程内不变, 故随实例一次性定下. */
  file = notifierFile(HISTORY_FILE_NAME);
  /** 装配入参 (失败出口). */
  deps = UNINSTALLED7;
  /** 写队列串行化: 并发«读-改-写»会互相覆盖丢记录. */
  queue = Promise.resolve();
  /** 装配: 单次生效. */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: хранилище истории собирается один раз");
    this.installed = true;
    this.deps = deps;
  }
  /** 卸载: 放开装配入参.在飞的写入不等待——它们各有自己的失败出口. */
  release() {
    this.installed = false;
    this.deps = UNINSTALLED7;
  }
  /** 追加一条记录: 入队即返回 (不阻塞通知主流程), 失败仅经日志出口告警. */
  append(entry) {
    const deps = this.deps;
    this.queue = this.queue.then(async () => {
      try {
        const lines = await this.currentLines();
        lines.push(JSON.stringify(entry));
        const keepDays = deps.config.readConfig().historyMaxAgeDays;
        const kept = keepDays > 0 ? lines.filter((line) => withinRetention(line, entry.ts - keepDays * DAY_MS)) : lines;
        const trimmed = kept.length > HISTORY_LIMIT * 2 ? kept.slice(-HISTORY_LIMIT) : kept;
        const written = await writeTextAtomic(this.file, `${trimmed.join("\n")}
`);
        if (!written.ok) {
          deps.logger.warn(`dsh-notifier: не удалось записать историю: ${written.reason}`);
        }
      } catch (cause) {
        deps.logger.warn(`dsh-notifier: не удалось записать историю: ${cause instanceof Error ? cause.message : String(cause)}`);
      }
    });
  }
  /** 最近记录 (尾部最多 `HISTORY_LIMIT` 条; 保留期 > 0 时先按天过滤). */
  async read() {
    let text;
    try {
      text = await readFile(this.file, "utf8");
    } catch {
      return [];
    }
    const keepDays = this.deps.config.readConfig().historyMaxAgeDays;
    const cutoff = keepDays > 0 ? Date.now() - keepDays * DAY_MS : 0;
    const records = [];
    for (const line of text.split("\n").filter(Boolean).slice(-HISTORY_LIMIT * 2)) {
      const parsed = parseLine(line);
      if (!parsed.ok)
        continue;
      if (cutoff > 0 && typeof parsed.entry.ts === "number" && parsed.entry.ts < cutoff)
        continue;
      records.push(parsed.entry);
    }
    records.splice(0, Math.max(0, records.length - HISTORY_LIMIT));
    return records;
  }
  /** 清空全部记录, 返回被清空条数. */
  async clear() {
    let removed = 0;
    try {
      removed = (await readFile(this.file, "utf8")).split("\n").filter(Boolean).length;
    } catch {
    }
    const written = await writeTextAtomic(this.file, "");
    if (!written.ok) {
      this.deps.logger.warn(`dsh-notifier: не удалось очистить историю: ${written.reason}`);
    }
    return removed;
  }
  /** 现有行: 读不到文件即空列表 (首次写入从零开始, 与读语义一致). */
  async currentLines() {
    try {
      return (await readFile(this.file, "utf8")).split("\n").filter(Boolean);
    } catch {
      return [];
    }
  }
};
function withinRetention(line, cutoff) {
  const parsed = parseLine(line);
  if (!parsed.ok)
    return true;
  return typeof parsed.entry.ts === "number" && parsed.entry.ts >= cutoff;
}
function parseLine(line) {
  try {
    const parsed = JSON.parse(line);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
      return { ok: false };
    return { ok: true, entry: normalizeEntry(parsed) };
  } catch {
    return { ok: false };
  }
}
function normalizeEntry(entry) {
  if (!Array.isArray(entry.channels))
    return entry;
  const channels = [];
  for (const delivery of entry.channels) {
    const normalized = normalizeDelivery(delivery);
    if (normalized !== void 0)
      channels.push(normalized);
  }
  return { ...entry, channels };
}
function normalizeDelivery(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return void 0;
  const source = value;
  if (typeof source.channelId !== "string")
    return void 0;
  if (source.status !== "ok" && source.status !== "failed" && source.status !== "skipped") {
    return void 0;
  }
  const delivery = { channelId: source.channelId, status: source.status };
  const reason2 = normalizeReason(source.reason);
  if (reason2 !== void 0)
    delivery.reason = reason2;
  return delivery;
}
var historyStore = new HistoryStore();

// lib/server/stores/impl/status/index.js
var UNINSTALLED8 = { logger: { warn: () => {
} } };
var STATUS_MAX_ENTRIES = 64;
var STATUS_DEBOUNCE_MS = 500;
var STATUS_ERROR_LIMIT = 300;
var StatusStore = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 落盘路径: DSH home 由环境决定, 进程内不变, 故随实例一次性定下. */
  file = notifierFile(STATUS_FILE_NAME);
  deps = UNINSTALLED8;
  /** 内存镜像: 本类的单一事实源, 冷启动从文件加载; 空表即«尚未加载». */
  mirror = {};
  /** 落盘 debounce: 窗口内多次 record 合并为一次整文件写. */
  flush = { pending: false };
  /** 写队列串行化: 整文件重写若并发交错, 后写的会把先写的整份内容覆盖掉. */
  queue = Promise.resolve();
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: состояние доставки собирается один раз");
    this.installed = true;
    this.deps = deps;
  }
  /** 卸载: 放开装配入参并丢掉内存镜像.镜像要一起丢——它是«磁盘状态»的记忆. */
  release() {
    this.clearPendingFlush();
    this.installed = false;
    this.deps = UNINSTALLED8;
    this.mirror = {};
  }
  /** 记录一次投递终态: 内存立即更新, 落盘延后合并 (失败仅经日志出口告警). */
  record(channelId, status, error) {
    this.loadFromDisk();
    const prev = this.mirror[channelId];
    const entry = {
      lastTs: Date.now(),
      lastStatus: status,
      // 连续失败计数跨重启延续: 冷启动已把文件读进镜像, «上一次»因此就在 prev 里.
      failStreak: status === "ok" ? 0 : (prev === void 0 ? 0 : prev.failStreak) + 1
    };
    if (status === "failed" && error !== void 0) {
      entry.lastError = clampReasonDetail(error, STATUS_ERROR_LIMIT);
    }
    delete this.mirror[channelId];
    this.mirror[channelId] = entry;
    this.evictOldest();
    this.scheduleFlush();
  }
  /** 读取全部频道状态 (内存镜像优先, 冷启动回落文件). */
  async read() {
    this.loadFromDisk();
    return { ...this.mirror };
  }
  /**
   * 冷启动懒加载: 把文件读进镜像.
   *
   * 必须同步读: `record` 是 fire-and-forget, 异步加载会与它抢跑, 让磁盘上的旧值把刚记下的
   * 投递盖回去.空表即«尚未加载», 读不出内容时下一次再读一遍.
   */
  loadFromDisk() {
    if (Object.keys(this.mirror).length > 0)
      return;
    const read = readTextFileSync(this.file);
    if (!read.ok)
      return;
    try {
      const stored = JSON.parse(read.text);
      for (const [channelId, entry] of Object.entries(stored)) {
        const normalized = normalizeEntry2(entry);
        if (normalized !== void 0)
          this.mirror[channelId] = normalized;
      }
    } catch {
    }
  }
  scheduleFlush() {
    if (this.flush.pending)
      return;
    const timer = setTimeout(() => {
      this.flush = { pending: false };
      this.flushToDisk();
    }, STATUS_DEBOUNCE_MS);
    timer.unref();
    this.flush = { pending: true, timer };
  }
  /** 丢掉待写定时器: 卸载后这次落盘已没有要表达的事实. */
  clearPendingFlush() {
    if (this.flush.pending)
      clearTimeout(this.flush.timer);
    this.flush = { pending: false };
  }
  flushToDisk() {
    const snapshot = JSON.stringify(this.mirror, null, 2);
    const deps = this.deps;
    this.queue = this.queue.then(async () => {
      const written = await writeTextAtomic(this.file, snapshot);
      if (!written.ok) {
        deps.logger.warn(`dsh-notifier: не удалось записать состояние доставки: ${written.reason}`);
      }
    });
  }
  evictOldest() {
    const ids = Object.keys(this.mirror);
    const excess = ids.length - STATUS_MAX_ENTRIES;
    for (const channelId of ids.slice(0, Math.max(0, excess))) {
      delete this.mirror[channelId];
    }
  }
};
function normalizeEntry2(entry) {
  if (typeof entry !== "object" || entry === null || Array.isArray(entry))
    return void 0;
  const source = entry;
  if (typeof source.lastTs !== "number")
    return void 0;
  if (source.lastStatus !== "ok" && source.lastStatus !== "failed")
    return void 0;
  const normalized = {
    lastTs: source.lastTs,
    lastStatus: source.lastStatus,
    // 计数缺失 (早于本字段的形态)按 0 起算: 它只用于展示连续失败次数, 不是判据.
    failStreak: typeof source.failStreak === "number" ? source.failStreak : 0
  };
  const lastError = normalizeReason(source.lastError);
  if (lastError !== void 0)
    normalized.lastError = lastError;
  return normalized;
}
var statusStore = new StatusStore();

// lib/server/stores/interface.js
function installStores(deps) {
  historyStore.install({ logger: deps.logger, config: deps.config });
  statusStore.install({ logger: deps.logger });
}
function releaseStores() {
  historyStore.release();
  statusStore.release();
}
function appendHistory(entry) {
  historyStore.append(entry);
}
async function readHistory() {
  return historyStore.read();
}
async function clearHistory() {
  return historyStore.clear();
}
function recordStatus(channelId, status, error) {
  statusStore.record(channelId, status, error);
}
async function readStatus() {
  return statusStore.read();
}

// lib/server/upgrade/impl/steps/config-shape.js
import { readFileSync as readFileSync4 } from "node:fs";

// lib/server/upgrade/impl/legacy/index.js
var import_yaml = __toESM(require_dist(), 1);
import { readFileSync as readFileSync3 } from "node:fs";
import { join as join5 } from "node:path";
var SETTINGS_NS = "dsh-notifier";
function formalSettingsFiles() {
  return [join5(dshHome(), "settings.yaml.imported"), join5(dshHome(), "settings.yaml")];
}
var LEGACY_FILES = ["dsh-notifier.json", "dsh-notifier.json.migrated.bak"];
var ENTRY_KEYS = [
  "enabled",
  "configFile",
  "historyFile",
  "statusFile",
  "toastScript"
];
var LEGACY_SOUND_KEY = "notifySound";
var SOUND_KEYS = ["browserSound", "systemSound"];
var UNSAFE_KEYS2 = ["__proto__", "constructor", "prototype"];
function readLegacySettings(settings) {
  const formal = readFormalSettings();
  if (formal.kind === "readable")
    return convert(formal.settings);
  const described = readFromSettings(settings);
  if (Object.keys(described).length > 0)
    return described;
  return readFromFile();
}
function readFormalSettings() {
  let found = false;
  let merged = {};
  for (const path of formalSettingsFiles()) {
    const section = readDocumentSection(path);
    if (section === void 0)
      continue;
    found = true;
    merged = mergeSettings(merged, section);
  }
  return found ? { kind: "readable", settings: merged } : { kind: "absent" };
}
function readDocumentSection(path) {
  let text;
  try {
    text = readFileSync3(path, "utf8");
  } catch (error) {
    if (isMissingFile(error))
      return void 0;
    throw sourceError(path, "не удалось прочитать", error);
  }
  let parsed;
  try {
    parsed = (0, import_yaml.parse)(text);
  } catch (error) {
    throw sourceError(path, "не удалось разобрать YAML", error);
  }
  if (parsed === null || parsed === void 0)
    return void 0;
  if (!isPlainRecord(parsed))
    throw sourceError(path, "верхний уровень не является обычным объектом");
  const section = parsed[SETTINGS_NS];
  if (section === void 0)
    return void 0;
  if (!isPlainRecord(section))
    throw sourceError(path, `раздел ${SETTINGS_NS} не является обычным объектом`);
  if (!isSerializable(section))
    throw sourceError(path, `раздел ${SETTINGS_NS} не сериализуется`);
  return section;
}
function mergeSettings(low, high) {
  const merged = {};
  for (const key of Object.keys(low)) {
    if (UNSAFE_KEYS2.includes(key))
      continue;
    if (!Object.prototype.hasOwnProperty.call(high, key)) {
      merged[key] = low[key];
      continue;
    }
    const lowValue = low[key];
    const highValue = high[key];
    merged[key] = isPlainRecord(lowValue) && isPlainRecord(highValue) ? mergeSettings(lowValue, highValue) : highValue;
  }
  for (const key of Object.keys(high)) {
    if (UNSAFE_KEYS2.includes(key) || Object.prototype.hasOwnProperty.call(low, key))
      continue;
    merged[key] = high[key];
  }
  return merged;
}
function readFromSettings(settings) {
  let entries;
  try {
    entries = settings.describe({ redactSecrets: true });
  } catch {
    return {};
  }
  for (const entry of entries) {
    if (entry.ns !== SETTINGS_NS)
      continue;
    const user = entry.user;
    if (typeof user !== "object" || user === null || Array.isArray(user))
      return {};
    if (!isSerializable(user))
      throw new Error(`dsh-notifier: источник describe старых настроек не сериализуется — ${SETTINGS_NS}`);
    return convert(user);
  }
  return {};
}
function readFromFile() {
  for (const name2 of LEGACY_FILES) {
    const path = legacyFile(name2);
    let text;
    try {
      text = readFileSync3(path, "utf8");
    } catch (error) {
      if (isMissingFile(error))
        continue;
      throw sourceError(path, "не удалось прочитать", error);
    }
    let raw;
    try {
      raw = JSON.parse(text);
    } catch (error) {
      throw sourceError(path, "не удалось разобрать JSON", error);
    }
    if (!isPlainRecord(raw))
      throw sourceError(path, "верхний уровень не является обычным объектом");
    if (!isSerializable(raw))
      throw sourceError(path, "содержимое не сериализуется");
    return convert(raw);
  }
  return {};
}
function isMissingFile(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
function sourceError(path, reason2, cause) {
  const detail = cause instanceof Error ? `: ${cause.message}` : "";
  return new Error(`dsh-notifier: источник старых настроек ${reason2} — ${path}${detail}`);
}
function isSerializable(raw) {
  try {
    JSON.stringify(raw);
    return true;
  } catch {
    return false;
  }
}
function isPlainRecord(raw) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw))
    return false;
  const prototype = Object.getPrototypeOf(raw);
  return prototype === Object.prototype || prototype === null;
}
function convert(stored) {
  const next = {};
  for (const key of Object.keys(stored)) {
    if (ENTRY_KEYS.includes(key) || UNSAFE_KEYS2.includes(key))
      continue;
    next[key] = stored[key];
  }
  const legacySound2 = next[LEGACY_SOUND_KEY];
  if (typeof legacySound2 === "boolean") {
    for (const key of SOUND_KEYS) {
      if (!(key in next))
        next[key] = legacySound2;
    }
  }
  return next;
}

// lib/server/upgrade/impl/steps/config-shape.js
var BUILTIN_TYPES = ["browser", "system"];
var MIGRATED_TOP_LEVEL_KEYS = [
  "systemEnabled",
  "browserEnabled",
  "systemNotify",
  "browserNotify",
  "notifyWhenVisible",
  "notifySound",
  "browserSound",
  "systemSound"
];
function migrateConfigShape(settings) {
  const file = notifierFile(CONFIG_FILE_NAME);
  const stored = readStoredObject(file);
  const legacy = readLegacySettings(settings);
  const hasLegacy = Object.keys(legacy).length > 0;
  if (!hasLegacy && Object.keys(stored).length === 0)
    return;
  const merged = { ...stored, ...legacy };
  const shaped = withBuiltinChannels(merged);
  if (!hasLegacy && shaped === null)
    return;
  const written = writeTextAtomicSync(file, `${JSON.stringify(shaped ?? merged, null, 2)}
`);
  if (!written.ok)
    throw new Error(`dsh-notifier: не удалось записать новый формат конфигурации — ${written.reason}`);
}
function withBuiltinChannels(stored) {
  const list = Array.isArray(stored.channels) ? stored.channels : [];
  const present = /* @__PURE__ */ new Set();
  for (const item of list) {
    if (isRecord4(item))
      present.add(item.type);
  }
  const missing = BUILTIN_TYPES.filter((type) => !present.has(type));
  const retired = MIGRATED_TOP_LEVEL_KEYS.filter((key) => stored[key] !== void 0);
  if (missing.length === 0 && retired.length === 0)
    return null;
  const next = {
    ...stored,
    channels: [...missing.map((type) => builtinEntry(stored, type)), ...list]
  };
  for (const key of retired)
    delete next[key];
  return next;
}
function builtinEntry(stored, type) {
  const entry = { type, id: type };
  const fields = type === "browser" ? [
    ["enabled", stored.browserEnabled],
    ["popup", stored.browserNotify],
    ["sound", firstDefined(stored.browserSound, stored.notifySound)],
    ["whenVisible", stored.notifyWhenVisible]
  ] : [
    ["enabled", stored.systemEnabled],
    ["popup", stored.systemNotify],
    ["sound", firstDefined(stored.systemSound, stored.notifySound)]
  ];
  for (const [key, value] of fields) {
    if (value !== void 0)
      entry[key] = value;
  }
  return entry;
}
function firstDefined(outlet, legacy) {
  return outlet === void 0 ? legacy : outlet;
}
function readStoredObject(file) {
  let text;
  try {
    text = readFileSync4(file, "utf8");
  } catch (cause) {
    if (isMissingFile2(cause))
      return {};
    const detail = cause instanceof Error ? `: ${cause.message}` : "";
    throw new Error(`dsh-notifier: не удалось прочитать конфигурацию при смене формата — ${file}${detail}`, { cause });
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (cause) {
    const detail = cause instanceof Error ? `: ${cause.message}` : "";
    throw new Error(`dsh-notifier: не удалось разобрать конфигурацию при смене формата — ${file}${detail}`, { cause });
  }
  if (!isRecord4(parsed)) {
    throw new Error(`dsh-notifier: не удалось разобрать конфигурацию при смене формата — ${file}: верхний уровень не является обычным объектом`);
  }
  return parsed;
}
function isMissingFile2(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
function isRecord4(raw) {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw);
}

// lib/server/upgrade/impl/steps/quiet-windows.js
var LEGACY_CLOCK_KEYS = ["start", "end"];
function migrateQuietWindows() {
  const file = notifierFile(CONFIG_FILE_NAME);
  const read = readTextFileSync(file);
  if (!read.ok)
    return;
  const stored = parseObject(read.text);
  const shaped = withQuietWindows(stored);
  if (shaped === null)
    return;
  const written = writeTextAtomicSync(file, JSON.stringify(shaped, null, 2) + "\n");
  if (!written.ok)
    throw new Error("dsh-notifier: не удалось записать новые интервалы «не беспокоить» — " + written.reason);
}
function withQuietWindows(stored) {
  const quiet = stored.quietHours;
  if (!isRecord5(quiet))
    return null;
  if (Array.isArray(quiet.windows)) {
    if (quiet.start === void 0 && quiet.end === void 0)
      return null;
    const cleaned = { ...quiet };
    for (const key of LEGACY_CLOCK_KEYS)
      delete cleaned[key];
    return { ...stored, quietHours: cleaned };
  }
  if (typeof quiet.start !== "string" || typeof quiet.end !== "string")
    return null;
  const next = {
    ...quiet,
    windows: [{ start: quiet.start, end: quiet.end }]
  };
  for (const key of LEGACY_CLOCK_KEYS)
    delete next[key];
  return { ...stored, quietHours: next };
}
function parseObject(text) {
  try {
    const parsed = JSON.parse(text);
    return isRecord5(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
function isRecord5(raw) {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw);
}

// lib/server/upgrade/impl/steps/reason-shape.js
import { readFileSync as readFileSync5 } from "node:fs";
function migrateReasonShape() {
  rewriteFile(notifierFile(STATUS_FILE_NAME), migrateStatusText);
  rewriteFile(notifierFile(HISTORY_FILE_NAME), migrateHistoryText);
}
function rewriteFile(file, transform) {
  let text;
  try {
    text = readFileSync5(file, "utf8");
  } catch {
    return;
  }
  const migrated = transform(text);
  if (migrated === void 0 || migrated === text)
    return;
  const written = writeTextAtomicSync(file, migrated);
  if (!written.ok)
    throw new Error(`не удалось записать причины доставки: ${file} — ${written.reason}`);
}
function migrateStatusText(text) {
  const table = parseObject2(text);
  if (table === void 0)
    return void 0;
  let changed = false;
  const rebuilt = {};
  for (const [channelId, entry] of Object.entries(table)) {
    const migrated = migrateStatusEntry(entry);
    if (migrated !== entry)
      changed = true;
    rebuilt[channelId] = migrated;
  }
  return changed ? `${JSON.stringify(rebuilt, null, 2)}
` : void 0;
}
function migrateStatusEntry(entry) {
  if (typeof entry !== "object" || entry === null || Array.isArray(entry))
    return entry;
  const source = entry;
  if (source.lastError === void 0)
    return entry;
  const reason2 = normalizeReason(source.lastError);
  if (reason2 === void 0)
    return entry;
  if (sameReasonShape(source.lastError, reason2))
    return entry;
  return { ...source, lastError: reason2 };
}
function migrateHistoryText(text) {
  let changed = false;
  const lines = text.split("\n").map((line) => {
    if (line === "")
      return line;
    const migrated = migrateHistoryLine(line);
    if (migrated === void 0)
      return line;
    changed = true;
    return migrated;
  });
  return changed ? lines.join("\n") : void 0;
}
function migrateHistoryLine(line) {
  const entry = parseObject2(line);
  if (entry === void 0)
    return void 0;
  const channels = entry.channels;
  if (!Array.isArray(channels))
    return void 0;
  let changed = false;
  const rebuilt = channels.map((delivery) => {
    if (typeof delivery !== "object" || delivery === null || Array.isArray(delivery))
      return delivery;
    const source = delivery;
    if (source.reason === void 0)
      return delivery;
    const reason2 = normalizeReason(source.reason);
    if (reason2 === void 0 || sameReasonShape(source.reason, reason2))
      return delivery;
    changed = true;
    return { ...source, reason: reason2 };
  });
  return changed ? JSON.stringify({ ...entry, channels: rebuilt }) : void 0;
}
function parseObject2(text) {
  try {
    const parsed = JSON.parse(text);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : void 0;
  } catch {
    return void 0;
  }
}

// lib/server/upgrade/impl/steps/storage-layout.js
import { existsSync as existsSync2, readFileSync as readFileSync6, renameSync as renameSync2 } from "node:fs";
var MIGRATED_SUFFIX = ".migrated.bak";
var EMPTY_OBJECT = "{}\n";
var ZERO_SEQ = "0\n";
var LAYOUT = [
  {
    legacy: "dsh-notifier-history.jsonl",
    target: HISTORY_FILE_NAME,
    initial: ""
  },
  {
    legacy: "dsh-notifier-status.json",
    target: STATUS_FILE_NAME,
    initial: EMPTY_OBJECT
  },
  {
    legacy: "notifier-seq.json",
    target: SEQ_FILE_NAME,
    initial: ZERO_SEQ
  }
];
function migrateStorageLayout() {
  for (const entry of LAYOUT)
    settleOne(entry);
}
function settleOne(entry) {
  const target = notifierFile(entry.target);
  const source = legacyFile(entry.legacy);
  if (existsSync2(target)) {
    archive(source, MIGRATED_SUFFIX);
    return;
  }
  if (!existsSync2(source)) {
    writeTarget(target, entry.initial);
    return;
  }
  writeTarget(target, readSource(source));
  archive(source, MIGRATED_SUFFIX);
}
function readSource(source) {
  try {
    return readFileSync6(source, "utf8");
  } catch (cause) {
    throw new Error(`старый файл хранилища недоступен для чтения: ${source}`, { cause });
  }
}
function writeTarget(target, text) {
  const written = writeTextAtomicSync(target, text);
  if (!written.ok)
    throw new Error(`не удалось записать файл хранилища: ${target} — ${written.reason}`);
}
function archive(source, suffix) {
  if (!existsSync2(source))
    return;
  try {
    renameSync2(source, `${source}${suffix}`);
  } catch (cause) {
    throw new Error(`не удалось переименовать старый файл хранилища: ${source}`, { cause });
  }
}

// ../../shared/upgrade-tick.js
function tickUpgradeVersionSync() {
}

// lib/server/upgrade/impl/steps/index.js
function migrateToNewLayout(deps) {
  migrateStorageLayout();
  migrateConfigShape(deps.legacySettings);
  migrateReasonShape();
}
function migrateToV026() {
  migrateQuietWindows();
}
var STEPS = [
  { fromVersion: "0.2.3", targetVersion: "0.2.4", run: migrateToNewLayout },
  // 0.2.4 → 0.2.5 为空步 (客户端半区分层重构, 无形态变化): run 指共享空函数, 不再为新版本加空函数.
  { fromVersion: "0.2.4", targetVersion: "0.2.5", run: tickUpgradeVersionSync },
  { fromVersion: "0.2.5", targetVersion: "0.2.6", run: migrateToV026 },
  // 0.2.6 → 0.2.7 为空步 (本版不含 notifier 存储形态变化): run 指共享空函数.
  { fromVersion: "0.2.6", targetVersion: "0.2.7", run: tickUpgradeVersionSync }
];

// lib/server/upgrade/impl/version/index.js
import { readFileSync as readFileSync7 } from "node:fs";
import { dirname as dirname3, join as join6 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var BASELINE_VERSION = "0.0.0";
var UNKNOWN_VERSION = "0.0.0";
var SUPPORTED_STORED_VERSION = /^(?:0|1)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/u;
function readStoredVersion(read = (file) => readFileSync7(file, "utf8")) {
  let raw;
  try {
    raw = read(notifierFile(VERSION_FILE_NAME));
  } catch (cause) {
    const code = errorCode(cause);
    if (code === "ENOENT")
      return BASELINE_VERSION;
    const reason2 = cause instanceof Error ? cause.message : String(cause);
    throw new Error(`dsh-notifier: не удалось прочитать файл версии хранилища${code === void 0 ? "" : ` (${code})`} — ${reason2}`, { cause });
  }
  const version = raw.trim();
  if (version === "")
    throw new Error("dsh-notifier: файл версии хранилища пуст");
  if (!SUPPORTED_STORED_VERSION.test(version)) {
    throw new Error(`dsh-notifier: файл версии хранилища содержит недопустимый или неподдерживаемый номер версии: ${JSON.stringify(version)}`);
  }
  return version;
}
function writeStoredVersion(version) {
  return writeTextAtomicSync(notifierFile(VERSION_FILE_NAME), `${version}
`);
}
function pluginVersion() {
  try {
    const manifest = join6(dirname3(fileURLToPath2(import.meta.url)), "..", "package.json");
    const parsed = JSON.parse(readFileSync7(manifest, "utf8"));
    return typeof parsed.version === "string" ? parsed.version : UNKNOWN_VERSION;
  } catch {
    return UNKNOWN_VERSION;
  }
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
  const parts = text.split(".");
  if (parts.length > 3 || parts.some((part) => !/^(?:0|[1-9]\d*)$/u.test(part))) {
    throw new Error(`dsh-notifier: неподдерживаемый номер версии: ${JSON.stringify(text)}`);
  }
  return parts.map((part) => Number(part));
}
function errorCode(cause) {
  if (typeof cause !== "object" || cause === null || !("code" in cause))
    return void 0;
  return typeof cause.code === "string" ? cause.code : void 0;
}

// lib/server/upgrade/impl/chain/index.js
function runUpgradeChain(deps) {
  const recorded = readStoredVersion();
  runUpgradeSteps(pendingSteps(recorded), deps);
  reportGap(readStoredVersion(), pluginVersion(), deps.logger);
}
function runUpgradeSteps(steps, deps) {
  if (steps.length === 0)
    return;
  for (const step of steps)
    runUpgradeStep(step, deps);
  const finalVersion = steps[steps.length - 1].targetVersion;
  const written = writeStoredVersion(finalVersion);
  if (!written.ok) {
    throw new Error(`dsh-notifier: не удалось записать номер версии хранилища (${finalVersion}) — ${written.reason}`);
  }
}
function pendingSteps(recorded) {
  return [...STEPS].sort((left, right) => compareVersions(left.targetVersion, right.targetVersion)).filter((step) => compareVersions(step.fromVersion, recorded) >= 0);
}
function runUpgradeStep(step, deps) {
  try {
    step.run(deps);
  } catch (cause) {
    throw new Error(`dsh-notifier: не удалось обновить хранилище до ${step.targetVersion} — ${cause instanceof Error ? cause.message : "неизвестная причина"}`, { cause });
  }
}
function reportGap(recorded, target, logger) {
  const gap = compareVersions(recorded, target);
  if (gap === 0)
    return;
  if (gap < 0) {
    logger.warn(`dsh-notifier: версия хранилища ${recorded} ниже версии плагина ${target}, нет подходящего шага обновления`);
    return;
  }
  const newest = newestTargetVersion();
  if (newest !== "" && compareVersions(newest, target) > 0) {
    logger.warn(`dsh-notifier: целевая версия цепочки ${newest} выше версии плагина ${target} (хранилище обновлено до ${recorded}) — таблица шагов не синхронизирована с package.json`);
    return;
  }
  logger.warn(`dsh-notifier: версия хранилища ${recorded} выше версии плагина ${target}, цепочка обновлений не откатывается`);
}
function newestTargetVersion() {
  let newest = "";
  for (const step of STEPS) {
    if (newest === "" || compareVersions(step.targetVersion, newest) > 0)
      newest = step.targetVersion;
  }
  return newest;
}

// lib/server/upgrade/impl/service/index.js
var UpgradeRunner = class {
  /** 是否已装配; 单例实例重复装配是编程错误, 当场暴露. */
  installed = false;
  /** 装配: 先跑链.链在标记装配完成之前跑——它抛错时这次装配等于没发生, 宿主重试装配才有机会重跑链 (链是幂等的). */
  install(deps) {
    if (this.installed)
      throw new Error("dsh-notifier: домен upgrade собирается один раз");
    runUpgradeChain(deps);
    this.installed = true;
  }
  /** 卸载: 本域没有需要释放的东西——它只写了文件. */
  release() {
    this.installed = false;
  }
};
var upgradeRunner = new UpgradeRunner();

// lib/server/upgrade/interface.js
function installUpgrade(deps) {
  upgradeRunner.install(deps);
}
function releaseUpgrade() {
  upgradeRunner.release();
}

// lib/index.js
var SETTINGS_SERVICE = "settings";
var name = "notifier";
var inject = ["webServer", SETTINGS_SERVICE];
function apply(ctx, config = {}) {
  const host = bindHost(ctx);
  const stack = createDisposerStack();
  try {
    assemble(host, config, stack);
  } finally {
    stack.attach(ctx, "dsh-notifier");
  }
}
var GLOBAL_LISTEN = { global: true };
var FrameBus = class {
  handlers = /* @__PURE__ */ new Set();
  emit(payload) {
    for (const handler of [...this.handlers])
      handler(payload);
  }
  onFrame(handler) {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }
};
function bindHost(ctx) {
  const guard = (run2) => {
    try {
      run2();
    } catch (cause) {
      const reason2 = cause instanceof Error ? cause.message : String(cause);
      ctx.logger.warn(`dsh-notifier: сбой обработки события хоста — ${reason2}`);
    }
  };
  return {
    logger: ctx.logger,
    frames: new FrameBus(),
    // 依赖已由 `inject` 声明, 服务就绪才轮到本插件装配: 这里直接取用, 没有探测, 也没有迟到分支.
    legacySettings: ctx.settings,
    register: (route) => ctx.webServer.register(route),
    // 名字取自 sdk 域 (ABI 的定义处).显式类型参数是道保险: 谁把那里退回硬编码字面量, 
    // 少了它就静默失败——`ctx.provide` 的 `(name: string, value?: any)` 重载会兜住任意字符串.
    expose: {
      provide: (service) => ctx.provide(NOTIFIER_SERVICE, service)
    },
    events: {
      // 审批事件是 waterfall: 本插件只旁观, 转发之后必须 next(), 漏掉就等于替所有人否决了
      // 这次审批, 症状是«审批不弹了».prepend 让本监听器排在链前——前面的监听器不调
      // next() 时, 这次审批会对本插件彻底不可见.
      onApprovalRequest: (handler) => ctx.on("approval/request", (request, next) => {
        guard(() => handler(request));
        return next();
      }, { global: true, prepend: true }),
      // 与审批同构的第二个 waterfall: 同样只旁观, 同样必须把判定交还, 漏 next() 的症状是
      // «提问不弹了».
      onUserQuestion: (handler) => ctx.on("user-questions/request", (request, next) => {
        guard(() => handler(request));
        return next();
      }, { global: true, prepend: true }),
      onSessionEvent: (handler) => ctx.on("session/event", (session, event) => {
        guard(() => handler(session.id, event));
      }, GLOBAL_LISTEN),
      // agent 四个事件把官方载荷**原样**转过去: 拆成 id 等于替域决定«哪些字段有用», 
      // 而那个决定正是 events 域该做的判断.
      onAgentStatus: (handler) => ctx.on("agent/status", (payload) => {
        guard(() => handler(payload));
      }, GLOBAL_LISTEN),
      onAgentDisposed: (handler) => ctx.on("agent/disposed", (payload) => {
        guard(() => handler(payload));
      }, GLOBAL_LISTEN),
      onAgentTurnStopping: (handler) => ctx.on("agent/turn-stopping", (payload) => {
        guard(() => handler(payload));
      }, GLOBAL_LISTEN),
      // 唯一的例外是错误原文: 官方那边是宽类型, 在这里做唯一一次收窄, 域内不出现宽类型.
      onAgentError: (handler) => ctx.on("agent/error", (payload) => {
        const failure = payload.error;
        const reason2 = failure instanceof Error ? failure.message : String(failure);
        guard(() => handler({ ...payload, error: reason2 }));
      }, GLOBAL_LISTEN)
    },
    // 宿主 agent 注册表: 子代理归属判定的第二个信号.查不到与查得到分开报, 怎么理解是域的事.
    agents: {
      lookup: (id) => {
        const agent = ctx.get("agents", false)?.get(id);
        return agent === void 0 ? { found: false } : { found: true, agent };
      },
      isOwnedBy: (id, owner) => ctx.get("agents", false)?.isOwnedBy(id, owner) === true
    }
  };
}
function assemble(host, config, stack) {
  stack.own(releaseSoundTemps);
  installUpgrade({ logger: host.logger, legacySettings: host.legacySettings });
  stack.own(releaseUpgrade);
  installConfig({ logger: host.logger });
  stack.own(releaseConfig);
  installStores({ logger: host.logger, config: interface_exports2 });
  stack.own(releaseStores);
  installPipeline({
    enabled: config.enabled !== false,
    frames: host.frames,
    logger: host.logger,
    config: interface_exports2,
    stores: interface_exports5,
    channels: interface_exports
  });
  stack.own(releasePipeline);
  installEvents({
    events: host.events,
    agents: host.agents,
    logger: host.logger,
    pipeline: interface_exports3
  });
  stack.own(releaseEvents);
  installSdk({
    expose: host.expose,
    config: interface_exports2,
    pipeline: interface_exports3
  });
  stack.own(releaseSdk);
  installApi({
    register: host.register,
    frames: host.frames,
    logger: host.logger,
    config: interface_exports2,
    stores: interface_exports5,
    pipeline: interface_exports3,
    kinds: interface_exports4,
    channels: interface_exports
  });
  stack.own(releaseApi);
}
export {
  apply,
  inject,
  name
};
