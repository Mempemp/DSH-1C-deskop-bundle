/**
 * 用户 home 目录（`~` 的展开目标）：`HOME` 非空白原样采用；未设置或空白回落
 * `os.homedir()`。Windows 按 Node/libuv 语义以 `USERPROFILE` 优先（libuv 在
 * Windows 只读 `USERPROFILE`，`HOME` 仅作次级宽容）。
 *
 * 为什么不直接用 `os.homedir()`：它读的是**进程级** environ（libuv `getenv`），
 * 而 worker_threads 里的 `process.env` 只是每线程副本、对 native addon 不可见
 * （Node 官方 worker_threads 文档：changes "are not visible to native add-ons"）。
 * Stryker 的 vitest-runner 强制 `pool: 'threads'` 且 inline 选项无法被配置覆盖，
 * 于是测试里 `process.env.HOME = <临时目录>` 的隔离整片失效。显式 env 优先既恢复
 * 可测性，又与 libuv 自身的取值次序一致（POSIX：`$HOME` 优先，未定义才查 passwd），
 * **默认形态逐字节不变**。业界同形先例：npm `loadHome()`、gemini-cli `GEMINI_CLI_HOME`。
 *
 * @returns {string} 用户 home 目录路径。
 */
export declare function userHome(): string;
/**
 * DSH home 基目录：`DSH_HOME` 非空白原样采用；未设置**或空白**回落
 * `~/.dsh`（默认形态路径逐字节不变）。语义对齐官方
 * `@deepseek-ai/dsh-home-paths#resolveDshHome`（空白 env 视同未设置）。
 * 落盘/读取持久化文件一律以本函数为 base——仓库纪律「落盘路径必须感知
 * DSH_HOME」及其豁免口径由 docs/DEVELOPMENT.md §1 承载（PR #523）。
 *
 * @returns {string} DSH home 目录路径。
 */
export declare function dshHome(): string;
