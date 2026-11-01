/** id 生成器：每次调用产出一个候选 id。注入点只为可测（确定性 id / 冲突序列）。 */
export type ServerIdFactory = () => string;
/** 分配入参。`idFactory` 省略时用默认随机实现。 */
export interface ServerIdTableOptions {
    idFactory?: ServerIdFactory;
}
/** (scope, name) → id 的查询面；id 在首次查询时分配并自此固定。 */
export interface ServerIdTable {
    /** 取该 (scope, name) 的 id；未分配则生成并记住。同参恒同值。 */
    idFor(scope: string, name: string): string;
    /** 该 (scope, name) 是否已分配 id（只读查询，不触发分配）。 */
    has(scope: string, name: string): boolean;
}
/**
 * 建一张独立的 id 表。每次调用得到互不相通的映射与已占用面（I9：同进程两次装配不得共享状态）。
 */
export declare function makeServerIdTable(options?: ServerIdTableOptions): ServerIdTable;
