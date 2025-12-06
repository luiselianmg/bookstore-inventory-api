export interface IdGenerator<T> {
  generateId(entityName?: string): T | Promise<T>;
}