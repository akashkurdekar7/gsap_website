import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import React from "react";
import AnimatedTitle from "./AnimatedTitle";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path",{
      width:"100%",
      height:"100%",
      borderRadius:0,
    })
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px] ">
          welcome to zentry
        </h2>

        <AnimatedTitle title="Disc<b>o</b>ver the world's l<b>a</b>rgest shared adventure" 
        containerClass="mt-5 !text-black"/>

        <div className="about-subtext">
          <p>the game of games begins-your life, now an epic morpg</p>
          <p>zentry unites every player from countless games and platforms</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="background"
            className="absolute top-0 left-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default About;
