import { create } from 'zustand'
import * as excalidrawLib from "@excalidraw/excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

type State = {
  elements:any[]
}

type Action = {
  addElement: (element: any) => void
  removeElement: (element: any) => void
  setElements: (elements: any[]) => void
  clearElements: () => void
}

// Create your store, which includes both state and (optionally) actions
const useStore = create<State & Action>((set) => ({
  elements: [],
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
  removeElement: (element) => set((state) => ({ elements: state.elements.filter((e) => e !== element) })),
  setElements: (elements) => set((state) => ({ elements: elements })),
  clearElements: () => set((state) => ({ elements: [] })),
}))


export default useStore;