import type { StartAgentVisibilityArgs } from "../../interface.js";
/**
 * 启动模型可见面隐藏。返回域 disposer（摘监听 + 撤掉全部已应用限制）。
 *
 * @param args 组合根按调用实参递进来的全部输入（本域没有端口持有者，也没有第二处取数路径）。
 */
export declare function startAgentVisibility(args: StartAgentVisibilityArgs): () => void;
