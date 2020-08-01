/**
 * If you give me a default search term, I will give you a way to search of videos and a list of videos.
 */

import { useState, useEffect } from "react";
import youtube from "../apis/youtube";

/**
 * We are going to provide the default search term
 * This is going to return a list of videos and a function that can be used to search for videos
 */
const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (term) => {
    // setSelectedVideo(null);
    setVideos([])
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });

    setVideos(response.data.items);
  };


  return [videos, search];
};

export default useVideos;
