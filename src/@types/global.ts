declare type ObjectValue<T extends object, K extends keyof T = keyof T> = T[K];
