import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef } from 'react'

const AnimatedTitle = ({title,containerClass}) => {

  const containerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(()=>{
    const content = gsap.context(()=>{
      const titleAnimations = gsap.timeline({
        scrollTrigger:{
          trigger:containerRef.current,
          start:"100 bottom",
          end:"center bottom",
          toggleActions: "play none none reverse"
        }
      })

      titleAnimations.to(".animated-word",{
        opacity:1,
       transform:"translate3d(0,0,0) rotateX(0) rotateY(0) rotateZ(0) scale(1)",
        stagger:0.05,
        ease:"power3.out",
        duration:0.5,
      })
    },containerRef)
    return ()=>content.revert()
  },[])
  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br>").map((line,idx)=>(
        <div key={idx} className='flex-center max-w-full flex-wrap gap-2 md:gap-3 px-10 '>
          {line.split(" ").map((word,i)=>(
            <span key={i} className='animated-word' dangerouslySetInnerHTML={{__html:word}}/>
          ))}
        </div>
      ))}
    </div>
  )
};
export default AnimatedTitle