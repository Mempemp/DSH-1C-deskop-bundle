/**
 * dsh-mcp-manager — connection/orchestrator/impl/service/index.ts：连接编排子层端口持有者（#767 B2a-wire W7）。
 *
 * 子层内实现经 `orchestratorPorts.get()` 取数，写入只发生在组合根入口顶层的
 * `installOrchestrator`（见 `src/index.ts`）。形态照 `catalog/impl/service/`、
 * `pipeline/impl/service/` 与 `inject/impl/service/`：模块级只有一个 `const` 实例、
 * 状态收进实例字段（I9），装配与复位只经方法（方法内赋值）。
 */
import type { OrchestratorDeps } from "../../deps.js";
/** 连接编排子层端口表：装配一次、子层内多处读。 */
declare class OrchestratorPorts {
    /** 未装配时保持 undefined——「没装配」与「装配了空实现」必须可区分（I6）。 */
    private deps;
    /** 装配：组合根递入静态模块引用；重复装配是编程错误，当场暴露。 */
    install(deps: OrchestratorDeps): void;
    /** 卸载：只复位装配标记，本子层没有别的活资源要释放。 */
    release(): void;
    /**
     * 子层内取数的唯一入口。未装配即抛错而不是回落默认值：默认值会让「组合根漏装」表现成行为
     * 正常但参数不对（配置归一化、目录缓存路径与连接监督器静默换成别处的实现或值），症状与本
     * 插件毫无字面关联。
     */
    get(): OrchestratorDeps;
}
/** 本子层唯一的装配实例：类不外放，外部 new 不出第二份端口表。 */
export declare const orchestratorPorts: OrchestratorPorts;
export {};
