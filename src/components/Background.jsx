import { useEffect, useRef, useState } from "react";

const FADE_DURATION = 800;

function Background({ videoSrc }) {
  const videoA = useRef(null);
  const videoB = useRef(null);

  const [active, setActive] = useState("A");
  const [srcA, setSrcA] = useState(videoSrc);
  const [srcB, setSrcB] = useState(null);


  useEffect(() => {
    const v = videoA.current;
    if (!v) return;

    v.playbackRate = 0.5;
    const playPromise = v.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);


  useEffect(() => {
    if (!videoSrc) return;

    const isAActive = active === "A";
    const nextVideo = isAActive ? videoB.current : videoA.current;
    const setNextSrc = isAActive ? setSrcB : setSrcA;

    setNextSrc(videoSrc);

    if (!nextVideo) return;

    nextVideo.src = videoSrc;
    nextVideo.playbackRate = 0.5;
    nextVideo.currentTime = 0;

    const onCanPlay = () => {
      nextVideo.play().catch(() => {});
      setActive(isAActive ? "B" : "A");
    };

    nextVideo.addEventListener("canplay", onCanPlay, { once: true });

    return () => {
      nextVideo.removeEventListener("canplay", onCanPlay);
    };
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
      <video
        ref={videoA}
        src={srcA}
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover
          transition-opacity duration-800 ease-in-out
          ${active === "A" ? "opacity-100" : "opacity-0"}`}
      />

      {srcB && (
        <video
          ref={videoB}
          src={srcB}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover
            transition-opacity duration-800 ease-in-out
            ${active === "B" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export default Background;
