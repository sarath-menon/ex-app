"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
  ActiveTool,
  PointerDownState,
} from "@excalidraw/excalidraw/types/types";
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
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [connectionId, setConnectionId] = useState(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

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
      const sceneData = {
        type: "excalidraw",
        elements: elements,
      };

      console.log(sceneData);

      if (excalidrawAPI) {
        excalidrawAPI.updateScene(sceneData);
      }
      console.log(excalidrawAPI.getSceneElements());
    },
    [excalidrawAPI]
  );

  function onPointerDown(
    activeTool: ActiveTool,
    pointerDownState: PointerDownState
  ) {
    // console.log("Pointer down state", pointerDownState);
    // console.log("Hit element", pointerDownState.hit);
    // console.log("Active tool", activeTool);

    // send to server
    ws?.send(
      JSON.stringify({
        type: "pointer_down",
        data: { activeTool, pointerDownState },
      })
    );
  }

  function onChange(event: ExcalidrawProps["onChange"]) {
    console.log("Change", event);
  }

  useEffect(() => {
    setIsMounted(true); // Set mounted state when component mounts

    const ws = new WebSocket("ws://localhost:8765/");
    setWs(ws);
    function setupWebSocket() {
      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        // console.log("Message from server ", event.data);
        let jsonData = JSON.parse(event.data);

        if (jsonData.type === "connection_id") {
          const connectionId = jsonData.id;
          console.log("Connection ID:", connectionId);
          setConnectionId(connectionId);
        } else {
          handleClick(jsonData);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        // Attempt to reconnect after a delay
        setTimeout(() => {
          if (ws.readyState === WebSocket.OPEN) {
            console.log("Attempting to reconnect WebSocket...");
            setupWebSocket(); // Recursively set up new WebSocket connection
          }
        }, 3000); // Reconnect after 3 seconds
      };
    }

    setupWebSocket();

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
          onPointerDown={onPointerDown}
          // onChange={onChange}
        />
      )}
      <Button onClick={() => console.log(excalidrawAPI?.getSceneElements())}>
        Click me
      </Button>
    </>
  );
};

export default ExcalidrawWrapper;
