import useStore from "@/store";
import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("./excalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ExcalidrawWrapper />
    </div>
  );
}
