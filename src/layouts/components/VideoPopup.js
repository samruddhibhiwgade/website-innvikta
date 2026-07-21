"use client";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import ImageFallback from "./ImageFallback";

function VideoPopup({ id, thumbnail, width = 700, height = 394 }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="animate relative block overflow-hidden rounded-2xl aspect-video w-full">
      {showPopup ? (
        <div className="absolute inset-0 w-full h-full">
          <LiteYouTubeEmbed id={id} defaultPlay={true} />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <ImageFallback
            className="absolute inset-0 w-full h-full object-cover"
            src={thumbnail}
            width={width}
            height={height}
            alt="Training Module Thumbnail"
          />
          <button
            onClick={() => setShowPopup(true)}
            className="intro-play-btn relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-body lg:h-20 lg:w-20 transition-all hover:scale-110 shadow-2xl"
          >
            <FeatherIcon icon="play" size={32} />
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoPopup;
