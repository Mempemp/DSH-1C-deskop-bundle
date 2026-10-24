/**
 * Проверка: на виндовом хосте с работающим системным каналом на событие приходит один тост.
 * Браузерная половина уходит только со звуком (playOnly), окно своё уведомление не рисует.
 */
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const home = mkdtempSync(join(tmpdir(), "notifier-once-"));
process.env.DSH_HOME = home;

const { apply } = await import("../lib/index.js");

const routes = new Map();
let service = null;
const chunks = [];
const warnings = [];

function fakeRes() {
  const res = new EventEmitter();
  res.destroyed = false;
  res.writableEnded = false;
  res.statusCode = 200;
  res.headers = {};
  res.writeHead = (code, headers) => {
    res.statusCode = code;
    Object.assign(res.headers, headers ?? {});
    return res;
  };
  res.setHeader = (name, value) => {
    res.headers[name] = value;
  };
  res.flushHeaders = () => {};
  res.write = (chunk) => {
    if (chunk !== undefined) res.body.push(String(chunk));
    chunks.push(String(chunk));
    return true;
  };
  res.body = [];
  res.end = (text) => {
    if (text !== undefined) {
      res.body.push(String(text));
      chunks.push(String(text));
    }
    res.writableEnded = true;
  };
  return res;
}

const ctx = {
  logger: { info: () => {}, warn: (m) => warnings.push(String(m)), error: () => {}, debug: () => {} },
  settings: undefined,
  webServer: {
    port: 0,
    register: (route) => routes.set(route.path, route),
  },
  provide: (name, value) => {
    service = value;
  },
  get: () => undefined,
  on: () => () => {},
  effect: () => {},
  dispose: () => {},
};

apply(ctx, {});
assert.ok(routes.has("/api/dsh-notifier/events"), [...routes.keys()].join(", "));

// Открываем поток событий: ровно так кадр попадает в окно.
function fakeReq(method, url, payload) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = {
    "content-type": "application/json",
    "content-length": String(payload === undefined ? 0 : Buffer.byteLength(payload)),
    host: "127.0.0.1"
  };
  req.socket = { remoteAddress: "127.0.0.1" };
  req[Symbol.asyncIterator] = async function* iterate() {
    if (payload !== undefined) yield Buffer.from(payload);
  };
  setImmediate(() => {
    if (payload !== undefined) req.emit("data", Buffer.from(payload));
    req.emit("end");
  });
  return req;
}

const events = routes.get("/api/dsh-notifier/events");
const streamRes = fakeRes();
await events.handler(fakeReq("GET", "/api/dsh-notifier/events"), streamRes);

// Служебное уведомление проходит тот же конвейер, что и настоящие события.
const test = routes.get("/api/dsh-notifier/test");
const body = JSON.stringify({ kind: "test", title: "Проверка", message: "Один тост" });
const testRes = fakeRes();
await test.handler(fakeReq("POST", "/api/dsh-notifier/test", body), testRes);
await new Promise((done) => setTimeout(done, 500));
console.log("ответ теста:", testRes.statusCode, testRes.body.join("").slice(0, 300));
console.log("предупреждения:", warnings.slice(-4).join(" | ").slice(0, 500));
for (let i = 0; i < 60 && !chunks.join("").includes('"notify"'); i += 1) await new Promise((done) => setTimeout(done, 100));
console.log("поток:", JSON.stringify(chunks.join("")).slice(0, 300));

const payloads = chunks.join("").split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim());
const frames = payloads.map((raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}).filter(Boolean);

const notifyFrame = frames.find((frame) => frame.type === "notify");
assert.ok(notifyFrame, "кадр уведомления не пришёл: " + chunks.join("").slice(0, 400));
console.log("кадр:", JSON.stringify(notifyFrame).slice(0, 200));
assert.equal(notifyFrame.playOnly, true, "окно не должно рисовать своё уведомление");
assert.deepEqual(notifyFrame.sound, { mode: "silent" }, "звук даёт тост Windows, второй тон не нужен");
console.log("ok   на виндовом хосте событие показывается одним тостом: окно не дублирует и не звенит");


// --- Второй сценарий: системный канал выключен, уведомление обязано появиться в окне ---
const second = await import("../lib/index.js?second=1");
const routes2 = new Map();
second.apply({
  logger: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
  settings: undefined,
  webServer: { port: 0, register: (route) => routes2.set(route.path, route) },
  provide: () => {},
  get: () => undefined,
  on: () => () => {},
  effect: () => {},
  dispose: () => {},
}, {});

async function readJson(route, method, payload) {
  const res = fakeRes();
  res.body = [];
  res.write = (chunk) => {
    if (chunk !== undefined) res.body.push(String(chunk));
  };
  res.end = (text) => {
    if (text !== undefined) res.body.push(String(text));
    res.writableEnded = true;
  };
  await route.handler(fakeReq(method, route.path, payload), res);
  for (let i = 0; i < 40 && res.body.length === 0; i += 1) await new Promise((done) => setTimeout(done, 50));
  const text = res.body.join("");
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text, status: res.statusCode };
  }
}

const view = await readJson(routes2.get("/api/dsh-notifier/config"), "GET");
assert.ok(Array.isArray(view?.effective?.channels), JSON.stringify(view).slice(0, 300));
const channels = view.effective.channels.map((channel) =>
  channel.type === "system" ? { ...channel, enabled: false, popup: false, sound: false } : channel
);
const written = await readJson(routes2.get("/api/dsh-notifier/config"), "PUT", JSON.stringify({ patch: { channels } }));
assert.equal(written.ok, true, JSON.stringify(written).slice(0, 300));

const stream = fakeRes();
stream.body = [];
stream.write = (chunk) => {
  if (chunk !== undefined) stream.body.push(String(chunk));
};
stream.end = () => {};
await routes2.get("/api/dsh-notifier/events").handler(fakeReq("GET", "/api/dsh-notifier/events"), stream);
await readJson(routes2.get("/api/dsh-notifier/test"), "POST", JSON.stringify({ kind: "test", title: "Проверка", message: "Окно" }));
for (let i = 0; i < 60 && !stream.body.join("").includes('"notify"'); i += 1) await new Promise((done) => setTimeout(done, 100));
const frame2 = stream.body.join("").split("\n").filter((line) => line.startsWith("data:")).map((line) => {
  try {
    return JSON.parse(line.slice(5).trim());
  } catch {
    return null;
  }
}).filter(Boolean).find((frame) => frame.type === "notify");
assert.ok(frame2, "второй сценарий: кадр не пришёл");
assert.notEqual(frame2.playOnly, true, "без системного канала уведомление должно рисоваться в окне");
console.log("ok   системный канал выключен — окно показывает уведомление как раньше");
