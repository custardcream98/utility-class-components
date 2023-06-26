export type SetElements<TargetSet> = TargetSet extends Set<infer Element> ? Element : never;
