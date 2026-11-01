/**
 * dsh-mcp-manager — server/config/impl/env/policy.ts：环境变量凭据策略门（#770-2 环境净化，B 相）。
 *
 * 两阶段校验中的第二阶段（第一阶段是 normalizeServer 的纯形状校验，不读环境）：
 * add / update / import 三个写边界在落盘前调用 assertEnvPolicy，对 env / headers /
 * url / args 做「目标键 + 值 provenance」双审——用户裁决：边界拒绝 + 豁免表，拒绝静默过滤。
 *
 * 为什么不在 normalizeServer 里做：normalize 是纯函数，而本门要读父进程环境快照做展开后
 * 审计（${VAR} 的值 provenance 只有读到快照才知道）；纯函数里读环境会让归一结果随调用
 * 时机漂移。形状问题归 normalize，环境策略问题归本门，两门职责不混。
 *
 * 双审口径（fail-closed，命中即抛错，绝不静默丢弃/置空）：
 * 1. 目标键审：键名按词精确匹配凭据词表（isSecretEnvName）。子串正则 SECRET_ENV_NAME 只作
 *    候选快筛，确证必须走词表——MONKEY / TURKEY_SIZE / KEYBOARD 这类含 KEY 子串的正当名
 *    在词级无命中，必须放行（误伤回归测试锁死）。
 * 2. 值 provenance 审：值里的 ${VAR} 引用若指向凭据形名（非豁免），而目标键本身非凭据形
 *    （如 DEBUG: "${MY_SECRET}"），即秘密被塞进非秘密槽位——子进程会把它当普通数据，
 *    且按名识别的脱敏/投影都认不出它，拦截。引用名是否已 set 不影响判定（unset 时展开
 *    为空串正是「零值消费」陷阱：换个环境就变泄漏，fail-closed 按名拦截）。
 * 3. 活秘密查重：展开后的非空值若与某个凭据形父环境变量的活值逐字相等（如 MY_TOKEN 的
 *    明文字面量与快照里 MY_TOKEN 相同），即把活秘密以明文 baked 进配置文件——轮转即漂移，
 *    且与「模板落盘、连接时展开」的不变量相悖，拦截并指引改用同名模板。
 *    豁免：凭据槽位经凭据引用取值（CONTEXT7_API_KEY: "${CONTEXT7_API_KEY}"、
 *    Authorization: "Bearer ${CONTEXT7_API_KEY}"）是文档示例的合法形态，展开值等于活
 *    秘密是预期结果，不在此列；空值（""，客户端语义=继承父环境）不注册不比对。
 *
 * 报错文案只含键名/变量名与模板，不含任何字面量值：写边界的错误经路由统一错误边界
 * （handleError → redactError）原样进 400 body，而被拒配置尚未落盘、其展开值不在脱敏
 * 快照内——回显字面量即泄漏。模板形态（"${MY_SECRET}"）无秘密可泄，可以出现。
 */
/** ${VAR} 引用抽取：字面量必须与 expandEnv 的替换口径逐字一致（门与展开同口径）。 */
export declare function extractEnvRefs(value: unknown): string[];
/**
 * 名是否为凭据形（精确判定）：豁免表优先 → 子串正则只作候选快筛 → 切词精确确证。
 *
 * 切词规则：大写后按非字母数字切分（下划线/连横线/点/空格都是词界），每词去尾数后查表。
 * 去尾数（TOKEN2 → TOKEN）收的是「带编号的凭据」常见写法；TURKEY2 → TURKEY 照样不命中，
 * 不引入新误伤。MONKEY / TURKEY_SIZE / KEYBOARD / AUTHOR_NAME 在此全灭（子串命中但无整词）。
 */
export declare function isSecretEnvName(name: unknown): boolean;
/**
 * 写边界凭据策略门（add / update / import 同门；normalize 保持纯形状校验不调本函数；
 * registerServer 内存态不调本函数，见 manager.registerServer 注释）。
 *
 * @param env 归一化后的 env 表（add/update 传 normalize 产物；import 经 parseClaudeJson →
 *   manager.add/update 间接同门，不直调）。
 * @param headers 归一化后的 headers 表。
 * @param snapshot 父环境快照（缺省 process.env；单测注入隔离快照，离线可跑）。
 * @param url 归一化后的 url（只审 userinfo/查询值中的活秘密值 + 引用污染；缺省跳过）。
 * @param args 归一化后的 args（只审秘密 flag 值等于活秘密值 + 引用污染；缺省跳过）。
 * @throws 命中即抛错（fail-closed）：文案含哪个键/槽位、为什么被拒、怎么改；不含字面量值
 *   （400 body 经 redactError 原样返回，被拒配置不在脱敏快照内，回显即泄漏）。
 */
export declare function assertEnvPolicy(env: Record<string, unknown> | undefined, headers: Record<string, unknown> | undefined, snapshot?: Record<string, string | undefined>, url?: unknown, args?: unknown): void;
