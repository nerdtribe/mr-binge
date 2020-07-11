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
    const searchType = query === "movies" ? "tvShowTitle" : "movieTitle";
    this.response = await this.axiosRequest(`${type}/search?${searchType}=${query}`).then(
      response => response
    );
    return this.response;
  }
}

export default new ApiService();
