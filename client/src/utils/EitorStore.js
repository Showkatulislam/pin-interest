import { create } from "zustand";
const useEditStore = create((set) => ({
  selectedLayer: "canvas",
  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    top: 0,
    left: 0,
  },
  canvasOptions: {
    height: 0,
    orientation: "",
    size: "original",
    backgroundColor: "#008080",
  },
  setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
  setTextOptions: (newTextOptions) => set({ textOptions: newTextOptions }),
  addText: () =>
    set({
      textOptions: {
        text: "Add text",
        fontSize: 48,
        color: "#000000",
        top: 48,
        left: 0,
      },
    }),
    setCanvasOptions:(newCanvasOptions) => set({ canvasOptions: newCanvasOptions }),
}));

export default useEditStore;
