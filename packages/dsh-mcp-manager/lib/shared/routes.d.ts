/**
 * dsh-mcp-manager — 跨端路由契约单点（D5，#767 B1.5a）。
 *
 * 11 条 /api/dsh-mcp/* 路径同时被宿主装配数组与客户端取数面使用，围栏数据（方法白名单
 * 与 loopback 豁免）是宿主唯一执法点；物理定义都只在本文件。
 */
/**
 * 路由路径清单（11 条；键序与值均为跨端契约，不得重排或改写）。
 *
 * 刻意不写 as const：ROUTES 是包入口的既有导出，其公开类型必须是 `{ servers: string; … }`
 * （加 as const 会把公开类型收紧成字面量联合，导出面快照立刻判红）——提取常量不该顺带改 ABI。
 */
export declare const ROUTES: {
    servers: string;
    config: string;
    session: string;
    resume: string;
    connect: string;
    disconnect: string;
    reconnect: string;
    importJson: string;
    events: string;
    health: string;
    toolDisable: string;
};
/** 路由名（ROUTES 的键）。 */
export type RouteName = keyof typeof ROUTES;
/** 端点围栏数据。 */
export interface RouteFence {
    /** 经 guardLoopbackMethod 的方法：非 loopback 403、白名单外 405（403 先于 405）。 */
    guarded: string[];
    /** 豁免 loopback 的只读方法。 */
    loopbackExempt: string[];
}
/**
 * 每条路由的围栏数据。config 是唯一有 loopback 豁免的路由（GET 只读 UI 配置）。所有非
 * loopback 请求先经官方 admission；认证通过后才判方法白名单，失败则 401/403 先于 405。
 * loopback 仍走快路径，直接经过同一方法白名单。
 */
export declare const ROUTE_FENCE: Record<RouteName, RouteFence>;
