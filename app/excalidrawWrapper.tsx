"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./index.scss";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

const ExcalidrawWrapper: React.FC = () => {
  const elements = convertToExcalidrawElements([
    {
      type: "rectangle",
      x: 100,
      y: 250,
    },
    {
      type: "ellipse",
      x: 250,
      y: 250,
    },
    {
      type: "diamond",
      x: 380,
      y: 250,
    },
  ]);

  return (
    <>
      <Excalidraw
        initialData={{
          elements,
          appState: { zenModeEnabled: true, theme: "dark" },
          scrollToContent: true,
        }}
      />
    </>
  );
};

export default ExcalidrawWrapper;
