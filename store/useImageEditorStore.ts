import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ImageEditorState = {
  image: string | null;
  setImage: (imageData: string) => void;
};

export const useImageEditorStore = create<ImageEditorState>()(
  devtools((set) => ({
    image: null,
    setImage: (imageData: string) => set(() => ({ image: imageData })),
  })),
);
