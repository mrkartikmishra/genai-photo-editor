import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ImageEditorState = {
  image: string | null;
  prompt: string;
  setImage: (imageData: string) => void;
  setPrompt: (inputText: string) => void;
  generateEdit: () => Promise<void>;
};

export const useImageEditorStore = create<ImageEditorState>()(
  devtools((set, get) => ({
    image: null,
    prompt: "",
    setImage: (imageData: string) => set(() => ({ image: imageData })),
    setPrompt: (inputText: string) => set(() => ({ prompt: inputText })),
    generateEdit() {
      const data = get();
      console.log(data.prompt, data.image);
    },
  })),
);
