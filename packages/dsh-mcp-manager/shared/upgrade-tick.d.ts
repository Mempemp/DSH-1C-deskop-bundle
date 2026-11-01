/**
 * 空步（异步链用）：立即完成，不碰任何存储。
 *
 * 调用方把版本号写在自己的步骤表里（fromVersion/targetVersion），run 统一指到本函数。
 * 故意不收任何参数：空步不需要外部依赖，收了就是让调用方误以为它会用。
 *
 * @returns {Promise<void>} 恒为完成态的 Promise。
 */
export declare function tickUpgradeVersion(): Promise<void>;
/**
 * 空步（同步链用）：什么都不做，立即返回。
 *
 * 和上面的异步版是同一语义，只是同步形态：有些包的升级链是同步的（run 返回空类型），
 * 把异步函数塞给同步链会被门禁判红（浮起的 Promise 等于埋了个不定时炸弹），
 * 所以同步链用这个，异步链用上面那个。两个都不读写任何文件。
 */
export declare function tickUpgradeVersionSync(): void;
