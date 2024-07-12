"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
// import "@excalidraw/excalidraw/index.css";
import "./index.scss";

const ExcalidrawWrapper: React.FC = () => {
  return (
    <>
      <Excalidraw />
    </>
  );
};

export default ExcalidrawWrapper;
