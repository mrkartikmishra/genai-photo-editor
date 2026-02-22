"use client";

import { useRef, useState } from "react";

import { AIPromptInput } from "@/components/prompt-input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageGenerationLoading from "@/components/image-generation";
import { LeftSidebar } from "@/components/left-sidebar";
import { Navbar } from "@/components/navbar";
import { RightSidebar } from "@/components/right-sidebar";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");

  const uploadImageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const data = fileReader.result;
      setImage(data as string);
    };

    fileReader.readAsDataURL(file as File);
  };

  return (
    <>
      <div className="flex flex-col w-full h-dvh overflow-hidden">
        <Navbar />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* LEFT COLUMN */}
          <LeftSidebar />

          {/* MIDDLE COLUMN */}
          <main className="relative flex flex-col flex-1 bg-zinc-900/50 min-w-0">
            {/* CANVAS AREA */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              {/* BACKGROUND PATTERN */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* MAIN EDITOR SCREEN */}
              <div className="flex justify-center items-center p-6 md:p-10 w-full h-full">
                {!image ? (
                  <div className="z-10 space-y-6 max-w-sm text-center">
                    <div className="flex justify-center items-center bg-zinc-900/50 shadow-2xl shadow-yellow-900/10 mx-auto border border-zinc-800 rounded-3xl w-24 h-24">
                      <Image
                        src={"/logo.png"}
                        width={500}
                        height={500}
                        alt="logo"
                        className=""
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100 text-2xl">
                        Start Creating
                      </h3>
                      <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
                        Upload an image to unlock the full potential of{" "}
                        <span className="font-medium text-yellow-500">
                          Coder&apos;s Banana
                        </span>{" "}
                        AI tools.
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      className="hidden"
                      onChange={uploadImageChangeHandler}
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-yellow-500 hover:bg-yellow-400 rounded-xl w-full h-11 font-bold text-zinc-950 hover:scale-[1.02] transition-all"
                    >
                      Select Image
                    </Button>
                  </div>
                ) : (
                  <div className="relative flex justify-center items-center w-full h-full">
                    <Image src={image} alt="" width={500} height={500} />
                  </div>
                )}
              </div>

              {/* render when image in generating */}
              {/* <ImageGenerationLoading /> */}
            </div>

            {/* PROMPT INPUT AREA */}
            <div className="z-40 bg-zinc-950 p-4 lg:p-6 border-zinc-800 border-t shrink-0">
              <AIPromptInput />
            </div>
          </main>

          {/* RIGHT COLUMNS EDIT HISTORY */}
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
