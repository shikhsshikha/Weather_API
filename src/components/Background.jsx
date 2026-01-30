import { useEffect, useRef, useState } from "react";

function Background({ videoSrc }) {
  const videoRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(videoSrc);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.2;
    video.play().catch(() => {});
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!videoSrc || videoSrc === currentSrc) return;

    setVisible(false);

    const timeout = setTimeout(() => {
      setCurrentSrc(videoSrc);
      setVisible(true);
    }, 300); 

    return () => clearTimeout(timeout);
  }, [videoSrc, currentSrc]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src={currentSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover
          transition-opacity duration-500 ease-in-out
          ${visible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default Background;
