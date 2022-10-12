export interface AppModule<T, K> {
  moduleName: string;
  controller: T;
  entity: K;
}
