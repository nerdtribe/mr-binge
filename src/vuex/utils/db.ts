import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('mrbingedb.json');

const db = lowdb(adapter);

export default {
  readDatabase() {
    return db.getState();
  },
  writeApiKey(payload: string) {
    db.set('apiKey', payload).write();
  },
};
