export type DbAdd = <T>(
    store: string, value: T) => Promise<void>;
    export type DbPut = <T>(
    store: string, value: T) => Promise<void>;
    export type DbDelete = (
    store: string, id: string) => Promise<void>;