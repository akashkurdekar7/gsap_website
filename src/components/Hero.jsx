import {useEffect, useRef, useState} from "react";
import Button from "./Button";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

const Hero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const upcomingVideo = (currentIdx % totalVideos) + 1;

  const getVideos = (idx) => `videos/hero-${idx}.mp4`;
  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIdx(upcomingVideo);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", {visibility: "visible"});
        gsap.to("#next-video", {
          transformOrigin: "center center",
          height: "100%",
          width: "100%",
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          width: "100%",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
      }
    },
    {dependencies: [currentIdx], revertOnUpdate: true}
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 50% 50%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      duration: 1.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const handleVideoError = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div className="">
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg ">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniVideoClick}>
              <video
                ref={nextVideoRef}
                src={getVideos(upcomingVideo)}
                loop
                // autoPlay
                muted
                className="size-64 origin-center scale-150 object-center object-cover "
                id="current-video"
                onLoadedData={handleVideoLoad}></video>
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideos(currentIdx)}
            loop
            // autoPlay
            muted
            className="absolute-center absolute z-20 invisible size-64 object-center object-cover "
            id="next-video"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          />

          <video
            src={getVideos(currentIdx === totalVideos ? 0 : currentIdx + 1)}
            loop
            // autoPlay
            muted
            className="absolute size-full left-0 top-0 object-center object-cover "
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          />
        </div>

        <h1 className="special-font hero-heading absolute z-40 bottom-5 right-5 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              re<b>d</b>efi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 capitalize">
              enter the metagame layer <br />
              unleash the play economy
            </p>
            <Button
              id="watch-trailer"
              title="watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
