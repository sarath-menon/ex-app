"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./index.scss";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import useStore from "@/store";
import { useEffect, useState } from "react";

const ExcalidrawWrapper: React.FC = () => {
  const initialElements = convertToExcalidrawElements([
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

  const showElements = useStore((state) => state.elements);
  const addElement = useStore((state) => state.addElement);
  const removeElement = useStore((state) => state.removeElement);
  const setElements = useStore((state) => state.setElements);
  const clearElements = useStore((state) => state.clearElements);

  const [isMounted, setIsMounted] = useState(false); // Add state to track mount status

  useEffect(() => {
    setIsMounted(true); // Set mounted state when component mounts
  }, []);

  useEffect(() => {
    clearElements();
    setElements(initialElements);
    console.log(showElements);
  }, []);

  return (
    <>
      {isMounted && ( // Render Excalidraw only if isMounted is true
        <Excalidraw
          initialData={{
            elements: showElements,
            appState: { zenModeEnabled: true, theme: "dark" },
            scrollToContent: true,
          }}
        />
      )}
    </>
  );
};

export default ExcalidrawWrapper;
