import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import useVideos from "../hooks/useVideos";

const App = () => {
  const [videos, search] = useVideos("buildings");

  const [selectedVideo, setSelectedVideo] = useState(null);

  // this will be called whenever the search function is called
  //onFormSubmit -> search -> setVideos -> re-render -> useEffect -> setSelectedVideo -> re-render
  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  /**
   * This function reference will be passed to every videoItem component
   * @param {*} video this will be passed by the videoItem component
   */
  // const onVideoSelect = (video) => {
  //   setSelectedVideo(video);
  // };
  const onFormSubmit = (term) => {
    search(term);
  };

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={onFormSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div
            className="eleven wide column"
            style={!selectedVideo ? { height: "30rem" } : null}
          >
            <VideoDetail video={selectedVideo} />
          </div>

          <div className="five wide column">
            <VideoList onVideoSelect={setSelectedVideo} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

/**
 * onFormSubmit -> search(term) -> setVideos([]) -> api call (async) -> re-render#useVideos() -> return video [] ->
 * inside App() again(re-render); with state video [] and selectedVideo: oldVideo -> after component is re-rendered,
 * we will selected video and no list ->
 * useEffect is called as the videos has changed to [] -> App() will re-render and called again -> useVideos() is called just a formality ->
 * inside App() again with video [] and selectedVideo: undefined -> return JSX with updated state; we will see the loader ->
 * now as the program has nothing else to do the result from the pending api request will be used -> got data from api
 * -> setVideos() is called with the new data ->  videos() will called again with new data from api -> App component will gets re-render
 * -> App() videos[new Array], selectedVideos: oldData(undefined) -> we will see the loader and video list (opposite of previous case) ->
 * After component is re-render useEffect is called  -> set the selectedVideo -> re-render -> goes to Video component -> App() component ->
 * we see the updated state.
 *
 */
