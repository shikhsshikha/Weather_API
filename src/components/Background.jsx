import { useEffect, useRef, useState } from "react";
import initialBg from "../assets/videos/initial-bg-vid.mp4";

const FADE_DURATION = 800;

function Background({ videoSrc }) {
  const videoA = useRef(null);
  const videoB = useRef(null);

  const [active, setActive] = useState("A");
  const [srcA, setSrcA] = useState(initialBg);
  const [srcB, setSrcB] = useState(null);

  useEffect(() => {
    const v = videoA.current;
    if (!v) return;
    v.playbackRate = 0.2;
    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    if (videoSrc === srcA || videoSrc === srcB) return;

    setActive(prev => {
      if (prev === "A") {
        setSrcB(videoSrc);
        return "B";
      } else {
        setSrcA(videoSrc);
        return "A";
      }
    });
  }, [videoSrc]);

  useEffect(() => {
    const current = active === "A" ? videoA.current : videoB.current;
    if (!current) return;

    current.currentTime = 0;
    current.playbackRate = 0.6;
    current.play().catch(() => {});
  }, [active]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoA}
        src={srcA}
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover
          transition-opacity duration-[${FADE_DURATION}ms] ease-in-out
          ${active === "A" ? "opacity-100" : "opacity-0"}`}
      />

      {srcB && (
        <video
          ref={videoB}
          src={srcB}
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover
            transition-opacity duration-[${FADE_DURATION}ms] ease-in-out
            ${active === "B" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export default Background;
