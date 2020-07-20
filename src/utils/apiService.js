import axios from "axios";

// const corsUrl = "http://cors-anywhere.herokuapp.com/";
const baseUrl = "https://mr-binge-api-server.herokuapp.com/api/";

class ApiService {
  constructor() {
    const axiosRequest = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
      paramsSerializer(params) {
        return JSON.stringify(params);
      }
    });
    this.axiosRequest = axiosRequest;
  }

  async searchBroadTvMovie(type, query) {
    const searchType = type === "movies" ? "movieTitle" : "tvShowTitle";
    this.response = await this.axiosRequest(`${type}/search?${searchType}=${query}`).then(
      response => response
    );
    return this.response;
  }

  async searchDetailedTvMovie(type, id) {
    const searchType = type === "movies" ? "movieID" : "tvShowID";
    this.response = await this.axiosRequest(`${type}/detailed-search?${searchType}=${id}`).then(
      response => response.data
    );
    return this.response;
  }
}

export default new ApiService();
