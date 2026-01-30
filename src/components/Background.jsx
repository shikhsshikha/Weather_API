import { useEffect, useRef, useState } from "react";
import initialBg from "../assets/videos/initial-bg-vid.mp4";

function Background({ videoSrc }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(initialBg);

  // Play initial video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.2;
    video.play().catch(() => {});
  }, []);

  // Handle video change WITHOUT blue flash
  useEffect(() => {
    if (!videoSrc || videoSrc === currentSrc) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    // Freeze last frame
    canvas.width = video.videoWidth || window.innerWidth;
    canvas.height = video.videoHeight || window.innerHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Swap video AFTER freeze
    video.src = videoSrc;
    video.load();

    video.oncanplay = () => {
      video.play().catch(() => {});
      canvas.style.opacity = "0";
    };

    setCurrentSrc(videoSrc);
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={currentSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* FREEZE FRAME */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{ opacity: 1 }}
      />
    </div>
  );
}

export default Background;
