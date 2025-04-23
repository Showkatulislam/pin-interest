import useEditStore from "../../utils/EitorStore";
import Image from "../Image/Image";

const Layer = () => {
    const { selectedLayer, setSelectedLayer,addText ,canvasOptions} = useEditStore()
    const handleSelectedLayer = (layer) => {
        setSelectedLayer(layer);
    
        if (layer === "text") {
          addText();
        }
      };
    return (
        <div className="layers">
            <div className="layersTitle">
                <h1>Layers</h1>
                <p>Select a layer to edit</p>
            </div>
            <div onClick={() => handleSelectedLayer("text")} className={`layer ${selectedLayer === "text" ? "selected" : ""}`}>
                <div className="imgLayer">
                    <Image path={"/general/text.png"} alt={"Text"} w={48} h={48} />
                </div>
                <span>Add Text</span>
            </div>
            <div onClick={() => handleSelectedLayer("canvas")} className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}>
                <div className="imgLayer" style={{ backgroundColor: canvasOptions.backgroundColor }}>
                </div>
                <span>Canvas</span>
            </div>
        </div>
    );
};

export default Layer;