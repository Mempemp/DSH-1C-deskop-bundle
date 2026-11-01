/** 建目录并落登记的 mode：插件自有目录 0o700，项目 `.dsh/` 随项目自身权限模型。 */
export declare function ensureDir(dir: string): Promise<void>;
/** 原子写全文：mode 取自 `paths.ts` 的登记表，未登记即抛错（不写权限未登记的文件）。 */
export declare function writeFileAtomic(file: string, data: string): Promise<void>;
/** 容错读全文：不存在 / 不可读 / 是目录一律回落 null，由各域按既有语义回落空值。 */
export declare function readTextFile(file: string): Promise<string | null>;
/** 容错读 JSON：解析失败同样回落 null——坏文件是各域读面的常态，不是进程失败。 */
export declare function readJsonFile<T>(file: string): Promise<T | null>;
