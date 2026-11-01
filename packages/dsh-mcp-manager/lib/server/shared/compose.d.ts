import type { HostContextPort, HostFaces } from "./host-faces.js";
/**
 * 一个域给组合根的装配对。
 *
 * `install` / `release` **成对**：`install` 收本域需要的外部能力，`release` 复位本域**自己的**
 * 装配标记并放开入参。没有配对的下半截，域就只能在下次装配时静默复用上一次的状态。
 */
export interface DomainSpec<Host = HostFaces> {
    /** 域标识：只用于装配错误文案，域内断言不依赖它。 */
    readonly name: string;
    /** 装配。入参是组合根收窄后的宿主能力面——域拿不到 `Context`。 */
    install(host: Host): void | Promise<void>;
    /** 释放：与 `install` 配对，复位本域标记；重复调用无害。 */
    release(): void;
}
/**
 * 把宿主上下文收窄成能力面。
 *
 * 交付的是**能力**而不是装配期算好的值：算一次的快照看起来与实时读取一模一样，却在用户改了设置
 * 之后继续用旧值（E.2 实测：`webServer.register` 的摘除器、`ctx.tools` 的注册表都是活对象）。
 */
export declare function bindHost(ctx: HostContextPort): HostFaces;
/**
 * 按依赖顺序装配各域，返回它们的释放函数（逆序交给 `safeDisposeAll`）。
 *
 * `install` 一律 `await`：`upgrade` 域的装配是异步的（落盘原语只有 Promise 面），不等待就等于
 * 让各域在存储迁移跑完之前去读旧布局——那时旧文件已被归档，读到的是空盘。
 *
 * 装配期不吞错：任一步抛错即中止，已装好的域保持已装状态——各域的 `install` 都保证「抛错等于没装」
 * （标记在最后一步才置位），宿主重试装配时从同一步重跑。
 */
export declare function assemble<Host>(host: Host, domains: readonly DomainSpec<Host>[]): Promise<Array<() => void>>;
/**
 * 逐个释放；单个释放失败不阻断其余（否则一个域的清理会拖垮整条卸载链）。
 *
 * **逆序**：后装的先释放，否则出口域会在别人已经放开的入参上继续服务。
 */
export declare function safeDisposeAll(disposers: readonly (() => void)[]): void;
