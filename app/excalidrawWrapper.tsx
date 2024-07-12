"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./index.scss";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ExcalidrawWrapper: React.FC = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
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

  console.log(initialElements);

  function handleClick() {
    const sceneData = {
      elements: [
        {
          type: "rectangle",
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: "oDVXy8D6rom3H1-LLH2-f",
          fillStyle: "hachure",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: "#c92a2a",
          backgroundColor: "transparent",
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
          boundElements: null,
          locked: false,
          link: null,
          updated: 1,
          roundness: {
            type: 3,
            value: 32,
          },
        },
      ],
    };
    if (excalidrawAPI) {
      excalidrawAPI.updateScene(sceneData);
    }
  }

  return (
    <>
      {isMounted && ( // Render Excalidraw only if isMounted is true
        <Excalidraw
          initialData={{
            // elements: showElements,
            appState: { zenModeEnabled: true, theme: "dark" },
            scrollToContent: true,
          }}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      )}
      <Button onClick={handleClick}>Click me</Button>
    </>
  );
};

export default ExcalidrawWrapper;
