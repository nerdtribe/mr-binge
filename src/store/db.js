import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import INITIAL_STATE from "./state";

const adapter = new FileSync("mrbingedb.json", {
  defaultValue: INITIAL_STATE
});

const db = lowdb(adapter);

export default {
  readDatabase() {
    return db.getState();
  },
  writeTmdbApiKey(payload) {
    db.set("tmdbApiKey", payload).write();
  },
  writeTmdbApiEnabled(payload) {
    db.set("tmdbApiEnabled", payload).write();
  }

};
