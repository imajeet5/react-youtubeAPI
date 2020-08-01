import axios from "axios";
import { apiKey } from "../keys/youtubeapi.key";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: apiKey,
  },
});
