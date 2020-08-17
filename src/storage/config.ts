// import * as lowdb from 'lowdb';
// import * as FileSync from 'lowdb/adapters/FileSync';
import { LowdbSync } from 'lowdb';
const lowdb = window.require('lowdb');
const FileSync = window.require('lowdb/adapters/FileSync');
import { remote } from 'electron';
import { join } from 'path';
import { mkdirpSync, pathExistsSync } from 'fs-extra';

// const { LowdbSync } = window.require('lowdb');

interface Config {
  endpoint: string;
}

export class SettingStorage {
  db: LowdbSync<Config>;

  constructor() {
    const userDataDirectory = remote.app.getPath('userData');
    const databaseDirectory =  join(userDataDirectory, 'db');
    if (!pathExistsSync(databaseDirectory)) {
      mkdirpSync(databaseDirectory);
    }
    const adapter = new FileSync(join(userDataDirectory, 'db', './config.json'));
    const db = lowdb(adapter);
    this.db = db;
  }

  getApiEndpoint() {
    return this.db
      .get('endpoint')
      .value();
  }

  setApiEndpoint(url: string) {
    console.log(url);
    this.db
      .set('endpoint', url)
      .write();
  }
}
