"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./index.scss";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import useStore from "@/store";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const newElements = [
  {
    type: "rectangle",
    x: 50,
    y: 250,
    width: 200,
    height: 100,
    backgroundColor: "#c0eb75",
    strokeWidth: 2,
  },
  {
    type: "ellipse",
    x: 300,
    y: 250,
    width: 200,
    height: 100,
    backgroundColor: "#ffc9c9",
    strokeStyle: "dotted",
    fillStyle: "solid",
    strokeWidth: 2,
  },
  {
    type: "diamond",
    x: 550,
    y: 250,
    width: 200,
    height: 100,
    backgroundColor: "#a5d8ff",
    strokeColor: "#1971c2",
    strokeStyle: "dashed",
    fillStyle: "cross-hatch",
    strokeWidth: 2,
  },
];

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

  const handleClick = useCallback(
    (elements) => {
      const sceneData1 = {
        elements: [
          {
            type: "rectangle",
            version: 141,
            versionNonce: 361174001,
            isDeleted: false,
            id: "oDVXy8D6rom3H1-LLH2-f",
            fillStyle: "hachure",
            strokeWidth: 3,
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
          {
            id: "ZKZ1oNGNnaVn5Zu-KUETQ",
            type: "text",
            x: 429.58984375,
            y: 76.8671875,
            width: 39.91996765136719,
            height: 25,
            angle: 0,
            strokeColor: "#1e1e1e",
            backgroundColor: "transparent",
            fillStyle: "solid",
            strokeWidth: 2,
            strokeStyle: "solid",
            roughness: 1,
            opacity: 100,
            groupIds: [],
            frameId: null,
            roundness: null,
            seed: 487817551,
            version: 5,
            versionNonce: 105260705,
            isDeleted: false,
            boundElements: null,
            updated: 1720798373319,
            link: null,
            locked: false,
            text: "salv",
            fontSize: 20,
            fontFamily: 1,
            textAlign: "left",
            verticalAlign: "top",
            baseline: 18,
            containerId: null,
            originalText: "salv",
            lineHeight: 1.25,
          },
        ],
      };

      console.log(sceneData1);

      const sceneData = {
        type: "excalidraw",
        elements: elements,
      };

      console.log(sceneData1);

      if (excalidrawAPI) {
        excalidrawAPI.updateScene(sceneData1);
      }
      console.log(excalidrawAPI.getSceneElements());
    },
    [excalidrawAPI]
  );

  useEffect(() => {
    setIsMounted(true); // Set mounted state when component mounts

    const ws = new WebSocket("ws://localhost:8765/");

    ws.onopen = () => {
      console.log("WebSocket connected");
      // You can also send messages to the server here
      ws.send("Hello Server!");
    };

    ws.onmessage = (event) => {
      // console.log("Message from server ", event.data);
      let jsonData = JSON.parse(event.data);
      handleClick(jsonData);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [excalidrawAPI, handleClick]);

  return (
    <>
      {isMounted && ( // Render Excalidraw only if isMounted is true
        <Excalidraw
          initialData={{
            elements: initialElements,
            appState: { zenModeEnabled: false, theme: "dark" },
            scrollToContent: true,
          }}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      )}
      <Button onClick={() => console.log(excalidrawAPI?.getSceneElements())}>
        Click me
      </Button>
    </>
  );
};

export default ExcalidrawWrapper;
