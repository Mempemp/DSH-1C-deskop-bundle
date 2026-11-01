/**
 * 读存储版本。没有版本文件 = 从未升级过 = 从零跑整条链：每一步都会自己判断有没有它的活要干，
 * 全新安装下只有「落定初始形态」那部分生效，而从更早版本升上来的安装正好借这一轮把该做的做掉。
 */
export declare function readStoredVersion(): Promise<string>;
/** 写存储版本：一步升级完成即推进一档。写不进去即抛，调用方中止这一次升级、下次从同一步重跑。 */
export declare function writeStoredVersion(version: string): Promise<void>;
