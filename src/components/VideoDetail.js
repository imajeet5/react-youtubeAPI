import React from "react";
import Spinner from "./Spinner";

const VideoDetail = ({ video }) => {
  // for error handling as, initially when the application loaded the video is null we will send the spinner
  if (!video) {
    return  <Spinner />;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
