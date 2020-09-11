import React,{useEffect, useRef, useState} from "react";
import "./style.css";

function useInstance(instance = {}) {
    // assertion: instance && typeof instance === "object"
    const ref = useRef(instance);
    return ref.current;
}
export default function App({children}) {
  const [activeSlide, setActiveSlide] = useState(0);
    const activeSlideRef = useRef(null);
    const inst = useInstance({first: true});

    console.log("render");

    useEffect(() => {
        // *** After render, don't do anything, just remember we've seen the render
        if (inst.first) {
            console.log("set false");
            inst.first = false;
        } else if (activeSlideRef.current) {
            console.log("scroll");
            activeSlideRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'end'
            });
        }
    }, [activeSlide]);

    const moveLeft = Math.max(0, activeSlide - 1);
    const moveRight = Math.min(children.length - 1, activeSlide + 1);

    return (
        <React.Fragment>
          <button onClick={() => setActiveSlide(moveLeft)}>PREV</button>
          <div id="test">
            {children.map((child, i) => {
              const active = i === activeSlide;
              return (
                <div className={`slide ${active ? "active" : ""}`} ref={active ? activeSlideRef : null} id={`slide-${i}`} key={`slide-${i}`}>
                  {child}
                </div>
              );
            })}
          </div>

          <button onClick={() => setActiveSlide(moveRight)}>NEXT</button>
        </React.Fragment>
    );
}
