import React, {useEffect, useRef, useState} from "react";
import {TiLocationArrow} from "react-icons/ti";
import Button from "./Button";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Home", "About", "Contact", "Features"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const navContainer = useRef(null);
  const audioElementRef = useRef(null);
  const {y:currentScrollY} = useWindowScroll();
  const [lastScrollY,setLastScrollY] = useState(0)
  const [isNavVisible,setIsNavVisible] = useState(true)


  useEffect(()=>{
    if(currentScrollY === 0){
      setIsNavVisible(true);
      navContainer.current.classList.remove("floating-nav")
    }else if(currentScrollY > lastScrollY){
      setIsNavVisible(false);
      navContainer.current.classList.add("floating-nav")
    }else if(currentScrollY < lastScrollY){
      setIsNavVisible(true);
      navContainer.current.classList.add("floating-nav")
    }
    setLastScrollY(currentScrollY)

  },[currentScrollY,lastScrollY])


  useEffect(()=>{
    gsap.to(navContainer.current,{
      y:isNavVisible ? 0 : -100,
      opacity:isNavVisible ? 1 : 0,
      duration:0.2,
      ease:"power2.out"
    })
  },[isNavVisible])
  const toggleAudio = () => {
   setIsAudioPlaying(prev =>!prev)
   setIsIndicatorActive(prev =>!prev)
  };

  useEffect(()  =>{
    if(isAudioPlaying){
      audioElementRef.current.play()
    }else{
      audioElementRef.current.pause()
    }
  },[isAudioPlaying])

  return (
    <div
      ref={navContainer}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute-center top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden item-center gap-1 justify-center"
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a href={`#${item.toLowerCase()}`} className="nav-hover-btn" key={item}>
                  {item}
                </a>
              ))}
            </div>
           <button className="flex items-center ml-10 space-x-1" onClick={toggleAudio}>
            <audio src="/audio/loop.mp3" className="hidden" loop ref={audioElementRef}/>
            {[1,2,3,4].map((bar)=>(
              <div className={`indicator-line ${isIndicatorActive ? "active" : ""}`} key={bar} style={{animationDelay: `${bar * 0.1}s`}}/>
            ))}
           </button>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default NavBar;
