import { SettingStorage } from './config';
import { PluginEntity } from './plugin';
import { StorageService } from '@@/storage/service';

export const settingStorage = new SettingStorage();
const entities = [PluginEntity];

export function storage<T>(entity: T) {
  return new StorageService(entity);
}
