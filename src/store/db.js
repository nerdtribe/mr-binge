import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("mrbingedb.json", {
  defaultValue: {
    apiKey: "",
    movies: [],
    tv: []
  }
});

const db = lowdb(adapter);

export default {
  readDatabase() {
    return db.getState();
  },
  writeApiKey(payload) {
    db.set("apiKey", payload).write();
  }
};
