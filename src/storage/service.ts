export class StorageService<T> {
  _entity: T;
  constructor(entity: T) {
    this._entity = entity;
  }
}
