import lowdb from "lowdb";
import shortid from "shortid";
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
  },
  async addMovie(payload) {
    try {
      db.get("movies")
        .push({ uuid: shortid.generate(), ...payload })
        .write();
      return payload.id;
    } catch (error) {
      return { error };
    }
  },
  async checkIfMovieExists(payload) {
    return db.get("movies")
      .find({ id: payload })
      .value();
  },
  async addTvSeries(payload) {
    try {
      db.get("tvSeries")
        .push({ uuid: shortid.generate(), ...payload })
        .write();
      return payload.id;
    } catch (error) {
      return { error };
    }
  },
  async checkIfTvSeriesExists(payload) {
    return db.get("tvSeries")
      .find({ id: payload })
      .value();
  },
  async deleteMovie(payload) {
    try {
      db.get("movies")
        .remove({ uuid: payload })
        .write();
      return true;
    } catch (error) {
      return { error };
    }
  },
  async deleteTvSeries(payload) {
    try {
      db.get("tvSeries")
        .remove({ uuid: payload })
        .write();
      return true;
    } catch (error) {
      return { error };
    }
  }
};
