import React,{useRef,useEffect} from 'react'

const  useOutsideClick = (ref,setDisplay) =>{
    useEffect(()=>{
        function handleOutsideClick(event){
            if (ref.current && !ref.current.contains(event.target)) {
                setDisplay(false);
                // console.log("falsenot")
              }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleOutsideClick);
            return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleOutsideClick);
            };
    },[ref,setDisplay])
}

export const OutSideClick = ({setDisplay,children}) => {
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef,setDisplay);

    return (    
        <div  ref={wrapperRef}>
            {
                children
            }
        </div>
    )
}
