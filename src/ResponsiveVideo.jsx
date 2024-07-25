import React from 'react';
import './ResponsiveVideo.css';

const ResponsiveVideo = ({ videoId }) => {
  return (
    <div className="video-wrapper">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      </div>
    </div>
  );
};

export default ResponsiveVideo;