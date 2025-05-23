import { useEffect, useRef } from "react";
import useEditStore from "../../utils/EitorStore";
import Image from "../Image/Image";

const Workspace = ({ previewImg }) => {
    const { textOptions, setTextOptions,canvasOptions,setCanvasOptions, setSelectedLayer } = useEditStore()
    useEffect(()=>{
        if(canvasOptions.height===0){
            const canvasHeight=(372*previewImg.height)/previewImg.width
            setCanvasOptions({
                ...canvasOptions,
                height: canvasHeight,
                orientation: canvasHeight > 375 ? "portrait" : "landscape",
            })
        }
    },[previewImg,canvasOptions,setCanvasOptions])
    const itemRef = useRef(null);
    const containerRef = useRef(null);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
        console.log(dragging.current)
      if (!dragging.current) return;
      setTextOptions({
        ...textOptions,
        left: e.clientX - offset.current.x,
        top: e.clientY - offset.current.y,
      });
    };
  
    const handleMouseUp = () => {
      dragging.current = false;
    };
  
    const handleMouseLeave = () => {
      dragging.current = false;
    };
  
    const handleMouseDown = (e) => {
      setSelectedLayer("text");
      dragging.current = true;
      offset.current = {
        x: e.clientX - textOptions.left,
        y: e.clientY - textOptions.top,
      };
    };
    return (
        <div className="workspace" >
            <div 
                 className="canvas"
                 style={{
                   height: canvasOptions.height,
                   backgroundColor: canvasOptions.backgroundColor,
                 }}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseLeave}
                 ref={containerRef}
                
            >
                <img src={previewImg.url} alt="Canvas" />
                {textOptions.text && (
                    <div
                        className="text"
                        style={{
                            left: textOptions.left,
                            top: textOptions.top,
                            fontSize: `${textOptions.fontSize}px`,
                        }}
                        ref={itemRef}
                        onMouseDown={handleMouseDown}

                    >
                        <input
                            type="text"
                            value={textOptions.text} onChange={(e) => setTextOptions({ ...textOptions, text: e.target.value })}
                            style={{
                                color: textOptions.color,
                            }}
                        />
                        <div className="deleteTextButton"
                            onClick={(e) => setTextOptions({ ...textOptions, text: "" })}>
                            <Image path="/general/delete.svg" alt="Delete" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workspace;