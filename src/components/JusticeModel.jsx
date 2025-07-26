// src/components/JusticeModel.jsx
import React from 'react';

const JusticeModel = () => {
  return (
    <div className="sketchfab-embed-wrapper my-10 w-full flex justify-center">
      <iframe
        title="Angel of Justice"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        width="100%"
        height="480"
        className="max-w-4xl rounded-xl shadow-lg"
        src="https://sketchfab.com/models/0c6ea584860a42a2aa25015a86dab881/embed"
      ></iframe>
    </div>
  );
};

export default JusticeModel;
